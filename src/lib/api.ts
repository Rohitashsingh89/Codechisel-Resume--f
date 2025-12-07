import { tryRefreshToken } from "@/helpers/refreshToken";
import { ApiError } from "./errors";
import { logoutDirect } from "@/hook/useLogout";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

// export async function apiFetch<T>(
//   path: string,
//   init?: RequestInit,
// ): Promise<T> {
//   const res = await fetch(`${API_BASE}${path}`, {
//     credentials: "include",
//     headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
//     ...init,
//   });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err?.message || `Request failed: ${res.status}`);
//   }
//   return res.json() as Promise<T>;
// }

export async function apiFetchWithoutToken<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';
  const u = path.startsWith('http') ? path : `${base}${path}`;
  const url = init?.method === 'GET' || !init?.method
    ? `${u}${u.includes('?') ? '&' : '?'}_=${Date.now()}` // cache buster
    : u;
  const res = await fetch(url, {
    method: init?.method || 'GET',
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
    cache: 'no-store',
    ...init
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiFetch<T = any>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";
  const u = path.startsWith("http") ? path : `${base}${path}`;
  const url =
    init?.method === "GET" || !init?.method
      ? `${u}${u.includes("?") ? "&" : "?"}_=${Date.now()}`
      : u;

  async function makeRequest() {
    const token = localStorage.getItem("accessToken");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      ...(init?.headers as Record<string, string>),
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(url, {
      method: init?.method || "GET",
      headers,
      cache: "no-store",
      ...init,
    });
  }

  // First request attempt
  let res = await makeRequest();
  let text = await res.text();

  // Extract backend message
  let msg = text;
  try {
    msg = JSON.parse(text)?.message;
  } catch {}

  const shouldRefresh =
    msg === "No token provided" ||
    msg === "Invalid token" ||
    msg === "Token expired";

  if (!res.ok && shouldRefresh) {
    const refreshed = await tryRefreshToken();

    if (!refreshed) {
      logoutDirect();
      return Promise.reject("Refresh failed");
    }

    // 🔄 retry with new token
    res = await makeRequest();
    text = await res.text();
  }

  if (!res.ok) {
    let errMsg = "Request failed";
  
    try {
      const parsed = JSON.parse(text);
      errMsg = parsed.message || text;
    } catch {
      errMsg = text;
    }
  
    throw new Error(errMsg);
  }  

  return JSON.parse(text);
}

export interface ApiFetchRawInit extends RequestInit {
  responseType?: "json" | "blob" | "text";
}

export async function apiFetchRaw<T = any>(
  path: string,
  init: ApiFetchRawInit = {},
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";
  const u = path.startsWith("http") ? path : `${base}${path}`;
  const url =
    init.method === "GET" || !init.method
      ? `${u}${u.includes("?") ? "&" : "?"}_=${Date.now()}`
      : u;

  const { responseType = "json", headers = {}, ...fetchOptions } = init;

  // ✅ If body is FormData, do not set Content-Type
  const isFormData = fetchOptions.body instanceof FormData;

  const finalHeaders = {
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  let res: Response;

  try {
    res = await fetch(url, {
      method: fetchOptions.method || "GET",
      cache: "no-store",
      headers: finalHeaders,
      ...fetchOptions,
    });
  } catch (networkError) {
    // ✅ Network errors (no response) - handle everywhere the same
    throw new ApiError(
      "Network error. Please check your connection.",
      "NETWORK_ERROR",
      0,
      { originalError: networkError },
    );
  }

  if (!res.ok) {
    let errorData: any = null;

    try {
      errorData = await res.json();
    } catch {
      try {
        errorData = { message: await res.text() };
      } catch {
        errorData = { message: `HTTP ${res.status}` };
      }
    }

    // ✅ HTTP errors - handle everywhere the same
    throw new ApiError(
      errorData.message || "API error",
      errorData.code || "API_ERROR",
      res.status,
      errorData,
    );
  }

  // ✅ Success responses
  if (responseType === "blob") return res.blob() as Promise<T>;
  if (responseType === "text") return res.text() as Promise<T>;
  return res.json();
}
