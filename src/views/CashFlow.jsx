import { C, inn } from "../lib/colors";
import { sv, badge, btnS } from "../lib/helpers";
import { QBO_UNCAT, RECON, CASH_ITEMS } from "../lib/seed-data";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function CashFlowView({ qboTab, setQboTab, addTL }) {
  return (
    <Section title="Cash Flow + QuickBooks">
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {[
          { k: "uncat", l: "Uncategorized Txns" },
          { k: "recon", l: "JT ↔ QBO Reconciliation" },
          { k: "aging", l: "Aging" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setQboTab(t.k)}
            style={{
              padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600, fontFamily: "inherit",
              background: qboTab === t.k ? C.accent : "rgba(255,255,255,0.04)",
              color: qboTab === t.k ? "#FFF" : C.dim,
            }}
          >
            {t.l}
          </button>
        ))}
      </div>

      {qboTab === "uncat" && (
        <Row>
          {QBO_UNCAT.map((tx) => (
            <div key={tx.id} style={inn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{tx.vendor}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{tx.date} · {tx.acct}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.accent }}>{tx.amount}</div>
              </div>
              <div style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, background: "rgba(74,144,217,0.06)", border: "1px solid rgba(74,144,217,0.15)" }}>
                <div style={{ fontSize: 10, color: C.dim }}>
                  Suggested: <span style={{ color: "#93C5FD", fontWeight: 600 }}>{tx.suggested}</span> <span style={{ color: C.dim }}>({tx.confidence})</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
                <button onClick={() => addTL(`Categorized: ${tx.vendor} → ${tx.suggested}`)} style={btnS(true)}>Accept</button>
                <button onClick={() => addTL(`Override: ${tx.vendor}`)} style={btnS(false)}>Override</button>
                <button style={btnS(false)}>Skip</button>
              </div>
            </div>
          ))}
        </Row>
      )}

      {qboTab === "recon" && (
        <Row>
          {RECON.map((r, i) => {
            const st = sv(r.status);
            return (
              <div key={i} style={{ ...inn, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.bright }}>{r.item}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{r.job}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.bright }} className="mono">JT: {r.jt}</div>
                  <div style={{ fontSize: 11, color: r.status === "missing" ? "#FCA5A5" : r.status === "mismatch" ? "#FDE68A" : C.bright }} className="mono">
                    QBO: {r.qbo}
                    {r.delta && <span style={{ color: "#FCA5A5", marginLeft: 4 }}>{r.delta}</span>}
                  </div>
                </div>
                <span style={badge(r.status)}>{r.status}</span>
              </div>
            );
          })}
        </Row>
      )}

      {qboTab === "aging" && (
        <Row>
          {CASH_ITEMS.map((item) => (
            <div key={item.job} style={inn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{item.job}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{item.age}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.accent }}>{item.amount}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ ...badge(item.status === "overdue" ? "critical" : item.status === "waiting" ? "warning" : "healthy"), color: item.color }}>{item.status}</span>
                <button onClick={() => addTL(`Opened: ${item.job}`)} style={btnS(false)}>Open</button>
              </div>
            </div>
          ))}
        </Row>
      )}
    </Section>
  );
}
