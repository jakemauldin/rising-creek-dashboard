import { C, crd, inn } from "../lib/colors";

export default function Timeline({ timeline, wsConnected }) {
  return (
    <div style={crd}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: C.bright, margin: 0 }}>Timeline</h2>
          {wsConnected && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2A9D8F", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 9, color: "#A7F3D0", fontWeight: 600 }}>LIVE</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 300, overflowY: "auto" }}>
          {timeline.map((ev, i) => (
            <div key={i} style={{ ...inn, display: "flex", gap: 8, alignItems: "flex-start", padding: "8px 10px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: ev.type === "warn" ? "#F59E0B" : ev.type === "action" ? C.accent : "#475569" }} />
              <div>
                <span className="mono" style={{ fontSize: 9, color: C.dim }}>{ev.t}</span>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1, lineHeight: 1.5 }}>{ev.msg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
