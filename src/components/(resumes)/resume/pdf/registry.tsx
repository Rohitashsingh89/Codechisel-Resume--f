import type { ResumeShape } from "@/types/resumeTemplate";
import { JSX } from "react";
import { PDFProfessional } from "./PDFProfessional";
import { PDFClassic } from "./PDFClassic";
import { PDFMinimal } from "./PDFMinimal";
import { PDFBasic } from "./PDFBasic";
import { PDFStudent } from "./PDFStudent";
export type PDFThemeProps = { data: ResumeShape; accent: string };

export const pdfThemeRegistry: Record<string, (p: PDFThemeProps) => JSX.Element> = {
  professional: PDFProfessional,
  classic: PDFClassic,
  minimal: PDFMinimal,
  basic: PDFBasic,
  student: PDFStudent,
};
