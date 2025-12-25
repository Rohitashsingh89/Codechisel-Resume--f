let refreshPromise: Promise<string | null> | null = null;

export async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/v1/auth/refresh`,
          {
            method: "POST",
            credentials: "include", // 🔑 send refresh cookie
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!res.ok) return null;

        const data = await res.json();
        if (!data?.accessToken) return null;

        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}
