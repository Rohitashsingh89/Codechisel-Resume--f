'use client';
import React from 'react';
import TextInput from '../inputs/TextInput';
import LinkInput from '../inputs/LinkInput';
import { ResumeShape } from '@/types/resumeTemplate';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone10 = (v: string) => /^\d{10}$/.test(v);

export default function ContactStep({
  data,
  setData,
}: {
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-dark dark:text-gray-200">Contact Information</h3>

      <TextInput
        placeholder="Address"
        value={data.contact.address}
        // 🔁 CHANGED: prev => (...) → direct patch using current data
        onChange={(v) =>
          setData({
            contact: {
              ...data.contact,
              address: v,
            },
          })
        }
      />

      <TextInput
        placeholder="Email"
        value={data.contact.email}
        onChange={(v) =>
          setData({
            contact: {
              ...data.contact,
              email: v,
            },
          })
        }
      />
      {!isEmail(data.contact.email) && (
        <div className="text-sm text-red-600">Valid email is required.</div>
      )}

      <TextInput
        placeholder="Phone Number"
        value={data.contact.phone}
        onChange={(v) =>
          setData({
            contact: {
              ...data.contact,
              phone: v,
            },
          })
        }
      />
      {!isPhone10(data.contact.phone) && (
        <div className="text-sm text-red-600">
          Valid 10-digit phone number is required
        </div>
      )}

      <LinkInput
        placeholder="LinkedIn"
        value={data.contact.linkedin}
        onChange={(v) =>
          setData({
            contact: {
              ...data.contact,
              linkedin: v,
            },
          })
        }
      />
      <LinkInput
        placeholder="GitHub"
        value={data.contact.github}
        onChange={(v) =>
          setData({
            contact: {
              ...data.contact,
              github: v,
            },
          })
        }
      />
      <LinkInput
        placeholder="Portfolio / Website"
        value={data.contact.website}
        onChange={(v) =>
          setData({
            contact: {
              ...data.contact,
              website: v,
            },
          })
        }
      />
    </div>
  );
}
