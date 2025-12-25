// src/lib/http.ts
import { toast } from "react-hot-toast";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

type ToastMessages =
  | {
      loading?: string;
      success?: string;
      error?: string | ((e: any) => string);
    }
  | undefined;

type Options = RequestInit & {
  json?: any;
  toast?: ToastMessages; // optional toast messages per request
};

export async function fetchJson<T>(
  url: string,
  opts: Options = {},
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };

  async function doFetch(): Promise<T> {
    const res = await fetch(`${BASE}/${url}`, {
      ...opts,
      headers,
      body: opts.json !== undefined ? JSON.stringify(opts.json) : opts.body,
      cache: "no-store",
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // empty or non-JSON
    }

    if (!res.ok) {
      const msg = data?.error || data?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }

    return data as T;
  }

  const hasWindow = typeof window !== "undefined";
  if (opts.toast && hasWindow) {
    const loading = opts.toast.loading ?? "Working...";
    const success = opts.toast.success ?? "Done";
    return await toast.promise(doFetch(), {
      loading,
      success,
      error: (e) =>
        typeof opts.toast?.error === "function"
          ? opts.toast.error(e)
          : opts.toast?.error || e?.message || "Something went wrong",
    });
  }

  return await doFetch();
}

// // src/lib/http.ts
// const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

// type Options = RequestInit & { json?: any };

// export async function fetchJson<T>(url: string, opts: Options = {}): Promise<T> {
//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...(opts.headers || {}),
//   };

//   const res = await fetch(`${BASE}/${url}`, {
//     ...opts,
//     headers,
//     body: opts.json !== undefined ? JSON.stringify(opts.json) : opts.body,
//     cache: "no-store",
//   });

//   let data: any = null;
//   try {
//     data = await res.json();
//   } catch {
//     // no body or not JSON
//   }

//   if (!res.ok) {
//     const message = data?.error || data?.message || `HTTP ${res.status}`;
//     throw new Error(message);
//   }

//   return data as T;
// }
