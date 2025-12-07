"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaCog,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaSun,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "@/hook/useTheme";
import { useLogout } from "@/hook/useLogout";
import { useAppSelector } from "@/hook/reduxHooks";
import { SiCodecrafters } from "react-icons/si";

export default function SuperAdminHeader() {
  const { theme, toggleTheme, setMobileSidebarOpen } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // for mobile floating search
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { logout } = useLogout();
  const { user } = useAppSelector((state) => state.auth);

  /** Close menus on outside click */
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      if (buttonRef.current?.contains(e.target as Node)) return;
      if (searchRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  /** Close menu/search on ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-300 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
      <div className="flex h-16 items-center justify-between px-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <Link href="/" className={`header-logo block w-full py-5 lg:py-2`}>
            <div className="text-2xl font-bold">
              <div className="flex items-center">
                <SiCodecrafters className="text-primary dark:text-primary h-6 w-6" />
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg bg-white/30 p-2 text-gray-800 backdrop-blur transition hover:bg-white/40 md:hidden dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
          >
            <FaBars />
          </button>

          {/* Desktop Search Box */}
          <div className="relative hidden sm:block">
            <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              className="w-56 rounded-xl border border-gray-300 bg-white/40 py-2 pr-3 pl-10 text-gray-900 placeholder-gray-500 backdrop-blur-md focus:ring-2 focus:ring-violet-500/50 focus:outline-none sm:w-72 lg:w-96 dark:border-white/10 dark:bg-black/30 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-lg bg-white/30 p-2 text-gray-800 backdrop-blur transition hover:bg-white/40 sm:hidden dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
            aria-label="Open search"
          >
            <FaSearch />
          </button>

          {/* Floating Mobile Search */}
          {searchOpen && (
            <div className="fixed top-16 left-1/2 z-50 w-[90%] -translate-x-1/2 sm:hidden">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 backdrop-blur-md transition-all focus:ring-2 focus:ring-violet-500/50 focus:outline-none dark:border-white/10 dark:bg-black/80 dark:text-gray-100 dark:placeholder-gray-400"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg bg-gray-200 p-2 text-gray-900 backdrop-blur transition hover:bg-gray-300 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* PROFILE MENU */}
          <div className="relative" ref={menuRef}>
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center rounded-full bg-gray-200 p-2 text-gray-900 backdrop-blur transition hover:bg-gray-300 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="animate-fadeIn absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-gray-900"
              >
                {/* Profile Header */}
                <div className="border-b border-gray-200 bg-white/60 px-4 py-4 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-4xl text-gray-700 dark:text-gray-300" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {user?.fullName || "Guest User"}
                      </p>
                      <p
                        className="max-w-[150px] truncate text-sm text-gray-600 dark:text-gray-400"
                        title={user?.email}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile */}
                <Link
                  href="/admin-view/profile"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-gray-800 transition hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <FaUserAlt className="text-[15px] opacity-80" />
                  <span>Profile</span>
                </Link>

                {/* Settings */}
                <Link
                  href="/admin-view/settings"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-gray-800 transition hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <FaCog className="text-[15px] opacity-80" />
                  <span>Settings</span>
                </Link>

                <hr className="border-gray-200 dark:border-white/10" />

                {/* Logout */}
                <button
                  role="menuitem"
                  onClick={() => logout("admin")}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-800 transition hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <FaSignOutAlt className="text-[15px] opacity-80" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
