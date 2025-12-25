"use client";

import {
  ResumeShape,
  TemplateConfig,
  PageConfig,
  FontsConfig,
  ColorsConfig,
  LayoutConfig,
  HeaderConfig,
  SectionConfig,
} from "@/types/resumeTemplate";
import PageWrapper from "./PageWrapper";
import HeaderRenderer from "./HeaderRenderer";
import LayoutRenderer from "./LayoutRenderer";

type Props = {
  data: ResumeShape;
  config: TemplateConfig | null;
  isFallback: boolean;
};

export default function ResumeRenderer({ data, config, isFallback }: Props) {
  const safeConfig = config ?? getFallbackConfig(data);

  return (
    <PageWrapper
      page={safeConfig.page}
      fonts={safeConfig.fonts}
      colors={safeConfig.colors}
      backgroundLayout={safeConfig.backgroundLayout}
      contentArea={safeConfig.contentArea}
    >
      <HeaderRenderer data={data} header={safeConfig.header} />
      <LayoutRenderer data={data} config={safeConfig} />
    </PageWrapper>
  );
}

/* 🔹 Hard fallback – production-ready */
function getFallbackConfig(data: ResumeShape): TemplateConfig {
  const page: PageConfig = {
    size: "A4",
    margins: { top: 24, left: 24, right: 24, bottom: 24 },
    background: "#FFFFFF",
  };

  const fonts: FontsConfig = {
    primary: "Poppins",
    headingSize: 18,
    subheadingSize: 14,
    bodySize: 12,
    lineHeight: 1.5,
  };

  const colors: ColorsConfig = {
    primary: "#111827",
    text: "#1F2937",
    headingText: "#020617",
    subText: "#4B5563",
    divider: "#E5E7EB",
    accent: "#2563EB",
  };

  const layout: LayoutConfig = {
    type: "single-column",
    sectionsOrder: data.order,
    leftColumnSections: data.order,
    rightColumnSections: [],
    columnRatio: "30:70",
  };

  const header: HeaderConfig = {
    showProfileImage: false,
    alignment: "center",
    nameSize: 24,
    roleSize: 14,
    showDividerBelow: true,
    spacingBelow: 16,
  };

  const sections: Record<string, SectionConfig> = {}; // empty fallback sections

  return {
    templateId: "fallback",
    name: "Fallback Template",
    page,
    fonts,
    colors,
    layout,
    header,
    sections,
  };
}
