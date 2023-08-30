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