"use client";

import { apiFetch } from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiEdit } from "react-icons/fi";
import { GoDownload } from "react-icons/go";
import { useRouter } from "next/navigation";
import ThemeModal from "./modal/ThemeModal";
import { useResumeBuilder } from "@/hook/useResumeBuilder";
import PreviewModal from "./modal/PreviewModal";
import { formatDate, updateField } from "@/utils/apiUtility";
import TextInput from "./inputs/TextInput";

const ResumeHeader = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState("Untitled Resume");
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [lastChangedAt, setLastChangedAt] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const router = useRouter();

  // consume context
  const {
    templateType,
    setTemplateType,
    dirty,
    completion,
    data,
    theme,
    setTheme,
    lastChangeTs,
    setData,
  } = useResumeBuilder();
  const [color, setColor] = useState(theme.color);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setColor(theme.color);
  }, [theme.color]);

  const onPickColor = (hex: string) => {
    setColor(hex);
    const next = { ...theme, color: hex };
    setTheme(next);

    // clear previous debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        await updateField(id, { theme: next });
      } catch (e) {
        toast.error("Failed to update theme color");
      }
    }, 500);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await apiFetch<{ item: any }>(`/v1/resumes/${id}`);
        const it = res.item;
        setHeading(it.resumeName || "Untitled Resume");
        if (it.templateType) setTemplateType(it.templateType);
      } catch (e) {
        console.error("Error loading resume:", e);
        toast.error("Failed to load resume");
      }
    })();
  }, [id, setTemplateType]);

  useEffect(() => {
    if (lastChangeTs) {
      setLastChangedAt(lastChangeTs);
    }
  }, [lastChangeTs]);

  // const updateField = async (
  //   field: Partial<{ resumeName: string; templateType: string }>,
  // ) => {
  //   try {
  //     await apiFetch(`/v1/resumes/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify(field),
  //     });
  //     toast.success("Updated successfully!");
  //   } catch (e) {
  //     console.error("Update error:", e);
  //     toast.error("Update failed");
  //   }
  // };

  const handleCheckClick = async () => {
    setIsEditing(false);

    const safeTitle = heading.trim() || "Untitled Resume";
    setHeading(safeTitle);

    setData({ resumeName: safeTitle });

    try {
      await updateField(id, { resumeName: safeTitle });
      // toast.success("Title updated");
    } catch (e) {
      toast.error("Failed to update title");
      // console.error(e);
    }
  };

  const handleThemeSelect = async (slug: string) => {
    setTemplateType(slug);
    setThemeModalOpen(false);

    setData({ selectedTemplateSlug: slug });
    try {
      await updateField(id, { templateType: slug, selectedTemplateSlug: slug });
      toast.success("Theme updated");
    } catch (e) {
      toast.error("Failed to update theme");
      console.error(e);
    }
  };

  return (
    <>
      <div className="relative z-10 mb-1 flex flex-col items-start justify-between gap-4 rounded border border-violet-100 bg-gradient-to-r from-white to-violet-50 px-6 py-4 shadow-sm sm:flex-row sm:items-center dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-3">
          {isEditing ? (
            <TextInput
              required
              placeholder="Mr. Shyam"
              value={heading}
              onChange={(value) => setHeading(value)}
            />
          ) : (
            <h2 className="text-primary dark:text-primary text-lg font-bold sm:text-xl">
              {heading}
            </h2>
          )}
          {isEditing ? (
            <button
              onClick={handleCheckClick}
              className="rounded p-2 text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-500"
              aria-label="Save"
            >
              <FiCheck size={24} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded p-2 text-gray-600 dark:text-gray-300"
              aria-label="Edit"
            >
              <FiEdit size={20} />
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 rounded bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
          <span>Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => onPickColor(e.target.value)}
            className="h-6 w-6 cursor-pointer appearance-none border-0 bg-transparent p-0"
            aria-label="Theme color"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          {/* THEME */}
          <button
            onClick={() => setThemeModalOpen(true)}
            style={{ "--accent": color } as React.CSSProperties}
            className="group flex h-11 min-w-[70px] items-center justify-center gap-2 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 font-medium text-[var(--accent)] backdrop-blur-sm transition-all hover:bg-[var(--accent)]/25 dark:border-[var(--accent)]/30 dark:bg-[var(--accent)]/20 dark:text-[var(--accent)] dark:hover:bg-[var(--accent)]/30"
            title="Change Theme"
          >
            <span className="text-lg">🎨</span>
            <span className="hidden text-sm lg:inline">Theme</span>
          </button>

          {/* DELETE */}
          <button
            onClick={() => setShowDeleteConfirmModal(true)}
            className="group flex h-11 min-w-[70px] items-center justify-center gap-2 rounded border border-red-300/40 bg-red-100/60 px-4 font-medium text-red-700 backdrop-blur-sm transition-all hover:bg-red-200/70 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-800/50"
            title="Delete Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1={10} x2={10} y1={11} y2={17} />
              <line x1={14} x2={14} y1={11} y2={17} />
            </svg>

            <span className="hidden text-sm lg:inline">Delete</span>
          </button>

          {/* PREVIEW */}
          <button
            onClick={() => setPreviewOpen(true)}
            className="group flex h-11 min-w-[70px] items-center justify-center gap-2 rounded border border-emerald-300/40 bg-emerald-100/60 px-4 font-medium text-emerald-700 backdrop-blur-sm transition-all hover:bg-emerald-200/70 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
            title="Preview Resume"
          >
            <GoDownload className="text-lg" />
            <span className="hidden text-sm lg:inline">Preview</span>
          </button>
        </div>
      </div>

      {/* Subtle status row */}
      <div className="flex items-center justify-between">
        {/* STATUS LEFT */}
        <div className="rounded border border-gray-300/30 bg-white/40 px-2 py-1 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
          {dirty ? (
            <span
              style={{ "--dot-color": color } as React.CSSProperties}
              className="text-[var(--dot-color)] dark:text-[var(--dot-color)]"
            >
              ● Unsaved changes…
            </span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400">
              ● All changes saved
            </span>
          )}

          {lastChangedAt && (
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              • Updated {formatDate(lastChangedAt, true)}
            </span>
          )}
        </div>

        {/* TEMPLATE RIGHT */}
        <div
          style={{ "--accent": color } as React.CSSProperties}
          className="flex items-center gap-2 rounded-xl border border-[var(--accent)]/40 bg-white/60 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-lg dark:border-[var(--accent)]/30 dark:bg-zinc-800/40"
        >
          <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-bold text-white uppercase shadow dark:bg-[var(--accent)]">
            {templateType}
          </span>

          <span className="text-xs text-gray-600 dark:text-gray-400">
            Active template
          </span>
        </div>
      </div>

      {/* Theme Modal */}
      {themeModalOpen && (
        <ThemeModal
          current={templateType}
          onClose={() => setThemeModalOpen(false)}
          onSelect={handleThemeSelect}
        />
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur dark:bg-black/70">
          <div className="w-11/12 max-w-md rounded-2xl border border-gray-300 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-zinc-900/80">
            <h2 className="text-center text-2xl font-semibold text-red-500 dark:text-red-400">
              Confirm Deletion
            </h2>
            <p className="mt-2 text-center text-sm text-gray-900 dark:text-zinc-300">
              Are you sure you want to delete this resume?
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={async () => {
                  try {
                    await apiFetch(`/v1/resumes/${id}`, { method: "DELETE" });
                    toast.success("Resume deleted", { position: "top-center" });
                    setShowDeleteConfirmModal(false);
                    router.push("/user-dashboard");
                  } catch (e) {
                    toast.error("Failed to delete resume", {
                      position: "top-center",
                    });
                  }
                }}
                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="rounded-lg border border-gray-300 px-5 py-2 text-gray-900 hover:bg-zinc-700/50 hover:text-gray-100 dark:border-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        data={data}
        templateType={templateType}
        completion={completion}
        // config={config}
      />
    </>
  );
};

export default ResumeHeader;

// "use client";

// import { apiFetch } from "@/lib/api";
// import React, { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { FiCheck, FiEdit } from "react-icons/fi";
// import { GoDownload } from "react-icons/go";
// import { useRouter } from "next/navigation";
// import ThemeModal from "./modal/ThemeModal";
// import { useResumeBuilder } from "@/hook/useResumeBuilder";
// import PreviewModal from "./modal/PreviewModal";
// import { formatDate, updateField } from "@/utils/apiUtility";
// import TextInput from "./inputs/TextInput";
// import { ChevronDown, Logs } from "lucide-react";
// import { PiExportBold } from "react-icons/pi";

// const ResumeHeader = ({ id }: { id: string }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [heading, setHeading] = useState("Untitled Resume");
//   const [themeModalOpen, setThemeModalOpen] = useState(false);
//   const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
//   const [lastChangedAt, setLastChangedAt] = useState<number | null>(null);
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const router = useRouter();

//   // consume context
//   const {
//     templateType,
//     setTemplateType,
//     dirty,
//     completion,
//     data,
//     theme,
//     setTheme,
//     lastChangeTs,
//     setData,
//   } = useResumeBuilder();
//   const [color, setColor] = useState(theme.color);
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     setColor(theme.color);
//   }, [theme.color]);

//   const onPickColor = (hex: string) => {
//     setColor(hex);
//     const next = { ...theme, color: hex };
//     setTheme(next);

//     // clear previous debounce
//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(async () => {
//       try {
//         await updateField(id, { theme: next });
//       } catch (e) {
//         toast.error("Failed to update theme color");
//       }
//     }, 500);
//   };

//   useEffect(() => {
//     if (!id) return;
//     (async () => {
//       try {
//         const res = await apiFetch<{ item: any }>(`/v1/resumes/${id}`);
//         const it = res.item;
//         setHeading(it.resumeName || "Untitled Resume");
//         if (it.templateType) setTemplateType(it.templateType);
//       } catch (e) {
//         console.error("Error loading resume:", e);
//         toast.error("Failed to load resume");
//       }
//     })();
//   }, [id, setTemplateType]);

//   useEffect(() => {
//     if (lastChangeTs) {
//       setLastChangedAt(lastChangeTs);
//     }
//   }, [lastChangeTs]);

//   // const updateField = async (
//   //   field: Partial<{ resumeName: string; templateType: string }>,
//   // ) => {
//   //   try {
//   //     await apiFetch(`/v1/resumes/${id}`, {
//   //       method: "PUT",
//   //       body: JSON.stringify(field),
//   //     });
//   //     toast.success("Updated successfully!");
//   //   } catch (e) {
//   //     console.error("Update error:", e);
//   //     toast.error("Update failed");
//   //   }
//   // };

//   const handleCheckClick = async () => {
//     setIsEditing(false);

//     const safeTitle = heading.trim() || "Untitled Resume";
//     setHeading(safeTitle);

//     setData({ resumeName: safeTitle });

//     try {
//       await updateField(id, { resumeName: safeTitle });
//       // toast.success("Title updated");
//     } catch (e) {
//       toast.error("Failed to update title");
//       // console.error(e);
//     }
//   };

//   const handleThemeSelect = async (slug: string) => {
//     setTemplateType(slug);
//     setThemeModalOpen(false);

//     setData({ selectedTemplateSlug: slug });
//     try {
//       await updateField(id, { templateType: slug, selectedTemplateSlug: slug });
//       toast.success("Theme updated");
//     } catch (e) {
//       toast.error("Failed to update theme");
//       console.error(e);
//     }
//   };

//   return (
//     <>
//       <div className="relative z-10 mb-1 flex flex-col items-start justify-between gap-4 rounded border border-violet-100 bg-gradient-to-r from-white to-violet-50 px-5 py-3 shadow-sm sm:flex-row sm:items-center dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
//         <div className="flex w-full items-center justify-between rounded-md">
//           {/* Left side */}
//           <div className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
//             <Logs />
//             <span className="font-semibold">Sections</span>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-2">
//             <button
//               type="button"
//               className="flex h-10 items-center space-x-1 rounded-sm bg-[#3F4788] px-5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             >
//               <PiExportBold className="h-5 w-5" />
//               <span>Export Resume</span>
//             </button>
//             <button
//               type="button"
//               className="flex h-10 items-center justify-center rounded-sm bg-gray-200 px-4 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-[#232847] dark:text-gray-300"
//             >
//               <ChevronDown className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//         {/* <div className="flex items-center gap-3">
//           {isEditing ? (
//             <TextInput
//               required
//               placeholder="Mr. Shyam"
//               value={heading}
//               onChange={(value) => setHeading(value)}
//             />
//           ) : (
//             <h2 className="text-primary dark:text-primary text-lg font-bold sm:text-xl">
//               {heading}
//             </h2>
//           )}
//           {isEditing ? (
//             <button
//               onClick={handleCheckClick}
//               className="rounded p-2 text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-500"
//               aria-label="Save"
//             >
//               <FiCheck size={24} />
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="rounded p-2 text-gray-600 dark:text-gray-300"
//               aria-label="Edit"
//             >
//               <FiEdit size={20} />
//             </button>
//           )}
//         </div> */}

//         {/* <label className="flex items-center gap-2 rounded bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
//           <span>Color</span>
//           <input
//             type="color"
//             value={color}
//             onChange={(e) => onPickColor(e.target.value)}
//             className="h-6 w-6 cursor-pointer appearance-none border-0 bg-transparent p-0"
//             aria-label="Theme color"
//           />
//         </label> */}

//         {/* <div className="flex flex-wrap items-center gap-3">
//           <button
//             onClick={() => setThemeModalOpen(true)}
//             style={{ "--accent": color } as React.CSSProperties}
//             className="group flex h-11 min-w-[70px] items-center justify-center gap-2 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 font-medium text-[var(--accent)] backdrop-blur-sm transition-all hover:bg-[var(--accent)]/25 dark:border-[var(--accent)]/30 dark:bg-[var(--accent)]/20 dark:text-[var(--accent)] dark:hover:bg-[var(--accent)]/30"
//             title="Change Theme"
//           >
//             <span className="text-lg">🎨</span>
//             <span className="hidden text-sm lg:inline">Theme</span>
//           </button>

//           <button
//             onClick={() => setShowDeleteConfirmModal(true)}
//             className="group flex h-11 min-w-[70px] items-center justify-center gap-2 rounded border border-red-300/40 bg-red-100/60 px-4 font-medium text-red-700 backdrop-blur-sm transition-all hover:bg-red-200/70 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-800/50"
//             title="Delete Resume"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={18}
//               height={18}
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-trash2"
//             >
//               <path d="M3 6h18" />
//               <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//               <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//               <line x1={10} x2={10} y1={11} y2={17} />
//               <line x1={14} x2={14} y1={11} y2={17} />
//             </svg>

//             <span className="hidden text-sm lg:inline">Delete</span>
//           </button>

//           <button
//             onClick={() => setPreviewOpen(true)}
//             className="group flex h-11 min-w-[70px] items-center justify-center gap-2 rounded border border-emerald-300/40 bg-emerald-100/60 px-4 font-medium text-emerald-700 backdrop-blur-sm transition-all hover:bg-emerald-200/70 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
//             title="Preview Resume"
//           >
//             <GoDownload className="text-lg" />
//             <span className="hidden text-sm lg:inline">Preview</span>
//           </button>
//         </div> */}
//       </div>

//       {/* Subtle status row */}
//       <div className="flex items-center justify-between">
//         {/* STATUS LEFT */}
//         <div className="rounded border border-gray-300/30 bg-white/40 px-2 py-1 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
//           {dirty ? (
//             <span
//               style={{ "--dot-color": color } as React.CSSProperties}
//               className="text-[var(--dot-color)] dark:text-[var(--dot-color)]"
//             >
//               ● Unsaved changes…
//             </span>
//           ) : (
//             <span className="text-emerald-600 dark:text-emerald-400">
//               ● All changes saved
//             </span>
//           )}

//           {lastChangedAt && (
//             <span className="ml-1 text-gray-500 dark:text-gray-400">
//               • Updated {formatDate(lastChangedAt, true)}
//             </span>
//           )}
//         </div>

//         {/* TEMPLATE RIGHT */}
//         <div
//           style={{ "--accent": color } as React.CSSProperties}
//           className="flex items-center gap-2 rounded-xl border border-[var(--accent)]/40 bg-white/60 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-lg dark:border-[var(--accent)]/30 dark:bg-zinc-800/40"
//         >
//           <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-bold text-white uppercase shadow dark:bg-[var(--accent)]">
//             {templateType}
//           </span>

//           <span className="text-xs text-gray-600 dark:text-gray-400">
//             Active template
//           </span>
//         </div>
//       </div>

//       {/* Theme Modal */}
//       {themeModalOpen && (
//         <ThemeModal
//           current={templateType}
//           onClose={() => setThemeModalOpen(false)}
//           onSelect={handleThemeSelect}
//         />
//       )}

//       {showDeleteConfirmModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur dark:bg-black/70">
//           <div className="w-11/12 max-w-md rounded-2xl border border-gray-300 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-zinc-900/80">
//             <h2 className="text-center text-2xl font-semibold text-red-500 dark:text-red-400">
//               Confirm Deletion
//             </h2>
//             <p className="mt-2 text-center text-sm text-gray-900 dark:text-zinc-300">
//               Are you sure you want to delete this resume?
//             </p>
//             <div className="mt-6 flex justify-center gap-3">
//               <button
//                 onClick={async () => {
//                   try {
//                     await apiFetch(`/v1/resumes/${id}`, { method: "DELETE" });
//                     toast.success("Resume deleted", { position: "top-center" });
//                     setShowDeleteConfirmModal(false);
//                     router.push("/user-dashboard");
//                   } catch (e) {
//                     toast.error("Failed to delete resume", {
//                       position: "top-center",
//                     });
//                   }
//                 }}
//                 className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setShowDeleteConfirmModal(false)}
//                 className="rounded-lg border border-gray-300 px-5 py-2 text-gray-900 hover:bg-zinc-700/50 hover:text-gray-100 dark:border-gray-700 dark:text-gray-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <PreviewModal
//         open={previewOpen}
//         onClose={() => setPreviewOpen(false)}
//         data={data}
//         templateType={templateType}
//         completion={completion}
//         // config={config}
//       />
//     </>
//   );
// };

// export default ResumeHeader;
