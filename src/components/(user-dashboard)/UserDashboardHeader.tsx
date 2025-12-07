"use client";

import Link from "next/link";
import { SiCodecrafters } from "react-icons/si";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hook/reduxHooks";
import { useLogout } from "@/hook/useLogout";
import ThemeToggler from "@/components/(landing-page)/Header/ThemeToggler";

interface HeaderProps {
  onDrawerOpen?: () => void;
  isMobile?: boolean;
}

export default function UserDashboardHeader({
  onDrawerOpen,
  isMobile,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAppSelector((state) => state.auth);
  const { logout } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow-sm transition-colors duration-300 sm:px-6 sm:py-3 md:px-8 md:py-1 lg:px-12 lg:py-1 ${
        scrolled
          ? "bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      {/* Left: Menu icon + Logo */}
      <div className="flex items-center gap-3">
        {isMobile && onDrawerOpen && (
          <button
            aria-label="Open sidebar"
            className="text-dark rounded-lg border border-gray-300 bg-transparent p-2 shadow dark:border-gray-800 dark:text-white"
            onClick={onDrawerOpen}
          >
            <HiOutlineMenuAlt3 className="h-6 w-6" />
          </button>
        )}

        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold">
            <div className="flex items-center">
              <SiCodecrafters className="text-primary dark:text-primary mr-2 h-6 w-6" />
              <span className="text-black dark:text-white hidden sm:block">Code</span>
              <span className="text-primary dark:text-primary ml-1 hidden sm:block">
                {" "}
                Chisel
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Center / Back link */}
      <div>
        <Link
          href="/"
          className="text-primary dark:text-primary text-xs font-semibold hover:underline"
        >
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to site</span>
        </Link>
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-1 sm:gap-3">
        <span className="hidden text-sm font-medium text-gray-700 md:inline dark:text-gray-200">
          {user?.email || "User"}
        </span>
        <div className="bg-primary dark:bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white">
          {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
        </div>
        <button
          onClick={() => logout("user")}
          className="hidden text-sm font-medium text-red-600 transition-colors duration-200 hover:text-red-700 hover:underline disabled:opacity-50 sm:inline"
          title="Logout"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
        <button
          onClick={() => logout("user")}
          className="rounded-full p-1 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 sm:hidden"
          title="Logout"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
        <div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
