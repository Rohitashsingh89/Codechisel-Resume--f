"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hook/reduxHooks";
import { setCredentials, logOut } from "@/features/auth/authSlice";
import { apiFetch } from "@/lib/api";

export default function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function bootstrapAuth() {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        // Optional: decode token to check expiration client-side
        const { jwtDecode } = await import("jwt-decode");
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        // Fetch user info from backend
        const user = await apiFetch("/v1/users/info");

        dispatch(
          setCredentials({
            accessToken: token,
            user,
            loading: false,
            loginError: null,
          })
        );
      } catch (error) {        
        dispatch(logOut());
        localStorage.removeItem("accessToken");
        router.replace("/signin");
      }
    }

    bootstrapAuth();
  }, [dispatch, router]);

  return <>{children}</>;
}
