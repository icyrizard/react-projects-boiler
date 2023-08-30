import { createSearchParams } from "react-router-dom";

export function decodeJwt<T>(token: string): T {
  const base64Url = token.split(".")[1];
  const base64Encoded = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64Encoded)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

export function pushQueryState(queryParams: URLSearchParams) {
  const url =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port +
    window.location.pathname +
    `?${createSearchParams(queryParams)}`;
  window.history.pushState({ path: url }, "", url);
}

// https://docs.cotter.app/sdk-reference/api-for-other-mobile-apps/api-for-mobile-apps#step-1-create-a-code-verifier
export function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2);
}

export function generateRandomString() {
  const array = new Uint32Array(56 / 2);

  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

function sha256(plain: string) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest("SHA-256", data);
}

export function base64urlEncode(value: ArrayBuffer) {
  let str = "";

  const bytes = new Uint8Array(value);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }

  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generateCodeChallengeFromVerifier(v: string) {
  const hashed = await sha256(v);

  const base64Encoded = base64urlEncode(hashed);

  return base64Encoded;
}
