import { C, inn } from "../lib/colors";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function JobsView({ jobs, live, loading }) {
  return (
    <Section title="Jobs — JobTread">
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: live ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {loading ? "Loading from JobTread..." : live ? "Live from JobTread Pave API" : "Not connected — check JOBTREAD_GRANT_KEY"}
        </span>
      </div>

      {jobs && jobs.length > 0 ? (
        <Row>
          {jobs.map((j) => (
            <div key={j.id} style={inn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.bright }}>{j.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>#{j.number}</div>
                </div>
                <span style={{
                  fontSize: 10, padding: "3px 10px", borderRadius: 8, fontWeight: 600,
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${C.bdr}`,
                  color: C.text, textTransform: "capitalize",
                }}>
                  {j.status}
                </span>
              </div>
            </div>
          ))}
        </Row>
      ) : (
        <div style={{ ...inn, textAlign: "center", padding: 32, color: C.dim, fontSize: 12 }}>
          {loading ? "Fetching jobs..." : "No job data available. Ensure the backend is running and JOBTREAD_GRANT_KEY is set in server/.env"}
        </div>
      )}
    </Section>
  );
}
