import React from "react";
import {
  Document, Page, View, Text, StyleSheet
} from "@react-pdf/renderer";
import type { ResumeShape } from "@/types/resumeTemplate";

const styles = StyleSheet.create({
  page: { padding: 36, backgroundColor: "#FFFFFF", color: "#111827" },
  header: { borderBottomWidth: 1, borderBottomColor: "#E5E7EB", paddingBottom: 8, marginBottom: 10, textAlign: "center" },
  h1: { fontSize: 22, fontWeight: 700, marginBottom: 2 },
  sub: { fontSize: 10, color: "#4F46E5" },
  small: { fontSize: 9, color: "#6B7280" },
  p: { fontSize: 10, lineHeight: 1.35 },
  h2: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", marginBottom: 6 },
  grid: { flexDirection: "row", gap: 12 },
  colLeft: { width: "33%" },     // percent widths avoid wrap issues
  colRight: { width: "67%" },
  card: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 4, padding: 6, marginBottom: 6 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: 6 },
  bullet: { fontSize: 10, marginLeft: 8 },
  tag: { fontSize: 9, color: "#111827" },
});

function lighten(hex: string, ratio = 0.55) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0,2),16), g = parseInt(n.slice(2,4),16), b = parseInt(n.slice(4,6),16);
  const mix = (c:number)=> Math.round(c + (255 - c) * ratio);
  const toHex = (c:number)=> c.toString(16).padStart(2,'0');
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

export function PDFStudent({ data, accent }: { data: ResumeShape; accent: string }) {
  const accent2 = lighten(accent, 0.55);

  const has = {
    personal: Boolean(data?.personal?.fullName || data?.personal?.designation || data?.personal?.summary),
    contact: Boolean(data?.contact?.email || data?.contact?.phone || data?.contact?.linkedin || data?.contact?.github || data?.contact?.website || data?.contact?.address),
    education: Array.isArray(data?.education) && data.education.length > 0,
    projects: Array.isArray(data?.projects) && data.projects.length > 0,
    experience: Array.isArray(data?.experience) && data.experience.length > 0,
    skills: Array.isArray(data?.skills) && data.skills.length > 0,
    certifications: Array.isArray(data?.certifications) && data.certifications.length > 0,
    languages: Array.isArray(data?.additional?.languages) && data.additional.languages.length > 0,
    interests: Array.isArray(data?.additional?.interests) && data.additional.interests.length > 0,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {(has.personal || has.contact) && (
          <View style={styles.header}>
            <Text style={styles.h1}>{data?.personal?.fullName || "Your Name"}</Text>
            {data?.personal?.designation ? <Text style={[styles.sub, { color: accent }]}>{data.personal.designation}</Text> : null}
            {data?.personal?.summary ? <Text style={[styles.p, { marginTop: 6, textAlign: "center" }]}>{data.personal.summary}</Text> : null}
            {has.contact ? (
              <Text style={[styles.small, { marginTop: 6 }]}>
                {[data?.contact?.email, data?.contact?.phone, data?.contact?.linkedin, data?.contact?.github, data?.contact?.website]
                  .filter(Boolean).join(" • ")}
              </Text>
            ) : null}
            {data?.contact?.address ? <Text style={styles.small}>{data.contact.address}</Text> : null}
          </View>
        )}

        <View style={styles.grid}>
          {/* Left column */}
          <View style={styles.colLeft}>
            {has.education ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.h2}>Education</Text>
                {data.education.map((ed:any,i:number)=>(
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 11, fontWeight: 600 }}>
                      {(ed?.degree || "Degree") + (ed?.institution ? ` — ${ed.institution}` : "")}
                    </Text>
                    {(ed?.start || ed?.end) ? (
                      <Text style={[styles.small]}>{(ed?.start || "Start") + (ed?.end ? ` - ${ed.end}` : "")}</Text>
                    ) : null}
                    {ed?.description ? <Text style={[styles.p, { marginTop: 3 }]}>{ed.description}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null}

            {has.skills ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.h2}>Skills</Text>
                {data.skills.map((s:any,i:number)=>(
                  <Text key={i} style={styles.p}>
                    {s?.name || "Skill"}{Number.isFinite(s?.level) ? ` — ${s.level}/5` : ""}
                  </Text>
                ))}
              </View>
            ) : null}

            {has.certifications ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.h2}>Achievements</Text>
                {data.certifications.map((c:any,i:number)=>(
                  <Text key={i} style={styles.p}>
                    {(c?.title || "Certificate") + (c?.issuer ? ` — ${c.issuer}` : "") + (c?.year ? ` (${c.year})` : "")}
                  </Text>
                ))}
              </View>
            ) : null}

            {has.languages ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.h2}>Languages</Text>
                {data.additional.languages.map((l:any,i:number)=>(
                  <Text key={i} style={styles.p}>
                    {l?.language || "Language"}{l?.proficiency ? ` — ${l.proficiency}` : ""}
                  </Text>
                ))}
              </View>
            ) : null}

            {has.interests ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.h2}>Activities</Text>
                <Text style={styles.p}>{data.additional.interests.map((it:any)=> (typeof it==='string'? it : it?.label)).join(" • ")}</Text>
              </View>
            ) : null}
          </View>

          {/* Right column */}
          <View style={styles.colRight}>
            {has.projects ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.h2}>Projects</Text>
                {data.projects.map((p:any,i:number)=>(
                  <View key={i} style={styles.card}>
                    <View style={styles.rowBetween}>
                      <Text style={{ fontSize: 11, fontWeight: 600 }}>{p?.title || "Project"}</Text>
                      {(p?.github || p?.live) ? <Text style={styles.small}>{[p.github, p.live].filter(Boolean).join(" • ")}</Text> : null}
                    </View>
                    {p?.description ? <Text style={[styles.p, { marginTop: 3 }]}>{p.description}</Text> : null}
                    {Array.isArray(p?.tech) && p.tech.length ? (
                      <Text style={[styles.small, { marginTop: 2 }]}>{p.tech.join(" • ")}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null}

            {has.experience ? (
              <View>
                <Text style={styles.h2}>Internships & Experience</Text>
                {data.experience.map((e:any,i:number)=>(
                  <View key={i} style={styles.card}>
                    <View style={styles.rowBetween}>
                      <Text style={{ fontSize: 11, fontWeight: 600 }}>
                        {(e?.role || "Role") + (e?.company ? ` — ${e.company}` : "")}
                      </Text>
                      {(e?.start || e?.end) ? (
                        <Text style={styles.small}>{(e?.start || "Start") + (e?.end ? ` - ${e?.end}` : "")}</Text>
                      ) : null}
                    </View>
                    {e?.description ? <Text style={[styles.p, { marginTop: 3 }]}>{e.description}</Text> : null}
                    {Array.isArray(e?.highlights) && e.highlights.length ? (
                      e.highlights.map((h:string,j:number)=> <Text key={j} style={styles.bullet}>• {h}</Text>)
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
