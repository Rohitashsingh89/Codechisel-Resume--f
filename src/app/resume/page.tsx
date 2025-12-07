// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ResumePreview, { ResumeShape } from "@/components/resume/ResumePreview";
// import { apiFetch } from "@/lib/api";
// import TemplateSelector from "@/components/resume/TemplateSelector";
// import SectionOrder from "@/components/resume/SectionOrder";

// function isEmail(v: string) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// }
// function isPhone10(v: string) {
//   return /^\d{10}$/.test(v);
// }

// app/resume/page.tsx — Server Component
// import BuilderClient from '@/components/resume/BuilderClient';
// import { notFound } from 'next/navigation';

// export default async function ResumePage({
//   searchParams,
// }: {
//   searchParams: { id?: string };
// }) {
//   const id = searchParams?.id;

//   if (!id) return notFound();

//   return <BuilderClient id={id} />;
// }


// import BuilderClient from "@/components/resume/BuilderClient";
// import { redirect } from "next/navigation";

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{ id?: string | string[] }>;
// }) {
//   // 🔹 yaha await zaroori hai
//   const sp = await searchParams;
//   const idParam = sp?.id;

//   const id = Array.isArray(idParam) ? idParam[0] : idParam;

//   if (!id) redirect("/user-dashboard");

//   return <BuilderClient id={id} />;
// }

import Dashboard from "@/components/(resumes)/resume/dashboard/Dashboard";
import MaintenanceBanner from "@/components/(resumes)/resume/dashboard/maintenance/MaintenanceBanner";

export default function DashboardPage() {
  return (
    <>
      <section className="min-h-screen bg-gray-50 py-30 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <div className="container mx-auto grid grid-cols-1 gap-4 bg-white dark:bg-gray-950">
          <MaintenanceBanner />
          <Dashboard />
        </div>
      </section>
    </>
  );
}



// export default function BuilderPage() {
//   const router = useRouter();
//   const id = useSearchParams().get("id");

//   const [templateType, setTemplateType] = useState<"classic" | "minimal">(
//     "classic",
//   );
//   const [data, setData] = useState<ResumeShape>({
//     personal: { fullName: "", designation: "", summary: "" },
//     contact: {
//       address: "",
//       email: "",
//       phone: "",
//       linkedin: "",
//       github: "",
//       website: "",
//     },
//     experience: [],
//     education: [],
//     skills: [],
//     projects: [],
//     certifications: [],
//     additional: { languages: [], interests: [] },
//     order: [
//       "personal",
//       "contact",
//       "experience",
//       "education",
//       "skills",
//       "projects",
//       "certifications",
//       "additional",
//     ],
//   });
//   const [step, setStep] = useState(0);
//   const steps = [
//     "personal",
//     "contact",
//     "experience",
//     "education",
//     "skills",
//     "projects",
//     "certifications",
//     "additional",
//   ] as const;

//   useEffect(() => {
//     if (!id) return;

//     (async () => {
//       try {
//         const res = await apiFetch<{ item: any }>(`/v1/resumes/${id}`, {
//           method: "GET",
//         });

//         const it = res.item;
//         setTemplateType(it.templateType || "classic");
//         setData((prev) => ({ ...prev, ...(it.resumeData || prev) }));
//       } catch (e) {
//         console.error("Error loading resume:", e);
//       }
//     })();
//   }, [id]);

//   // Completion % for Preview
//   const completion = useMemo(() => {
//     let total = 0,
//       filled = 0;
//     // Required in Personal
//     total += 3;
//     filled += Number(Boolean(data.personal.fullName.trim()));
//     filled += Number(Boolean(data.personal.designation.trim()));
//     filled += Number(Boolean(data.personal.summary.trim()));
//     // Contact: email, phone count for progress
//     total += 2;
//     filled += Number(isEmail(data.contact.email));
//     filled += Number(isPhone10(data.contact.phone));
//     // Simple signals from other sections
//     total += 4;
//     filled += Number(data.experience.length > 0);
//     filled += Number(data.education.length > 0);
//     filled += Number(data.skills.length > 0);
//     filled += Number(data.projects.length > 0);
//     return total ? (filled / total) * 100 : 0;
//   }, [data]);

//   const save = async (exit?: boolean) => {
//     if (!id) return;
//     await apiFetch(`/v1/resumes/${id}`, {
//       method: "PUT",
//       //   headers: { ...getAuthHeaders() },
//       body: JSON.stringify({ templateType, resumeData: data }),
//     });
//     if (exit) router.push("/dashboard");
//   };

//   // STEP VALIDATION
//   const canProceed = () => {
//     const key = steps[step];
//     if (key === "personal") {
//       return Boolean(
//         data.personal.fullName &&
//           data.personal.designation &&
//           data.personal.summary,
//       );
//     }
//     if (key === "contact") {
//       return isEmail(data.contact.email) && isPhone10(data.contact.phone);
//     }
//     return true;
//   };

//   // UI per step (fields)
//   const StepFields = () => {
//     const key = steps[step];
//     switch (key) {
//       case "personal":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Personal Information</h3>
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="Full Name"
//               value={data.personal.fullName}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   personal: { ...data.personal, fullName: e.target.value },
//                 })
//               }
//             />
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="Designation"
//               value={data.personal.designation}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   personal: { ...data.personal, designation: e.target.value },
//                 })
//               }
//             />
//             <textarea
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               rows={3}
//               placeholder="Summary"
//               value={data.personal.summary}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   personal: { ...data.personal, summary: e.target.value },
//                 })
//               }
//             />
//             {!data.personal.fullName && (
//               <div className="text-sm text-red-600">Full Name is required</div>
//             )}
//             {!data.personal.designation && (
//               <div className="text-sm text-red-600">
//                 Designation is required
//               </div>
//             )}
//             {!data.personal.summary && (
//               <div className="text-sm text-red-600">Summary is required</div>
//             )}
//           </div>
//         );
//       case "contact":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Contact Information</h3>
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="Address"
//               value={data.contact.address}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   contact: { ...data.contact, address: e.target.value },
//                 })
//               }
//             />
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="Email"
//               value={data.contact.email}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   contact: { ...data.contact, email: e.target.value },
//                 })
//               }
//             />
//             {!isEmail(data.contact.email) && (
//               <div className="text-sm text-red-600">
//                 Valid email is required.
//               </div>
//             )}
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="Phone Number"
//               value={data.contact.phone}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   contact: { ...data.contact, phone: e.target.value },
//                 })
//               }
//             />
//             {!isPhone10(data.contact.phone) && (
//               <div className="text-sm text-red-600">
//                 Valid 10-digit phone number is required
//               </div>
//             )}
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="LinkedIn"
//               value={data.contact.linkedin}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   contact: { ...data.contact, linkedin: e.target.value },
//                 })
//               }
//             />
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="GitHub"
//               value={data.contact.github}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   contact: { ...data.contact, github: e.target.value },
//                 })
//               }
//             />
//             <input
//               className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//               placeholder="Portfolio / Website"
//               value={data.contact.website}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   contact: { ...data.contact, website: e.target.value },
//                 })
//               }
//             />
//           </div>
//         );
//       case "experience":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Work Experience</h3>
//             {data.experience.map((e, i) => (
//               <div key={i} className="space-y-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-900 p-3">
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Company"
//                   value={e.company}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].company = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Role"
//                   value={e.role}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].role = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="date"
//                     className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                     placeholder="Start Date"
//                     value={e.start}
//                     onChange={(ev) => {
//                       const c = [...data.experience];
//                       c[i].start = ev.target.value;
//                       setData({ ...data, experience: c });
//                     }}
//                   />
//                   <input
//                     type="date"
//                     className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                     placeholder="End Date"
//                     value={e.end}
//                     onChange={(ev) => {
//                       const c = [...data.experience];
//                       c[i].end = ev.target.value;
//                       setData({ ...data, experience: c });
//                     }}
//                   />
//                 </div>
//                 <textarea
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Description"
//                   value={e.description}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].description = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-green-500 to-emerald-500"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   experience: [
//                     ...data.experience,
//                     {
//                       company: "",
//                       role: "",
//                       start: "",
//                       end: "",
//                       description: "",
//                     },
//                   ],
//                 })
//               }
//             >
//               Add Work Experience
//             </button>
//           </div>
//         );
//       case "education":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Education</h3>
//             {data.education.map((ed, i) => (
//               <div key={i} className="space-y-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Degree"
//                   value={ed.degree}
//                   onChange={(ev) => {
//                     const c = [...data.education];
//                     c[i].degree = ev.target.value;
//                     setData({ ...data, education: c });
//                   }}
//                 />
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Institution"
//                   value={ed.institution}
//                   onChange={(ev) => {
//                     const c = [...data.education];
//                     c[i].institution = ev.target.value;
//                     setData({ ...data, education: c });
//                   }}
//                 />
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="date"
//                     className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                     placeholder="Start Date"
//                     value={ed.start}
//                     onChange={(ev) => {
//                       const c = [...data.education];
//                       c[i].start = ev.target.value;
//                       setData({ ...data, education: c });
//                     }}
//                   />
//                   <input
//                     type="date"
//                     className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                     placeholder="End Date"
//                     value={ed.end}
//                     onChange={(ev) => {
//                       const c = [...data.education];
//                       c[i].end = ev.target.value;
//                       setData({ ...data, education: c });
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   education: [
//                     ...data.education,
//                     { degree: "", institution: "", start: "", end: "" },
//                   ],
//                 })
//               }
//             >
//               Add Education
//             </button>
//           </div>
//         );
//       case "skills":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Skills</h3>
//             {data.skills.map((s, i) => (
//               <div key={i} className="grid grid-cols-5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 gap-2">
//                 <input
//                   className="col-span-3 border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Skill Name"
//                   value={s.name}
//                   onChange={(ev) => {
//                     const c = [...data.skills];
//                     c[i].name = ev.target.value;
//                     setData({ ...data, skills: c });
//                   }}
//                 />
//                 <input
//                   type="number"
//                   min={0}
//                   max={5}
//                   className="col-span-2 border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Proficiency (0-5)"
//                   value={s.level}
//                   onChange={(ev) => {
//                     const c = [...data.skills];
//                     c[i].level = Number(ev.target.value || 0);
//                     setData({ ...data, skills: c });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-amber-500 to-orange-500"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   skills: [...data.skills, { name: "", level: 0 }],
//                 })
//               }
//             >
//               Add Skill
//             </button>
//           </div>
//         );
//       case "projects":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Projects</h3>
//             {data.projects.map((p, i) => (
//               <div key={i} className="space-y-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Project Title"
//                   value={p.title}
//                   onChange={(ev) => {
//                     const c = [...data.projects];
//                     c[i].title = ev.target.value;
//                     setData({ ...data, projects: c });
//                   }}
//                 />
//                 <textarea
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Description"
//                   value={p.description}
//                   onChange={(ev) => {
//                     const c = [...data.projects];
//                     c[i].description = ev.target.value;
//                     setData({ ...data, projects: c });
//                   }}
//                 />
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="GitHub Link"
//                   value={p.github}
//                   onChange={(ev) => {
//                     const c = [...data.projects];
//                     c[i].github = ev.target.value;
//                     setData({ ...data, projects: c });
//                   }}
//                 />
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Live Demo URL"
//                   value={p.live}
//                   onChange={(ev) => {
//                     const c = [...data.projects];
//                     c[i].live = ev.target.value;
//                     setData({ ...data, projects: c });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   projects: [
//                     ...data.projects,
//                     { title: "", description: "", github: "", live: "" },
//                   ],
//                 })
//               }
//             >
//               Add Project
//             </button>
//           </div>
//         );
//       case "certifications":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Certifications</h3>
//             {data.certifications.map((c, i) => (
//               <div key={i} className="grid grid-cols-3 gap-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Certificate Title"
//                   value={c.title}
//                   onChange={(ev) => {
//                     const arr = [...data.certifications];
//                     arr[i].title = ev.target.value;
//                     setData({ ...data, certifications: arr });
//                   }}
//                 />
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Issuer"
//                   value={c.issuer}
//                   onChange={(ev) => {
//                     const arr = [...data.certifications];
//                     arr[i].issuer = ev.target.value;
//                     setData({ ...data, certifications: arr });
//                   }}
//                 />
//                 <input
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Year"
//                   value={c.year}
//                   onChange={(ev) => {
//                     const arr = [...data.certifications];
//                     arr[i].year = ev.target.value;
//                     setData({ ...data, certifications: arr });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   certifications: [
//                     ...data.certifications,
//                     { title: "", issuer: "", year: "" },
//                   ],
//                 })
//               }
//             >
//               Add Certification
//             </button>
//           </div>
//         );
//       case "additional":
//         return (
//           <div className="space-y-3">
//             <h3 className="font-semibold">Additional Information</h3>
//             <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
//               <div className="font-medium">Languages</div>
//               {data.additional.languages.map((l, i) => (
//                 <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                   <input
//                     className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                     placeholder="Language"
//                     value={l.language}
//                     onChange={(ev) => {
//                       const arr = [...data.additional.languages];
//                       arr[i].language = ev.target.value;
//                       setData({
//                         ...data,
//                         additional: { ...data.additional, languages: arr },
//                       });
//                     }}
//                   />
//                   <input
//                     className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                     placeholder="Proficiency"
//                     value={l.proficiency}
//                     onChange={(ev) => {
//                       const arr = [...data.additional.languages];
//                       arr[i].proficiency = ev.target.value;
//                       setData({
//                         ...data,
//                         additional: { ...data.additional, languages: arr },
//                       });
//                     }}
//                   />
//                 </div>
//               ))}
//               <button
//                 className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-violet-500 to-fuchsia-500"
//                 onClick={() =>
//                   setData({
//                     ...data,
//                     additional: {
//                       ...data.additional,
//                       languages: [
//                         ...data.additional.languages,
//                         { language: "", proficiency: "" },
//                       ],
//                     },
//                   })
//                 }
//               >
//                 Add Language
//               </button>
//             </div>
//             <div>
//               <div className="font-medium">Interests</div>
//               <div className="mb-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
//               {data.additional.interests.map((it, i) => (
//                 <input
//                   key={i}
//                   className="border border-gray-300 dark:border-gray-700 dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded px-4 py-2 text-base outline-hidden transition-all duration-300 dark:focus:shadow-none"
//                   placeholder="Interest"
//                   value={it}
//                   onChange={(ev) => {
//                     const arr = [...data.additional.interests];
//                     arr[i] = ev.target.value;
//                     setData({
//                       ...data,
//                       additional: { ...data.additional, interests: arr },
//                     });
//                   }}
//                 />
//               ))}
//               </div>
//               <button
//                 className="flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-orange-500 to-red-500"
//                 onClick={() =>
//                   setData({
//                     ...data,
//                     additional: {
//                       ...data.additional,
//                       interests: [...data.additional.interests, ""],
//                     },
//                   })
//                 }
//               >
//                 Add Interest
//               </button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const goNext = async () => {
//     if (!canProceed()) return;
//     if (step < steps.length - 1) setStep(step + 1);
//   };
//   const goBack = () => setStep(Math.max(0, step - 1));
  
//   return (
//     <section className="min-h-screen bg-gray-50 py-30 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
//       <div className="container mx-auto grid grid-cols-1 gap-4 rounded bg-white p-4 shadow-sm bg-white dark:bg-gray-900">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           {/* Top strip progress */}
//           <div className="md:col-span-2">
//             <div className="h-2 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
//               <div
//                 className="h-full bg-gray-900 transition-all duration-300 dark:bg-white"
//                 style={{
//                   width: `${Math.round(((step + 1) / steps.length) * 100)}%`,
//                 }}
//               />
//             </div>
//             <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//               Step {step + 1} of {steps.length}
//             </div>
//           </div>

//           {/* Left: editor */}
//           <div className="space-y-5">
//             <TemplateSelector value={templateType} onChange={setTemplateType} />
//             <SectionOrder
//               order={data.order}
//               onChange={(next) => setData({ ...data, order: next })}
//             />
//             <div className="rounded border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
//               <StepFields />
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <button
//                   className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all text-sm"
//                   onClick={goBack}
//                   disabled={step === 0}
//                 >
//                   Back
//                 </button>

//                 {step < steps.length - 1 ? (
//                   <>
//                     <button
//                       className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-all text-sm"
//                       onClick={() => save(true)}
//                     >
//                       Save & Exit
//                     </button>
//                     <button
//                       className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg text-sm"
//                       onClick={goNext}
//                       disabled={!canProceed()}
//                     >
//                       Next
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-all text-sm"
//                       onClick={() => save(true)}
//                     >
//                       Save & Exit
//                     </button>
//                     <button
//                       className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg text-sm"
//                       onClick={() => save(false)}
//                     >
//                       Preview & Download (later)
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right: live preview with completion */}
//           <div className="overflow-auto rounded border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
//             <ResumePreview data={data} completion={completion} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
