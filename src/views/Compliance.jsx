import { C, inn } from "../lib/colors";
import { sv, btnS } from "../lib/helpers";
import { SUBS } from "../lib/seed-data";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function ComplianceView({ addTL }) {
  return (
    <Section title="Subcontractor Compliance">
      <Row>
        {SUBS.map((sub) => {
          const coiSt = sv(sub.coiStatus);
          return (
            <div key={sub.name} style={inn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.bright }}>{sub.name}</div>
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{sub.trade} · {sub.jobs.join(", ")}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 10 }}>
                <div style={{ background: "rgba(12,16,23,0.5)", borderRadius: 8, padding: 8 }}>
                  <div style={{ fontSize: 9, color: C.dim }}>COI</div>
                  <div style={{ marginTop: 2, fontSize: 11, fontWeight: 600, color: coiSt.txt }}>{sub.coi}</div>
                </div>
                <div style={{ background: "rgba(12,16,23,0.5)", borderRadius: 8, padding: 8 }}>
                  <div style={{ fontSize: 9, color: C.dim }}>Lien Waiver</div>
                  <div style={{ marginTop: 2, fontSize: 11, fontWeight: 600, color: sv(sub.waiver.toLowerCase()).txt }}>{sub.waiver}</div>
                </div>
                <div style={{ background: "rgba(12,16,23,0.5)", borderRadius: 8, padding: 8 }}>
                  <div style={{ fontSize: 9, color: C.dim }}>W-9</div>
                  <div style={{ marginTop: 2, fontSize: 11, fontWeight: 600, color: sub.w9 === "On file" ? "#A7F3D0" : "#FCA5A5" }}>{sub.w9}</div>
                </div>
              </div>
              {(sub.coiStatus === "expired" || sub.waiver === "Missing") && (
                <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
                  <button onClick={() => addTL(`Requested docs from ${sub.name}`)} style={btnS(true)}>Request Docs</button>
                </div>
              )}
            </div>
          );
        })}
      </Row>
    </Section>
  );
}
