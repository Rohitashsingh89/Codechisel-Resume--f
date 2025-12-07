import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ResumeShape } from "@/types/resumeTemplate";

const styles = StyleSheet.create({
  page: { padding: 36, backgroundColor: "#FFFFFF", color: "#111827" },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  h1: { fontSize: 20, fontWeight: 700 },
  h2: { fontSize: 12, fontWeight: 700, marginBottom: 6 },
  small: { fontSize: 9, color: "#6B7280" },
  p: { fontSize: 10, lineHeight: 1.35 },
  section: { marginBottom: 12 },
});

export function PDFMinimal({
  data,
  accent,
}: {
  data: ResumeShape;
  accent: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.h1}>{data.personal.fullName || "Your Name"}</Text>
          {data.personal.designation ? (
            <Text style={[styles.small, { color: accent }]}>
              {data.personal.designation}
            </Text>
          ) : null}
          <Text style={styles.small}>
            {[data.contact.email, data.contact.phone, data.contact.linkedin]
              .filter(Boolean)
              .join(" • ")}
          </Text>
        </View>

        {data.personal.summary ? (
          <View style={styles.section}>
            <Text style={styles.h2}>About Me</Text>
            <Text style={styles.p}>{data.personal.summary}</Text>
          </View>
        ) : null}

        {data.experience?.length ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Experience</Text>
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
                {ed.degree} {ed.institution ? `— ${ed.institution}` : ""}{" "}
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
              {data.skills.map((s: any) => s.name).join(" • ")}
            </Text>
          </View>
        ) : null}

        <View style={styles.section}>
          {!!data.additional?.languages?.length && (
            <>
              <Text style={styles.h2}>Languages</Text>
              <Text style={styles.p}>
                {data.additional.languages
                  .map((l: any) => l.language)
                  .join(", ")}
              </Text>
            </>
          )}
          {!!data.additional?.interests?.length && (
            <>
              <Text style={[styles.h2, { marginTop: 6 }]}>Interests</Text>
              <Text style={styles.p}>
                {data.additional.interests.join(", ")}
              </Text>
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}
