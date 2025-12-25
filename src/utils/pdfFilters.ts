import { ResumeShape } from "@/types/resumeTemplate";

export function hasSectionData(key: string, data: ResumeShape) {
  switch (key) {
    case "summary":
      return !!data.personal?.summary?.trim();
    case "experience":
      return Array.isArray(data.experience) && data.experience.length > 0;
    case "education":
      return Array.isArray(data.education) && data.education.length > 0;
    case "projects":
      return Array.isArray(data.projects) && data.projects.length > 0;
    case "skills":
      return Array.isArray(data.skills) && data.skills.length > 0;
    case "certifications":
      return (
        Array.isArray(data.certifications) && data.certifications.length > 0
      );
    case "languages":
      return !!data.additional?.languages?.length;
    case "additional":
      return (
        !!data.additional?.languages?.length ||
        !!data.additional?.interests?.length
      );
    case "contact":
      const c = (data.contact || {}) as Record<string, any>;
      return !!(
        c.address ||
        c.email ||
        c.phone ||
        c.linkedin ||
        c.github ||
        c.website
      );
    default:
      return false;
  }
}
