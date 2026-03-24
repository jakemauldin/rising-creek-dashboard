import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { execDocker, execDockerJSON } from "./lib/docker.js";
import { getJobs } from "./lib/jobtread.js";
import dotenv from "dotenv";

dotenv.config({ path: join(import.meta.dirname, ".env") });
dotenv.config({ path: join(import.meta.dirname, "..", ".env") });

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3080;

app.use(cors());
app.use(express.json());

// ── Health: read latest health-*.log ─────────────────────────
app.get("/api/health", (_req, res) => {
  try {
    const logDir = join(homedir(), "services", "logs");
    const files = readdirSync(logDir)
      .filter((f) => f.startsWith("health-") && f.endsWith(".log"))
      .sort()
      .reverse();

    if (files.length === 0) {
      return res.json({ ok: false, fallback: true, error: "No health logs found" });
    }

    const content = readFileSync(join(logDir, files[0]), "utf-8");
    // Try to parse as JSON, otherwise return raw
    try {
      const data = JSON.parse(content);
      res.json({ ok: true, data, file: files[0] });
    } catch {
      res.json({ ok: true, data: content, file: files[0] });
    }
  } catch (err) {
    res.json({ ok: false, fallback: true, error: err.message });
  }
});

// ── Jobs: proxy to JobTread Pave API ─────────────────────────
app.get("/api/jobs", async (_req, res) => {
  const result = await getJobs();
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  res.json({ ok: true, data: result.data });
});

// ── OpenClaw status ──────────────────────────────────────────
app.get("/api/claw/status", (_req, res) => {
  const result = execDockerJSON("openclaw status --json");
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  res.json({ ok: true, data: result.data });
});

// ── OpenClaw insights ────────────────────────────────────────
app.get("/api/insights", (_req, res) => {
  const result = execDocker("cat /home/node/.openclaw/workspace/INSIGHTS.md");
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  res.json({ ok: true, data: result.data });
});

// ── OpenClaw expertise ───────────────────────────────────────
app.get("/api/expertise", (_req, res) => {
  const result = execDocker("cat /home/node/.openclaw/workspace/EXPERTISE.md");
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  res.json({ ok: true, data: result.data });
});

// ── OpenClaw crons ───────────────────────────────────────────
app.get("/api/crons", (_req, res) => {
  const result = execDockerJSON("cat /home/node/.openclaw/cron/jobs.json");
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  res.json({ ok: true, data: result.data });
});

// ── Intelligence daily brief ─────────────────────────────────
app.get("/api/intelligence/today", (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const result = execDocker(
    `cat /home/node/.openclaw/workspace/memory/intelligence/brief-${today}.md`
  );
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  res.json({ ok: true, data: result.data, date: today });
});

// ── Dispatch command to OpenClaw ─────────────────────────────
app.post("/api/claw/dispatch", (req, res) => {
  const { command } = req.body;
  if (!command || typeof command !== "string") {
    return res.status(400).json({ ok: false, error: "command is required" });
  }
  // Sanitize: allow only safe characters
  const sanitized = command.replace(/[^a-zA-Z0-9 _\-.,/'"@#:=]/g, "");
  const result = execDocker(`openclaw ${sanitized}`);
  if (!result.ok) {
    return res.json({ ok: false, error: result.error });
  }
  res.json({ ok: true, data: result.data });
});

// ── AI costs (parse from daily brief or dedicated file) ──────
app.get("/api/costs", (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const result = execDocker(
    `cat /home/node/.openclaw/workspace/memory/intelligence/brief-${today}.md`
  );
  if (!result.ok) {
    return res.json({ ok: false, fallback: true, error: result.error });
  }
  // Try to extract cost section from brief
  const costMatch = result.data.match(/## (?:Cost|Spend|Token)[\s\S]*?(?=\n## |\n$|$)/i);
  res.json({ ok: true, data: costMatch ? costMatch[0] : null, raw: result.data });
});

// ── WebSocket for real-time push ─────────────────────────────
const wss = new WebSocketServer({ server, path: "/ws" });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.send(JSON.stringify({ type: "connected", time: new Date().toISOString() }));

  ws.on("close", () => clients.delete(ws));
  ws.on("error", () => clients.delete(ws));
});

function broadcast(message) {
  const payload = JSON.stringify(message);
  for (const ws of clients) {
    if (ws.readyState === 1) ws.send(payload);
  }
}

// Periodic health poll → push to clients
let lastHealthHash = "";
setInterval(async () => {
  if (clients.size === 0) return;

  // Poll claw status
  const clawResult = execDockerJSON("openclaw status --json");
  if (clawResult.ok) {
    const hash = JSON.stringify(clawResult.data);
    if (hash !== lastHealthHash) {
      lastHealthHash = hash;
      broadcast({ type: "claw_update", data: clawResult.data, time: new Date().toISOString() });
    }
  }

  // Poll health logs
  try {
    const logDir = join(homedir(), "services", "logs");
    const files = readdirSync(logDir)
      .filter((f) => f.startsWith("health-") && f.endsWith(".log"))
      .sort()
      .reverse();
    if (files.length > 0) {
      const content = readFileSync(join(logDir, files[0]), "utf-8");
      broadcast({ type: "health_update", data: content, file: files[0], time: new Date().toISOString() });
    }
  } catch {
    // Silently ignore — health logs may not exist
  }
}, 30_000);

// ── Start ────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`⚡ Rising Creek API → http://localhost:${PORT}`);
  console.log(`   WebSocket → ws://localhost:${PORT}/ws`);
  console.log(`   JobTread key: ${process.env.JOBTREAD_GRANT_KEY ? "✓ loaded" : "✗ missing"}`);
  console.log(`   OpenClaw container: ${process.env.OPENCLAW_CONTAINER || "openclaw"}`);
});
