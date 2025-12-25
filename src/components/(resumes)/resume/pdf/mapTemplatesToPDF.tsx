import { PDFLayoutConfig } from "@/types/common";
import { TemplateConfig } from "@/types/resumeTemplate";

export function mapTemplateToPDF(
  config: TemplateConfig | null | undefined,
  accent: string,
): PDFLayoutConfig {
  const base: PDFLayoutConfig = {
    accent,
    page: {
      size: "A4",
      margins: { top: 36, left: 36, right: 36, bottom: 36 },
      paddings: { top: 36, left: 36, right: 36, bottom: 36 },
      background: "#FFFFFF",
    },
    fonts: {
      primary: "Inter",
      secondary: "Inter",
      headingSize: 18,
      subheadingSize: 13,
      bodySize: 11,
      lineHeight: 1.4,
    },
    colors: {
      primary: accent,
      text: "#111827",
      headingText: "#020617",
      subText: "#4B5563",
      divider: "#E5E7EB",
    },
    layout: {
      type: "single-column",
      columnRatio: "70:30",
      sectionOrder: [
        "summary",
        "experience",
        "skills",
        "projects",
        "education",
        "certifications",
        "languages",
      ],
    },
    header: {
      showProfileImage: false,
      alignment: "center",
      nameSize: 24,
      roleSize: 12,
      spacingBelow: 16,
      showDividerBelow: false,
    },
    footer: {
      showPageNumber: false,
      alignment: "right",
      textSize: 9,
      color: "#9CA3AF",
    },
    sectionStyle: {
      headingCase: "none",
      headingWeight: 600,
      showDivider: false,
      dividerStyle: "thin-line",
      dividerSpacing: 6,
    },
  };

  if (!config) return base;

  const pageSize =
    config.page.size === "Letter" || config.page.size === "LETTER"
      ? "LETTER"
      : "A4";

  const layoutType = config.layout.type as "single-column" | "two-column";

  const sectionOrder =
    (config.layout as any).sectionsOrder ??
    config.layout.leftColumnSections ??
    Object.keys(config.sections);

  const paddings = config.contentArea?.padding || config.page.margins;

  const pdfConfig: PDFLayoutConfig = {
    ...base,
    accent: config.colors.accent || config.colors.primary || accent,
    page: {
      size: pageSize,
      margins: config.page.margins,
      paddings,
      background: config.page.background,
    },
    fonts: {
      primary: config.fonts.primary,
      secondary: config.fonts.secondary,
      headingSize: config.fonts.headingSize,
      subheadingSize: config.fonts.subheadingSize,
      bodySize: config.fonts.bodySize,
      lineHeight: config.fonts.lineHeight,
    },
    colors: {
      primary: config.colors.primary || base.colors.primary,
      accent: (config.colors as any).accent,
      text: config.colors.text || base.colors.text,
      headingText: config.colors.headingText || base.colors.headingText,
      subText: config.colors.subText || base.colors.subText,
      divider: config.colors.divider || base.colors.divider,
      lightText: (config.colors as any).lightText,
    },
    layout: {
      type: layoutType,
      sectionOrder,
      leftColumnSections: config.layout.leftColumnSections,
      rightColumnSections: config.layout.rightColumnSections,
      columnRatio: (config.layout as any).columnRatio || "70:30",
    },
    header: {
      showProfileImage: config.header?.showProfileImage,
      alignment: (config.header?.alignment as any) ?? base.header.alignment,
      nameSize: config.header?.nameSize ?? base.header.nameSize,
      roleSize: config.header?.roleSize ?? base.header.roleSize,
      spacingBelow: config.header?.spacingBelow ?? base.header.spacingBelow,
      showDividerBelow:
        (config.header as any)?.showDividerBelow ??
        (config.header as any)?.showBottomDivider ??
        base.header.showDividerBelow,
      dividerStyle: (config.header as any)?.dividerStyle,
      style: (config.header as any)?.style,
      position: (config.header as any)?.position,
      height: (config.header as any)?.height,
      textColor: (config.header as any)?.textColor,
      contactStyle: (config.header as any)?.contactStyle,
      showContactIcons: (config.header as any)?.showContactIcons,
    },
    footer: config.footer
      ? {
          showPageNumber: config.footer.showPageNumber,
          alignment: config.footer.alignment as any,
          textSize: config.footer.textSize,
          color: config.footer.color,
        }
      : base.footer,
    sectionStyle: (config as any).sectionStyle
      ? {
          headingCase:
            (config as any).sectionStyle.headingCase ??
            base.sectionStyle?.headingCase,
          headingWeight:
            (config as any).sectionStyle.headingWeight ??
            base.sectionStyle?.headingWeight,
          showDivider:
            (config as any).sectionStyle.showDivider ??
            base.sectionStyle?.showDivider,
          dividerStyle:
            (config as any).sectionStyle.dividerStyle ??
            base.sectionStyle?.dividerStyle,
          dividerSpacing:
            (config as any).sectionStyle.dividerSpacing ??
            base.sectionStyle?.dividerSpacing,
        }
      : base.sectionStyle,
  };

  // dual-tone / backgroundLayout / contentArea support
  if ((config as any).backgroundLayout) {
    pdfConfig.backgroundLayout = {
      type: (config as any).backgroundLayout.type,
      ratio: (config as any).backgroundLayout.ratio,
      primaryColor: (config as any).backgroundLayout.primaryColor,
      secondaryColor: (config as any).backgroundLayout.secondaryColor,
    };
  }
  if ((config as any).contentArea) {
    pdfConfig.contentArea = {
      padding: (config as any).contentArea.padding,
    };
  }

  return pdfConfig;
}
