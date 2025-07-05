import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import i18n from "../i18n";
import CryptoJS from "crypto-js";
import {
  gatewayUrl,
  signatureSecret,
  aesKeyHex,
  enableEncryption,
  enableSignature,
} from "../config/env";

const GATEWAY_URL = gatewayUrl;
const SIGNATURE_SECRET = signatureSecret;
const AES_KEY_HEX = aesKeyHex;

const GATEWAY_CONFIG = {
  timestampHeader: "x-timestamp",
  nonceHeader: "x-nonce",
  signatureHeader: "x-signature",
  optionalHeaders: ["x-device-id"],
  requireHeaders: [],
};

// Supported languages for x-lang
const SUPPORTED_LANGS = ["zh", "zh-hant", "en", "ja", "ko"];

// Helper to get current language, fallback to 'en' if not supported
function getCurrentLang() {
  let lang = i18n.language || "en";
  lang = lang.toLowerCase();
  if (lang === "zh-hant" || lang === "zh-hk" || lang === "zh-tw")
    return "zh-hant";
  if (SUPPORTED_LANGS.includes(lang)) return lang;
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("en")) return "en";
  return "en";
}

// Helper to get token (customize as needed)
function getToken() {
  return localStorage.getItem("token");
}

function generateNonce(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function hex2buf(hex: string) {
  return new Uint8Array(hex.match(/../g)!.map((x) => parseInt(x, 16)));
}

function b64tobuf(b64: string) {
  return new Uint8Array(Buffer.from(b64, "base64"));
}

function atou8(uint8: Uint8Array) {
  return new TextDecoder().decode(uint8);
}

function buildSignature({ method, path, query, body, headers }: any) {
  const parts = [];
  parts.push(method.toUpperCase());
  parts.push(path);

  const sortedQuery = Object.entries(query)
    .map(([k, v]) => `${k}=${v}`)
    .sort()
    .join("&");
  parts.push(sortedQuery);

  if (body) {
    parts.push(body);
  }

  for (const key of GATEWAY_CONFIG.requireHeaders) {
    parts.push(headers[key] || "");
  }

  const optionalParts = GATEWAY_CONFIG.optionalHeaders
    .map((key) => headers[key] && `${key}:${headers[key]}`)
    .filter(Boolean)
    .sort();
  parts.push(...optionalParts);

  parts.push(headers[GATEWAY_CONFIG.timestampHeader] || "");
  parts.push(headers[GATEWAY_CONFIG.nonceHeader] || "");
  parts.push(SIGNATURE_SECRET);

  return parts.join("|");
}

async function decryptResponse(res: AxiosResponse) {
  const encHdr = res.headers["x-resp-encrypt"];
  const ivHex = res.headers["x-resp-iv"];
  if (!encHdr || !ivHex) return res;

  const fmt = encHdr.split("-").pop();
  const iv = hex2buf(ivHex);

  let rawBuf: Uint8Array;
  if (fmt === "raw") {
    rawBuf = new Uint8Array(res.data);
  } else if (fmt === "b64") {
    rawBuf = b64tobuf(res.data);
  } else {
    rawBuf = hex2buf(res.data);
  }

  const tag = rawBuf.slice(-16);
  const enc = rawBuf.slice(0, -16);

  const keyBuf = hex2buf(AES_KEY_HEX);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyBuf,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  try {
    // Web Crypto expects tag to be appended to ciphertext
    const encWithTag = new Uint8Array([...enc, ...tag]);
    const decryptedBuf = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv, tagLength: 128 },
      cryptoKey,
      encWithTag
    );
    const plaintext = atou8(new Uint8Array(decryptedBuf));
    console.log("Decrypted response plaintext:", plaintext);
    try {
      res.data = JSON.parse(plaintext);
    } catch {
      res.data = plaintext;
    }
    return res;
  } catch (e: any) {
    return Promise.reject({ message: "Decryption failed", error: e });
  }
}

// Create Axios instance
const gateway: AxiosInstance = axios.create({
  timeout: 15000,
  headers: {
    "access-control-allow-credentials": "true",
  },
  // Use json as default response type, not arraybuffer
  responseType: "json",
});

gateway.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // If config.headers is an AxiosHeaders instance, use set method; otherwise, use plain object
  let headers: any = config.headers;
  if (typeof headers?.set === "function") {
    headers.set("x-lang", getCurrentLang());
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("x-device-id", headers.get("x-device-id") || "demo-device-001");
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = generateNonce();
    headers.set(GATEWAY_CONFIG.timestampHeader, timestamp);
    headers.set(GATEWAY_CONFIG.nonceHeader, nonce);

    // Prepare for signature
    const url = new URL(config.url!, config.baseURL || window.location.origin);
    const path = url.pathname;
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = value;
    });

    // Don't modify the body - let it pass through as is
    let body = "";
    if (config.data) {
      if (typeof config.data === "string") {
        body = config.data;
      } else {
        body = JSON.stringify(config.data);
      }
      // Only set Content-Type if not already set
      if (!headers.get("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }

    const signatureStr = buildSignature({
      method: config.method || "GET",
      path,
      query,
      body,
      headers:
        typeof headers.entries === "function"
          ? Object.fromEntries(headers.entries())
          : headers,
    });
    const signature = CryptoJS.MD5(signatureStr).toString();
    headers.set("x-lang", getCurrentLang());
    headers.set("access-control-allow-headers", getCurrentLang());
    headers.set(GATEWAY_CONFIG.signatureHeader, signature);
    config.headers = headers;
    return config;
  } else {
    // Fallback to plain object
    headers = { ...(headers || {}) };
    headers["x-lang"] = getCurrentLang();
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers["x-device-id"] = headers["x-device-id"] || "demo-device-001";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = generateNonce();
    headers[GATEWAY_CONFIG.timestampHeader] = timestamp;
    headers[GATEWAY_CONFIG.nonceHeader] = nonce;

    const url = new URL(config.url!, config.baseURL || window.location.origin);
    const path = url.pathname;
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = value;
    });

    // Don't modify the body - let it pass through as is
    let body = "";
    if (config.data) {
      if (typeof config.data === "string") {
        body = config.data;
      } else {
        body = JSON.stringify(config.data);
      }
      // Only set Content-Type if not already set
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    }

    const signatureStr = buildSignature({
      method: config.method || "GET",
      path,
      query,
      body,
      headers,
    });
    const signature = CryptoJS.MD5(signatureStr).toString();
    if (enableSignature) {
      headers[GATEWAY_CONFIG.signatureHeader] = signature;
    }
    config.headers = headers;
    return config;
  }
});

gateway.interceptors.response.use(
  async (response: AxiosResponse) => {
    // Handle encryption if enabled and response is encrypted
    const encHdr = response.headers["x-resp-encrypt"];
    const ivHex = response.headers["x-resp-iv"];
    if (enableEncryption && encHdr && ivHex) {
      // Temporarily change response type for decryption
      const originalResponseType = response.config.responseType;
      response.config.responseType = "arraybuffer";

      // Re-fetch with arraybuffer to decrypt
      const encryptedResponse = await axios.request({
        ...response.config,
        responseType: "arraybuffer",
      });

      // Convert arraybuffer to string for decryption
      let dataStr = "";
      if (encryptedResponse.data instanceof ArrayBuffer) {
        const uint8 = new Uint8Array(encryptedResponse.data);
        dataStr = Array.from(uint8)
          .map((b) => String.fromCharCode(b))
          .join("");
      } else {
        dataStr = encryptedResponse.data;
      }

      encryptedResponse.data = dataStr;
      const decryptedResponse = await decryptResponse(encryptedResponse);

      // Restore original response type
      response.config.responseType = originalResponseType;
      response.data = decryptedResponse.data;
      return response;
    }

    // Don't handle business errors at gateway level - let services handle them
    return response;
  },
  (error) => {
    // Don't transform errors at gateway level - let services handle them
    return Promise.reject(error);
  }
);

// Export a function for making requests
export async function gatewayRequest<T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return gateway.request<T>(config);
}

// Optionally export the instance for advanced use
export default gateway;
