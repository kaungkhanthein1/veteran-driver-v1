// Gateway Crypto Helper for React/Browser
// Adapted from Node.js version for use in React apps

import { gatewayUrl, signatureSecret, aesKeyHex } from "../config/env";

export const gatewayConfig = {
  timestampHeader: "x-timestamp",
  nonceHeader: "x-nonce",
  signatureHeader: "x-signature",
  optionalHeaders: ["x-device-id"],
  requireHeaders: [],
};

// === utils ===
export function generateNonce(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

export function hex2buf(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/../g)!.map((x) => parseInt(x, 16)));
}

export function b64tobuf(b64: string): Uint8Array {
  // atob returns a binary string
  const binStr = atob(b64);
  const buf = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) {
    buf[i] = binStr.charCodeAt(i);
  }
  return buf;
}

export function atou8(uint8: Uint8Array): string {
  return new TextDecoder().decode(uint8);
}

export function buildSignature({
  method,
  path,
  query,
  body,
  headers,
}: {
  method: string;
  path: string;
  query: Record<string, any>;
  body?: string;
  headers: Record<string, string>;
}): string {
  const parts: string[] = [];
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

  for (const key of gatewayConfig.requireHeaders) {
    parts.push(headers[key] || "");
  }

  const optionalParts = gatewayConfig.optionalHeaders
    .map((key) => headers[key] && `${key}:${headers[key]}`)
    .filter(Boolean)
    .sort();
  parts.push(...optionalParts);

  parts.push(headers[gatewayConfig.timestampHeader] || "");
  parts.push(headers[gatewayConfig.nonceHeader] || "");
  parts.push(signatureSecret);

  return parts.join("|");
}

// === Web Crypto API MD5 polyfill (browser doesn't support MD5 natively) ===
// Use a JS implementation for MD5 (e.g., spark-md5)
import SparkMD5 from "spark-md5";

export function md5(str: string): string {
  return SparkMD5.hash(str);
}

// === send request + decrypt response ===
export async function sendSignedAndDecrypt({
  url = gatewayUrl,
  method = "GET",
  query = {},
  bodyObject = null,
  additionalHeaders = { "x-device-id": "demo-device-001" },
}: {
  url?: string;
  method?: string;
  query?: Record<string, any>;
  bodyObject?: any;
  additionalHeaders?: Record<string, string>;
}): Promise<any> {
  const urlObj = new URL(url);
  Object.entries(query).forEach(([key, value]) =>
    urlObj.searchParams.append(key, value)
  );
  const path = urlObj.pathname;

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce();

  const headers: Record<string, string> = {
    Accept: "*/*",
    ...additionalHeaders,
    [gatewayConfig.timestampHeader]: timestamp,
    [gatewayConfig.nonceHeader]: nonce,
  };

  const body = bodyObject ? JSON.stringify(bodyObject) : "";

  const signatureStr = buildSignature({
    method,
    path,
    query,
    body,
    headers,
  });

  // Use SparkMD5 for browser MD5
  const signature = md5(signatureStr);

  headers[gatewayConfig.signatureHeader] = signature;
  if (body) headers["Content-Type"] = "application/json";

  // LOGGING: Show all request details
  console.log("[sendSignedAndDecrypt] URL:", urlObj.toString());
  console.log("[sendSignedAndDecrypt] Method:", method);
  console.log("[sendSignedAndDecrypt] Query:", query);
  console.log("[sendSignedAndDecrypt] Body:", body);
  console.log("[sendSignedAndDecrypt] Headers:", headers);
  console.log("[sendSignedAndDecrypt] Signature String:", signatureStr);
  console.log("[sendSignedAndDecrypt] Signature (MD5):", signature);

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: body || undefined,
  };

  let res: Response;
  try {
    res = await fetch(urlObj.toString(), fetchOptions);
  } catch (err) {
    console.error("[sendSignedAndDecrypt] Fetch error:", err);
    throw err;
  }

  // LOGGING: Show response status and headers
  console.log("[sendSignedAndDecrypt] Response status:", res.status);
  console.log(
    "[sendSignedAndDecrypt] Response headers:",
    Array.from(res.headers.entries())
  );

  const encHdr = res.headers.get("x-resp-encrypt");
  const ivHex = res.headers.get("x-resp-iv");

  if (!encHdr || !ivHex) {
    // Plain response
    const text = await res.text();
    console.log("[sendSignedAndDecrypt] Plain response:", text);
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  const fmt = encHdr.split("-").pop();
  const iv = hex2buf(ivHex);

  let rawBuf: Uint8Array;
  if (fmt === "raw") {
    rawBuf = new Uint8Array(await res.arrayBuffer());
  } else if (fmt === "b64") {
    rawBuf = b64tobuf(await res.text());
  } else {
    rawBuf = hex2buf(await res.text());
  }

  const tag = rawBuf.slice(-16);
  const enc = rawBuf.slice(0, -16);

  // Web Crypto API expects tag to be appended to ciphertext
  const encWithTag = new Uint8Array(enc.length + tag.length);
  encWithTag.set(enc, 0);
  encWithTag.set(tag, enc.length);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    hex2buf(aesKeyHex),
    "AES-GCM",
    false,
    ["decrypt"]
  );

  try {
    const decryptedBuf = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv, tagLength: 128 },
      cryptoKey,
      encWithTag
    );
    const plaintext = atou8(new Uint8Array(decryptedBuf));
    console.log("[sendSignedAndDecrypt] Decrypted plaintext:", plaintext);
    try {
      return JSON.parse(plaintext);
    } catch {
      return plaintext;
    }
  } catch (e: any) {
    console.error("[sendSignedAndDecrypt] Decryption failed:", e.message || e);
    throw new Error("Decryption failed: " + (e.message || e));
  }
}

// Usage example (uncomment to test in browser):
// sendSignedAndDecrypt({
//   url: `${GATEWAY_URL}/auth/email-otp-login`,
//   method: 'POST',
//   bodyObject: {
//     email: 'test-username@example.com',
//     code: 123456,
//   },
// }).then(console.log);

// sendSignedAndDecrypt({
//   url: `${GATEWAY_URL}/media/upload-url`,
//   query: {
//     type: 'avatar',
//     usage: 'profile',
//   },
//   method: 'GET',
//   additionalHeaders: {
//     authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MzQ0MzMyNzM0NDM0NjQzOTY4IiwibG9naW5NZXRob2QiOiJlbWFpbCIsImlzQmFubmVkIjpmYWxzZSwiaWF0IjoxNzUxNzEyMDU0LCJleHAiOjE3NTE3MTU2NTR9.Par0hRD4_4Ms47jWLL0klilB-FFQ3KomykouVC4iV4w',
//   },
// }).then(console.log);
