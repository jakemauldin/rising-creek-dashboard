import { C, inn } from "../lib/colors";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

function parseExpertise(md) {
  if (!md) return { domains: [], stats: {} };
  const domains = [];
  const stats = {};
  const lines = md.split("\n");
  let currentDomain = null;

  for (const line of lines) {
    // Parse domain headers
    if (line.startsWith("## ")) {
      if (currentDomain) domains.push(currentDomain);
      currentDomain = { name: line.replace(/^##\s+/, ""), items: [], level: 0 };
    }
    // Parse bullet items under domains
    else if (currentDomain && line.match(/^[-*]\s+/)) {
      currentDomain.items.push(line.replace(/^[-*]\s+/, ""));
    }
    // Parse stats lines like "Total domains: 12"
    else if (line.includes(":") && !line.startsWith("#")) {
      const [key, val] = line.split(":").map((s) => s.trim());
      if (key && val) stats[key] = val;
    }
  }
  if (currentDomain) domains.push(currentDomain);

  // Estimate expertise level from item count
  domains.forEach((d) => {
    d.level = Math.min(100, d.items.length * 12 + 20);
  });

  return { domains, stats };
}

export default function ExpertiseView({ expertise }) {
  const { domains, stats } = parseExpertise(expertise?.data);
  const isLive = expertise?.live;

  return (
    <Section title="Expertise Growth">
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: isLive ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {isLive ? "Live from OpenClaw workspace" : "Offline — connect OpenClaw to see growth"}
        </span>
      </div>

      {/* Stats summary */}
      {Object.keys(stats).length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginBottom: 14 }}>
          {Object.entries(stats).slice(0, 4).map(([key, val]) => (
            <div key={key} style={{ ...inn, padding: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: C.dim, textTransform: "uppercase" }}>{key}</div>
              <div style={{ marginTop: 4, fontSize: 17, fontWeight: 700, color: C.bright }}>{val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Domain cards */}
      {domains.length > 0 ? (
        <Row gap={8}>
          {domains.map((d, i) => (
            <div key={i} style={inn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{d.name}</div>
                <span className="mono" style={{ fontSize: 10, color: C.accent }}>{d.items.length} items</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${d.level}%`, borderRadius: 2, background: `linear-gradient(90deg, #E8722A, #F59E0B)`, transition: "width 0.5s" }} />
              </div>
              {d.items.length > 0 && (
                <div style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.6 }}>
                  {d.items.slice(0, 4).map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                      <span style={{ color: C.accent, flexShrink: 0 }}>·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                  {d.items.length > 4 && (
                    <div style={{ color: C.dim, marginTop: 4 }}>+{d.items.length - 4} more</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </Row>
      ) : (
        <div style={{ ...inn, textAlign: "center", padding: 32, color: C.dim, fontSize: 12 }}>
          {expertise?.loading ? "Loading expertise data..." : "No expertise data yet — OpenClaw builds this over time."}
        </div>
      )}
    </Section>
  );
}
