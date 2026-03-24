import { C, crd } from "../../lib/colors";

export const Section = ({ title, children }) => (
  <div style={crd}>
    <div style={{ padding: 22 }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: C.bright, margin: "0 0 14px" }}>{title}</h2>
      {children}
    </div>
  </div>
);
