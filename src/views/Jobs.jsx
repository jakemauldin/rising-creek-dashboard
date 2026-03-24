import { C, inn } from "../lib/colors";
import { badge } from "../lib/helpers";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function JobsView({ jobs, live, loading }) {
  return (
    <Section title="Job Progress">
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: live ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {loading ? "Loading from JobTread..." : live ? "Live from JobTread" : "Using cached data"}
        </span>
      </div>
      <Row>
        {jobs.map((j) => (
          <div key={j.name} style={inn}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.bright }}>{j.name}</div>
                <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{j.client} · {j.phase}</div>
              </div>
              <span style={badge(j.status)}>{j.status}</span>
            </div>
            <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${j.pct}%`, borderRadius: 3, background: j.status === "delayed" ? "#F59E0B" : "#4A90D9", transition: "width 0.5s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: C.dim }}>
              <span>{j.pct}% complete</span>
              <span>{j.budget} budget · {j.spent} spent</span>
            </div>
            <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.03)", fontSize: 11, color: "#94A3B8" }}>Next: {j.nextMilestone}</div>
          </div>
        ))}
      </Row>
    </Section>
  );
}
