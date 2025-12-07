// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import TemplateSelector from "@/components/resume/TemplateSelector";
// import dynamic from "next/dynamic";
// import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
// import { IoSaveOutline } from "react-icons/io5";
// import { MdOutlineFileDownload } from "react-icons/md";
// import ResumeHeader from "./ResumeHeader";
// import { useResumeBuilder } from "@/hook/ResumeBuilderContext";
// import { LuPlus } from "react-icons/lu";
// import ResumePreview from "./ResumePreview";
// import { ResumeShape } from "@/types/resumeTemplate";
// import PreviewModal from "./modal/PreviewModal";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const SectionOrder = dynamic(() => import("@/components/resume/SectionOrder"), {
//   ssr: false,
// });

// function isEmail(v: string) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// }
// function isPhone10(v: string) {
//   return /^\d{10}$/.test(v);
// }
// // Hoisted child so its type is stable across renders
// function StepFields({
//   step,
//   steps,
//   data,
//   setData,
// }: {
//   step: number;
//   steps: readonly string[];
//   data: ResumeShape;
//   setData: React.Dispatch<React.SetStateAction<ResumeShape>>;
// }) {
//   const key = steps[step];
//   switch (key) {
//     case "personal":
//       return (
//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold">Personal Information</h3>

//           {/* Full Name */}
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             {!data.personal.fullName && (
//               <div className="text-sm text-red-600">Full Name is required</div>
//             )}
//             <input
//               className="focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
//               placeholder="John Doe"
//               value={data.personal.fullName}
//               onChange={(e) =>
//                 setData((prev) => ({
//                   ...prev,
//                   personal: { ...prev.personal, fullName: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Designation */}
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Designation <span className="text-red-500">*</span>
//             </label>
//             {!data.personal.designation && (
//               <div className="text-sm text-red-600">
//                 Designation is required
//               </div>
//             )}
//             <input
//               className="focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
//               placeholder="Frontend Developer"
//               value={data.personal.designation}
//               onChange={(e) =>
//                 setData((prev) => ({
//                   ...prev,
//                   personal: { ...prev.personal, designation: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Summary */}
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Summary <span className="text-red-500">*</span>
//             </label>
//             {!data.personal.summary && (
//               <div className="text-sm text-red-600">Summary is required</div>
//             )}
//             <textarea
//               rows={3}
//               className="focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
//               placeholder="Brief professional summary..."
//               value={data.personal.summary}
//               onChange={(e) =>
//                 setData((prev) => ({
//                   ...prev,
//                   personal: { ...prev.personal, summary: e.target.value },
//                 }))
//               }
//             />
//           </div>
//         </div>
//       );
//     case "contact":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Contact Information</h3>
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Address"
//             value={data.contact.address}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, address: e.target.value },
//               }))
//             }
//           />
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Email"
//             value={data.contact.email}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, email: e.target.value },
//               }))
//             }
//           />
//           {!isEmail(data.contact.email) && (
//             <div className="text-sm text-red-600">Valid email is required.</div>
//           )}
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Phone Number"
//             value={data.contact.phone}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, phone: e.target.value },
//               }))
//             }
//           />
//           {!isPhone10(data.contact.phone) && (
//             <div className="text-sm text-red-600">
//               Valid 10-digit phone number is required
//             </div>
//           )}
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="LinkedIn"
//             value={data.contact.linkedin}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, linkedin: e.target.value },
//               }))
//             }
//           />
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="GitHub"
//             value={data.contact.github}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, github: e.target.value },
//               }))
//             }
//           />
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Portfolio / Website"
//             value={data.contact.website}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, website: e.target.value },
//               }))
//             }
//           />
//         </div>
//       );
//     case "experience":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Work Experience</h3>
//           {data.experience.map((e, i) => (
//             <div
//               key={i}
//               className="space-y-2 rounded border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Company"
//                 value={e.company}
//                 onChange={(ev) => {
//                   const c = [...data.experience];
//                   c[i].company = ev.target.value;
//                   setData({ ...data, experience: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Role"
//                 value={e.role}
//                 onChange={(ev) => {
//                   const c = [...data.experience];
//                   c[i].role = ev.target.value;
//                   setData({ ...data, experience: c });
//                 }}
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Start Date"
//                   value={e.start}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].start = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="End Date"
//                   value={e.end}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].end = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//               </div>
//               <textarea
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Description"
//                 value={e.description}
//                 onChange={(ev) => {
//                   const c = [...data.experience];
//                   c[i].description = ev.target.value;
//                   setData({ ...data, experience: c });
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 experience: [
//                   ...data.experience,
//                   {
//                     company: "",
//                     role: "",
//                     start: "",
//                     end: "",
//                     description: "",
//                   },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Work Experience
//           </button>
//         </div>
//       );
//     case "education":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Education</h3>
//           {data.education.map((ed, i) => (
//             <div
//               key={i}
//               className="space-y-2 rounded border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Degree"
//                 value={ed.degree}
//                 onChange={(ev) => {
//                   const c = [...data.education];
//                   c[i].degree = ev.target.value;
//                   setData({ ...data, education: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Institution"
//                 value={ed.institution}
//                 onChange={(ev) => {
//                   const c = [...data.education];
//                   c[i].institution = ev.target.value;
//                   setData({ ...data, education: c });
//                 }}
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Start Date"
//                   value={ed.start}
//                   onChange={(ev) => {
//                     const c = [...data.education];
//                     c[i].start = ev.target.value;
//                     setData({ ...data, education: c });
//                   }}
//                 />
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="End Date"
//                   value={ed.end}
//                   onChange={(ev) => {
//                     const c = [...data.education];
//                     c[i].end = ev.target.value;
//                     setData({ ...data, education: c });
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 education: [
//                   ...data.education,
//                   { degree: "", institution: "", start: "", end: "" },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Education
//           </button>
//         </div>
//       );
//     case "skills":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Skills</h3>
//           {data.skills.map((s, i) => (
//             <div
//               key={i}
//               className="border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 rounded-full bg-red-50 px-2 py-2 font-semibold text-red-600 transition-all hover:bg-red-500 hover:text-white dark:bg-transparent duration-500 dark:hover:bg-red-500"
//                   onClick={() => {
//                     const c = data.skills.filter((_, idx) => idx !== i);
//                     setData({ ...data, skills: c });
//                   }}
//                 >
//                   <RiDeleteBin6Line />
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-4 pb-5">
//                 <div>
//                   <label className="block text-sm pb-4 font-medium text-gray-700 dark:text-gray-300">
//                     Skill Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary col-span-3 w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                     placeholder="Skill Name"
//                     value={s.name}
//                     onChange={(ev) => {
//                       const c = [...data.skills];
//                       c[i].name = ev.target.value;
//                       setData({ ...data, skills: c });
//                     }}
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="">
//                     <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     {[1, 2, 3, 4, 5].map((lvl) => (
//                       <button
//                         key={lvl}
//                         type="button"
//                         onClick={() => {
//                           const c = [...data.skills];
//                           c[i].level = lvl;
//                           setData({ ...data, skills: c });
//                         }}
//                         className={`h-4 w-6 mx-1 rounded-md border transition-all duration-200 ${
//                           lvl <= s.level
//                             ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
//                             : "border-gray-400 bg-gray-200 dark:bg-gray-700"
//                         } hover:scale-105`}
//                       />
//                     ))}
//                   </div>
//                   {/* <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
//                   {s.level}/5
//                 </span> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 skills: [...data.skills, { name: "", level: 0 }],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Skill
//           </button>
//         </div>
//       );
//     case "projects":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Projects</h3>
//           {data.projects.map((p, i) => (
//             <div
//               key={i}
//               className="space-y-2 rounded border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Project Title"
//                 value={p.title}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].title = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//               <textarea
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Description"
//                 value={p.description}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].description = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="GitHub Link"
//                 value={p.github}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].github = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Live Demo URL"
//                 value={p.live}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].live = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 projects: [
//                   ...data.projects,
//                   { title: "", description: "", github: "", live: "" },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Project
//           </button>
//         </div>
//       );
//     case "certifications":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Certifications</h3>
//           {data.certifications.map((c, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-3 gap-2 border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Certificate Title"
//                 value={c.title}
//                 onChange={(ev) => {
//                   const arr = [...data.certifications];
//                   arr[i].title = ev.target.value;
//                   setData({ ...data, certifications: arr });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Issuer"
//                 value={c.issuer}
//                 onChange={(ev) => {
//                   const arr = [...data.certifications];
//                   arr[i].issuer = ev.target.value;
//                   setData({ ...data, certifications: arr });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Year"
//                 value={c.year}
//                 onChange={(ev) => {
//                   const arr = [...data.certifications];
//                   arr[i].year = ev.target.value;
//                   setData({ ...data, certifications: arr });
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 certifications: [
//                   ...data.certifications,
//                   { title: "", issuer: "", year: "" },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Certification
//           </button>
//         </div>
//       );
//     case "additional":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Additional Information</h3>
//           <div className="border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
//             <div className="mb-2 font-medium">Languages</div>
//             {data.additional.languages.map((l, i) => (
//               <div key={i} className="mb-2 grid grid-cols-2 gap-2">
//                 <input
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Language"
//                   value={l.language}
//                   onChange={(ev) => {
//                     const arr = [...data.additional.languages];
//                     arr[i].language = ev.target.value;
//                     setData({
//                       ...data,
//                       additional: { ...data.additional, languages: arr },
//                     });
//                   }}
//                 />
//                 <input
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Proficiency"
//                   value={l.proficiency}
//                   onChange={(ev) => {
//                     const arr = [...data.additional.languages];
//                     arr[i].proficiency = ev.target.value;
//                     setData({
//                       ...data,
//                       additional: { ...data.additional, languages: arr },
//                     });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   additional: {
//                     ...data.additional,
//                     languages: [
//                       ...data.additional.languages,
//                       { language: "", proficiency: "" },
//                     ],
//                   },
//                 })
//               }
//             >
//               <LuPlus size={20} />
//               Add Language
//             </button>
//           </div>
//           <div>
//             <div className="mb-3 border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
//               <div className="mb-2 font-medium">Interests</div>
//               {data.additional.interests.map((it, i) => (
//                 <input
//                   key={i}
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
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
//               <button
//                 className="mt-3 flex items-center gap-3 rounded bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
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
//                 <LuPlus size={20} />
//                 Add Interest
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
// }

// export default function BuilderClient({ id }: { id: string }) {
//   const router = useRouter();
//   const {
//     templateType,
//     setTemplateType,
//     data,
//     setData,
//     step,
//     setStep,
//     steps,
//     completion,
//     canProceed,
//     save,
//   } = useResumeBuilder();
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const goNext = async () => {
//     if (!canProceed()) return;
//     await save(id);
//     if (step < steps.length - 1) setStep(step + 1);
//   };
//   const goBack = () => setStep(Math.max(0, step - 1));

//   return (
//     <>
//       <section className="min-h-screen bg-gray-50 py-24 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
//         <div className="container mx-auto grid grid-cols-1 gap-4 rounded bg-white p-4 shadow-sm dark:bg-gray-900">
//           <ResumeHeader id={id} />
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//             {/* Left editor */}
//             <div className="space-y-5 rounded border border-gray-300 px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
//               {/* Progress strip */}
//               <div className="md:col-span-2">
//                 {/* Progress Bar Container */}
//                 <div className="h-2 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
//                   <div
//                     className="h-full bg-gray-900 transition-all duration-300 dark:bg-white"
//                     title={`${completion.toFixed(0)}% completed`}
//                     style={{
//                       width:
//                         completion > 0 ? `${Math.round(completion)}%` : "2px",
//                     }}
//                   />
//                 </div>

//                 {/* Step text below */}
//                 <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//                   Step {step + 1} of {steps.length}
//                 </div>
//               </div>

//               <TemplateSelector
//                 value={templateType}
//                 onChange={setTemplateType}
//               />

//               <SectionOrder
//                 order={data.order}
//                 onChange={(next) => setData({ ...data, order: next })}
//               />

//               <div className="rounded border border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800">
//                 <StepFields
//                   step={step}
//                   steps={steps}
//                   data={data}
//                   setData={setData}
//                 />
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   <button
//                     className="flex items-center gap-2 rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200 sm:px-6 sm:py-3"
//                     onClick={goBack}
//                     disabled={step === 0}
//                   >
//                     <IoMdArrowBack size={20} />
//                     Back
//                   </button>

//                   {step < steps.length - 1 ? (
//                     <>
//                       <button
//                         className="flex items-center gap-2 rounded bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200 sm:px-6 sm:py-3"
//                         onClick={async () => {
//                           await save(id);
//                           router.push("/user-dashboard");
//                         }}
//                       >
//                         <IoSaveOutline size={20} />
//                         Save & Exit
//                       </button>
//                       <button
//                         className="flex items-center gap-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
//                         onClick={goNext}
//                         disabled={!canProceed()}
//                       >
//                         Next
//                         <IoMdArrowForward size={20} />
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="flex items-center gap-2 rounded bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200 sm:px-6 sm:py-3"
//                         onClick={async () => {
//                           await save(id);
//                           router.push("/user-dashboard");
//                         }}
//                       >
//                         <IoSaveOutline size={20} />
//                         Save & Exit
//                       </button>
//                       <button
//                         className="flex items-center gap-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
//                         // onClick={async () => {
//                         //   await save(id);
//                         //   // placeholder for future download flow
//                         // }}
//                         onClick={() => setPreviewOpen(true)}
//                       >
//                         <MdOutlineFileDownload size={20} />
//                         Preview & Download (later)
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right preview */}
//             <div className="overflow-auto rounded border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
//               <ResumePreview
//                 data={data}
//                 completion={completion}
//                 templateType={templateType}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//       <PreviewModal
//         open={previewOpen}
//         onClose={() => setPreviewOpen(false)}
//         data={data}
//         templateType={templateType}
//         completion={completion}
//       />
//     </>
//   );
// }


// *****************************************************************************

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import TemplateSelector from '@/components/resume/TemplateSelector';
// import dynamic from 'next/dynamic';
// import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
// import { IoSaveOutline } from 'react-icons/io5';
// import { MdOutlineFileDownload } from 'react-icons/md';
// import ResumeHeader from './ResumeHeader';
// import { useResumeBuilder } from '@/hook/ResumeBuilderContext';
// import { LuPlus } from 'react-icons/lu';
// import ResumePreview from './ResumePreview';
// import { ResumeShape } from '@/types/resumeTemplate';
// import PreviewModal from './modal/PreviewModal';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import ResumeResizableTwoColumn from './dnd/ResumeResizableTwoColumn';

// const SectionOrder = dynamic(() => import('@/components/resume/SectionOrder'), {
//   ssr: false,
// });


// function isEmail(v: string) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// }
// function isPhone10(v: string) {
//   return /^\d{10}$/.test(v);
// }

// function StepFields({
//   step,
//   steps,
//   data,
//   setData,
// }: {
//   step: number;
//   steps: readonly string[];
//   data: ResumeShape;
//   setData: React.Dispatch<React.SetStateAction<ResumeShape>>;
// }) {
//   const key = steps[step];
//   switch (key) {
//     case "personal":
//       return (
//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold">Personal Information</h3>

//           {/* Full Name */}
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             {!data.personal.fullName && (
//               <div className="text-sm text-red-600">Full Name is required</div>
//             )}
//             <input
//               className="focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
//               placeholder="John Doe"
//               value={data.personal.fullName}
//               onChange={(e) =>
//                 setData((prev) => ({
//                   ...prev,
//                   personal: { ...prev.personal, fullName: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Designation */}
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Designation <span className="text-red-500">*</span>
//             </label>
//             {!data.personal.designation && (
//               <div className="text-sm text-red-600">
//                 Designation is required
//               </div>
//             )}
//             <input
//               className="focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
//               placeholder="Frontend Developer"
//               value={data.personal.designation}
//               onChange={(e) =>
//                 setData((prev) => ({
//                   ...prev,
//                   personal: { ...prev.personal, designation: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Summary */}
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Summary <span className="text-red-500">*</span>
//             </label>
//             {!data.personal.summary && (
//               <div className="text-sm text-red-600">Summary is required</div>
//             )}
//             <textarea
//               rows={3}
//               className="focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
//               placeholder="Brief professional summary..."
//               value={data.personal.summary}
//               onChange={(e) =>
//                 setData((prev) => ({
//                   ...prev,
//                   personal: { ...prev.personal, summary: e.target.value },
//                 }))
//               }
//             />
//           </div>
//         </div>
//       );
//     case "contact":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Contact Information</h3>
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Address"
//             value={data.contact.address}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, address: e.target.value },
//               }))
//             }
//           />
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Email"
//             value={data.contact.email}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, email: e.target.value },
//               }))
//             }
//           />
//           {!isEmail(data.contact.email) && (
//             <div className="text-sm text-red-600">Valid email is required.</div>
//           )}
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Phone Number"
//             value={data.contact.phone}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, phone: e.target.value },
//               }))
//             }
//           />
//           {!isPhone10(data.contact.phone) && (
//             <div className="text-sm text-red-600">
//               Valid 10-digit phone number is required
//             </div>
//           )}
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="LinkedIn"
//             value={data.contact.linkedin}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, linkedin: e.target.value },
//               }))
//             }
//           />
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="GitHub"
//             value={data.contact.github}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, github: e.target.value },
//               }))
//             }
//           />
//           <input
//             className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//             placeholder="Portfolio / Website"
//             value={data.contact.website}
//             onChange={(e) =>
//               setData((prev) => ({
//                 ...prev,
//                 contact: { ...prev.contact, website: e.target.value },
//               }))
//             }
//           />
//         </div>
//       );
//     case "experience":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Work Experience</h3>
//           {data.experience.map((e, i) => (
//             <div
//               key={i}
//               className="space-y-2 rounded border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Company"
//                 value={e.company}
//                 onChange={(ev) => {
//                   const c = [...data.experience];
//                   c[i].company = ev.target.value;
//                   setData({ ...data, experience: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Role"
//                 value={e.role}
//                 onChange={(ev) => {
//                   const c = [...data.experience];
//                   c[i].role = ev.target.value;
//                   setData({ ...data, experience: c });
//                 }}
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Start Date"
//                   value={e.start}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].start = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="End Date"
//                   value={e.end}
//                   onChange={(ev) => {
//                     const c = [...data.experience];
//                     c[i].end = ev.target.value;
//                     setData({ ...data, experience: c });
//                   }}
//                 />
//               </div>
//               <textarea
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Description"
//                 value={e.description}
//                 onChange={(ev) => {
//                   const c = [...data.experience];
//                   c[i].description = ev.target.value;
//                   setData({ ...data, experience: c });
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 experience: [
//                   ...data.experience,
//                   {
//                     company: "",
//                     role: "",
//                     start: "",
//                     end: "",
//                     description: "",
//                   },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Work Experience
//           </button>
//         </div>
//       );
//     case "education":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Education</h3>
//           {data.education.map((ed, i) => (
//             <div
//               key={i}
//               className="space-y-2 rounded border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Degree"
//                 value={ed.degree}
//                 onChange={(ev) => {
//                   const c = [...data.education];
//                   c[i].degree = ev.target.value;
//                   setData({ ...data, education: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Institution"
//                 value={ed.institution}
//                 onChange={(ev) => {
//                   const c = [...data.education];
//                   c[i].institution = ev.target.value;
//                   setData({ ...data, education: c });
//                 }}
//               />
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Start Date"
//                   value={ed.start}
//                   onChange={(ev) => {
//                     const c = [...data.education];
//                     c[i].start = ev.target.value;
//                     setData({ ...data, education: c });
//                   }}
//                 />
//                 <input
//                   type="date"
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="End Date"
//                   value={ed.end}
//                   onChange={(ev) => {
//                     const c = [...data.education];
//                     c[i].end = ev.target.value;
//                     setData({ ...data, education: c });
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 education: [
//                   ...data.education,
//                   { degree: "", institution: "", start: "", end: "" },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Education
//           </button>
//         </div>
//       );
//     case "skills":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Skills</h3>
//           {data.skills.map((s, i) => (
//             <div
//               key={i}
//               className="border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 rounded-full bg-red-50 px-2 py-2 font-semibold text-red-600 transition-all hover:bg-red-500 hover:text-white dark:bg-transparent duration-500 dark:hover:bg-red-500"
//                   onClick={() => {
//                     const c = data.skills.filter((_, idx) => idx !== i);
//                     setData({ ...data, skills: c });
//                   }}
//                 >
//                   <RiDeleteBin6Line />
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-4 pb-5">
//                 <div>
//                   <label className="block text-sm pb-4 font-medium text-gray-700 dark:text-gray-300">
//                     Skill Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary col-span-3 w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                     placeholder="Skill Name"
//                     value={s.name}
//                     onChange={(ev) => {
//                       const c = [...data.skills];
//                       c[i].name = ev.target.value;
//                       setData({ ...data, skills: c });
//                     }}
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="">
//                     <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     {[1, 2, 3, 4, 5].map((lvl) => (
//                       <button
//                         key={lvl}
//                         type="button"
//                         onClick={() => {
//                           const c = [...data.skills];
//                           c[i].level = lvl;
//                           setData({ ...data, skills: c });
//                         }}
//                         className={`h-4 w-6 mx-1 rounded-md border transition-all duration-200 ${
//                           lvl <= s.level
//                             ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
//                             : "border-gray-400 bg-gray-200 dark:bg-gray-700"
//                         } hover:scale-105`}
//                       />
//                     ))}
//                   </div>
//                   {/* <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
//                   {s.level}/5
//                 </span> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 skills: [...data.skills, { name: "", level: 0 }],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Skill
//           </button>
//         </div>
//       );
//     case "projects":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Projects</h3>
//           {data.projects.map((p, i) => (
//             <div
//               key={i}
//               className="space-y-2 rounded border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Project Title"
//                 value={p.title}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].title = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//               <textarea
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Description"
//                 value={p.description}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].description = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="GitHub Link"
//                 value={p.github}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].github = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Live Demo URL"
//                 value={p.live}
//                 onChange={(ev) => {
//                   const c = [...data.projects];
//                   c[i].live = ev.target.value;
//                   setData({ ...data, projects: c });
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 projects: [
//                   ...data.projects,
//                   { title: "", description: "", github: "", live: "" },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Project
//           </button>
//         </div>
//       );
//     case "certifications":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Certifications</h3>
//           {data.certifications.map((c, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-3 gap-2 border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
//             >
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Certificate Title"
//                 value={c.title}
//                 onChange={(ev) => {
//                   const arr = [...data.certifications];
//                   arr[i].title = ev.target.value;
//                   setData({ ...data, certifications: arr });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Issuer"
//                 value={c.issuer}
//                 onChange={(ev) => {
//                   const arr = [...data.certifications];
//                   arr[i].issuer = ev.target.value;
//                   setData({ ...data, certifications: arr });
//                 }}
//               />
//               <input
//                 className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                 placeholder="Year"
//                 value={c.year}
//                 onChange={(ev) => {
//                   const arr = [...data.certifications];
//                   arr[i].year = ev.target.value;
//                   setData({ ...data, certifications: arr });
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             className="flex items-center gap-3 rounded bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//             onClick={() =>
//               setData({
//                 ...data,
//                 certifications: [
//                   ...data.certifications,
//                   { title: "", issuer: "", year: "" },
//                 ],
//               })
//             }
//           >
//             <LuPlus size={20} />
//             Add Certification
//           </button>
//         </div>
//       );
//     case "additional":
//       return (
//         <div className="space-y-3">
//           <h3 className="font-semibold">Additional Information</h3>
//           <div className="border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
//             <div className="mb-2 font-medium">Languages</div>
//             {data.additional.languages.map((l, i) => (
//               <div key={i} className="mb-2 grid grid-cols-2 gap-2">
//                 <input
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Language"
//                   value={l.language}
//                   onChange={(ev) => {
//                     const arr = [...data.additional.languages];
//                     arr[i].language = ev.target.value;
//                     setData({
//                       ...data,
//                       additional: { ...data.additional, languages: arr },
//                     });
//                   }}
//                 />
//                 <input
//                   className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
//                   placeholder="Proficiency"
//                   value={l.proficiency}
//                   onChange={(ev) => {
//                     const arr = [...data.additional.languages];
//                     arr[i].proficiency = ev.target.value;
//                     setData({
//                       ...data,
//                       additional: { ...data.additional, languages: arr },
//                     });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="flex items-center gap-3 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
//               onClick={() =>
//                 setData({
//                   ...data,
//                   additional: {
//                     ...data.additional,
//                     languages: [
//                       ...data.additional.languages,
//                       { language: "", proficiency: "" },
//                     ],
//                   },
//                 })
//               }
//             >
//               <LuPlus size={20} />
//               Add Language
//             </button>
//           </div>
//           <div>
//             <div className="mb-3 border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
//               <div className="mb-2 font-medium">Interests</div>
//               {data.additional.interests.map((it, i) => (
//                 <input
//                   key={i}
//                   className="dark:text-body-color-dark mb-2 dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded border border-gray-300 px-4 py-2 text-base outline-hidden transition-all duration-300 dark:border-gray-700 dark:focus:shadow-none"
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
//               <button
//                 className="mt-3 flex items-center gap-3 rounded bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
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
//                 <LuPlus size={20} />
//                 Add Interest
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
// }

// export default function BuilderClient({ id }: { id: string }) {
//   const router = useRouter();
//   const {
//     templateType,
//     setTemplateType,
//     data,
//     setData,
//     step,
//     setStep,
//     steps,
//     completion,
//     canProceed,
//     save,
//   } = useResumeBuilder();

//   const [previewOpen, setPreviewOpen] = useState(false);

//   const goNext = async () => {
//     if (!canProceed()) return;
//     await save(id);
//     if (step < steps.length - 1) setStep(step + 1);
//   };
//   const goBack = () => setStep(Math.max(0, step - 1));

//   return (
//     <>
//       <section className="min-h-screen bg-gray-50 py-24 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
//         <div className="container mx-auto grid grid-cols-1 gap-4 rounded bg-white p-4 shadow-sm dark:bg-gray-900">
//           <ResumeHeader id={id} />

//           {/* Replace the grid with the resizable split */}
//           <div className="h-[calc(100vh-0px)] no-scrollbar">
//             <ResumeResizableTwoColumn
//               initial={50}      // start at 50/50
//               minLeft={360}     // keep inputs usable
//               minRight={360}    // keep preview readable
//               className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
//               left={
//                 <div className="h-full space-y-5 px-4 py-4">
//                   {/* Progress strip */}
//                   <div>
//                     <div className="h-2 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
//                       <div
//                         className="h-full bg-gray-900 transition-all duration-300 dark:bg-white"
//                         title={`${Math.round(completion)}% completed`}
//                         style={{ width: completion > 0 ? `${Math.round(completion)}%` : '2px' }}
//                       />
//                     </div>
//                     <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//                       Step {step + 1} of {steps.length}
//                     </div>
//                   </div>

//                   <TemplateSelector value={templateType} onChange={setTemplateType} />

//                   <SectionOrder
//                     order={data.order}
//                     onChange={(next: string[]) => setData({ ...data, order: next as any })}
//                   />

//                   <div className="rounded border border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800">
//                     <StepFields step={step} steps={steps} data={data} setData={setData} />
//                     <div className="mt-4 flex flex-wrap gap-2">
//                       <button
//                         className="flex items-center gap-2 rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200 sm:px-6 sm:py-3"
//                         onClick={goBack}
//                         disabled={step === 0}
//                       >
//                         <IoMdArrowBack size={20} />
//                         Back
//                       </button>

//                       {step < steps.length - 1 ? (
//                         <>
//                           <button
//                             className="flex items-center gap-2 rounded bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200 sm:px-6 sm:py-3"
//                             onClick={async () => {
//                               await save(id);
//                               router.push('/user-dashboard');
//                             }}
//                           >
//                             <IoSaveOutline size={20} />
//                             Save & Exit
//                           </button>
//                           <button
//                             className="flex items-center gap-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
//                             onClick={goNext}
//                             disabled={!canProceed()}
//                           >
//                             Next
//                             <IoMdArrowForward size={20} />
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             className="flex items-center gap-2 rounded bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200 sm:px-6 sm:py-3"
//                             onClick={async () => {
//                               await save(id);
//                               router.push('/user-dashboard');
//                             }}
//                           >
//                             <IoSaveOutline size={20} />
//                             Save & Exit
//                           </button>
//                           <button
//                             className="flex items-center gap-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 sm:px-6 sm:py-3"
//                             onClick={() => setPreviewOpen(true)}
//                           >
//                             <MdOutlineFileDownload size={20} />
//                             Preview & Download (later)
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               }
//               right={
//                 <div className="h-full overflow-auto no-scrollbar rounded-r">
//                   <ResumePreview data={data} completion={completion} templateType={templateType} />
//                 </div>
//               }
//             />
//           </div>
//         </div>
//       </section>

//       <PreviewModal
//         open={previewOpen}
//         onClose={() => setPreviewOpen(false)}
//         data={data}
//         templateType={templateType}
//         completion={completion}
//       />
//     </>
//   );
// }


// ********************************************************************

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
// import TemplateSelector from '@/components/resume/TemplateSelector';
// import ResumeHeader from './ResumeHeader';
// import ResumePreview from './ResumePreview';
// import PreviewModal from './modal/PreviewModal';
// import ResumeResizableTwoColumn from './dnd/ResumeResizableTwoColumn';

// import ProgressBar from './controls/ProgressBar';
// import StepFooter from './controls/StepFooter';

// import PersonalStep from './steps/PersonalStep';
// import ContactStep from './steps/ContactStep';
// import ExperienceStep from './steps/ExperienceStep';
// import EducationStep from './steps/EducationStep';
// import SkillsStep from './steps/SkillsStep';
// import ProjectsStep from './steps/ProjectsStep';
// import CertificationsStep from './steps/CertificationsStep';
// import AdditionalStep from './steps/AdditionalStep';

// import { useResumeBuilder } from '@/hook/ResumeBuilderContext';
// import { ResumeShape } from '@/types/resumeTemplate';

// const SectionOrder = dynamic(() => import('@/components/resume/SectionOrder'), { ssr: false });

// const StepRenderer = ({
//   stepKey,
//   data,
//   setData,
// }: {
//   stepKey: string;
//   data: ResumeShape;
//   setData: React.Dispatch<React.SetStateAction<ResumeShape>>;
// }) => {
//   switch (stepKey) {
//     case 'personal':
//       return <PersonalStep data={data} setData={setData} />;
//     case 'contact':
//       return <ContactStep data={data} setData={setData} />;
//     case 'experience':
//       return <ExperienceStep data={data} setData={setData} />;
//     case 'education':
//       return <EducationStep data={data} setData={setData} />;
//     case 'skills':
//       return <SkillsStep data={data} setData={setData} />;
//     case 'projects':
//       return <ProjectsStep data={data} setData={setData} />;
//     case 'certifications':
//       return <CertificationsStep data={data} setData={setData} />;
//     case 'additional':
//       return <AdditionalStep data={data} setData={setData} />;
//     default:
//       return null;
//   }
// };

// export default function BuilderClient({ id }: { id: string }) {
//   const router = useRouter();
//   const {
//     templateType,
//     setTemplateType,
//     data,
//     setData,
//     step,
//     setStep,
//     steps,
//     completion,
//     canProceed,
//     save,
//   } = useResumeBuilder();

//   const [previewOpen, setPreviewOpen] = useState(false);

//   const goNext = async () => {
//     if (!canProceed()) return;
//     await save(id);
//     if (step < steps.length - 1) setStep(step + 1);
//   };

//   const goBack = () => setStep(Math.max(0, step - 1));

//   const onSaveExit = async () => {
//     await save(id);
//     router.push('/user-dashboard');
//   };

//   const isLast = step === steps.length - 1;

//   return (
//     <>
//       <section className="min-h-screen bg-gray-50 py-24 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
//         <div className="container mx-auto grid grid-cols-1 gap-4 rounded bg-white p-4 shadow-sm dark:bg-gray-900">
//           <ResumeHeader id={id} />

//           <div className="h-[calc(100vh-0px)] no-scrollbar">
//             <ResumeResizableTwoColumn
//               initial={50}
//               minLeft={360}
//               minRight={360}
//               className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
//               left={
//                 <div className="h-full space-y-5 px-4 py-4">
//                   <ProgressBar completion={completion} step={step} total={steps.length} />

//                   <TemplateSelector value={templateType} onChange={setTemplateType} />

//                   <SectionOrder
//                     order={data.order}
//                     onChange={(next: string[]) => setData({ ...data, order: next as any })}
//                   />

//                   <div className="rounded border border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800">
//                     <StepRenderer stepKey={steps[step]} data={data} setData={setData} />

//                     <StepFooter
//                       canGoBack={step > 0}
//                       canProceed={canProceed()}
//                       isLast={isLast}
//                       onBack={goBack}
//                       onNext={goNext}
//                       onSaveExit={onSaveExit}
//                       onPreview={() => setPreviewOpen(true)}
//                     />
//                   </div>
//                 </div>
//               }
//               right={
//                 <div className="h-full overflow-auto no-scrollbar rounded-r">
//                   <ResumePreview data={data} completion={completion} templateType={templateType} />
//                 </div>
//               }
//             />
//           </div>
//         </div>
//       </section>

//       <PreviewModal
//         open={previewOpen}
//         onClose={() => setPreviewOpen(false)}
//         data={data}
//         templateType={templateType}
//         completion={completion}
//       />
//     </>
//   );
// }
