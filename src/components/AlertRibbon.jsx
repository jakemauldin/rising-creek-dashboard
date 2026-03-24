import { C, crd } from "../lib/colors";
import { sv, btnS } from "../lib/helpers";
import { IconAlert, IconX } from "./Icons";

export default function AlertRibbon({ alerts, setAlerts, addTL }) {
  if (alerts.length === 0) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 8 }}>
      {alerts.map((al) => {
        const st = sv(al.sev);
        return (
          <div key={al.id} style={{ ...crd, padding: 14, borderColor: st.bdr, background: st.bg, animation: "fadeIn 0.3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: st.txt }}>
                  <IconAlert size={13} />
                  {al.title}
                </div>
                <p style={{ margin: "5px 0 0", fontSize: 11, color: C.dim, lineHeight: 1.5 }}>{al.detail}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 5, border: `1px solid ${C.bdr}`, color: C.text }}>{al.zone}</span>
                  <button onClick={() => addTL(`${al.action} → ${al.title}`)} style={btnS(false)}>{al.action}</button>
                </div>
              </div>
              <button onClick={() => setAlerts((p) => p.filter((a) => a.id !== al.id))} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim, padding: 2 }}>
                <IconX size={12} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
