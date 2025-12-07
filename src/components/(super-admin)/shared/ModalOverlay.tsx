"use client";
import { useEffect, useRef } from "react";
import { XIcon } from "lucide-react";

interface ModalOverlayProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ModalOverlay({ isOpen, title, onClose, children, className = "" }: ModalOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 backdrop-blur-sm sm:p-4">
      <div ref={modalRef} className={`w-full max-w-md rounded-xl bg-white/90 px-3 py-6 shadow-xl backdrop-blur-xl sm:px-6 dark:bg-gray-900/80 ${className}`}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
