import { C, crd, inn } from "../lib/colors";
import { sv, btnS } from "../lib/helpers";
import { APPROVALS, AGENTS_INIT } from "../lib/seed-data";
import { Row } from "./ui/Row";

export default function DecisionQueue({ expandedApproval, setExpandedApproval, addTL }) {
  return (
    <div style={crd}>
      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: C.bright, margin: "0 0 12px" }}>Decision Queue</h2>
        <Row gap={8}>
          {APPROVALS.map((item) => {
            const st = sv(item.priority);
            const isExp = expandedApproval === item.id;
            const assignedAgent = AGENTS_INIT.find((a) => a.id === item.agent);
            return (
              <div key={item.id} style={{ ...inn, borderColor: isExp ? st.bdr : C.bdr, transition: "border-color 0.2s" }}>
                {/* Header row — always visible */}
                <div onClick={() => setExpandedApproval(isExp ? null : item.id)} style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.bright }}>{item.title}</div>
                      <div style={{ fontSize: 10, color: C.dim, marginTop: 3 }}>{item.impact}</div>
                    </div>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 6, background: st.bg, color: st.txt, fontWeight: 600 }}>{item.priority}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ fontSize: 10, color: C.dim }}>
                      Due {item.due}
                      {assignedAgent ? ` · ${assignedAgent.emoji} ${assignedAgent.name}` : ""}
                    </span>
                    <span style={{ fontSize: 10, color: isExp ? C.accent : C.dim, fontWeight: 500 }}>{isExp ? "▾ Hide plan" : "▸ View AI plan"}</span>
                  </div>
                </div>

                {/* Expanded gameplan */}
                {isExp && (
                  <div style={{ marginTop: 12, animation: "fadeIn 0.2s" }}>
                    {/* Summary */}
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(74,144,217,0.06)", border: "1px solid rgba(74,144,217,0.12)", marginBottom: 10 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#93C5FD", textTransform: "uppercase", marginBottom: 4 }}>AI Summary</div>
                      <div style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.6 }}>{item.summary}</div>
                    </div>

                    {/* Step-by-step plan */}
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: C.dim, textTransform: "uppercase", marginBottom: 8 }}>Execution Plan</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {item.plan.map((step) => {
                        const stepColor = step.status === "done" ? "#2A9D8F" : step.status === "in-progress" ? "#F59E0B" : step.status === "pending" ? "#64748B" : "#475569";
                        const stepLabel = step.status === "done" ? "✓" : step.status === "in-progress" ? "◉" : step.status === "pending" ? "○" : "◇";
                        return (
                          <div key={step.step} style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.02)", borderLeft: `3px solid ${stepColor}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <div style={{ color: stepColor, fontSize: 12, fontWeight: 700, flexShrink: 0, width: 14, textAlign: "center", marginTop: 1 }}>{stepLabel}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 11, fontWeight: 600, color: step.status === "done" ? "#94A3B8" : C.bright }}>{step.action}</div>
                              <div style={{ fontSize: 10, color: C.dim, marginTop: 2, lineHeight: 1.5 }}>{step.detail}</div>
                            </div>
                            <span className="mono" style={{ fontSize: 9, color: stepColor, fontWeight: 600, flexShrink: 0, textTransform: "uppercase" }}>{step.status}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Risk assessment */}
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)", marginTop: 10 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#FDE68A", textTransform: "uppercase", marginBottom: 4 }}>Risk Assessment</div>
                      <div style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.6 }}>{item.risk}</div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 6, marginTop: 12, justifyContent: "flex-end" }}>
                      <button onClick={() => { addTL(`Rejected: ${item.title}`); setExpandedApproval(null); }} style={{ ...btnS(false), color: "#FCA5A5", background: "rgba(220,38,38,0.08)" }}>Reject</button>
                      <button onClick={() => { addTL(`Sent back for revision: ${item.title}`); setExpandedApproval(null); }} style={btnS(false)}>Request Changes</button>
                      <button onClick={() => { addTL(`Approved: ${item.title} — AI executing plan`); setExpandedApproval(null); }} style={{ ...btnS(true), padding: "6px 20px" }}>✓ Approve &amp; Execute</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
