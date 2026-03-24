import { C, inn } from "../lib/colors";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

function parseMarkdownSections(md) {
  if (!md) return [];
  const sections = [];
  const lines = md.split("\n");
  let current = null;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { title: line.replace(/^##\s+/, ""), lines: [] };
    } else if (line.startsWith("# ")) {
      if (current) sections.push(current);
      current = { title: line.replace(/^#\s+/, ""), lines: [], isH1: true };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

export default function IntelligenceView({ insights, intelligence, clawStatus }) {
  const insightSections = parseMarkdownSections(insights?.data);
  const briefSections = parseMarkdownSections(intelligence?.data);
  const isLive = insights?.live || intelligence?.live;

  return (
    <Section title="Intelligence Feed">
      {/* Connection status */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: isLive ? "#2A9D8F" : "#64748B",
          animation: isLive ? "pulse 2s infinite" : "none",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {isLive ? "Live from OpenClaw" : "Offline — showing cached data"}
        </span>
        {clawStatus?.live && clawStatus.data && (
          <span style={{
            fontSize: 9, padding: "2px 8px", borderRadius: 6,
            background: "rgba(42,157,143,0.08)", border: "1px solid rgba(42,157,143,0.25)",
            color: "#A7F3D0", marginLeft: "auto",
          }}>
            Claw: {typeof clawStatus.data === "object" ? (clawStatus.data.status || "active") : "active"}
          </span>
        )}
      </div>

      {/* Daily Brief */}
      {briefSections.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 10, letterSpacing: "0.05em" }}>
            DAILY BRIEF — {intelligence?.data?.date || new Date().toLocaleDateString()}
          </h3>
          <Row gap={8}>
            {briefSections.map((sec, i) => (
              <div key={i} style={{ ...inn, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.bright, marginBottom: 6 }}>{sec.title}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {sec.lines.join("\n").trim()}
                </div>
              </div>
            ))}
          </Row>
        </div>
      )}

      {/* Insights */}
      {insightSections.length > 0 ? (
        <Row gap={8}>
          {insightSections.map((sec, i) => (
            <div key={i} style={{ ...inn, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.bright, marginBottom: 6 }}>{sec.title}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {sec.lines.join("\n").trim()}
              </div>
            </div>
          ))}
        </Row>
      ) : (
        <div style={{ ...inn, textAlign: "center", padding: 32, color: C.dim, fontSize: 12 }}>
          {insights?.loading ? "Loading intelligence feed..." : "No insights available — OpenClaw will populate this as it works."}
        </div>
      )}
    </Section>
  );
}
