import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import i18n from "../i18n";
import CryptoJS from "crypto-js";

const GATEWAY_URL =
  "http://ec2-13-229-71-69.ap-southeast-1.compute.amazonaws.com:8080/api/v1";
const SIGNATURE_SECRET = "123456";
const AES_KEY_HEX =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

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
  // baseURL: GATEWAY_URL, // Uncomment if you want to set a default base URL
  timeout: 15000,
  responseType: "arraybuffer", // To handle binary encrypted responses
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
    let body = "";
    if (config.data) {
      if (typeof config.data === "string") {
        body = config.data;
      } else {
        body = JSON.stringify(config.data);
      }
      headers.set("Content-Type", "application/json");
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
    let body = "";
    if (config.data) {
      if (typeof config.data === "string") {
        body = config.data;
      } else {
        body = JSON.stringify(config.data);
      }
      headers["Content-Type"] = "application/json";
    }
    const signatureStr = buildSignature({
      method: config.method || "GET",
      path,
      query,
      body,
      headers,
    });
    const signature = CryptoJS.MD5(signatureStr).toString();
    headers[GATEWAY_CONFIG.signatureHeader] = signature;
    config.headers = headers;
    return config;
  }
});

gateway.interceptors.response.use(
  async (response: AxiosResponse) => {
    // Decrypt if needed
    const encHdr = response.headers["x-resp-encrypt"];
    const ivHex = response.headers["x-resp-iv"];
    if (encHdr && ivHex) {
      // Convert arraybuffer to string for b64/hex
      let dataStr = "";
      if (response.data instanceof ArrayBuffer) {
        const uint8 = new Uint8Array(response.data);
        dataStr = Array.from(uint8)
          .map((b) => String.fromCharCode(b))
          .join("");
      } else {
        dataStr = response.data;
      }
      response.data = dataStr;
      return decryptResponse(response);
    }
    // Business error parsing (customize as needed)
    if (response.data && response.data.error) {
      return Promise.reject({
        message: response.data.error.message || "Business error",
        code: response.data.error.code,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // Standardize error handling
    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject({
        message: error.response.data.error.message || "Business error",
        code: error.response.data.error.code,
        data: error.response.data,
      });
    }
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
