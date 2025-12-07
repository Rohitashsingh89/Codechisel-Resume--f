import { apiFetch } from "@/lib/api";
import moment from "moment";
import { toast } from "react-hot-toast";

export type ThemePatch = { mode?: "light" | "dark"; color?: string };

// ✅ Generic API update utility
export const updateField = async (
  id: string,
  field: Partial<{ resumeName: string; templateType: string; resumeData: any; theme: ThemePatch; }>,
) => {
  try {
    await apiFetch(`/v1/resumes/${id}`, {
      method: "PUT",
      body: JSON.stringify(field),
    });
    toast.success("Updated successfully!");
  } catch (e) {
    toast.error("Update failed");
  }
};

export function formatDate(date?: string | null, withTime = false): string {
  if (!date) return "";
  return withTime
    ? moment(date).format("MMM DD, YYYY, h:mm A")
    : moment(date).format("MMM YYYY");
}
