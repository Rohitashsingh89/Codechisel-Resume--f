export type TemplateType = string;

export type Personal = { fullName: string; designation: string; summary: string };
export type Contact = {
  address: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
};
export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
};
export type Education = {
  degree: string;
  institution: string;
  start: string;
  end: string;
};
export type Skill = { name: string; level: number };
export type Project = {
  title: string;
  description: string;
  github: string;
  live: string;
};
export type Cert = { title: string; issuer: string; year: string };
export type Lang = { language: string; proficiency: string };

export type ResumeShape = {
  resumeName?: string;
  personal: Personal;
  contact: Contact;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Cert[];
  additional: { languages: Lang[]; interests: string[] };
  order: string[];
};

export type JSONResume = Record<string, any>; // align with JSON Resume v1
export type TemplateNode = {
  type: 'Row'|'Column'|'Stack'|'Heading'|'Text'|'List'|'WorkItem'|'TagList';
  columns?: number[];
  text?: string;
  bind?: string; // JSON path
  item?: TemplateNode;
  children?: TemplateNode[];
};
export type TemplateJSON = {
  version: string;
  meta?: { page?: { size?: 'A4'|'Letter'; margin?: string }, tokens?: Record<string, any> };
  template: { layout: TemplateNode[] };
};

export interface ResumeChangeEvent {
  changed: string;
  note?: string;
  seq?: number;
  ts?: number;
  step?: number;
}

export const STEPS = ["create", "plan", "payment", "download"] as const;
export type Step = typeof STEPS[number];

export interface ResumeData {
  template: string;
  formData: {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
  };
}

export interface ResumeFlowState {
  currentStep: Step;
  resumeData: ResumeData | null;
  selectedPlan: "week" | "month" | null;
}
