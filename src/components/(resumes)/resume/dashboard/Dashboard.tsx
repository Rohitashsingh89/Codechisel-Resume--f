"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import ResumeCard from "../ResumeCard";
import CreateResumeModal from "../modal/CreateResumeModal";
import { FiPlus } from "react-icons/fi";

type Theme = {
  mode: "light" | "dark";
  color: string;
};

type Item = {
  _id: string;
  resumeName: string;
  templateType: string;
  createdAt: string;
  updatedAt: string;
  completion: number;
  theme: Theme;
};

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const res = await apiFetch<{ items: any[] }>("/v1/resumes/me");
    const sanitized = res.items.map((item) => ({
      _id: item._id,
      resumeName: item.resumeName,
      templateType: item.templateType,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      completion: item.completion ?? 0,
      theme: item.theme ?? { mode: "light", color: "#2563eb" },
    }));

    setItems(sanitized);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  return (
    <>
      {/* Top row: left title/desc, right create button */}
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            My Resumes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start building your professional resume
          </p>
        </div>
        <button
          className="dark:bg-primary mt-3 flex items-center gap-2 rounded bg-primary px-3 py-2 text-white sm:mt-0 md:px-6 dark:text-white"
          onClick={() => setOpen(true)}
        >
          <FiPlus size={18} />
          Create Resume
        </button>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "50vh" }}
        >
          <EmptyState onCreate={() => setOpen(true)} />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <ResumeCard key={i._id} {...i} />
          ))}
        </div>
      )}

      <CreateResumeModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={load}
      />
    </>
  );
}
