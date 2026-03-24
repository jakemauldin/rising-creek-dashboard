import { C, inn } from "../lib/colors";
import { AI_COSTS } from "../lib/seed-data";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function CostsView() {
  return (
    <Section title="AI Token Burn Rate">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { l: "Today", v: `$${AI_COSTS.today.total.toFixed(2)}` },
          { l: "Yesterday", v: `$${AI_COSTS.yesterday.total.toFixed(2)}` },
          { l: "Month-to-date", v: `$${AI_COSTS.mtd.total.toFixed(2)}` },
          { l: "Monthly Budget", v: `$${AI_COSTS.budget}`, sub: `${Math.round((AI_COSTS.mtd.total / AI_COSTS.budget) * 100)}% used` },
        ].map((c) => (
          <div key={c.l} style={{ ...inn, padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: C.dim, textTransform: "uppercase" }}>{c.l}</div>
            <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700, color: C.bright }}>{c.v}</div>
            {c.sub && <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{c.sub}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.bright, margin: "0 0 8px" }}>Model Breakdown (Today)</h3>
      <Row gap={4}>
        {AI_COSTS.breakdown.map((b) => (
          <div key={b.model} style={{ ...inn, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.bright }}>{b.model}</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{b.tokens} tokens</div>
            </div>
            <div style={{ width: 80, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${b.pct}%`, borderRadius: 3, background: C.accent }} />
            </div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: C.bright, width: 45, textAlign: "right" }}>{b.cost}</div>
          </div>
        ))}
      </Row>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.bright, margin: "14px 0 8px" }}>Top Workflows by Cost</h3>
      <Row gap={4}>
        {AI_COSTS.topWorkflows.map((w) => (
          <div key={w.name} style={{ ...inn, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.bright }}>{w.name}</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{w.model}</div>
            </div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: C.accent }}>{w.cost}</div>
          </div>
        ))}
      </Row>
    </Section>
  );
}
