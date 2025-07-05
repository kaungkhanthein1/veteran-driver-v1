// gateway.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import i18n from '../i18n';
import CryptoJS from 'crypto-js';

const SIGNATURE_SECRET = '123456';
const AES_KEY_HEX = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

const GATEWAY_CONFIG = {
  timestampHeader: 'x-timestamp',
  nonceHeader: 'x-nonce',
  signatureHeader: 'x-signature',
  optionalHeaders: ['x-device-id'],
};

const SUPPORTED_LANGS = ['zh', 'zh-hant', 'en', 'ja', 'ko'];

function getCurrentLang(): string {
  const lang = (i18n.language || 'en').toLowerCase();
  if (lang.startsWith('zh-hant') || ['zh-hk', 'zh-tw'].includes(lang)) return 'zh-hant';
  return SUPPORTED_LANGS.find(l => lang.startsWith(l)) || 'en';
}

function generateNonce(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function buildSignature({ method, path, query, body, headers }: any): string {
  const parts = [method.toUpperCase(), path];
  parts.push(Object.entries(query).sort().map(([k, v]) => `${k}=${v}`).join('&'));
  if (body) parts.push(body);
  GATEWAY_CONFIG.optionalHeaders.forEach(k => {
    if (headers[k]) parts.push(`${k}:${headers[k]}`);
  });
  parts.push(headers[GATEWAY_CONFIG.timestampHeader] || '');
  parts.push(headers[GATEWAY_CONFIG.nonceHeader] || '');
  parts.push(SIGNATURE_SECRET);
  return parts.join('|');
}

function hex2buf(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/../g)!.map(h => parseInt(h, 16)));
}

function b64tobuf(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, 'base64'));
}

async function decryptResponse(res: AxiosResponse): Promise<AxiosResponse> {
  const encHdr = res.headers['x-resp-encrypt'];
  const ivHex = res.headers['x-resp-iv'];
  if (!encHdr || !ivHex) return res;

  const fmt = encHdr.split('-').pop();
  const iv = hex2buf(ivHex);

  const rawBuf = fmt === 'b64'
    ? b64tobuf(res.data)
    : fmt === 'raw'
    ? new Uint8Array(res.data)
    : hex2buf(res.data);

  const tag = rawBuf.slice(-16);
  const enc = rawBuf.slice(0, -16);
  const cryptoKey = await crypto.subtle.importKey('raw', hex2buf(AES_KEY_HEX), 'AES-GCM', false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, new Uint8Array([...enc, ...tag]));

  const decoded = new TextDecoder().decode(decrypted);
  try {
    res.data = JSON.parse(decoded);
  } catch {
    res.data = decoded;
  }
  return res;
}

const gateway: AxiosInstance = axios.create({
  timeout: 15000,
  responseType: 'arraybuffer',
});

gateway.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const headers = {
    ...config.headers,
    'x-lang': getCurrentLang(),
    'x-device-id': 'demo-device-001',
    'Authorization': token ? `Bearer ${token}` : undefined,
  };

  const url = new URL(config.url!, config.baseURL || window.location.origin);
  const query = Object.fromEntries(url.searchParams.entries());
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce();
  const body = config.data ? JSON.stringify(config.data) : '';

  headers[GATEWAY_CONFIG.timestampHeader] = timestamp;
  headers[GATEWAY_CONFIG.nonceHeader] = nonce;
  headers['Content-Type'] = 'application/json';
  headers[GATEWAY_CONFIG.signatureHeader] = CryptoJS.MD5(
    buildSignature({ method: config.method || 'GET', path: url.pathname, query, body, headers })
  ).toString();

  config.headers = headers;
  return config;
});

gateway.interceptors.response.use(decryptResponse, err => Promise.reject(err));

export async function gatewayRequest<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return gateway.request<T>(config);
}

export default gateway;
