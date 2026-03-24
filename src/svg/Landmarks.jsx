export const Trailer = ({ x, y }) => (
  <g>
    <rect x={x - 4} y={y - 3} width={8} height={4.5} rx={0.5} fill="#3A3225" stroke="#5A5040" strokeWidth={0.15} />
    <rect x={x - 3.2} y={y - 2.2} width={2} height={1.3} rx={0.2} fill="#1A2535" stroke="#2A3545" strokeWidth={0.1} />
    <rect x={x + 0.5} y={y - 2.2} width={2} height={1.3} rx={0.2} fill="#1A2535" stroke="#2A3545" strokeWidth={0.1} />
    <rect x={x - 0.4} y={y - 0.5} width={0.8} height={1.5} rx={0.1} fill="#2A2520" />
    <rect x={x - 5} y={y + 1.5} width={1} height={1.5} fill="#5A5545" />
    <rect x={x + 4} y={y + 1.5} width={1} height={1.5} fill="#5A5545" />
  </g>
);

export const ServerRack = ({ x, y }) => (
  <g>
    <rect x={x - 2.5} y={y - 4} width={5} height={6} rx={0.4} fill="#1A1E27" stroke="#2A2F3A" strokeWidth={0.15} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={x - 1.8} y={y - 3.3 + i * 1.3} width={3.6} height={0.9} rx={0.15} fill="#12151C" stroke="#2A2F3A" strokeWidth={0.08} />
        <circle cx={x + 1.2} cy={y - 2.85 + i * 1.3} r={0.2} fill={i < 3 ? "#2A9D8F" : "#F59E0B"} />
      </g>
    ))}
  </g>
);

export const BuildingFrame = ({ x, y, progress: pr }) => {
  const p = Math.min(100, Math.max(0, pr));
  const h = 3 + (p / 100) * 9;
  const roof = p > 60;
  const win = p > 80;
  return (
    <g>
      <rect x={x - 6} y={y + 1} width={12} height={0.8} rx={0.2} fill="#3A3225" />
      <rect x={x - 5.5} y={y + 1 - h} width={0.7} height={h} fill="#4A90D9A0" />
      <rect x={x + 4.8} y={y + 1 - h} width={0.7} height={h} fill="#4A90D9A0" />
      {h > 5 && <rect x={x - 0.35} y={y + 1 - h} width={0.7} height={h} fill="#4A90D970" />}
      {h > 4 && <rect x={x - 5.5} y={y - 1} width={11} height={0.4} rx={0.1} fill="#4A90D960" />}
      {h > 7 && <rect x={x - 5.5} y={y - 4} width={11} height={0.4} rx={0.1} fill="#4A90D960" />}
      <rect x={x - 5} y={y + 1 - h * 0.9} width={10} height={h * 0.9} fill="#4A90D90A" stroke="#4A90D918" strokeWidth={0.1} rx={0.2} />
      {roof && (
        <polygon
          points={`${x - 6.5},${y + 1 - h} ${x},${y - 2 - h} ${x + 6.5},${y + 1 - h}`}
          fill="#4A90D925"
          stroke="#4A90D950"
          strokeWidth={0.2}
        />
      )}
      {win && (
        <>
          <rect x={x - 3.5} y={y - h + 3} width={1.8} height={1.5} rx={0.2} fill="#1A2535" stroke="#4A90D940" strokeWidth={0.1} />
          <rect x={x + 1.7} y={y - h + 3} width={1.8} height={1.5} rx={0.2} fill="#1A2535" stroke="#4A90D940" strokeWidth={0.1} />
        </>
      )}
    </g>
  );
};

export const Yard = ({ x, y }) => (
  <g>
    {[0, 1, 2].map((i) => (
      <rect key={i} x={x - 3 + i * 2.5} y={y - 1} width={1.8} height={0.8} rx={0.4} fill="#2A9D8F40" stroke="#2A9D8F30" strokeWidth={0.1} />
    ))}
    <rect x={x - 4} y={y + 2.5} width={8} height={0.5} rx={0.1} fill="#3A3225" />
  </g>
);
