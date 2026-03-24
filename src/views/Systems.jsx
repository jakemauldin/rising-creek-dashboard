import { C, inn } from "../lib/colors";
import { sv, badge, btnS } from "../lib/helpers";
import { SYSTEMS } from "../lib/seed-data";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function SystemsView({ crons, handleRunCron, healthData, cronsLive }) {
  return (
    <Section title="Systems Health">
      {/* Live indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: (healthData?.live || cronsLive) ? "#2A9D8F" : "#64748B",
        }} />
        <span style={{ fontSize: 10, color: C.dim }}>
          {healthData?.live ? "Live health monitoring" : cronsLive ? "Live cron data" : "Using cached data"}
        </span>
      </div>

      <Row>
        {SYSTEMS.map((s) => (
          <div key={s.name} style={inn}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{s.name}</div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 3 }}>Last {s.last}</div>
              </div>
              <span style={badge(s.status)}>{s.status}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 10 }}>
              {[
                { l: "Uptime", v: s.uptime },
                { l: "Latency", v: s.latency },
                { l: "Action", v: "Inspect", cl: C.accent },
              ].map((m) => (
                <div key={m.l} style={{ background: "rgba(12,16,23,0.5)", borderRadius: 8, padding: 8 }}>
                  <div style={{ fontSize: 9, color: C.dim }}>{m.l}</div>
                  <div style={{ marginTop: 2, fontSize: 13, fontWeight: 600, color: m.cl || C.bright }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Row>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.bright, margin: "16px 0 10px" }}>Cron Jobs</h3>
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
    </Section>
  );
}
