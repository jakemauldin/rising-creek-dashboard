import { useState, useEffect, useRef } from "react";
import { C } from "../lib/colors";
import { btnS } from "../lib/helpers";
import { IconSend } from "./Icons";
import { dispatchCommand } from "../hooks/useLiveData";

const HISTORY_KEY = "rc-dispatch-history";

export default function CommandBar({ onDispatch, connected }) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
    catch { return []; }
  });
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);

  // Ctrl+K to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSend = async () => {
    const cmd = input.trim();
    if (!cmd) return;

    // Add to local timeline regardless
    onDispatch(cmd);
    setInput("");
    setHistIdx(-1);

    // Save to history
    const newHist = [cmd, ...history.filter((h) => h !== cmd)].slice(0, 20);
    setHistory(newHist);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHist));

    // Try live dispatch
    if (connected) {
      setSending(true);
      setResult(null);
      const res = await dispatchCommand(cmd);
      setSending(false);
      setResult(res);
      setTimeout(() => setResult(null), 5000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    } else if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); setHistIdx(-1); }}
            onKeyDown={handleKeyDown}
            placeholder={connected ? "Dispatch to OpenClaw… (Ctrl+K)" : "Dispatch a task… (Ctrl+K)"}
            style={{
              width: "100%", padding: "10px 14px", paddingRight: 60, borderRadius: 8,
              border: `1px solid ${C.bdr}`, background: "rgba(255,255,255,0.04)",
              color: C.bright, fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", outline: "none",
            }}
          />
          {connected && (
            <div style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2A9D8F" }} />
              <span style={{ fontSize: 8, color: "#2A9D8F", fontWeight: 600 }}>LIVE</span>
            </div>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={sending}
          style={{ ...btnS(true), padding: "10px 16px", display: "flex", alignItems: "center", gap: 5, opacity: sending ? 0.6 : 1 }}
        >
          {sending ? (
            <div style={{ width: 13, height: 13, border: "2px solid #FFF", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          ) : (
            <IconSend size={13} />
          )}
          Dispatch
        </button>
      </div>

      {/* Result toast */}
      {result && (
        <div style={{
          marginTop: 6, padding: "6px 12px", borderRadius: 8, fontSize: 11,
          background: result.ok ? "rgba(42,157,143,0.08)" : "rgba(220,38,38,0.08)",
          border: `1px solid ${result.ok ? "rgba(42,157,143,0.25)" : "rgba(220,38,38,0.25)"}`,
          color: result.ok ? "#A7F3D0" : "#FCA5A5",
          animation: "fadeIn 0.2s",
        }}>
          {result.ok ? `✓ ${result.data?.slice(0, 120) || "Dispatched"}` : `✗ ${result.error}`}
        </div>
      )}
    </div>
  );
}
