"use client";

import React, { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import ResumeHeader from "./ResumeHeader";

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  education: { school: string; degree: string; start: string; end: string }[];
  experience: {
    company: string;
    role: string;
    start: string;
    end: string;
    details: string;
  }[];
  skills: string[];
};

// --- Sample Templates ---
function TemplateClassic({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "Inter, system-ui", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>{data.name}</h1>
      <p style={{ color: "#555" }}>
        {data.email} • {data.phone}
      </p>
      <hr />
      <h2>Summary</h2>
      <p>{data.summary}</p>

      <h2>Experience</h2>
      {data.experience.map((e, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <strong>{e.role}</strong> — {e.company} ({e.start} - {e.end})
          <div>{e.details}</div>
        </div>
      ))}

      <h2>Education</h2>
      {data.education.map((ed, i) => (
        <div key={i}>
          <strong>{ed.degree}</strong> — {ed.school} ({ed.start} - {ed.end})
        </div>
      ))}

      <h2>Skills</h2>
      <p>{data.skills.join(" • ")}</p>
    </div>
  );
}

function TemplateMinimal({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "Georgia, serif", padding: 24 }}>
      <h1 style={{ letterSpacing: 1 }}>{data.name}</h1>
      <p>
        {data.email} | {data.phone}
      </p>
      <section>
        <h3 style={{ textTransform: "uppercase" }}>Profile</h3>
        <p>{data.summary}</p>
      </section>
      <section>
        <h3 style={{ textTransform: "uppercase" }}>Experience</h3>
        {data.experience.map((e, i) => (
          <article key={i}>
            <div>
              <strong>{e.company}</strong> — {e.role}
            </div>
            <small>
              {e.start} - {e.end}
            </small>
            <p>{e.details}</p>
          </article>
        ))}
      </section>
      <section>
        <h3 style={{ textTransform: "uppercase" }}>Education</h3>
        {data.education.map((ed, i) => (
          <div key={i}>
            <div>
              <strong>{ed.school}</strong>
            </div>
            <small>
              {ed.degree} • {ed.start}-{ed.end}
            </small>
          </div>
        ))}
      </section>
      <section>
        <h3 style={{ textTransform: "uppercase" }}>Skills</h3>
        <ul>
          {data.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const templates = {
  classic: TemplateClassic,
  minimal: TemplateMinimal,
};

export default function ResumeBuilder() {
  const [templateKey, setTemplateKey] =
    useState<keyof typeof templates>("classic");
  const [resume, setResume] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [],
    experience: [],
    skills: [],
  });

  // Example: Load existing resume for current user after login
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = (await apiFetch("/v1/resumes/me", {
          method: "GET",
        })) as { data?: { resume?: any } } | null;
  
        if (res?.data?.resume) {
          setResume(res.data.resume);
        }
      } catch (err) {
        console.error("Failed to fetch resume", err);
      }
    };
  
    fetchResume();
  }, []);  

  const Template = templates[templateKey];

  const addEducation = () =>
    setResume((r) => ({
      ...r,
      education: [
        ...r.education,
        { school: "", degree: "", start: "", end: "" },
      ],
    }));

  const addExperience = () =>
    setResume((r) => ({
      ...r,
      experience: [
        ...r.experience,
        { company: "", role: "", start: "", end: "", details: "" },
      ],
    }));

  const addSkill = () =>
    setResume((r) => ({ ...r, skills: [...r.skills, ""] }));

  // Simple reordering helpers without a DnD lib
  const moveItem = (arr: any[], from: number, to: number) => {
    const copy = [...arr];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

  const saveResume = async () => {
    try {
      const res = await apiFetch("/v1/resumes/", {
        method: "POST",
        body: JSON.stringify({ resume }),
      });
  
      if (res?.ok) {
        alert("Saved!");
      } else {
        alert("Failed to save resume.");
      }
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("An error occurred.");
    }
  };
  

  return (
    <>
        <ResumeHeader id={""} />
      <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="space-y-8 border border-gray-300 dark:border-gray-700 p-4 rounded-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Resume Builder
          </h2>

          <div className="space-y-2">
            <label className="block font-medium text-gray-600 dark:text-gray-300">
              Template
            </label>
            <select
              value={templateKey}
              onChange={(e) => setTemplateKey(e.target.value as any)}
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          {/* Basic Info */}
          {["Name", "Email", "Phone"].map((field) => (
            <div key={field} className="space-y-2">
              <label className="block font-medium text-gray-600 dark:text-gray-300">
                {field}
              </label>
              <input
                value={resume[field.toLowerCase()]}
                onChange={(e) =>
                  setResume({
                    ...resume,
                    [field.toLowerCase()]: e.target.value,
                  })
                }
                className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          ))}

          {/* Summary */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-600 dark:text-gray-300">
              Summary
            </label>
            <textarea
              value={resume.summary}
              onChange={(e) =>
                setResume({ ...resume, summary: e.target.value })
              }
              className="w-full resize-none rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              rows={4}
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Experience
              </h3>
              <button
                onClick={addExperience}
                className="rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            {resume.experience.map((exp, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded border border-gray-300 p-4 dark:border-gray-700"
              >
                {["company", "role", "start", "end"].map((field) => (
                  <input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={exp[field]}
                    onChange={(e) => {
                      const expCopy = [...resume.experience];
                      expCopy[idx][field] = e.target.value;
                      setResume({ ...resume, experience: expCopy });
                    }}
                    className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                ))}
                <textarea
                  placeholder="Details"
                  value={exp.details}
                  onChange={(e) => {
                    const expCopy = [...resume.experience];
                    expCopy[idx].details = e.target.value;
                    setResume({ ...resume, experience: expCopy });
                  }}
                  className="w-full resize-none rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    disabled={idx === 0}
                    onClick={() =>
                      setResume((r) => ({
                        ...r,
                        experience: moveItem(r.experience, idx, idx - 1),
                      }))
                    }
                    className="rounded bg-gray-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-gray-700"
                  >
                    Up
                  </button>
                  <button
                    disabled={idx === resume.experience.length - 1}
                    onClick={() =>
                      setResume((r) => ({
                        ...r,
                        experience: moveItem(r.experience, idx, idx + 1),
                      }))
                    }
                    className="rounded bg-gray-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-gray-700"
                  >
                    Down
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Education
              </h3>
              <button
                onClick={addEducation}
                className="rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            {resume.education.map((ed, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded border border-gray-300 p-4 dark:border-gray-700"
              >
                {["school", "degree", "start", "end"].map((field) => (
                  <input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={ed[field]}
                    onChange={(e) => {
                      const edCopy = [...resume.education];
                      edCopy[idx][field] = e.target.value;
                      setResume({ ...resume, education: edCopy });
                    }}
                    className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                ))}
                <div className="flex gap-2">
                  <button
                    disabled={idx === 0}
                    onClick={() =>
                      setResume((r) => ({
                        ...r,
                        education: moveItem(r.education, idx, idx - 1),
                      }))
                    }
                    className="rounded bg-gray-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-gray-700"
                  >
                    Up
                  </button>
                  <button
                    disabled={idx === resume.education.length - 1}
                    onClick={() =>
                      setResume((r) => ({
                        ...r,
                        education: moveItem(r.education, idx, idx + 1),
                      }))
                    }
                    className="rounded bg-gray-200 px-3 py-1 text-sm disabled:opacity-50 dark:bg-gray-700"
                  >
                    Down
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Skills
              </h3>
              <button
                onClick={addSkill}
                className="rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {resume.skills.map((s, idx) => (
              <input
                key={idx}
                value={s}
                onChange={(e) => {
                  const sc = [...resume.skills];
                  sc[idx] = e.target.value;
                  setResume({ ...resume, skills: sc });
                }}
                className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={saveResume}
              className="rounded bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
            >
              Save Resume
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="max-h-[90vh] overflow-y-auto rounded border border-gray-300 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-900">
          <Template data={resume} />
        </div>
      </div>
    </>
  );
}
