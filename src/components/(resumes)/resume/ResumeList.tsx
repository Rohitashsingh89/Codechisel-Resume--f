"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/hook/reduxHooks";
import { useEffect } from "react";
import { fetchResumes } from "@/features/resumes/resumesSlice";

export default function ResumeList() {
  const dispatch = useAppDispatch();

  const { resumes, loading } = useAppSelector((state) => state.resumes);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  return (
    <div className="rounded border">
      <div className="grid grid-cols-3 bg-gray-50 px-3 py-2 font-medium">
        <div>Name</div>
        <div>Template</div>
        <div>Created</div>
      </div>

      {loading && (
        <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
      )}

      {!loading && (
        <div>
          {resumes.map((r) => (
            <Link
              key={r._id}
              href={`/builder?id=${r._id}`}
              className="grid grid-cols-3 border-t px-3 py-2 hover:bg-gray-50"
            >
              <div>{r.resumeName}</div>
              <div>{r.templateType}</div>
              <div>
                {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
              </div>
            </Link>
          ))}

          {!resumes.length && (
            <div className="px-3 py-2 text-sm text-gray-500">
              No resumes found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
