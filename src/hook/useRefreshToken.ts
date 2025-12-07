"use client";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { setCredentials, logOut } from "@/features/auth/authSlice";
import { apiFetch } from "@/lib/api";

export function useRefreshToken() {
  const dispatch = useAppDispatch();
  const { accessToken: currentToken } = useAppSelector((state) => state.auth);

  async function refresh() {
    try {
      // ✅ Get token from localStorage first (in case Redux is stale)
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const res = await apiFetch<{ accessToken: string }>("/v1/auth/refresh", {
        method: "POST",
        credentials: "include", // ✅ Sends httpOnly refreshToken cookie
      });

      // ✅ Update BOTH localStorage AND Redux
      localStorage.setItem("accessToken", res.accessToken);

      // ✅ Fix: Pass complete credentials object (not spread stale state)
      dispatch(
        setCredentials({
          accessToken: res.accessToken,
          user: currentToken ? undefined : null,
          loading: false,
          loginError: "",
        }),
      );

      return res.accessToken;
    } catch (error) {
      // ✅ Complete cleanup on refresh failure
      dispatch(logOut());
      localStorage.removeItem("accessToken");
      throw new Error("Session expired");
    }
  }

  return { refresh };
}
