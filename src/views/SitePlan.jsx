import { C, crd } from "../lib/colors";
import { btnS } from "../lib/helpers";
import { STATIONS } from "../lib/seed-data";
import { Rig } from "../svg/Equipment";
import { Trailer, ServerRack, BuildingFrame, Yard } from "../svg/Landmarks";

export default function SitePlan({ agents, pos, selAgent, setSelAgent, buildProg, paused, setPaused, liveCount, healthData }) {
  return (
    <div style={crd}>
      <div style={{ padding: "16px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: C.bright, margin: 0 }}>Overhead Site Plan</h2>
        </div>
        <button onClick={() => setPaused(!paused)} style={btnS(false)}>
          {paused ? "▶ Resume" : "⏸"}
        </button>
      </div>
      <div style={{ padding: "0 12px 12px" }}>
        <div
          style={{
            position: "relative", width: "100%", paddingBottom: "48%", minHeight: 300,
            borderRadius: 16, overflow: "hidden", border: `1px solid ${C.bdr}`,
            background: "radial-gradient(circle at top,rgba(31,41,55,0.95),rgba(2,6,23,1) 65%)",
          }}
        >
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "48%", background: "linear-gradient(to bottom,rgba(120,53,15,0.12),rgba(120,53,15,0.3))" }} />
          <svg viewBox="0 0 100 62" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} onClick={() => setSelAgent(null)}>
            <path d="M0,56 Q25,53 50,54 Q75,55 100,53 L100,62 L0,62Z" fill="rgba(26,24,18,0.5)" />
            <path d="M4,56 Q14,53 24,52 Q34,50 46,48 Q56,47 66,50 Q76,52 92,54" fill="none" stroke="rgba(30,26,18,0.7)" strokeWidth={2.2} strokeLinecap="round" />

            {STATIONS.map((st) => (
              <g key={st.id}>
                <text x={st.x} y={st.y + 7.5} textAnchor="middle" fill={st.color + "60"} fontSize="1.2" fontFamily="IBM Plex Sans" fontWeight="700" letterSpacing="0.04">{st.label.toUpperCase()}</text>
                <text x={st.x} y={st.y + 9} textAnchor="middle" fill="#3A3F4A" fontSize="0.75" fontFamily="IBM Plex Mono">{st.desc}</text>
              </g>
            ))}

            <Trailer x={8} y={52} />
            <ServerRack x={24} y={47} />
            <BuildingFrame x={46} y={42} progress={buildProg} />
            <Yard x={66} y={46} />

            {/* Flag at Outbound station */}
            <g>
              <rect x={84.8} y={46.5} width={0.4} height={3.5} fill="#5A5545" />
              <polygon points="82.5,45 87.5,46.5 82.5,48" fill="#8B5CF625" stroke="#8B5CF640" strokeWidth={0.15} />
            </g>

            <text x={46} y={33} textAnchor="middle" fill="#4A90D9" fontSize="1.4" fontFamily="IBM Plex Sans" fontWeight="800">ACTIVE BUILD</text>
            <text x={46} y={34.6} textAnchor="middle" fill="#4A90D950" fontSize="0.85" fontFamily="IBM Plex Mono">{Math.round(buildProg)}% complete</text>

            <line x1={4} y1={60.5} x2={96} y2={60.5} stroke="rgba(42,47,58,0.4)" strokeWidth={0.12} />
            <polygon points="96,60.5 94,60 94,61" fill="rgba(42,47,58,0.4)" />
            <text x={4} y={59.8} fill="#2A2F3A" fontSize="0.7" fontFamily="IBM Plex Sans" fontWeight="600">DONE</text>
            <text x={93} y={59.8} fill="#2A2F3A" fontSize="0.7" fontFamily="IBM Plex Sans" fontWeight="600" textAnchor="end">FUTURE</text>

            {/* Live Pulse overlay */}
            <rect x={73} y={2} width={25} height={20} rx={1.5} fill="rgba(12,16,23,0.88)" stroke={C.bdr} strokeWidth={0.15} />
            <text x={74.5} y={5} fill={C.dim} fontSize="0.8" fontFamily="IBM Plex Sans" fontWeight="700" letterSpacing="0.1">LIVE PULSE</text>
            {[
              { l: "Active workflows", v: "18", cl: C.bright, yo: 0 },
              { l: "Needs decision", v: "2", cl: "#FDE68A", yo: 1 },
              { l: "Live sources", v: `${liveCount || 0}`, cl: liveCount > 0 ? "#A7F3D0" : "#FCA5A5", yo: 2 },
              { l: "Cash pressure", v: "$72.3k", cl: C.accent, yo: 3 },
            ].map((r) => (
              <g key={r.l}>
                <rect x={74} y={6.5 + r.yo * 3.6} width={23} height={3} rx={0.6} fill="rgba(255,255,255,0.03)" />
                <text x={75} y={8.5 + r.yo * 3.6} fill={C.dim} fontSize="0.75" fontFamily="IBM Plex Sans">{r.l}</text>
                <text x={96} y={8.5 + r.yo * 3.6} textAnchor="end" fill={r.cl} fontSize="0.8" fontFamily="IBM Plex Sans" fontWeight="700">{r.v}</text>
              </g>
            ))}

            {/* Agents */}
            {agents.map((ag) => {
              const p2 = pos[ag.id];
              if (!p2) return null;
              const sel = selAgent?.id === ag.id;
              const mv = p2.tx !== null;
              const wk = ag.status === "active";
              return (
                <g key={ag.id} onClick={(e) => { e.stopPropagation(); setSelAgent(ag); }} style={{ cursor: "pointer" }}>
                  {sel && <circle cx={p2.x} cy={p2.y} r={4.5} fill={ag.color + "08"} stroke={ag.color + "20"} strokeWidth={0.15} />}
                  {wk && !mv && (
                    <circle cx={p2.x} cy={p2.y} r={0} fill="none" stroke={ag.color + "18"} strokeWidth={0.12}>
                      <animate attributeName="r" from="1.5" to="4.5" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <Rig type={ag.rig} color={ag.color} x={p2.x} y={p2.y} facing={p2.facing || "right"} />
                  <text x={p2.x} y={p2.y + 3.5} textAnchor="middle" fill={sel ? ag.color : "#505868"} fontSize={sel ? "1.1" : "0.9"} fontWeight={sel ? "700" : "500"} fontFamily="IBM Plex Sans">{ag.name}</text>
                  {sel && !mv && (
                    <g>
                      <rect x={p2.x - 14} y={p2.y - 8} width={28} height={4} rx={0.8} fill="rgba(12,16,23,0.92)" stroke={ag.color + "25"} strokeWidth={0.12} />
                      <text x={p2.x - 13} y={p2.y - 6.2} fill={C.dim} fontSize="0.7" fontFamily="IBM Plex Sans" fontWeight="600">{ag.emoji} {ag.name}</text>
                      <text x={p2.x - 13} y={p2.y - 4.8} fill="#94A3B8" fontSize="0.8" fontFamily="IBM Plex Mono">{ag.task.length > 50 ? ag.task.slice(0, 50) + "…" : ag.task}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
