const PAVE_URL = "https://api.jobtread.com/pave";
const ORG_ID = "22NzKxPXx8Pf";

export async function queryJobTread(query, variables = {}) {
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
      body: JSON.stringify({
        organizationId: ORG_ID,
        query,
        variables,
      }),
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
  return queryJobTread(`{
    jobs(first: 25, sort: [{ field: "updatedAt", order: DESC }]) {
      nodes {
        id
        name
        number
        status
        statusColor
        description
        startDate
        endDate
        createdAt
        updatedAt
        customer {
          id
          name
        }
        estimatedCost
        estimatedRevenue
        actualCost
        actualRevenue
      }
    }
  }`);
}
