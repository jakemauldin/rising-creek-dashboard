import { C, inn } from "../lib/colors";
import { WEATHER } from "../lib/seed-data";
import { Section } from "../components/ui/Card";
import { Row } from "../components/ui/Row";

export default function WeatherView() {
  return (
    <Section title="Fort Worth — 7 Day Forecast">
      <Row gap={6}>
        {WEATHER.map((d) => (
          <div key={d.day} style={{ ...inn, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 28, width: 40, textAlign: "center" }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.bright }}>{d.day}</div>
                <div style={{ fontSize: 11, color: C.dim }}>{d.condition} · {d.wind}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.bright }}>{d.high}°</div>
                <div style={{ fontSize: 12, color: C.dim }}>{d.low}°</div>
              </div>
              <div style={{ width: 50, textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: d.precip === "0%" ? "#A7F3D0" : parseInt(d.precip) > 50 ? "#FCA5A5" : "#FDE68A" }}>{d.precip}</div>
                <div style={{ fontSize: 9, color: C.dim }}>rain</div>
              </div>
            </div>
            {d.impact && (
              <div
                style={{
                  marginTop: 8, padding: "6px 10px", borderRadius: 8,
                  background: d.impact.includes("Good") ? "rgba(42,157,143,0.08)" : "rgba(220,38,38,0.08)",
                  border: `1px solid ${d.impact.includes("Good") ? "rgba(42,157,143,0.2)" : "rgba(220,38,38,0.2)"}`,
                  fontSize: 11, color: d.impact.includes("Good") ? "#A7F3D0" : "#FCA5A5",
                }}
              >
                ⚠ {d.impact}
              </div>
            )}
          </div>
        ))}
      </Row>
    </Section>
  );
}
