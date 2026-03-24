import { C, inn } from "../lib/colors";
import { sv, btnS } from "../lib/helpers";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function SystemsView({ crons, handleRunCron, healthData, cronsLive }) {
  const hasHealth = healthData?.live && healthData.data;
  const hasCrons = cronsLive && crons && crons.length > 0;

  return (
    <Section title="System Health">
      {/* Health status */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: hasHealth ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {hasHealth ? `Live — ${healthData.data.file || "health log"}` : "No health data — ensure ~/services/logs/ has health-*.log files"}
        </span>
      </div>

      {hasHealth ? (
        <div style={inn}>
          <pre style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.6, whiteSpace: "pre-wrap", fontFamily: "'IBM Plex Mono', monospace" }}>
            {typeof healthData.data === "string" ? healthData.data : JSON.stringify(healthData.data, null, 2)}
          </pre>
        </div>
      ) : (
        <div style={{ ...inn, textAlign: "center", padding: 24, color: C.dim, fontSize: 12 }}>
          No health data available.
        </div>
      )}

      {/* Cron Jobs */}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.bright, margin: "16px 0 10px" }}>Cron Jobs</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: hasCrons ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {hasCrons ? "Live from OpenClaw" : "No cron data — ensure OpenClaw container is running"}
        </span>
      </div>

      {hasCrons ? (
        <Row gap={4}>
          {crons.map((cr) => {
            const st = sv(cr.status);
            return (
              <div key={cr.id} style={{ ...inn, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                {cr.status === "run" ? (
                  <div style={{ width: 8, height: 8, border: "2px solid #4A90D9", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: C.bright }}>{cr.name}</span>
                  {cr.note && <span style={{ fontSize: 9, color: "#F59E0B", marginLeft: 6 }}>⚠ {cr.note}</span>}
                  {cr.schedule && <span className="mono" style={{ fontSize: 9, color: C.dim, marginLeft: 6 }}>{cr.schedule}</span>}
                </div>
                <span className="mono" style={{ fontSize: 9, color: C.dim }}>{cr.last}</span>
                <button onClick={() => handleRunCron(cr.id)} disabled={cr.status === "run"} style={{ ...btnS(false), fontSize: 10, padding: "3px 8px", opacity: cr.status === "run" ? 0.4 : 1 }}>
                  {cr.status === "run" ? "…" : "▶"}
                </button>
              </div>
            );
          })}
        </Row>
      ) : (
        <div style={{ ...inn, textAlign: "center", padding: 24, color: C.dim, fontSize: 12 }}>
          No cron data available.
        </div>
      )}
    </Section>
  );
}
