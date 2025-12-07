"use client";

import { useLogout } from "@/hook/useLogout";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/user-dashboard" },
  { label: "Support", href: "/user-dashboard/support" },
  { label: "Downloads", href: "/user-dashboard/downloads" },
  { label: "Payment Details", href: "/user-dashboard/payments" },
  { label: "Account Details", href: "/user-dashboard/account" },
  { label: "Resumes", href: "/user-dashboard/resumes" },
  { label: "Log out", href: "/logout", danger: true },
];

interface UserDashboardSidebarProps {
  mobile?: boolean;
  onClose?: () => void;
  isDrawer?: boolean;
}

export default function UserDashboardSidebar({
  mobile = false,
  onClose,
  isDrawer = false,
}: UserDashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useLogout();

  return (
    <section className="sticky top-22 z-20 py-4 md:py-6">
      <div className="mx-auto max-w-5xl">
        <div className="backdrop-blur-sm md:rounded-xl">
          <div
            className={`relative rounded-xl ${isDrawer ? "" : "md:border md:border-gray-300 dark:md:border-gray-800"} bg-white dark:bg-gray-900`}
          >
            <aside
              className={clsx(
                "flex flex-col gap-4 rounded-xl bg-white px-4 py-2 sm:px-6 sm:py-4 dark:bg-gray-900",
                "w-60",
                mobile && "w-full max-w-xs",
                !mobile && "sticky min-h-[calc(100vh-9rem)]",
              )}
            >
              {links.map((link) => {
                const isActive = pathname === link.href;

                if (link.label === "Log out") {
                  return (
                    <button
                      key={link.label}
                      onClick={() => logout("user")}
                      className={clsx(
                        "rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                        "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
                      )}
                    >
                      {link.label}
                    </button>
                  );
                }

                // All other items → same <Link> as before
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={clsx(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 dark:hover:bg-primary/20 text-slate-700 dark:text-gray-300",
                    )}
                    onClick={mobile ? onClose : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
