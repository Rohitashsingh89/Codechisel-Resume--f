'use client';

import React from 'react';

type Experience = { company: string; role: string; start: string; end: string; details: string };
type Education = { school: string; degree: string; start: string; end: string };

export type ResumeData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
};

export default function ResumeForm({ data, onChange }: { data: ResumeData; onChange: (d: ResumeData) => void }) {
  const update = <K extends keyof ResumeData>(key: K, val: ResumeData[K]) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm">Name</label>
          <input className="w-full border rounded px-2 py-1" value={data.name} onChange={e => update('name', e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input className="w-full border rounded px-2 py-1" value={data.email} onChange={e => update('email', e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <input className="w-full border rounded px-2 py-1" value={data.phone} onChange={e => update('phone', e.target.value)} />
        </div>
      </div>

      <div>
        <label className="text-sm">Summary</label>
        <textarea className="w-full border rounded px-2 py-1" rows={3} value={data.summary} onChange={e => update('summary', e.target.value)} />
      </div>

      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Experience</h4>
          <button type="button" className="text-sm underline" onClick={() => update('experience', [...data.experience, { company: '', role: '', start: '', end: '', details: '' }])}>Add</button>
        </div>
        {data.experience.map((e, i) => (
          <div key={i} className="border rounded p-3 space-y-2">
            <input className="w-full border rounded px-2 py-1" placeholder="Company" value={e.company}
                   onChange={ev => { const c = [...data.experience]; c[i].company = ev.target.value; update('experience', c); }} />
            <input className="w-full border rounded px-2 py-1" placeholder="Role" value={e.role}
                   onChange={ev => { const c = [...data.experience]; c[i].role = ev.target.value; update('experience', c); }} />
            <div className="grid grid-cols-2 gap-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Start" value={e.start}
                     onChange={ev => { const c = [...data.experience]; c[i].start = ev.target.value; update('experience', c); }} />
              <input className="w-full border rounded px-2 py-1" placeholder="End" value={e.end}
                     onChange={ev => { const c = [...data.experience]; c[i].end = ev.target.value; update('experience', c); }} />
            </div>
            <textarea className="w-full border rounded px-2 py-1" placeholder="Details" value={e.details}
                      onChange={ev => { const c = [...data.experience]; c[i].details = ev.target.value; update('experience', c); }} />
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Education</h4>
          <button type="button" className="text-sm underline" onClick={() => update('education', [...data.education, { school: '', degree: '', start: '', end: '' }])}>Add</button>
        </div>
        {data.education.map((ed, i) => (
          <div key={i} className="border rounded p-3 space-y-2">
            <input className="w-full border rounded px-2 py-1" placeholder="School" value={ed.school}
                   onChange={ev => { const c = [...data.education]; c[i].school = ev.target.value; update('education', c); }} />
            <input className="w-full border rounded px-2 py-1" placeholder="Degree" value={ed.degree}
                   onChange={ev => { const c = [...data.education]; c[i].degree = ev.target.value; update('education', c); }} />
            <div className="grid grid-cols-2 gap-2">
              <input className="w-full border rounded px-2 py-1" placeholder="Start" value={ed.start}
                     onChange={ev => { const c = [...data.education]; c[i].start = ev.target.value; update('education', c); }} />
              <input className="w-full border rounded px-2 py-1" placeholder="End" value={ed.end}
                     onChange={ev => { const c = [...data.education]; c[i].end = ev.target.value; update('education', c); }} />
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Skills</h4>
          <button type="button" className="text-sm underline" onClick={() => update('skills', [...data.skills, ''])}>Add</button>
        </div>
        {data.skills.map((s, i) => (
          <input key={i} className="w-full border rounded px-2 py-1" placeholder="Skill" value={s}
                 onChange={ev => { const c = [...data.skills]; c[i] = ev.target.value; update('skills', c); }} />
        ))}
      </section>
    </div>
  );
}
