export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

export interface Plan {
  _id: string;
  name: string;
  price: number;
  type: string;
  downloadLimit?: number;
  durationDays?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  _id: string;
  name: string;
  slug: string;
  category: string;
  isPremium: boolean;
  config: string;
  isActive: boolean;
  createdAt: string;
}

export interface PDFLayoutConfig {
  accent: string;
  page: {
    size: "A4" | "LETTER";
    margins: { top: number; left: number; right: number; bottom: number };
    paddings?: { top: number; left: number; right: number; bottom: number };
    background?: string;
  };
  backgroundLayout?: {
    type: "vertical-split";
    ratio: string;
    primaryColor: string;
    secondaryColor: string;
  };
  contentArea?: {
    padding: { top: number; left: number; right: number; bottom: number };
  };
  fonts: {
    primary: string;
    secondary?: string;
    headingSize: number;
    subheadingSize: number;
    bodySize: number;
    lineHeight: number;
  };
  colors: {
    primary: string;
    accent?: string;
    text: string;
    headingText: string;
    subText: string;
    divider: string;
    lightText?: string;
  };
  layout: {
    type: "single-column" | "two-column";
    sectionOrder: string[];
    columnRatio?: string;
    leftColumnSections?: string[];
    rightColumnSections?: string[];
  };
  header: {
    showProfileImage: boolean;
    alignment: "left" | "center" | "right";
    nameSize: number;
    roleSize: number;
    spacingBelow?: number;

    showDividerBelow?: boolean;
    dividerStyle?: "thin-line" | "underline";
    style?: "overlay";
    position?: "top" | "center";
    height?: number;
    textColor?: string;
    contactStyle?: "inline" | "block";
    showContactIcons?: boolean;
  };
  footer?: {
    showPageNumber?: boolean;
    alignment?: "left" | "center" | "right";
    textSize?: number;
    color?: string;
  };
  sectionStyle?: {
    headingCase?: "uppercase" | "capitalize" | "none";
    headingWeight?: number;
    showDivider?: boolean;
    dividerStyle?: "thin-line" | "underline";
    dividerSpacing?: number;
  };
}
