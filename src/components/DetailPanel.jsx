import { C, crd, inn } from "../lib/colors";
import { sv, badge } from "../lib/helpers";
import { STATIONS } from "../lib/seed-data";

export default function DetailPanel({ selAgent, pos, clawStatus }) {
  const selSv = selAgent ? sv(selAgent.status) : sv("medium");
  const recAction = selAgent
    ? selAgent.status === "blocked"
      ? `${selAgent.name} is blocked. Unblock by resolving the dependency.`
      : selAgent.status === "review"
        ? `${selAgent.name} needs a review decision. Check the Decision Queue.`
        : selAgent.status === "observing"
          ? `${selAgent.name} is observing. Dispatch a task when ready.`
          : `${selAgent.name} is working. No action needed.`
    : "Select an agent.";

  return (
    <div style={crd}>
      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: C.bright, margin: "0 0 12px" }}>Detail Panel</h2>
        {selAgent ? (
          <div style={inn}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: C.dim, textTransform: "uppercase" }}>Selected</div>
                <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: C.bright }}>{selAgent.name}</div>
                <div style={{ marginTop: 2, fontSize: 10, color: C.dim }}>
                  {selAgent.equipment} · {STATIONS.find((s) => s.id === (pos[selAgent.id]?.station || selAgent.home))?.label}
                </div>
              </div>
              <span style={badge(selAgent.status)}>{selAgent.status}</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 9, color: C.dim }}>Task</div>
              <div style={{ marginTop: 2, fontSize: 12, color: "#E2E8F0", lineHeight: 1.5 }}>{selAgent.task}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}>
              <div style={{ background: "rgba(12,16,23,0.5)", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 9, color: C.dim }}>Today</div>
                <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700, color: C.bright }}>{selAgent.completedToday}</div>
              </div>
              <div style={{ background: "rgba(12,16,23,0.5)", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 9, color: C.dim }}>Station</div>
                <div style={{ marginTop: 2, fontSize: 12, fontWeight: 600, color: selAgent.color }}>
                  {STATIONS.find((s) => s.id === (pos[selAgent.id]?.station || selAgent.home))?.label}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ ...inn, textAlign: "center", padding: 24, color: C.dim, fontSize: 12 }}>Click an agent to see details</div>
        )}
        <div style={{ ...inn, marginTop: 8 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: C.dim, textTransform: "uppercase" }}>Recommended</div>
          <div style={{ marginTop: 5, fontSize: 11, color: "#94A3B8", lineHeight: 1.5 }}>{recAction}</div>
        </div>

        {/* OpenClaw status when available */}
        {clawStatus?.live && clawStatus.data && (
          <div style={{ ...inn, marginTop: 8, borderColor: "rgba(232,114,42,0.2)" }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: C.accent, textTransform: "uppercase" }}>OpenClaw Status</div>
            <div style={{ marginTop: 5, fontSize: 11, color: "#94A3B8", lineHeight: 1.5 }}>
              {typeof clawStatus.data === "object"
                ? Object.entries(clawStatus.data).slice(0, 5).map(([k, v]) => (
                    <div key={k}><span style={{ color: C.dim }}>{k}:</span> <span className="mono">{String(v)}</span></div>
                  ))
                : String(clawStatus.data).slice(0, 200)
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
