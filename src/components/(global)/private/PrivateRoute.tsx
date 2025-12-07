"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { logOut } from "@/features/auth/authSlice";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

const protectedRoutes = [
  { path: "/user-dashboard", roles: ["User"], nested: true },
  { path: "/admin-view", roles: ["Admin", "SuperAdmin"], nested: true },
];

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function validate() {
      const token = accessToken || localStorage.getItem("accessToken");

      if (!token) {
        router.replace("/signin");
        return;
      }

      try {
        // Fetch user data
        const userData = await apiFetch<{ role: string }>("/v1/users/info");

        setUserRole(userData.role);

        // Find matched route
        const config = protectedRoutes.find((r) =>
          r.nested
            ? pathname === r.path || pathname.startsWith(r.path + "/")
            : pathname === r.path
        );

        // If route is protected and role does not match -> redirect
        if (config && !config.roles.includes(userData.role)) {
          toast.error("Access denied.");

          if (userData.role === "User") router.replace("/user-dashboard");
          else router.replace("/admin-view");

          return;
        }
      } catch (error) {
        dispatch(logOut());
        localStorage.removeItem("accessToken");
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    }

    validate();
  }, [pathname, accessToken, router, dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-transparent border-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Validating access...
          </p>
        </div>
      </div>
    );
  }

  if (!userRole) return null;

  return <>{children}</>;
}
