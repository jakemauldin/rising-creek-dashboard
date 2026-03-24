const PAVE_URL = "https://api.jobtread.com/pave";
const ORG_ID = "22NzKxPXx8Pf";

export async function queryJobTread(query) {
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
      body: JSON.stringify({ query }),
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
  const result = await queryJobTread({
    organization: {
      $: { id: ORG_ID },
      jobs: {
        nodes: {
          id: true,
          name: true,
          number: true,
          description: true,
          closedOn: true,
          createdAt: true,
        },
      },
    },
  });

  if (!result.ok) return result;

  // Extract the nodes array from the nested response
  const nodes = result.data?.organization?.jobs?.nodes;
  if (Array.isArray(nodes)) {
    return { ok: true, data: nodes };
  }

  return { ok: true, data: result.data };
}
