import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Fragment } from "react";
import UserDashboardSidebar from "./UserDashboardSidebar";
import { SiCodecrafters } from "react-icons/si";

export function UserDashboardDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed inset-0 z-40 z-999999 flex overflow-hidden"
      >
        {/* FADE OVERLAY */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
        </Transition.Child>

        {/* SLIDE PANEL */}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex w-64 flex-col bg-white dark:bg-gray-900 shadow-xl">
            
            {/* HEADER INSIDE DRAWER */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <SiCodecrafters className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-bold text-black dark:text-white">
                  Code Chisel
                </span>
              </div>
              {/* CLOSE BUTTON */}
              <button
                className="p-2 rounded-full bg-white dark:bg-[#1e293b] shadow text-gray-700 dark:text-gray-200"
                onClick={onClose}
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Links */}
            <UserDashboardSidebar mobile onClose={onClose} isDrawer={true} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
