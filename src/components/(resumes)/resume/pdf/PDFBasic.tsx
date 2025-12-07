import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ResumeShape } from "@/types/resumeTemplate";

const styles = StyleSheet.create({
  page: { padding: 36, backgroundColor: "#FFFFFF", color: "#111827" },
  h1: { fontSize: 20, fontWeight: 700, marginBottom: 2 },
  tag: { fontSize: 10, color: "#6B7280", marginBottom: 10 },
  h2: { fontSize: 12, fontWeight: 700, marginBottom: 6 },
  small: { fontSize: 9, color: "#6B7280" },
  p: { fontSize: 10, lineHeight: 1.35 },
  section: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
  },
});

export function PDFBasic({
  data,
  accent,
}: {
  data: ResumeShape;
  accent: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{data.personal.fullName || "Your Name"}</Text>
        {data.personal.designation ? (
          <Text style={[styles.tag, { color: accent }]}>
            {data.personal.designation}
          </Text>
        ) : null}

        {data.personal.summary ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Summary</Text>
            <Text style={styles.p}>{data.personal.summary}</Text>
          </View>
        ) : null}

        {data.contact ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Contact</Text>
            <Text style={styles.p}>
              {[
                data.contact.email,
                data.contact.phone,
                data.contact.linkedin,
                data.contact.github,
                data.contact.website,
              ]
                .filter(Boolean)
                .join(" • ")}
            </Text>
            {data.contact.address ? (
              <Text style={styles.small}>{data.contact.address}</Text>
            ) : null}
          </View>
        ) : null}

        {data.experience?.length ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Work Experience</Text>
            {data.experience.map((e: any, i: number) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>
                  {e.role}
                  {e.company ? ` — ${e.company}` : ""}
                </Text>
                {e.start || e.end ? (
                  <Text style={styles.small}>
                    {e.start || ""}
                    {e.start || e.end ? " - " : ""}
                    {e.end || ""}
                  </Text>
                ) : null}
                {e.description ? (
                  <Text style={styles.p}>{e.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.education?.length ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Education</Text>
            {data.education.map((ed: any, i: number) => (
              <Text key={i} style={styles.p}>
                {ed.degree}
                {ed.institution ? ` — ${ed.institution}` : ""}{" "}
                {ed.start || ed.end
                  ? `(${ed.start || ""}${ed.start || ed.end ? " - " : ""}${ed.end || ""})`
                  : ""}
              </Text>
            ))}
          </View>
        ) : null}

        {data.projects?.length ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Projects</Text>
            {data.projects.map((p: any, i: number) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>{p.title}</Text>
                {p.description ? (
                  <Text style={styles.p}>{p.description}</Text>
                ) : null}
                {p.github || p.live ? (
                  <Text style={styles.small}>
                    {[p.github, p.live].filter(Boolean).join(" • ")}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills?.length ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Skills</Text>
            <Text style={styles.p}>
              {data.skills
                .map(
                  (s: any) =>
                    `${s.name}${Number.isFinite(s.level) ? ` (${s.level}/5)` : ""}`,
                )
                .join(" • ")}
            </Text>
          </View>
        ) : null}

        {!!data.certifications?.length && (
          <View style={styles.section}>
            <Text style={styles.h2}>Certifications</Text>
            {data.certifications.map((c: any, i: number) => (
              <Text key={i} style={styles.p}>
                {c.title}
                {c.issuer ? ` — ${c.issuer}` : ""}
                {c.year ? ` (${c.year})` : ""}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
