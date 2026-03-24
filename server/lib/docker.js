import { execSync } from "child_process";

const CONTAINER = process.env.OPENCLAW_CONTAINER || "openclaw";
const TIMEOUT = 15_000;

export function execDocker(command) {
  try {
    const stdout = execSync(`docker exec ${CONTAINER} ${command}`, {
      timeout: TIMEOUT,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { ok: true, data: stdout.trim() };
  } catch (err) {
    return {
      ok: false,
      error: err.stderr?.trim() || err.message,
      code: err.status,
    };
  }
}

export function execDockerJSON(command) {
  const result = execDocker(command);
  if (!result.ok) return result;
  try {
    return { ok: true, data: JSON.parse(result.data) };
  } catch {
    return { ok: true, data: result.data };
  }
}
