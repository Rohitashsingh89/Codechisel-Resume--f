"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaFileAlt, FaPalette, FaUsers, FaBars } from "react-icons/fa";
import { useTheme } from "@/hook/useTheme";

const navItems = [
  { href: "/admin-view", icon: FaHome },
  { href: "/admin-view/resumes", icon: FaFileAlt },
  { href: "/admin-view/templates", icon: FaPalette },
  { href: "/admin-view/users", icon: FaUsers },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { setMobileSidebarOpen } = useTheme();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-between border-t border-white/10 bg-gray-900/95 px-6 backdrop-blur-md md:hidden">
      {/* Main Nav Buttons */}
      {navItems.map(({ href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex w-full flex-col items-center justify-center"
          >
            <Icon
              className={`text-xl transition-all ${
                active ? "text-white" : "text-gray-400"
              }`}
            />
          </Link>
        );
      })}

      {/* Menu Button */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="flex w-full flex-col items-center justify-center"
      >
        <FaBars className="text-2xl text-gray-300" />
      </button>
    </div>
  );
}
