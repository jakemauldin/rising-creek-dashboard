import { C, inn } from "../lib/colors";
import { badge } from "../lib/helpers";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function CrewView({ agents, selAgent, setSelAgent }) {
  return (
    <Section title="Crew Activity">
      <Row>
        {agents.map((a) => (
          <div
            key={a.id}
            onClick={() => setSelAgent(a)}
            style={{
              ...inn, cursor: "pointer",
              borderColor: selAgent?.id === a.id ? a.color + "40" : C.bdr,
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}12`, border: `1px solid ${a.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{a.emoji}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{a.name}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{a.equipment}</div>
                </div>
              </div>
              <span style={badge(a.status)}>{a.status}</span>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#94A3B8" }}>{a.task}</p>
          </div>
        ))}
      </Row>
    </Section>
  );
}
