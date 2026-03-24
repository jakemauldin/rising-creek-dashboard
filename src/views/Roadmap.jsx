import { C, inn } from "../lib/colors";
import { sv, badge } from "../lib/helpers";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

const ROADMAP = [
  {
    phase: "Phase 1 — Foundation",
    status: "complete",
    items: [
      { name: "OpenClaw deployment (Docker)", status: "complete" },
      { name: "Cron job framework", status: "complete" },
      { name: "Health monitoring", status: "complete" },
      { name: "JobTread API integration", status: "complete" },
      { name: "Mission Control dashboard", status: "active" },
    ],
  },
  {
    phase: "Phase 2 — Intelligence Layer",
    status: "active",
    items: [
      { name: "Daily intelligence briefs", status: "active" },
      { name: "Expertise growth tracking", status: "active" },
      { name: "Live dashboard ↔ OpenClaw", status: "active" },
      { name: "WebSocket real-time push", status: "active" },
      { name: "Natural language dispatch", status: "active" },
    ],
  },
  {
    phase: "Phase 3 — Automation",
    status: "planned",
    items: [
      { name: "Auto pay app generation", status: "planned" },
      { name: "Vendor compliance auto-chase", status: "planned" },
      { name: "QBO auto-categorization", status: "planned" },
      { name: "Lead qualification pipeline", status: "planned" },
      { name: "Smart scheduling assistant", status: "planned" },
    ],
  },
  {
    phase: "Phase 4 — Scale",
    status: "planned",
    items: [
      { name: "Multi-project view", status: "planned" },
      { name: "Client portal", status: "planned" },
      { name: "Mobile app (PWA)", status: "planned" },
      { name: "Tailscale secure deployment", status: "planned" },
      { name: "Team member access controls", status: "planned" },
    ],
  },
];

export default function RoadmapView() {
  const totalItems = ROADMAP.flatMap((p) => p.items);
  const done = totalItems.filter((i) => i.status === "complete").length;
  const active = totalItems.filter((i) => i.status === "active").length;
  const pct = Math.round(((done + active * 0.5) / totalItems.length) * 100);

  return (
    <Section title="AI OS Roadmap">
      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: C.dim }}>{done}/{totalItems.length} complete · {active} in progress</span>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>{pct}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: "linear-gradient(90deg, #2A9D8F, #E8722A)", transition: "width 0.5s" }} />
        </div>
      </div>

      <Row gap={10}>
        {ROADMAP.map((phase) => {
          const phaseDone = phase.items.filter((i) => i.status === "complete").length;
          const phaseActive = phase.items.filter((i) => i.status === "active").length;
          return (
            <div key={phase.phase} style={inn}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.bright }}>{phase.phase}</div>
                <span style={badge(phase.status === "complete" ? "healthy" : phase.status === "active" ? "warning" : "medium")}>
                  {phase.status === "complete" ? "Done" : phase.status === "active" ? "In Progress" : "Planned"}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {phase.items.map((item) => {
                  const icon = item.status === "complete" ? "✓" : item.status === "active" ? "◉" : "○";
                  const color = item.status === "complete" ? "#2A9D8F" : item.status === "active" ? "#E8722A" : "#475569";
                  return (
                    <div key={item.name} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
                      <span style={{ color, fontSize: 11, fontWeight: 700, width: 14, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: 11, color: item.status === "complete" ? "#94A3B8" : C.bright }}>{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: C.dim }}>
                {phaseDone}/{phase.items.length} done{phaseActive > 0 ? ` · ${phaseActive} active` : ""}
              </div>
            </div>
          );
        })}
      </Row>
    </Section>
  );
}
