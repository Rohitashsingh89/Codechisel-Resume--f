import { apiFetchWithoutToken } from "@/lib/api";

export async function tryRefreshToken(): Promise<string | null> {
  try {
    // Send POST request to refresh endpoint
    const data = await apiFetchWithoutToken<{ accessToken: string }>("/v1/auth/refresh", {
      method: "POST",
      credentials: "include", // send cookies to server
    });

    if (!data?.accessToken) return null;

    // Save new access token in localStorage
    localStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  } catch (err) {
    return null;
  }
}
