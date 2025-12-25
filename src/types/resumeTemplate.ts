export type TemplateType = string;

export type Personal = {
  fullName: string;
  designation: string;
  summary: string;
  image?: string;
};
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

  selectedTemplateSlug?: string | null;
};

export type JSONResume = Record<string, any>; // align with JSON Resume v1
export type TemplateNode = {
  type:
    | "Row"
    | "Column"
    | "Stack"
    | "Heading"
    | "Text"
    | "List"
    | "WorkItem"
    | "TagList";
  columns?: number[];
  text?: string;
  bind?: string; // JSON path
  item?: TemplateNode;
  children?: TemplateNode[];
};
export type TemplateJSON = {
  version: string;
  meta?: {
    page?: { size?: "A4" | "Letter"; margin?: string };
    tokens?: Record<string, any>;
  };
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
export type Step = (typeof STEPS)[number];

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

export type BuiltInSectionKey =
  | "summary"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "links"
  | "languages"
  | "certifications"
  | "internships"
  | "contact"
  | "technicalSkills"
  | "tools"
  | "achievements"
  | "volunteering"
  | "interests";

export type SectionKey = BuiltInSectionKey | string;

export interface SectionConfig {
  title: string;
  type?:
    | "text"
    | "list"
    | "inline"
    | "timeline"
    | "progress-bar"
    | "tag-cloud"
    | "icon-left";
  showDivider?: boolean;
  dividerStyle?: "line" | "underline" | "none";
  maxCharacters?: number;
  showDateRange?: boolean;
  bulletIcon?: string;
  showLink?: boolean;
  showTechStack?: boolean;
  display?: "tag-cloud" | "inline" | "grouped";
  maxColumns?: number;
  [key: string]: any;
}

export interface HeaderConfig {
  showProfileImage?: boolean;
  imageShape?: "circle" | "square" | "rounded";
  alignment?: "left" | "center" | "right";
  nameSize?: number;
  roleSize?: number;
  spacingBelow?: number;
  showDividerBelow?: boolean;
  dividerStyle?: "line" | "underline" | "none";
  contactStyle?: "inline" | "block";
  [key: string]: any;
}

export interface LayoutConfig {
  type: "single-column" | "two-column";
  columnRatio?: string;
  sectionsOrder?: SectionKey[];
  leftColumnSections?: SectionKey[];
  rightColumnSections?: SectionKey[];
}

export interface ColorsConfig {
  primary: string;
  background?: string;
  text: string;
  headingText: string;
  subText: string;
  divider: string;
  accent?: string;
  lightText?: string;
  backgroundMuted?: string;
  dualTonePrimary?: string;
  dualToneSecondary?: string;
}

export interface FontsConfig {
  primary: string;
  secondary?: string;
  headingSize: number;
  subheadingSize: number;
  bodySize: number;
  lineHeight: number;
}

export interface PageConfig {
  size: "A4" | "Letter" | string;
  margins: { top: number; left: number; right: number; bottom: number };
  background: string;
  dualToneBackground?: { primary: string; secondary: string };
}

export interface FooterConfig {
  showPageNumber?: boolean;
  alignment?: "left" | "center" | "right";
  textSize?: number;
  color?: string;
}

export interface BackgroundLayoutConfig {
  type: "vertical-split";
  ratio: string; // "50:50"
  primaryColor: string;
  secondaryColor: string;
}

export interface ContentAreaConfig {
  padding: { top: number; left: number; right: number; bottom: number };
}

export interface SectionStyleConfig {
  headingCase?: "uppercase" | "capitalize" | "none";
  headingWeight?: number;
  showDivider?: boolean;
  dividerStyle?: "thin-line" | "underline";
  dividerSpacing?: number;
}

export interface TemplateConfig {
  templateId: string;
  name: string;
  thumbnail?: string;
  category?: string;
  isPremium?: boolean;
  page: PageConfig;
  fonts: FontsConfig;
  colors: ColorsConfig;
  layout: LayoutConfig;
  sections: Record<SectionKey, SectionConfig>;
  header?: HeaderConfig;
  footer?: FooterConfig;
  backgroundLayout?: BackgroundLayoutConfig;
  contentArea?: ContentAreaConfig;
  sectionStyle?: SectionStyleConfig;
  metadata?: { [key: string]: any };
}
