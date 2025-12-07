"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaHome,
  FaFileAlt,
  FaPalette,
  FaUsers,
  FaCog,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "@/hook/useTheme";
import { useLogout } from "@/hook/useLogout";
import { SiCodecrafters } from "react-icons/si";
import { BadgeIndianRupee, CalendarSync, ChartNoAxesCombined, Columns3Cog, Logs, NotebookPen, UserRoundPen } from "lucide-react";

const colorMap: Record<string, string> = {
  slate: "bg-slate-900",
  indigo: "bg-indigo-700",
  emerald: "bg-emerald-700",
  rose: "bg-rose-700",
};
const hoverMap: Record<string, string> = {
  slate: "hover:bg-slate-800",
  indigo: "hover:bg-indigo-600",
  emerald: "hover:bg-emerald-600",
  rose: "hover:bg-rose-600",
};

const navItems = [
  { href: "/admin-view", label: "Dashboard", icon: FaHome },
  { href: "/admin-view/resumes", label: "Resumes", icon: FaFileAlt },
  { href: "/admin-view/templates", label: "Templates", icon: FaPalette },
  { href: "/admin-view/users", label: "Users", icon: FaUsers },
  { href: "/admin-view/download-logs", label: "Download Logs", icon: Logs },
  {
    href: "/admin-view/download-config",
    label: "Download Config",
    icon: Columns3Cog,
  },
  { href: "/admin-view/users-usage", label: "Users Usage", icon: ChartNoAxesCombined },
  { href: "/admin-view/profile", label: "Profile", icon: UserRoundPen },
  { href: "/admin-view/plans", label: "Plans", icon: NotebookPen },
  { href: "/admin-view/subscriptions", label: "Subscriptions", icon: CalendarSync },
  { href: "/admin-view/payments", label: "Payments", icon: BadgeIndianRupee },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const {
    sidebarColor,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useTheme();
  const { logout } = useLogout();

  const bg = colorMap[sidebarColor] || colorMap.indigo;
  const hoverBg = hoverMap[sidebarColor] || hoverMap.indigo;

  // Control text fade/slide timing relative to width transition
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [sidebarCollapsed]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`sticky top-0 z-30 hidden h-screen flex-col border-r border-white/10 md:flex ${bg} text-white transition-[width] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 px-4">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              opacity: sidebarCollapsed ? 0 : 1,
              transform: sidebarCollapsed
                ? "translateX(-10px)"
                : "translateX(0)",
            }}
          >
            {/* <Link
              href="/"
              className="font-semibold tracking-wide whitespace-nowrap transition-opacity hover:opacity-80"
            >
              Resume Admin
            </Link> */}
            <Link href="/" className={`header-logo block w-full py-5 lg:py-2 font-semibold tracking-wide whitespace-nowrap transition-opacity hover:opacity-80`}>
              <div className="text-2xl font-bold">
                <div className="flex items-center">
                  <SiCodecrafters className="text-white dark:text-white mr-2 h-6 w-6" />
                  <span className="text-white dark:text-white">Code</span>
                  <span className="text-white dark:text-white ml-1">
                    {" "}
                    Chisel
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <button
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded-md p-2 hover:bg-white/10"
          >
            <FaBars />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="no-scrollbar flex flex-1 flex-col space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group relative m-0 flex items-center gap-3 border-b border-white/10 px-3 py-2 transition-colors duration-200 ${hoverBg}`}
              >
                {/* Icon container */}
                <div
                  className={`flex shrink-0 items-center justify-center transition-all duration-300 ease-in-out ${
                    sidebarCollapsed
                      ? "h-10 w-10 rounded-lg"
                      : "h-10 w-10 rounded-md"
                  } ${active ? "bg-white/15" : "bg-transparent"}`}
                >
                  <Icon className="text-lg" />
                </div>

                {/* Label */}
                <div
                  className={`origin-left whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    sidebarCollapsed
                      ? "pointer-events-none translate-x-[-10px] opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  <span>{label}</span>
                </div>

                {/* Tooltip */}
                {sidebarCollapsed && (
                  <div className="absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="relative rounded bg-gray-900 px-2 py-1 text-sm whitespace-nowrap text-white">
                      <div className="absolute top-1/2 left-[-6px] h-0 w-0 -translate-y-1/2 border-t-3 border-r-3 border-b-3 border-t-transparent border-r-gray-900 border-b-transparent"></div>
                      {label}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10">
          {/* Settings */}
          <Link
            href="/admin-view/settings"
            className={`group relative flex items-center gap-3 px-3 py-2 ${hoverBg}`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                pathname === "/admin-view/settings" ? "bg-white/15" : ""
              }`}
            >
              <FaCog className="text-lg" />
            </div>

            {!sidebarCollapsed && (
              <span className="whitespace-nowrap">Settings</span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={() => logout("admin")}
            className={`group relative flex w-full items-center gap-3 border-t border-white/10 px-3 py-2 text-left ${hoverBg}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-600/40">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 3h4v18h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            </div>

            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 transform flex-col transition-transform duration-300 md:hidden ${bg} text-white ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 px-4">
          {/* <span className="font-semibold tracking-wide">Resume Admin</span> */}
          <Link href="/" className={`header-logo block w-full py-5 lg:py-2 font-semibold tracking-wide whitespace-nowrap transition-opacity hover:opacity-80`}>
              <div className="text-2xl font-bold">
                <div className="flex items-center">
                  <SiCodecrafters className="text-white dark:text-white mr-2 h-6 w-6" />
                  <span className="text-white dark:text-white">Code</span>
                  <span className="text-white dark:text-white ml-1">
                    {" "}
                    Chisel
                  </span>
                </div>
              </div>
            </Link>
          <button
            aria-label="Close sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-md p-2 hover:bg-white/10"
          >
            <FaBars />
          </button>
        </div>
        <nav className="no-scrollbar flex flex-1 flex-col space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group relative m-0 flex items-center gap-3 border-b border-white/10 px-3 py-2 transition-colors`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${
                    false ? "bg-white/15" : "bg-transparent"
                  } ${active ? "bg-white/15" : "bg-transparent"}`}
                >
                  <Icon className="text-lg" />
                </div>

                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10">
          <Link
            href="/admin-view/settings"
            className="flex items-center gap-4 border-b border-white/10 p-4"
          >
            <FaCog className="text-xl" />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => logout("admin")}
            className="flex w-full items-center gap-3 p-4 text-left"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
