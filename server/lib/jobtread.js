const PAVE_URL = "https://api.jobtread.com/pave";

export async function queryJobTread(payload) {
  const token = process.env.JOBTREAD_GRANT_KEY;
  if (!token) {
    return { ok: false, error: "JOBTREAD_GRANT_KEY not set" };
  }

  try {
    const res = await fetch(PAVE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `JobTread ${res.status}: ${text}` };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export async function getJobs() {
  return queryJobTread({
    action: "READ",
    object: "job",
    data: {
      id: true,
      name: true,
      number: true,
      status: true,
    },
    limit: 20,
  });
}
