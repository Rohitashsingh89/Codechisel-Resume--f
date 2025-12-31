"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { SiCodecrafters } from "react-icons/si";
import PrimaryLink from "@/components/Common/ui/PrimaryLink";
import { resumeMenuData } from "./menuData";

const ResumeNavbar = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark py-4 shadow-sticky fixed z-9999 bg-white/80 backdrop-blur-xs transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-0 pl-4 sm:px-4 sm:pl-0 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <div className="text-2xl font-bold">
                  <div className="flex items-center">
                    <SiCodecrafters className="text-primary dark:text-primary mr-2 h-6 w-6" />
                    <span className="text-black dark:text-white">Code</span>
                    <span className="text-primary dark:text-primary ml-1">
                      {" "}
                      Chisel
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Menu next to logo */}
            <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:space-x-6 px-4">
              {resumeMenuData.map((menuItem, idx) => (
                <Link
                  key={idx}
                  href={menuItem.path}
                  className={`text-sm font-medium ${
                    usePathName === menuItem.path
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  }`}
                >
                  {menuItem.title}
                </Link>
              ))}
            </nav>
            {/* Right: Customize Design + Avatar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 rounded-sm border border-gray-800 bg-gray-300 px-6 py-2 text-gray-300 hover:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-900"
                >
                  <span>🎨 Customize Design</span>
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="ring-opacity-5 absolute right-0 mt-1 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black">
                    <ul className="py-1 text-sm text-gray-300">
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-700">
                        Option 1
                      </li>
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-700">
                        Option 2
                      </li>
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-700">
                        Option 3
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* User avatar */}
              <div>
                <img
                  src="/images/hero/user.png"
                  alt="User avatar"
                  className="h-10 w-10 rounded-full border-2 border-indigo-500"
                />
              </div>

              <ThemeToggler />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ResumeNavbar;
