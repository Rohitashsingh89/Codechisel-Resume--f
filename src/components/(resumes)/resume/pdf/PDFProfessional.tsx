import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeShape } from "@/types/resumeTemplate";

// type ResumePDFProps = { data: ResumeShape; accent: string };

const styles = StyleSheet.create({
  page: { padding: 36, backgroundColor: "#FFFFFF", color: "#111827" },
  h1: { fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 4 },
  sub: {
    fontSize: 10,
    textAlign: "center",
    color: "#4F46E5",
    marginBottom: 12,
  },
  small: { fontSize: 9, color: "#4B5563" },
  p: { fontSize: 10, lineHeight: 1.35 },
  section: { marginBottom: 12 },
  bullet: { fontSize: 10, marginLeft: 8 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

function lighten(hex: string, ratio = 0.55) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16),
    g = parseInt(n.slice(2, 4), 16),
    b = parseInt(n.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * ratio);
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

export const PDFSplitHeading = ({
  text,
  left,
  right,
}: {
  text: string;
  left: string;
  right: string;
}) => {
  // Split text roughly in half
  const mid = Math.floor(text.length / 2);
  const leftText = text.slice(0, mid);
  const rightText = text.slice(mid);

  return (
    <View style={{ flexDirection: "row", marginBottom: 6 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: left,
        }}
      >
        {leftText}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: right,
        }}
      >
        {rightText}
      </Text>
    </View>
  );
};

export function PDFProfessional({
  data,
  accent,
}: {
  data: ResumeShape;
  accent: string;
}) {
  const accent2 = lighten(accent, 0.55);

  const has = {
    personal: Boolean(
      data?.personal?.fullName ||
        data?.personal?.designation ||
        data?.personal?.summary,
    ),
    contact: Boolean(
      data?.contact?.email ||
        data?.contact?.phone ||
        data?.contact?.linkedin ||
        data?.contact?.github ||
        data?.contact?.website ||
        data?.contact?.address,
    ),
    education: Array.isArray(data?.education) && data.education.length > 0,
    experience: Array.isArray(data?.experience) && data.experience.length > 0,
    projects: Array.isArray(data?.projects) && data.projects.length > 0,
    skills: Array.isArray(data?.skills) && data.skills.length > 0,
    certifications:
      Array.isArray(data?.certifications) && data.certifications.length > 0,
    languages:
      Array.isArray(data?.additional?.languages) &&
      data.additional.languages.length > 0,
    interests:
      Array.isArray(data?.additional?.interests) &&
      data.additional.interests.length > 0,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {(has.personal || has.contact) && (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#E5E7EB",
              paddingBottom: 8,
              marginBottom: 10,
            }}
          >
            <Text style={styles.h1}>
              {data?.personal?.fullName || "Your Name"}
            </Text>
            {data?.personal?.designation ? (
              <Text style={[styles.sub, { color: accent }]}>
                {data.personal.designation}
              </Text>
            ) : null}
            {has.contact ? (
              <View style={{ alignItems: "center" }}>
                <Text style={[styles.small, { textAlign: "center" }]}>
                  {[
                    data?.contact?.email,
                    data?.contact?.phone,
                    data?.contact?.linkedin,
                    data?.contact?.github,
                    data?.contact?.website,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </Text>
                {data?.contact?.address ? (
                  <Text style={[styles.small, { textAlign: "center" }]}>
                    {data.contact.address}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        )}

        {data?.personal?.summary ? (
          <View style={styles.section}>
            <PDFSplitHeading text="About Me" left={accent} right={accent2} />
            <Text style={styles.p}>{data.personal.summary}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <PDFSplitHeading text="Experience" left={accent} right={accent2} />
          {has.experience ? (
            data.experience.map((e: any, i: number) => (
              <View
                key={i}
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 4,
                  padding: 6,
                  marginBottom: 6,
                }}
              >
                <View style={styles.rowBetween}>
                  <Text style={{ fontSize: 11, fontWeight: 600 }}>
                    {(e?.role || "Role") +
                      (e?.company ? ` — ${e.company}` : "")}
                  </Text>
                  {e?.start || e?.end ? (
                    <Text style={[styles.small]}>
                      {(e?.start || "Start") + (e?.end ? ` - ${e?.end}` : "")}
                    </Text>
                  ) : null}
                </View>
                {e?.description ? (
                  <Text style={[styles.p, { marginTop: 3 }]}>
                    {e.description}
                  </Text>
                ) : null}
                {Array.isArray(e?.highlights) && e.highlights.length > 0
                  ? e.highlights.map((h: string, j: number) => (
                      <Text key={j} style={styles.bullet}>
                        • {h}
                      </Text>
                    ))
                  : null}
              </View>
            ))
          ) : (
            <Text style={[styles.p, { fontStyle: "italic", color: "#6B7280" }]}>
              Add your internships or roles with achievements and timelines.
            </Text>
          )}
        </View>

        {has.education ? (
          <View style={styles.section}>
            <PDFSplitHeading text="Education" left={accent} right={accent2} />
            {data.education.map((ed: any, i: number) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>
                  {(ed?.degree || "Degree") +
                    (ed?.institution ? ` — ${ed.institution}` : "")}
                </Text>
                {ed?.start || ed?.end ? (
                  <Text style={[styles.small, { marginTop: 1 }]}>
                    {(ed?.start || "Start") + (ed?.end ? ` - ${ed.end}` : "")}
                  </Text>
                ) : null}
                {ed?.description ? (
                  <Text style={[styles.p, { marginTop: 3 }]}>
                    {ed.description}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {has.projects ? (
          <View style={styles.section}>
            <PDFSplitHeading text="Projects" left={accent} right={accent2} />
            {data.projects.map((p: any, i: number) => (
              <View
                key={i}
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 4,
                  padding: 6,
                  marginBottom: 6,
                }}
              >
                <View style={styles.rowBetween}>
                  <Text style={{ fontSize: 11, fontWeight: 600 }}>
                    {p?.title || "Project"}
                  </Text>
                  {p?.github || p?.live ? (
                    <Text style={[styles.small]}>
                      {[p.github, p.live].filter(Boolean).join(" • ")}
                    </Text>
                  ) : null}
                </View>
                {p?.description ? (
                  <Text style={[styles.p, { marginTop: 3 }]}>
                    {p.description}
                  </Text>
                ) : null}
                {Array.isArray(p?.tech) && p.tech.length > 0 ? (
                  <Text style={[styles.small, { marginTop: 2 }]}>
                    {p.tech.join(" • ")}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {has.skills ? (
          <View style={styles.section}>
            <PDFSplitHeading text="Skills" left={accent} right={accent2} />
            <Text style={styles.p}>
              {data.skills
                .map(
                  (s: any) =>
                    `${s?.name || "Skill"}${Number.isFinite(s?.level) ? ` (${s.level}/5)` : ""}`,
                )
                .join(" • ")}
            </Text>
          </View>
        ) : null}

        {has.certifications ? (
          <View style={styles.section}>
            <PDFSplitHeading
              text="Certifications"
              left={accent}
              right={accent2}
            />
            {data.certifications.map((c: any, i: number) => (
              <Text key={i} style={styles.p}>
                {(c?.title || "Certificate") +
                  (c?.issuer ? ` — ${c.issuer}` : "") +
                  (c?.year ? ` (${c.year})` : "")}
              </Text>
            ))}
          </View>
        ) : null}

        {has.languages ? (
          <View style={styles.section}>
            <PDFSplitHeading text="Languages" left={accent} right={accent2} />
            <Text style={styles.p}>
              {data.additional.languages
                .map(
                  (l: any) =>
                    `${l?.language || "Language"}${l?.proficiency ? ` — ${l.proficiency}` : ""}`,
                )
                .join(" • ")}
            </Text>
          </View>
        ) : null}

        {has.interests ? (
          <View style={styles.section}>
            <PDFSplitHeading text="Activities" left={accent} right={accent2} />
            <Text style={styles.p}>
              {data.additional.interests
                .map((it: any) => (typeof it === "string" ? it : it?.label))
                .join(" • ")}
            </Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
