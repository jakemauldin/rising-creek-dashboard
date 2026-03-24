/* ═══ SITE STATIONS ═══ */
export const STATIONS = [
  { id: "command", x: 8, y: 52, label: "Command Post", desc: "Decisions · Dispatch", color: "#E8722A" },
  { id: "infra", x: 24, y: 48, label: "Infrastructure", desc: "n8n · APIs · Health", color: "#F59E0B" },
  { id: "build", x: 46, y: 40, label: "Active Build", desc: "Jobs · Vendors · Estimating", color: "#4A90D9" },
  { id: "cash", x: 66, y: 46, label: "Cash Flow", desc: "Pay Apps · Collections", color: "#2A9D8F" },
  { id: "growth", x: 85, y: 50, label: "Outbound", desc: "Leads · Follow-ups", color: "#8B5CF6" },
];

/* ═══ AGENTS ═══ */
export const AGENTS_INIT = [
  { id: "claw", name: "The Claw", equipment: "Crane", emoji: "🏗️", color: "#E8722A", rig: "crane", home: "command", status: "observing", task: "Watching priorities and approvals", completedToday: 12, patrol: ["command", "build", "infra", "cash", "command"] },
  { id: "spark", name: "Spark", equipment: "Service Truck", emoji: "⚡", color: "#F59E0B", rig: "loader", home: "infra", status: "active", task: "Reviewing failed webhook retries", completedToday: 19, patrol: ["infra", "build", "infra"] },
  { id: "gauge", name: "Gauge", equipment: "Inspection Truck", emoji: "🔍", color: "#DC2626", rig: "truck", home: "build", status: "review", task: "Auditing compliance exception", completedToday: 14, patrol: ["build", "command", "infra", "cash", "build"] },
  { id: "rivet", name: "Rivet", equipment: "Excavator", emoji: "🔩", color: "#2A9D8F", rig: "excavator", home: "cash", status: "active", task: "Moving vendor packet data to compliance", completedToday: 16, patrol: ["cash", "build", "cash"] },
  { id: "blueprint", name: "Blueprint", equipment: "Dozer", emoji: "📐", color: "#4A90D9", rig: "dozer", home: "build", status: "blocked", task: "Reconciling cost report anomaly", completedToday: 9, patrol: ["build", "cash", "build"] },
  { id: "mason", name: "Mason", equipment: "Mixer", emoji: "🧱", color: "#8B5CF6", rig: "mixer", home: "growth", status: "active", task: "Following up 3 warm leads", completedToday: 11, patrol: ["growth", "build", "growth"] },
];

/* ═══ ALERTS ═══ */
export const ALERTS_INIT = [
  { id: 1, sev: "critical", title: "Security audit degraded", detail: "Limited container visibility; manual review recommended.", zone: "Infrastructure", action: "Inspect trace" },
  { id: 2, sev: "high", title: "Cost report anomaly", detail: "Nightly report returned $0.00 — likely billing API lag.", zone: "Cash Flow", action: "Compare runs" },
  { id: 3, sev: "high", title: "2 approvals waiting on Jake", detail: "Pay app draft and vendor exception need decisions.", zone: "Command", action: "Open queue" },
  { id: 4, sev: "medium", title: "Webhook backlog rising", detail: "Vendor packet queue above normal throughput.", zone: "Infrastructure", action: "Reroute queue" },
];

/* ═══ APPROVALS ═══ */
export const APPROVALS = [
  {
    id: 1, title: "Approve Pay App 7 draft", impact: "$67,114 can move once approved", due: "Today", priority: "critical",
    summary: "Stetson Phase 1 — Pay App #7 covers framing completion and rough electrical. All backup documentation verified against JobTread line items.",
    plan: [
      { step: 1, action: "Pull finalized Pay App 7 from JobTread", status: "done", detail: "Retrieved 14 line items totaling $67,114. Compared against original contract + approved COs." },
      { step: 2, action: "Cross-reference with QBO for duplicate billing", status: "done", detail: "No duplicate entries found. Previous Pay App #6 ($52,800) fully reconciled." },
      { step: 3, action: "Verify sub lien waivers are on file", status: "done", detail: "Conditional waivers received from Lone Star Framing ($28,400) and MJM Electrical ($18,200). Apex Concrete waiver still pending — flagged separately." },
      { step: 4, action: "Generate PDF and stage for owner signature", status: "pending", detail: "Will compile cover sheet + schedule of values + waiver package into single PDF via n8n workflow." },
      { step: 5, action: "Email to Stetson Properties for signature", status: "pending", detail: "Draft email ready. Will send from risingcreek@email.com with PDF attached and payment terms reminder (Net 30)." },
    ],
    risk: "Apex Concrete conditional waiver is still outstanding. Recommend sending with note that final waiver will follow. No hold on payment needed — amount is below retainage threshold.",
    agent: "blueprint",
  },
  {
    id: 2, title: "Vendor packet exception", impact: "MJM missing updated COI", due: "Today", priority: "high",
    summary: "MJM Electrical's COI expired Feb 28. They're active on Stetson Phase 1 and Doreen Street. Cannot authorize further work until updated COI is on file.",
    plan: [
      { step: 1, action: "Send automated COI request to MJM", status: "done", detail: "Email sent via n8n template at 7:15 AM to mjm@electrical.com with renewal requirements and deadline." },
      { step: 2, action: "Check inbox for response", status: "in-progress", detail: "MJM replied at 8:42 AM with attachment. Document is in the Inbox queue awaiting processing." },
      { step: 3, action: "Validate new COI against requirements", status: "pending", detail: "Will verify: policy dates cover current + 30 days, GL minimum $1M, Rising Creek listed as additional insured, workers comp current." },
      { step: 4, action: "Update compliance record and clear exception", status: "pending", detail: "If valid, will update sub compliance tracker, clear the alert, and notify Gauge to resume inspection scheduling." },
    ],
    risk: "If COI is invalid or incomplete, MJM crew must be pulled from active job sites until resolved. Stetson rough electrical is on the critical path — 2-day delay impact.",
    agent: "gauge",
  },
  {
    id: 3, title: "Owner follow-up draft", impact: "Aging invoice at 23 days overdue", due: "Tomorrow", priority: "medium",
    summary: "Parker Henderson residence — final invoice of $18,430 is 23 days past due. Client attended walkthrough and expressed satisfaction. No disputes filed.",
    plan: [
      { step: 1, action: "Review payment history for Henderson account", status: "done", detail: "5 previous draws paid on time (avg 12 days). This is the first late payment. No pattern of delinquency." },
      { step: 2, action: "Draft professional follow-up email", status: "done", detail: "Tone: friendly reminder, not adversarial. References completed walkthrough date and original payment terms. Includes direct pay link." },
      { step: 3, action: "If no response in 48hrs, escalate to phone call", status: "pending", detail: "Will queue a reminder for Jake to make a personal call. Construction relationships matter — keep it warm." },
      { step: 4, action: "If 30+ days, generate formal demand letter", status: "planned", detail: "Template ready but holding. Lien filing deadline is 60 days from completion in Texas." },
    ],
    risk: "Low risk. Client relationship is strong. Likely an oversight. Phone call will probably resolve it.",
    agent: "mason",
  },
];

/* ═══ SYSTEMS + CRONS ═══ */
export const SYSTEMS = [
  { name: "Nightly Security Audit", status: "degraded", uptime: "97.3%", latency: "1.8s", last: "4:31 AM" },
  { name: "Vendor Packet Webhooks", status: "warning", uptime: "99.1%", latency: "0.9s", last: "6 min ago" },
  { name: "JobTread Sync", status: "healthy", uptime: "99.8%", latency: "0.5s", last: "2 min ago" },
  { name: "QBO Sync", status: "healthy", uptime: "99.6%", latency: "0.8s", last: "4 min ago" },
  { name: "Cash Report Automation", status: "degraded", uptime: "95.6%", latency: "2.4s", last: "4:34 AM" },
];

export const CRONS_INIT = [
  { id: "health", name: "Health Check", last: "12:00 AM", status: "ok", runs: 48 },
  { id: "audit", name: "Security Audit", last: "4:00 AM", status: "warn", runs: 1, note: "Blind" },
  { id: "cost", name: "Cost Report", last: "4:30 AM", status: "warn", runs: 1, note: "$0.00" },
  { id: "skool", name: "Skool Post", last: "8:00 AM", status: "ok", runs: 1 },
  { id: "leads", name: "PlanHub Scrape", last: "6:00 AM", status: "ok", runs: 1 },
  { id: "invoice", name: "Invoice Sync", last: "4:00 AM", status: "ok", runs: 1 },
  { id: "waiver", name: "Waiver Check", last: "7:00 AM", status: "ok", runs: 1 },
  { id: "qbo", name: "QBO Reconcile", last: "5:00 AM", status: "ok", runs: 1 },
];

/* ═══ JOBS ═══ */
export const JOBS = [
  { name: "Stetson Phase 1", client: "Stetson Properties", phase: "Framing", pct: 62, budget: "$412K", spent: "$254K", status: "on-track", nextMilestone: "Rough MEP — Mar 12" },
  { name: "Parker Henderson", client: "Henderson Family", phase: "Finish-out", pct: 88, budget: "$285K", spent: "$251K", status: "on-track", nextMilestone: "Final walkthrough — Mar 8" },
  { name: "Doreen Street Reno", client: "Apex Commercial", phase: "Demo + Structural", pct: 25, budget: "$128K", spent: "$32K", status: "delayed", nextMilestone: "Permit re-inspection — Mar 10" },
  { name: "Fishburn Barndo", client: "Fishburn Family", phase: "Foundation", pct: 15, budget: "$195K", spent: "$29K", status: "on-track", nextMilestone: "Slab pour — Mar 14" },
  { name: "Ridgeline Custom", client: "Ridgeline LLC", phase: "Pre-construction", pct: 5, budget: "$380K", spent: "$19K", status: "on-track", nextMilestone: "Permit submit — Mar 11" },
];

/* ═══ CASH + QBO ═══ */
export const CASH_ITEMS = [
  { job: "Stetson Phase 1", amount: "$67,114", age: "Ready once approved", status: "waiting", color: "#FDE68A" },
  { job: "Parker Henderson", amount: "$18,430", age: "23 days overdue", status: "overdue", color: "#FCA5A5" },
  { job: "Doreen Street", amount: "$12,800", age: "12 days overdue", status: "overdue", color: "#FCA5A5" },
  { job: "Fishburn", amount: "$8,950", age: "Current", status: "healthy", color: "#A7F3D0" },
];

export const QBO_UNCAT = [
  { id: 1, date: "Mar 5", vendor: "Home Depot", amount: "$1,247.82", acct: "Checking ••4411", suggested: "Materials — Stetson Phase 1", confidence: "92%" },
  { id: 2, date: "Mar 4", vendor: "Apex Concrete Supply", amount: "$3,680.00", acct: "Checking ••4411", suggested: "Subcontractor — Fishburn", confidence: "87%" },
  { id: 3, date: "Mar 4", vendor: "TXDOT", amount: "$275.00", acct: "Checking ••4411", suggested: "Permits & Fees", confidence: "78%" },
  { id: 4, date: "Mar 3", vendor: "Circle K", amount: "$89.14", acct: "Credit ••7722", suggested: "Fuel & Equipment", confidence: "95%" },
  { id: 5, date: "Mar 3", vendor: "Ferguson Plumbing", amount: "$2,115.60", acct: "Checking ••4411", suggested: "Materials — Doreen St", confidence: "71%" },
  { id: 6, date: "Mar 2", vendor: "Transfer from Savings", amount: "$15,000.00", acct: "Checking ••4411", suggested: "Owner Investment", confidence: "65%" },
];

export const RECON = [
  { item: "Invoice #2024-091", jt: "$25,100", qbo: "$25,100", status: "matched", job: "Stetson Phase 1" },
  { item: "Pay App #3", jt: "$47,200", qbo: "$47,200", status: "matched", job: "Henderson" },
  { item: "CO #4 Materials", jt: "$8,340", qbo: "—", status: "missing", job: "Doreen Street" },
  { item: "Retainage Release", jt: "$28,320", qbo: "$28,320", status: "matched", job: "Clearwater HOA" },
  { item: "Sub Payment — Apex", jt: "$12,400", qbo: "$12,600", status: "mismatch", job: "Stetson Phase 1", delta: "+$200" },
];

/* ═══ COMPLIANCE ═══ */
export const SUBS = [
  { name: "Apex Concrete", trade: "Concrete", coi: "Mar 22, 2026", coiStatus: "expiring", waiver: "Pending", w9: "On file", jobs: ["Stetson", "Fishburn"] },
  { name: "MJM Electrical", trade: "Electrical", coi: "Expired Feb 28", coiStatus: "expired", waiver: "Missing", w9: "On file", jobs: ["Stetson", "Doreen"] },
  { name: "Martinez Plumbing", trade: "Plumbing", coi: "Jun 15, 2026", coiStatus: "current", waiver: "Received", w9: "On file", jobs: ["Stetson", "Henderson"] },
  { name: "Lone Star Framing", trade: "Framing", coi: "Sep 1, 2026", coiStatus: "current", waiver: "Received", w9: "On file", jobs: ["Stetson", "Ridgeline"] },
  { name: "RoofTech Pro", trade: "Roofing", coi: "Apr 10, 2026", coiStatus: "current", waiver: "Pending", w9: "Missing", jobs: ["Henderson"] },
  { name: "ACE Drywall", trade: "Drywall", coi: "May 30, 2026", coiStatus: "current", waiver: "Received", w9: "On file", jobs: ["Henderson", "Doreen"] },
];

/* ═══ INBOX ═══ */
export const INBOX = [
  { id: 1, type: "email", from: "MJM Electrical", subject: "Updated COI attached", received: "8:42 AM", status: "new", priority: "high" },
  { id: 2, type: "upload", from: "Apex Concrete", subject: "Lien waiver — Stetson Phase 1", received: "7:30 AM", status: "new", priority: "high" },
  { id: 3, type: "webhook", from: "PlanHub", subject: "3 new bid invitations", received: "6:05 AM", status: "new", priority: "medium" },
  { id: 4, type: "email", from: "City of Springtown", subject: "Re: Permit #2024-3847 inspection", received: "Yesterday", status: "read", priority: "medium" },
  { id: 5, type: "upload", from: "Home Depot", subject: "Receipt — $1,247.82", received: "Yesterday", status: "processed", priority: "low" },
  { id: 6, type: "email", from: "Henderson Family", subject: "Walkthrough schedule question", received: "Yesterday", status: "read", priority: "low" },
];

/* ═══ WEATHER (Fort Worth) ═══ */
export const WEATHER = [
  { day: "Today", high: 68, low: 52, condition: "Partly Cloudy", icon: "⛅", wind: "12 mph S", precip: "10%", impact: null },
  { day: "Tomorrow", high: 72, low: 55, condition: "Sunny", icon: "☀️", wind: "8 mph SW", precip: "0%", impact: null },
  { day: "Sun", high: 58, low: 41, condition: "Rain", icon: "🌧️", wind: "18 mph N", precip: "80%", impact: "No concrete pours. Delay Fishburn slab." },
  { day: "Mon", high: 52, low: 38, condition: "Rain → Clearing", icon: "🌦️", wind: "15 mph N", precip: "60%", impact: "Ground may be too wet for excavation." },
  { day: "Tue", high: 65, low: 44, condition: "Sunny", icon: "☀️", wind: "10 mph SW", precip: "5%", impact: null },
  { day: "Wed", high: 70, low: 48, condition: "Partly Cloudy", icon: "⛅", wind: "8 mph S", precip: "15%", impact: null },
  { day: "Thu", high: 74, low: 52, condition: "Sunny", icon: "☀️", wind: "6 mph S", precip: "0%", impact: "Good pour window — reschedule Fishburn?" },
];

/* ═══ AI COSTS ═══ */
export const AI_COSTS = {
  today: { anthropic: 4.82, openai: 1.15, total: 5.97 },
  yesterday: { anthropic: 6.21, openai: 0.88, total: 7.09 },
  mtd: { anthropic: 87.40, openai: 14.20, total: 101.60 },
  budget: 200,
  breakdown: [
    { model: "Claude Opus 4.5", tokens: "284K", cost: "$3.41", pct: 57 },
    { model: "Claude Sonnet 4", tokens: "1.2M", cost: "$1.41", pct: 24 },
    { model: "GPT-4o", tokens: "320K", cost: "$0.88", pct: 15 },
    { model: "Gemini 2.5", tokens: "180K", cost: "$0.27", pct: 4 },
  ],
  topWorkflows: [
    { name: "Morning Briefing", cost: "$1.80/day", model: "Opus 4.5" },
    { name: "Lead Scrape + Qualify", cost: "$0.92/day", model: "Sonnet 4" },
    { name: "Invoice Reconciliation", cost: "$0.65/day", model: "Sonnet 4" },
    { name: "Content Generation", cost: "$0.48/day", model: "Opus 4.5" },
  ],
};

export const TIMELINE_INIT = [
  { t: "9:02 AM", msg: "Spark reran failed webhook queue", type: "info" },
  { t: "8:41 AM", msg: "Mason dispatched to 3 warm lead follow-ups", type: "info" },
  { t: "8:03 AM", msg: "Approval requested: Pay App 7 draft", type: "action" },
  { t: "7:14 AM", msg: "Vendor packet for MJM entered receiving yard", type: "info" },
  { t: "4:34 AM", msg: "Cost report anomaly detected", type: "warn" },
  { t: "4:31 AM", msg: "Security audit limited visibility", type: "warn" },
];
