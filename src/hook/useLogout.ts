"use client";

import { useAppDispatch } from "@/hook/reduxHooks";
import { logOut } from "@/features/auth/authSlice";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async (role: "user" | "admin" = "user") => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Optional backend logout
      if (accessToken) {
        await apiFetch("/v1/auth/logout", {
          method: "POST",
        }).catch(() => {});
      }

      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Clear redux state
      dispatch(logOut());

      toast.success("Logged out successfully!");

      // Redirect according to role
      router.replace(role === "admin" ? "/admin-signin-page" : "/admin-signin-page");
    } catch (error) {
      // Fallback cleanup
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logOut());
      router.replace(role === "admin" ? "/admin-signin-page" : "/admin-signin-page");
    }
  };

  return { logout };
}

export function logoutDirect(role: "user" | "admin" = "user") {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = role === "admin" ? "/admin-signin-page" : "/admin-signin-page";
}
