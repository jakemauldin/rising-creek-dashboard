import { useApi } from "./useApi";
import {
  SYSTEMS, CRONS_INIT, JOBS, AI_COSTS,
  AGENTS_INIT, ALERTS_INIT, TIMELINE_INIT
} from "../lib/seed-data";

// ── Health / Systems ─────────────────────────────────────────
export function useHealth() {
  return useApi("/api/health", null, { interval: 60_000 });
}

// ── Jobs from JobTread ───────────────────────────────────────
export function useJobs() {
  const result = useApi("/api/jobs", null, { interval: 120_000 });

  // Transform JobTread response → match seed data shape
  const jobs = result.live && result.data?.jobs?.nodes
    ? result.data.jobs.nodes.map((j) => ({
        id: j.id,
        name: j.name,
        client: j.customer?.name || "—",
        phase: j.status || "Active",
        pct: j.estimatedRevenue > 0
          ? Math.round((j.actualRevenue / j.estimatedRevenue) * 100)
          : 0,
        budget: formatCurrency(j.estimatedRevenue),
        spent: formatCurrency(j.actualCost),
        status: mapJTStatus(j.status),
        nextMilestone: j.endDate
          ? `Target: ${new Date(j.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
          : "—",
        _raw: j,
      }))
    : JOBS;

  return { ...result, jobs };
}

function formatCurrency(cents) {
  if (!cents && cents !== 0) return "—";
  const val = cents / 100;
  if (val >= 1000) return `$${Math.round(val / 1000)}K`;
  return `$${val.toLocaleString()}`;
}

function mapJTStatus(status) {
  if (!status) return "on-track";
  const s = status.toLowerCase();
  if (s.includes("hold") || s.includes("delay")) return "delayed";
  if (s.includes("complete") || s.includes("close")) return "complete";
  return "on-track";
}

// ── OpenClaw status ──────────────────────────────────────────
export function useClawStatus() {
  return useApi("/api/claw/status", null, { interval: 30_000 });
}

// ── Intelligence ─────────────────────────────────────────────
export function useInsights() {
  return useApi("/api/insights", null, { interval: 300_000 });
}

export function useExpertise() {
  return useApi("/api/expertise", null, { interval: 300_000 });
}

export function useIntelligence() {
  return useApi("/api/intelligence/today", null, { interval: 300_000 });
}

// ── Crons ────────────────────────────────────────────────────
export function useCrons() {
  const result = useApi("/api/crons", null, { interval: 60_000 });

  const crons = result.live && Array.isArray(result.data)
    ? result.data.map((c) => ({
        id: c.id || c.name,
        name: c.name || c.id,
        last: c.lastRun || c.last || "—",
        status: c.enabled === false ? "disabled" : c.status || "ok",
        runs: c.runCount || c.runs || 0,
        schedule: c.schedule || c.cron,
        note: c.note,
      }))
    : CRONS_INIT;

  return { ...result, crons };
}

// ── AI Costs ─────────────────────────────────────────────────
export function useCosts() {
  return useApi("/api/costs", null, { interval: 300_000 });
}

// ── Dispatch command to OpenClaw ─────────────────────────────
export async function dispatchCommand(command) {
  try {
    const res = await fetch("/api/claw/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    });
    return await res.json();
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
