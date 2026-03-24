export const Rig = ({ type, color, x, y, facing }) => {
  const s = facing === "left" ? 1 : -1;
  const tr = `translate(${x},${y}) scale(${s * 0.22},0.22)`;
  const dk = color + "C0";
  const lt = color + "60";
  const g = "#0B0E13";

  if (type === "crane")
    return (
      <g transform={tr}>
        <rect x={-5} y={4} width={12} height={2.5} rx={1} fill={lt} />
        <rect x={-2} y={-3} width={6} height={7.5} rx={1} fill={color} />
        <rect x={-0.5} y={-1.5} width={3} height={2.5} rx={0.5} fill={g} opacity={0.5} />
        <rect x={2} y={-7} width={1.4} height={5} rx={0.3} fill={dk} />
        <rect x={-5} y={-8} width={9} height={1.3} rx={0.3} fill={color} />
        <line x1={-4} y1={-6.7} x2={-4} y2={-3} stroke={lt} strokeWidth={0.5} />
        <path d="M-5,-3Q-4,-1.5-3,-3" fill="none" stroke={lt} strokeWidth={0.6} />
      </g>
    );

  if (type === "dozer")
    return (
      <g transform={tr}>
        <rect x={-6} y={3} width={14} height={3.2} rx={1.6} fill={lt} />
        <circle cx={-4} cy={4.6} r={1.2} fill={color + "40"} />
        <circle cx={0} cy={4.6} r={1.2} fill={color + "40"} />
        <circle cx={4} cy={4.6} r={1.2} fill={color + "40"} />
        <rect x={-4} y={-1} width={10} height={4.5} rx={1} fill={color} />
        <rect x={1} y={-4} width={5} height={3.5} rx={0.8} fill={color} />
        <rect x={1.8} y={-3.2} width={3} height={1.8} rx={0.4} fill={g} opacity={0.5} />
        <rect x={-7} y={-1.5} width={2} height={5.5} rx={0.4} fill={dk} />
      </g>
    );

  if (type === "excavator")
    return (
      <g transform={tr}>
        <rect x={-5} y={3.5} width={11} height={3} rx={1.4} fill={lt} />
        <circle cx={-3} cy={5} r={1.1} fill={color + "40"} />
        <circle cx={1} cy={5} r={1.1} fill={color + "40"} />
        <circle cx={4.5} cy={5} r={1.1} fill={color + "40"} />
        <rect x={-3} y={-0.5} width={8} height={4.5} rx={1} fill={color} />
        <rect x={-2} y={-3.5} width={5} height={3.5} rx={0.8} fill={color} />
        <rect x={-1.2} y={-2.8} width={3} height={1.8} rx={0.4} fill={g} opacity={0.5} />
        <line x1={4} y1={-1} x2={7} y2={-5} stroke={dk} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={7} y1={-5} x2={5.5} y2={-8} stroke={color + "A0"} strokeWidth={1} strokeLinecap="round" />
        <path d="M4.5,-8.5L6.5,-8.5L7,-7L4,-7Z" fill={dk} />
      </g>
    );

  if (type === "mixer")
    return (
      <g transform={tr}>
        <circle cx={-3.5} cy={5.5} r={1.7} fill={lt} />
        <circle cx={4} cy={5.5} r={1.7} fill={lt} />
        <rect x={-5.5} y={2} width={12} height={2.2} rx={0.4} fill={color + "70"} />
        <rect x={-5.5} y={-2} width={5} height={4.5} rx={0.8} fill={color} />
        <rect x={-5} y={-1.2} width={3} height={1.8} rx={0.4} fill={g} opacity={0.5} />
        <ellipse cx={3} cy={0} rx={3.8} ry={2.8} fill={color} />
        <ellipse cx={3} cy={0} rx={3} ry={2.1} fill={dk} />
      </g>
    );

  if (type === "truck")
    return (
      <g transform={tr}>
        <circle cx={-3} cy={5} r={1.5} fill={lt} />
        <circle cx={4.5} cy={5} r={1.5} fill={lt} />
        <rect x={-5} y={0.5} width={12} height={3} rx={0.6} fill={color} />
        <rect x={-5} y={-3} width={5.5} height={3.8} rx={0.8} fill={color} />
        <rect x={-4.3} y={-2.2} width={3.2} height={1.8} rx={0.4} fill={g} opacity={0.5} />
        <rect x={1} y={-1} width={6} height={1.8} rx={0.3} fill={dk} />
        <rect x={-3.5} y={-3.8} width={3} height={0.6} rx={0.3} fill="#F59E0B" opacity={0.9} />
      </g>
    );

  if (type === "loader")
    return (
      <g transform={tr}>
        <circle cx={-3.5} cy={5} r={1.8} fill={lt} />
        <circle cx={4} cy={5} r={1.8} fill={lt} />
        <rect x={-2} y={-1} width={7} height={5} rx={1} fill={color} />
        <rect x={0} y={-4} width={5} height={3.5} rx={0.8} fill={color} />
        <rect x={0.8} y={-3.2} width={3} height={1.8} rx={0.4} fill={g} opacity={0.5} />
        <line x1={-2} y1={-1} x2={-6} y2={-2.5} stroke={dk} strokeWidth={0.9} strokeLinecap="round" />
        <line x1={-2} y1={0.5} x2={-6} y2={-0.5} stroke={dk} strokeWidth={0.9} strokeLinecap="round" />
        <path d="M-8,-3.5L-5.5,-3.5L-5,-0.5L-8.5,-0.5Z" fill={color + "E0"} />
      </g>
    );

  return null;
};
