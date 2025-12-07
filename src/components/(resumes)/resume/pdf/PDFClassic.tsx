import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ResumeShape } from "@/types/resumeTemplate";

const styles = StyleSheet.create({
  page: { padding: 36, backgroundColor: "#FFFFFF", color: "#111827" },
  col: { flexDirection: "row" },
  left: {
    width: "33%",
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  right: { width: "67%", paddingLeft: 12 },
  h1: { fontSize: 22, fontWeight: 700, marginBottom: 2 },
  h2: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 3,
  },
  small: { fontSize: 9, color: "#6B7280" },
  p: { fontSize: 10, lineHeight: 1.35 },
  item: { marginBottom: 6 },
});

export function PDFClassic({
  data,
  accent,
}: {
  data: ResumeShape;
  accent: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.col}>
          {/* Left */}
          <View style={styles.left}>
            <Text style={styles.h1}>
              {data.personal.fullName || "Your Name"}
            </Text>
            {data.personal.designation ? (
              <Text style={[styles.small, { color: accent }]}>
                {data.personal.designation}
              </Text>
            ) : null}

            <View style={{ marginTop: 12 }}>
              <Text style={styles.h2}>Contact</Text>
              {data.contact.email ? (
                <Text style={styles.p}>{data.contact.email}</Text>
              ) : null}
              {data.contact.phone ? (
                <Text style={styles.p}>{data.contact.phone}</Text>
              ) : null}
              {data.contact.linkedin ? (
                <Text style={styles.p}>{data.contact.linkedin}</Text>
              ) : null}
              {data.contact.github ? (
                <Text style={styles.p}>{data.contact.github}</Text>
              ) : null}
              {data.contact.website ? (
                <Text style={styles.p}>{data.contact.website}</Text>
              ) : null}
            </View>

            {data.skills?.length ? (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.h2}>Skills</Text>
                {data.skills.map((s: any, i: number) => (
                  <Text key={i} style={styles.p}>
                    {s.name} {Number.isFinite(s.level) ? `— ${s.level}/5` : ""}
                  </Text>
                ))}
              </View>
            ) : null}

            {data.additional?.languages?.length ? (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.h2}>Languages</Text>
                {data.additional.languages.map((l: any, i: number) => (
                  <Text key={i} style={styles.p}>
                    {l.language}
                    {l.proficiency ? ` — ${l.proficiency}` : ""}
                  </Text>
                ))}
              </View>
            ) : null}

            {data.additional?.interests?.length ? (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.h2}>Interests</Text>
                <Text style={styles.p}>
                  {data.additional.interests.join(" • ")}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Right */}
          <View style={styles.right}>
            {data.personal.summary ? (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.h2}>Profile Summary</Text>
                <Text style={styles.p}>{data.personal.summary}</Text>
              </View>
            ) : null}

            {data.experience?.length ? (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.h2}>Work Experience</Text>
                {data.experience.map((e: any, i: number) => (
                  <View key={i} style={styles.item}>
                    <Text style={{ fontSize: 11, fontWeight: 600 }}>
                      {e.role} {e.company ? `— ${e.company}` : ""}
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
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.h2}>Education</Text>
                {data.education.map((ed: any, i: number) => (
                  <View key={i} style={styles.item}>
                    <Text style={{ fontSize: 11, fontWeight: 600 }}>
                      {ed.degree}
                      {ed.institution ? ` — ${ed.institution}` : ""}
                    </Text>
                    {ed.start || ed.end ? (
                      <Text style={styles.small}>
                        {ed.start || ""}
                        {ed.start || ed.end ? " - " : ""}
                        {ed.end || ""}
                      </Text>
                    ) : null}
                    {ed.description ? (
                      <Text style={styles.p}>{ed.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null}

            {data.projects?.length ? (
              <View>
                <Text style={styles.h2}>Projects</Text>
                {data.projects.map((p: any, i: number) => (
                  <View key={i} style={styles.item}>
                    <Text style={{ fontSize: 11, fontWeight: 600 }}>
                      {p.title}
                    </Text>
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
          </View>
        </View>
      </Page>
    </Document>
  );
}
