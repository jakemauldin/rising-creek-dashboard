import { C, inn } from "../lib/colors";
import { sv, badge, btnS } from "../lib/helpers";
import { INBOX } from "../lib/seed-data";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function InboxView({ addTL }) {
  return (
    <Section title="Document Inbox">
      <Row>
        {INBOX.map((item) => (
          <div key={item.id} style={inn}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ fontSize: 16, marginTop: 2 }}>
                  {item.type === "email" ? "📧" : item.type === "upload" ? "📎" : "🔗"}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{item.subject}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{item.from} · {item.received}</div>
                </div>
              </div>
              <span style={badge(item.status === "new" ? item.priority : item.status)}>{item.status}</span>
            </div>
            {item.status === "new" && (
              <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
                <button onClick={() => addTL(`Processing: ${item.subject}`)} style={btnS(true)}>Process</button>
                <button style={btnS(false)}>Archive</button>
              </div>
            )}
          </div>
        ))}
      </Row>
    </Section>
  );
}
