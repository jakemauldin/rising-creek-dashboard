import { C, inn } from "../lib/colors";
import { Section } from "../components/ui/Card";
import { useCosts } from "../hooks/useLiveData";

export default function CostsView() {
  const { data, live, loading } = useCosts();

  return (
    <Section title="AI Costs">
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: live ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {loading ? "Loading cost data..." : live ? "Live from daily brief" : "No cost data — intelligence brief not available yet"}
        </span>
      </div>

      {live && data ? (
        <div style={inn}>
          <pre style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.6, whiteSpace: "pre-wrap", fontFamily: "'IBM Plex Mono', monospace" }}>
            {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <div style={{ ...inn, textAlign: "center", padding: 32, color: C.dim, fontSize: 12 }}>
          No cost data available. Cost tracking will populate from OpenClaw daily intelligence briefs.
        </div>
      )}
    </Section>
  );
}
