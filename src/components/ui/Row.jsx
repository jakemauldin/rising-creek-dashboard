export const Row = ({ children, gap = 10 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
);
