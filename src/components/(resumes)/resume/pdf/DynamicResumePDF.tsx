import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeShape } from "@/types/resumeTemplate";
import { PDFLayoutConfig } from "@/types/common";
import { hasSectionData } from "@/utils/pdfFilters";
import { JSX } from "react";
import { formatDate } from "@/utils/apiUtility";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    backgroundColor: "#FFFFFF",
  },
  headerName: {
    fontWeight: 700,
  },
  headerRole: {
    fontWeight: 500,
  },
  sectionTitle: {
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  sectionContent: {
    lineHeight: 1.4,
  },
});

type SectionRendererProps = {
  sectionKey: string;
  data: ResumeShape;
  config: PDFLayoutConfig;
  SectionHeading: ({ title }: { title: string }) => JSX.Element;
};

// ✅ Fixed SectionRenderer component
const SectionRenderer = ({
  sectionKey,
  data,
  config,
  SectionHeading,
}: SectionRendererProps) => {
  if (!sectionKey) return null;
  const { fonts, colors } = config;
  const key = sectionKey.toLowerCase();

  switch (key) {
    case "summary":
      if (!data.personal.summary?.trim()) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <SectionHeading title="Professional Summary" />
          <Text
            style={{
              fontSize: fonts.bodySize,
              color: colors.text,
              lineHeight: fonts.lineHeight,
            }}
          >
            {data.personal.summary}
          </Text>
        </View>
      );

    case "experience":
      if (!data.experience?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Work Experience
          </Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginTop: 8 }}>
              <Text
                style={{
                  fontSize: fonts.bodySize + 1,
                  fontWeight: 600,
                  color: colors.headingText,
                }}
              >
                {exp.role} — {exp.company}
              </Text>
              <Text
                style={{
                  fontSize: fonts.bodySize - 1,
                  color: colors.subText,
                  marginTop: 1,
                }}
              >
                {exp.start ? formatDate(exp.start) : ""} –{" "}
                {exp.end ? formatDate(exp.end) : "Present"}
              </Text>
              {exp.description && (
                <Text
                  style={[
                    styles.sectionContent,
                    {
                      fontSize: fonts.bodySize - 0.5,
                      color: colors.text,
                      marginTop: 2,
                    },
                  ]}
                >
                  {exp.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      );

    case "education":
      if (!data.education?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Education
          </Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text
                style={{
                  fontSize: fonts.bodySize,
                  fontWeight: 600,
                  color: colors.headingText,
                }}
              >
                {edu.degree} — {edu.institution}
              </Text>
              <Text
                style={{
                  fontSize: fonts.bodySize - 1,
                  color: colors.subText,
                }}
              >
                {edu.start ? formatDate(edu.start) : ""} –{" "}
                {edu.end ? formatDate(edu.end) : "Present"}
              </Text>
            </View>
          ))}
        </View>
      );

    case "skills":
      if (!data.skills?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Skills
          </Text>
          <Text
            style={[
              styles.sectionContent,
              { fontSize: fonts.bodySize, color: colors.text, marginTop: 4 },
            ]}
          >
            {data.skills.map((s) => s.name).join(" • ")}
          </Text>
        </View>
      );

    case "projects":
      if (!data.projects?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Projects
          </Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text
                style={{
                  fontSize: fonts.bodySize,
                  fontWeight: 600,
                  color: colors.headingText,
                }}
              >
                {proj.title}
              </Text>
              {proj.description && (
                <Text
                  style={[
                    styles.sectionContent,
                    {
                      fontSize: fonts.bodySize - 0.5,
                      color: colors.text,
                      marginTop: 2,
                    },
                  ]}
                >
                  {proj.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      );

    case "certifications":
      if (!data.certifications?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Certifications
          </Text>
          {data.certifications.map((cert, i) => (
            <Text
              key={i}
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              {cert.title} — {cert.issuer} ({cert.year})
            </Text>
          ))}
        </View>
      );

    case "languages":
      if (!data.additional?.languages?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Languages
          </Text>
          <Text
            style={[
              styles.sectionContent,
              { fontSize: fonts.bodySize, color: colors.text, marginTop: 4 },
            ]}
          >
            {data.additional.languages
              .map((l) => `${l.language} (${l.proficiency})`)
              .join(" • ")}
          </Text>
        </View>
      );

    case "contact":
      if (!data.contact) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Contact
          </Text>
          {data.contact.address && (
            <Text
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              {data.contact.address}
            </Text>
          )}
          {data.contact.email && (
            <Text
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              {data.contact.email}
            </Text>
          )}
          {data.contact.phone && (
            <Text
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              {data.contact.phone}
            </Text>
          )}
          {data.contact.linkedin && (
            <Text
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              LinkedIn: {data.contact.linkedin}
            </Text>
          )}
          {data.contact.github && (
            <Text
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              GitHub: {data.contact.github}
            </Text>
          )}
          {data.contact.website && (
            <Text
              style={{
                fontSize: fonts.bodySize,
                color: colors.text,
                marginTop: 2,
              }}
            >
              Website: {data.contact.website}
            </Text>
          )}
        </View>
      );

    case "tools":
      // Agar tu tools data additional me ya skills me store karta hai, uske hisaab se bind kar
      // Example: मान लो additional.interests ko tools ki tarah दिखाना hai:
      if (!data.additional?.interests?.length) return null;
      return (
        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: fonts.headingSize * 0.8, color: colors.headingText },
            ]}
          >
            Tools
          </Text>
          <Text
            style={[
              styles.sectionContent,
              { fontSize: fonts.bodySize, color: colors.text, marginTop: 4 },
            ]}
          >
            {data.additional.interests.join(" • ")}
          </Text>
        </View>
      );

    default:
      return null;
  }
};

export function DynamicResumePDF({
  data,
  pdfConfig,
}: {
  data: ResumeShape;
  pdfConfig: PDFLayoutConfig;
}) {
  const { page, header, layout, sectionStyle, backgroundLayout, contentArea } =
    pdfConfig;

  const leftSections =
    layout.leftColumnSections && layout.leftColumnSections.length
      ? layout.leftColumnSections
      : layout.sectionOrder;

  const rightSections = layout.rightColumnSections || [];

  const parseRatio = (ratio?: string): [number, number] => {
    if (!ratio) return [70, 30];
    const parts = ratio.split(":").map((x) => parseInt(x, 10));
    return [parts[0] || 70, parts[1] || 30];
  };
  const [leftRatio, rightRatio] = parseRatio(layout.columnRatio);
  const total = leftRatio + rightRatio;
  const leftFlex = leftRatio / total;
  const rightFlex = rightRatio / total;

  const padding = pdfConfig.page.paddings || pdfConfig.page.margins;

  const transformHeading = (title: string) => {
    if (!sectionStyle?.headingCase || sectionStyle.headingCase === "none") {
      return title;
    }
    if (sectionStyle.headingCase === "uppercase") return title.toUpperCase();
    if (sectionStyle.headingCase === "capitalize")
      return title.replace(/\b\w/g, (c) => c.toUpperCase());
    return title;
  };

  const SectionHeading = ({ title }: { title: string }) => (
    <View style={{ marginBottom: sectionStyle?.dividerSpacing ?? 6 }}>
      <Text
        style={{
          fontSize: pdfConfig.fonts.headingSize * 0.8,
          fontWeight: sectionStyle?.headingWeight ?? 600,
          color: pdfConfig.colors.headingText,
        }}
      >
        {transformHeading(title)}
      </Text>
      {sectionStyle?.showDivider && (
        <View
          style={{
            marginTop: 3,
            height: 1,
            backgroundColor: pdfConfig.colors.divider,
          }}
        />
      )}
    </View>
  );

  return (
    <Document>
      <Page
        size={page.size}
        style={{
          position: "relative",
          paddingTop: page.margins.top || page.paddings.top,
          paddingLeft: page.margins.left || page.paddings.left,
          paddingRight: page.margins.right || page.paddings.right,
          paddingBottom: page.margins.bottom || page.paddings.bottom,
        }}
      >
        {/* Dual tone background (simple version) */}
        {page.background === "dual-tone" && backgroundLayout && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: parseInt(backgroundLayout.ratio.split(":")[0], 10) || 1,
                backgroundColor: backgroundLayout.primaryColor,
              }}
            />
            <View
              style={{
                flex: parseInt(backgroundLayout.ratio.split(":")[1], 10) || 1,
                backgroundColor: backgroundLayout.secondaryColor,
              }}
            />
          </View>
        )}

        {/* HEADER */}
        <View
          style={{
            marginBottom: header.spacingBelow,
          }}
        >
          <Text
            style={{
              fontSize: header.nameSize,
              fontWeight: 700,
              textAlign: header.alignment,
              color: header.textColor || pdfConfig.colors.headingText,
            }}
          >
            {data.personal.fullName}
          </Text>
          {data.personal.designation && (
            <Text
              style={{
                fontSize: header.roleSize,
                textAlign: header.alignment,
                color: pdfConfig.colors.primary,
                marginTop: 2,
              }}
            >
              {data.personal.designation}
            </Text>
          )}
          {header.showDividerBelow && (
            <View
              style={{
                marginTop: 6,
                height: header.dividerStyle === "thin-line" ? 0.5 : 1,
                backgroundColor: pdfConfig.colors.divider,
              }}
            />
          )}
        </View>

        {/* DYNAMIC SECTIONS */}
        {layout.type === "two-column" ? (
          <View style={{ flexDirection: "row", gap: 12 }}>
            {/* LEFT */}
            <View style={{ flex: leftFlex }}>
              {leftSections
                .filter((key) => hasSectionData(key, data))
                .map((key) => (
                  <SectionRenderer
                    key={key}
                    sectionKey={key}
                    data={data}
                    config={pdfConfig}
                    SectionHeading={SectionHeading}
                  />
                ))}
            </View>
            {/* RIGHT */}
            <View style={{ flex: rightFlex, marginLeft: 12 }}>
              {rightSections
                .filter((key) => hasSectionData(key, data))
                .map((key) => (
                  <SectionRenderer
                    key={key}
                    sectionKey={key}
                    data={data}
                    config={pdfConfig}
                    SectionHeading={SectionHeading}
                  />
                ))}
            </View>
          </View>
        ) : (
          // SINGLE COLUMN
          <>
            {layout.sectionOrder
              .filter((key) => hasSectionData(key, data))
              .map((key) => (
                <SectionRenderer
                  key={key}
                  sectionKey={key}
                  data={data}
                  config={pdfConfig}
                  SectionHeading={SectionHeading}
                />
              ))}
          </>
        )}

        {/* FOOTER */}
        {pdfConfig.footer?.showPageNumber && (
          <View
            style={{
              position: "absolute",
              bottom: 16,
              left:
                pdfConfig.footer.alignment === "left"
                  ? padding.left
                  : pdfConfig.footer.alignment === "center"
                    ? 0
                    : undefined,
              right:
                pdfConfig.footer.alignment === "right"
                  ? padding.right
                  : undefined,
              width:
                pdfConfig.footer.alignment === "center" ? "100%" : undefined,
            }}
          >
            <Text
              style={{
                fontSize: pdfConfig.footer.textSize,
                textAlign: pdfConfig.footer.alignment,
                color: pdfConfig.footer.color,
              }}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
          </View>
        )}
      </Page>
    </Document>
  );
}
