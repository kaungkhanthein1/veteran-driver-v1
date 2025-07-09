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
function getCurrentLang(): string {
function getCurrentLang(): string {
  let lang = i18n.language || "en";
  lang = lang.toLowerCase();
  if (lang === "zh-hant" || lang === "zh-hk" || lang === "zh-tw") return "zh-hant";
  if (lang === "zh-hant" || lang === "zh-hk" || lang === "zh-tw") return "zh-hant";
  if (SUPPORTED_LANGS.includes(lang)) return lang;
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("en")) return "en";
  return "en";
}

// Helper to get token (customize as needed)
function getToken(): string | null {
function getToken(): string | null {
  return localStorage.getItem("token");
}

function generateNonce(length = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateNonce(length = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function hex2buf(hex: string): Uint8Array {
function hex2buf(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/../g)!.map((x) => parseInt(x, 16)));
}

function b64tobuf(b64: string): Uint8Array {
function b64tobuf(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}

function arrayBufferToString(buffer: ArrayBuffer): string {
  return new TextDecoder('utf-8').decode(buffer);
}

// Optimized query parameter extraction and merging
function extractAndMergeQueryParams(url: string, params?: any): { path: string; query: Record<string, string> } {
  try {
    let path: string;
    let queryString = '';
    
    // Handle both full URLs and relative paths
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url);
      path = urlObj.pathname;
      queryString = urlObj.search.slice(1); // Remove the '?' prefix
    } else {
      // It's a relative path
      const [pathPart, ...queryParts] = url.split('?');
      path = pathPart;
      queryString = queryParts.join('?'); // Handle edge case of multiple '?' in query
    }
    
    // Parse existing query parameters
    const existingQuery: Record<string, string> = {};
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams) {
        existingQuery[key] = value;
      }
    }
    
    // Merge with axios params (params take precedence)
    const mergedQuery: Record<string, string> = { ...existingQuery };
    if (params && typeof params === 'object') {
      for (const [key, value] of Object.entries(params)) {
        if (value !== null && value !== undefined) {
          mergedQuery[key] = String(value);
        }
      }
    }
    
    return { path, query: mergedQuery };
  } catch (error) {
    console.warn('Failed to parse URL for query extraction:', error);
    // Safe fallback
    const safePath = url.split('?')[0];
    return { path: safePath, query: {} };
  }
}
function arrayBufferToString(buffer: ArrayBuffer): string {
  return new TextDecoder('utf-8').decode(buffer);
}

// Optimized query parameter extraction and merging
function extractAndMergeQueryParams(url: string, params?: any): { path: string; query: Record<string, string> } {
  try {
    let path: string;
    let queryString = '';
    
    // Handle both full URLs and relative paths
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url);
      path = urlObj.pathname;
      queryString = urlObj.search.slice(1); // Remove the '?' prefix
    } else {
      // It's a relative path
      const [pathPart, ...queryParts] = url.split('?');
      path = pathPart;
      queryString = queryParts.join('?'); // Handle edge case of multiple '?' in query
    }
    
    // Parse existing query parameters
    const existingQuery: Record<string, string> = {};
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams) {
        existingQuery[key] = value;
      }
    }
    
    // Merge with axios params (params take precedence)
    const mergedQuery: Record<string, string> = { ...existingQuery };
    if (params && typeof params === 'object') {
      for (const [key, value] of Object.entries(params)) {
        if (value !== null && value !== undefined) {
          mergedQuery[key] = String(value);
        }
      }
    }
    
    return { path, query: mergedQuery };
  } catch (error) {
    console.warn('Failed to parse URL for query extraction:', error);
    // Safe fallback
    const safePath = url.split('?')[0];
    return { path: safePath, query: {} };
  }
}

function buildSignature({ method, path, query, body, headers }: {
  method: string;
  path: string;
  query: Record<string, string>;
  body: string;
  headers: Record<string, string>;
}): string {
function buildSignature({ method, path, query, body, headers }: {
  method: string;
  path: string;
  query: Record<string, string>;
  body: string;
  headers: Record<string, string>;
}): string {
  const parts = [];
  parts.push(method.toUpperCase());
  parts.push(path); // path is already cleaned by extractAndMergeQueryParams
  parts.push(path); // path is already cleaned by extractAndMergeQueryParams

  // Build sorted query string for consistent signature
  const sortedEntries = Object.entries(query).sort(([a], [b]) => a.localeCompare(b));
  const queryString = sortedEntries.length > 0 
    ? sortedEntries.map(([k, v]) => `${k}=${v}`).join("&")
    : "";
  parts.push(queryString);
  // Build sorted query string for consistent signature
  const sortedEntries = Object.entries(query).sort(([a], [b]) => a.localeCompare(b));
  const queryString = sortedEntries.length > 0 
    ? sortedEntries.map(([k, v]) => `${k}=${v}`).join("&")
    : "";
  parts.push(queryString);

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

async function decryptResponse(responseData: any, ivHex: string, encHdr: string): Promise<any> {
  if (!ivHex || !encHdr) return responseData;
async function decryptResponse(responseData: any, ivHex: string, encHdr: string): Promise<any> {
  if (!ivHex || !encHdr) return responseData;

  const fmt = encHdr.split("-").pop();
  const iv = hex2buf(ivHex);

  let rawBuf: Uint8Array;
  if (fmt === "raw") {
    rawBuf = responseData instanceof ArrayBuffer 
      ? new Uint8Array(responseData)
      : new Uint8Array(responseData);
    rawBuf = responseData instanceof ArrayBuffer 
      ? new Uint8Array(responseData)
      : new Uint8Array(responseData);
  } else if (fmt === "b64") {
    rawBuf = b64tobuf(typeof responseData === 'string' ? responseData : arrayBufferToString(responseData));
    rawBuf = b64tobuf(typeof responseData === 'string' ? responseData : arrayBufferToString(responseData));
  } else {
    rawBuf = hex2buf(typeof responseData === 'string' ? responseData : arrayBufferToString(responseData));
    rawBuf = hex2buf(typeof responseData === 'string' ? responseData : arrayBufferToString(responseData));
  }

  const tag = rawBuf.slice(-16);
  const enc = rawBuf.slice(0, -16);

  const keyBuf = hex2buf(AES_KEY_HEX);
  
  try {
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBuf,
      "AES-GCM",
      false,
      ["decrypt"]
    );

    // Web Crypto expects tag to be appended to ciphertext
    const encWithTag = new Uint8Array([...enc, ...tag]);
    const decryptedBuf = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv, tagLength: 128 },
      cryptoKey,
      encWithTag
    );
    
    const plaintext = new TextDecoder('utf-8').decode(decryptedBuf);
    try {
      return JSON.parse(plaintext);
      return JSON.parse(plaintext);
    } catch {
      return plaintext;
      return plaintext;
    }
  } catch (e: any) {
    throw new Error(`Decryption failed: ${e.message}`);
  }
}

function setHeaders(headers: any, headersToSet: Record<string, string>): void {
  if (typeof headers?.set === "function") {
    // AxiosHeaders instance
    Object.entries(headersToSet).forEach(([key, value]) => {
      headers.set(key, value);
    });
  } else {
    // Plain object
    Object.assign(headers, headersToSet);
  }
}

function getHeadersObject(headers: any): Record<string, string> {
  if (typeof headers?.entries === "function") {
    return Object.fromEntries(headers.entries());
    throw new Error(`Decryption failed: ${e.message}`);
  }
}

function setHeaders(headers: any, headersToSet: Record<string, string>): void {
  if (typeof headers?.set === "function") {
    // AxiosHeaders instance
    Object.entries(headersToSet).forEach(([key, value]) => {
      headers.set(key, value);
    });
  } else {
    // Plain object
    Object.assign(headers, headersToSet);
  }
}

function getHeadersObject(headers: any): Record<string, string> {
  if (typeof headers?.entries === "function") {
    return Object.fromEntries(headers.entries());
  }
  return headers || {};
  return headers || {};
}

// Create Axios instance
const gateway: AxiosInstance = axios.create({
  timeout: 15000,
  headers: {
    "access-control-allow-credentials": "true",
  },
  responseType: "json",
});

gateway.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = generateNonce();
    const token = getToken();
    const lang = getCurrentLang();
    const token = getToken();
    const lang = getCurrentLang();

    // Prepare headers to set
    const headersToSet: Record<string, string> = {
      "x-lang": lang,
      "x-device-id": getHeadersObject(config.headers)["x-device-id"] || "demo-device-001",
      [GATEWAY_CONFIG.timestampHeader]: timestamp,
      [GATEWAY_CONFIG.nonceHeader]: nonce,
    };

    if (token) {
      headersToSet["Authorization"] = `Bearer ${token}`;
    }

    // Set headers using unified function
    setHeaders(config.headers, headersToSet);

    // Optimized query parameter extraction and merging
    const { path, query } = extractAndMergeQueryParams(config.url || '', config.params);
    // Prepare headers to set
    const headersToSet: Record<string, string> = {
      "x-lang": lang,
      "x-device-id": getHeadersObject(config.headers)["x-device-id"] || "demo-device-001",
      [GATEWAY_CONFIG.timestampHeader]: timestamp,
      [GATEWAY_CONFIG.nonceHeader]: nonce,
    };

    if (token) {
      headersToSet["Authorization"] = `Bearer ${token}`;
    }

    // Set headers using unified function
    setHeaders(config.headers, headersToSet);

    // Optimized query parameter extraction and merging
    const { path, query } = extractAndMergeQueryParams(config.url || '', config.params);

    // Prepare body for signature
    // Prepare body for signature
    let body = "";
    if (config.data) {
      if (typeof FormData !== "undefined" && config.data instanceof FormData) {
        body = "";
      } else if (typeof config.data === "string") {
        body = config.data;
      } else {
        body = JSON.stringify(config.data);
      }
      // Set Content-Type if not already set and not FormData
      if (
        !getHeadersObject(config.headers)["Content-Type"] &&
        !getHeadersObject(config.headers)["Content-Type"] &&
        !(typeof FormData !== "undefined" && config.data instanceof FormData)
      ) {
        setHeaders(config.headers, { "Content-Type": "application/json" });
        setHeaders(config.headers, { "Content-Type": "application/json" });
      }
    }

    // Generate signature if enabled
    if (enableSignature) {
      const headersObj = getHeadersObject(config.headers);
      const signatureStr = buildSignature({
        method: config.method || "GET",
        path,
        query,
        body,
        headers: headersObj,
      });
      const signature = CryptoJS.MD5(signatureStr).toString();
      setHeaders(config.headers, { [GATEWAY_CONFIG.signatureHeader]: signature });
    }

    // Handle encrypted responses by setting appropriate response type
    if (enableEncryption) {
      config.responseType = "arraybuffer";
    }

    // Rebuild URL with properly merged query parameters
    const finalQueryString = Object.keys(query).length > 0
      ? Object.entries(query)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&")
      : '';
    
    // Preserve the full URL structure for the actual request
    let finalUrl: string;
    if (config.url?.startsWith('http://') || config.url?.startsWith('https://')) {
      // It's a full URL - rebuild with base + path + query
      const originalUrl = new URL(config.url);
      const baseUrl = `${originalUrl.protocol}//${originalUrl.host}`;
      finalUrl = finalQueryString ? `${baseUrl}${path}?${finalQueryString}` : `${baseUrl}${path}`;
    } else {
      // It's a relative path - use as is
      finalUrl = finalQueryString ? `${path}?${finalQueryString}` : path;
    }
    
    config.url = finalUrl;
    
    // Clear params since we've incorporated them into the URL
    delete config.params;

    return config;
  } catch (error) {
    console.error("Request interceptor error:", error);
    return config;
  }
});

gateway.interceptors.response.use(
  async (response: AxiosResponse) => {
    try {
      // Handle encryption if enabled and response is encrypted
      const encHdr = response.headers["x-resp-encrypt"];
      const ivHex = response.headers["x-resp-iv"];
      
      if (enableEncryption && encHdr && ivHex) {
        console.log("Decrypting response...");
        response.data = await decryptResponse(response.data, ivHex, encHdr);
      } else if (response.config.responseType === "arraybuffer" && response.data instanceof ArrayBuffer) {
        // Convert ArrayBuffer to JSON if no encryption but responseType was set to arraybuffer
        const textData = arrayBufferToString(response.data);
        try {
          response.data = JSON.parse(textData);
        } catch {
          response.data = textData;
        }
      }

      return response;
    } catch (error) {
      console.error("Response decryption error:", error);
      return Promise.reject(error);
    } catch (error) {
      console.error("Response decryption error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      console.error("Gateway response error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("Gateway request error:", error.request);
    } else {
      console.error("Gateway setup error:", error.message);
    }
    // Enhanced error logging
    if (error.response) {
      console.error("Gateway response error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("Gateway request error:", error.request);
    } else {
      console.error("Gateway setup error:", error.message);
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