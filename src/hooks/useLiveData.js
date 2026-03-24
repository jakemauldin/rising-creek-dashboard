import { useApi } from "./useApi";

// ── Health / Systems ─────────────────────────────────────────
export function useHealth() {
  return useApi("/api/health", null, { interval: 60_000 });
}

// ── Jobs from JobTread ───────────────────────────────────────
export function useJobs() {
  const result = useApi("/api/jobs", null, { interval: 120_000 });

  // Transform Pave response into display shape
  const jobs = result.live && Array.isArray(result.data)
    ? result.data.map((j) => ({
        id: j.id,
        name: j.name || "Untitled",
        number: j.number || "—",
        description: j.description || "",
        closedOn: j.closedOn,
        createdAt: j.createdAt,
        _raw: j,
      }))
    : null;

  return { ...result, jobs };
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
    : null;

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
