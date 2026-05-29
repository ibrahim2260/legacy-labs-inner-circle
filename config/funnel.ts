// ─────────────────────────────────────────────────────────────────────────────
// config/funnel.ts — single source of truth for all copy, questions, and config
// Edit this file to change questions, capital bands, qualifying tiers, URLs,
// the AI system prompt, and the fallback roadmap without touching components.
// ─────────────────────────────────────────────────────────────────────────────

export const FUNNEL_CONFIG = {
  // Anthropic model used for gameplan generation — one-line upgrade path
  anthropicModel: "claude-sonnet-4-6" as const,

  // Free community for non-qualified applicants
  skoolUrl: "https://www.skool.com/the-founders-club/about",

  // GHL calendar embed
  calendarEmbedUrl:
    "https://link.legacylabs.club/widget/booking/7MNabfUYEwfqNVpooNj7",
  calendarEmbedId: "7MNabfUYEwfqNVpooNj7_1779995429021",
  calendarScriptUrl: "https://link.legacylabs.club/js/form_embed.js",

  // Capital tiers that qualify for a strategy call.
  // Everything NOT in this list is routed to the free community.
  // To lower the bar, add "under300"; to raise it, remove entries.
  qualifyTiers: [
    "5to10k",
    "3to5k",
    "1to3k",
    "700to1k",
    "300to700",
  ] as const,

  // GHL contact tags — workflows in GHL react to these
  tags: {
    qualified: "llic-qualified-call",
    unqualified: "llic-skool-community",
    partial: "llic-applicant",
  },

  // Set false to hide the "Reset (dev mode)" button in production
  showResetButton: process.env.NODE_ENV === "development",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// The 5-Layer Stack — canonical definition used throughout the UI and AI prompt
// ─────────────────────────────────────────────────────────────────────────────

export const STACK_LAYERS = [
  {
    n: 1,
    key: "offer",
    name: "The Offer",
    purpose:
      "A productized AI service businesses understand in 60 seconds and pay premium prices for.",
  },
  {
    n: 2,
    key: "market",
    name: "The Market",
    purpose:
      "A niche with real budget, identified pain, and practical AI demand that already exists.",
  },
  {
    n: 3,
    key: "acquisition",
    name: "The Acquisition Engine",
    purpose:
      "Repeatable cold, warm, and content systems that book qualified calls without paid ads.",
  },
  {
    n: 4,
    key: "sales",
    name: "The Sales Frame",
    purpose:
      "A consultative process that closes without pressure, theatrics, or winging it.",
  },
  {
    n: 5,
    key: "fulfillment",
    name: "The Fulfillment Stack",
    purpose:
      "GoHighLevel snapshots, automations, and SOPs that deploy fast and run cleanly.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Application questions — each step is defined here
// ─────────────────────────────────────────────────────────────────────────────

export const QUESTIONS = {
  stage: {
    id: "stage",
    heading: "Where are you right now with AI?",
    sub: "",
    options: [
      {
        value: "consuming",
        label: "Still consuming",
        sub: "No offer or clients yet",
      },
      {
        value: "built",
        label: "Built AI things",
        sub: "No paying client yet",
      },
      {
        value: "early",
        label: "1–5 clients",
        sub: "Inconsistent revenue",
      },
      {
        value: "scaling",
        label: "Running an agency",
        sub: "Want to scale / systemize",
      },
    ],
  },

  goal: {
    id: "goal",
    heading: "What are you building toward in the next 90 days?",
    sub: "",
    options: [
      { value: "first", label: "First paying client", sub: "" },
      { value: "retainers", label: "Consistent monthly retainers", sub: "" },
      { value: "scale", label: "Scale past $10k/mo", sub: "" },
      {
        value: "systemize",
        label: "Systemize so it runs without me",
        sub: "",
      },
    ],
  },

  bottleneck: {
    id: "bottleneck",
    heading: "Which layer of the AI Operator stack is your biggest gap?",
    sub: "",
    options: [
      {
        value: "offer",
        label: "The Offer",
        sub: "What I sell isn't clear or compelling",
      },
      {
        value: "market",
        label: "The Market",
        sub: "Not sure who to target or what niche to pick",
      },
      {
        value: "acquisition",
        label: "The Acquisition Engine",
        sub: "I'm not booking enough qualified calls",
      },
      {
        value: "sales",
        label: "The Sales Frame",
        sub: "Calls aren't converting the way they should",
      },
      {
        value: "fulfillment",
        label: "The Fulfillment Stack",
        sub: "Delivery is slow, stressful, or inconsistent",
      },
    ],
  },

  commitment: {
    id: "commitment",
    heading: "How serious are you about building this?",
    sub: "",
    options: [
      {
        value: "ready",
        label: "Ready now",
        sub: "Outreach, calls, implementing immediately",
      },
      {
        value: "committed",
        label: "Fully committed",
        sub: "I have the plan — need to execute",
      },
      { value: "exploring", label: "Exploring", sub: "Still figuring it out" },
      {
        value: "curious",
        label: "Just curious",
        sub: "Seeing what this is about",
      },
    ],
  },

  capital: {
    id: "capital",
    heading:
      "Every business requires startup funds. How much do you have to get started?",
    sub: "Be honest — this routes you to the right starting point, not a price tag.",
    options: [
      { value: "5to10k", label: "$5,000 – $10,000+", sub: "" },
      { value: "3to5k", label: "$3,000 – $5,000", sub: "" },
      { value: "1to3k", label: "$1,000 – $3,000", sub: "" },
      { value: "700to1k", label: "$700 – $1,000", sub: "" },
      { value: "300to700", label: "$300 – $700", sub: "" },
      { value: "under300", label: "Under $300", sub: "" },
    ],
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Anthropic system prompt — controls voice, format, and quality of the gameplan
// ─────────────────────────────────────────────────────────────────────────────

export const GAMEPLAN_SYSTEM_PROMPT = `You are the strategic advisor behind the AI Operator Method™, built by Ibrahim Ansari — founder of Legacy Labs Inner Circle.

YOUR VOICE — match this precisely:
• Direct, builder-to-builder. No hype, no fluff, no motivational poster energy.
• Concrete and specific — name exact actions, exact tools, exact numbers. Never vague.
• Confident and pragmatic. You've seen what works at scale and what collapses in week 3.
• Every sentence earns its place. If it doesn't move the reader forward, cut it.
• Never use: "it's important to," "make sure to," "in order to," "this is crucial," or em-dash abuse.
• Never summarize at the end. End on the outcome — not a recap.

THE AI OPERATOR METHOD™ — 5-LAYER STACK:
1. The Offer — A productized AI service businesses understand in 60 seconds and say yes to without a pitch deck.
2. The Market — A niche with budget, pain, and existing AI demand. Wrong niche kills agencies.
3. The Acquisition Engine — Cold, warm, and content systems that book qualified calls. Without this, you have a project, not a business.
4. The Sales Frame — Consultative diagnosis → fix. Closes without pressure because the problem sells the solution.
5. The Fulfillment Stack — GoHighLevel snapshots, automations, SOPs. When a client signs, you deploy — you don't panic.

STAGE CONTEXT (what each stage actually means):
• consuming: smart, motivated, probably anxious. Has consumed a ton. No clients yet. The gap is infrastructure, not knowledge.
• built: has technical proof but no business proof. Missing an offer or the courage to sell it.
• early: has closed, has delivered. The problem is inconsistency — no repeatable acquisition, no reliable close rate.
• scaling: already has proof. The bottleneck is usually fulfillment capacity or delegation.

OUTPUT RULES — CRITICAL:
1. Return ONLY valid JSON. Zero markdown. Zero prose outside the JSON. No \`\`\`json fences.
2. The diagnosis must name a specific, real cost — not a vague gap. Make it sting slightly. It should feel like you read their situation.
3. The 3 moves must be immediately actionable. Not "work on your offer." Example: "Pick one niche (dentists, HVAC, med spas), pick one pain (missed calls, slow follow-up), write one sentence: 'I install AI systems that stop [niche] from losing leads.' That's your offer for the next 30 days."
4. The 90-day arc should show a believable, stage-appropriate trajectory — not generic progress.
5. The outcome line should be vivid and specific: what they will have, not what they might achieve.
6. priorityLayer must match the bottleneck: offer→1, market→2, acquisition→3, sales→4, fulfillment→5.
7. stack must include all 5 layers. Only 1 has status "priority"; the rest are "supporting".

JSON SCHEMA — match exactly:
{
  "diagnosis": "2–3 sentences naming their #1 leak and why it costs them now",
  "priorityLayer": 1,
  "stack": [
    { "n": 1, "name": "The Offer", "purpose": "...", "status": "priority" | "supporting" },
    { "n": 2, "name": "The Market", "purpose": "...", "status": "priority" | "supporting" },
    { "n": 3, "name": "The Acquisition Engine", "purpose": "...", "status": "priority" | "supporting" },
    { "n": 4, "name": "The Sales Frame", "purpose": "...", "status": "priority" | "supporting" },
    { "n": 5, "name": "The Fulfillment Stack", "purpose": "...", "status": "priority" | "supporting" }
  ],
  "moves": [
    { "title": "...", "detail": "..." },
    { "title": "...", "detail": "..." },
    { "title": "...", "detail": "..." }
  ],
  "arc": [
    { "phase": "Days 1–30", "focus": "..." },
    { "phase": "Days 31–60", "focus": "..." },
    { "phase": "Days 61–90", "focus": "..." }
  ],
  "outcome": "One vivid sentence: what they have at day 90"
}`;

// ─────────────────────────────────────────────────────────────────────────────
// Fallback roadmap — used when Anthropic API fails or returns invalid JSON
// Keyed by stage + bottleneck so it's still meaningfully tailored
// ─────────────────────────────────────────────────────────────────────────────

const LAYER_MAP: Record<string, number> = {
  offer: 1,
  market: 2,
  acquisition: 3,
  sales: 4,
  fulfillment: 5,
};

const DIAGNOSIS: Record<string, string> = {
  offer:
    "Your offer is the root of the problem. Without a clear, productized service a business owner understands in 60 seconds, nothing downstream works — not your outreach, not your calls, not your closes. You're losing the sale before the conversation starts.",
  market:
    "You're solving a real problem for the wrong crowd, or you haven't picked a crowd at all. Without a niche with real budget, identified pain, and existing AI demand, even a great offer produces zero revenue. The market is upstream of everything.",
  acquisition:
    "You have something to sell but your pipeline is thin or inconsistent. Every agency that stalls does so here — they close a client or two, then go quiet. Without a repeatable acquisition engine, you have a project with occasional customers, not a business.",
  sales:
    "Calls are happening but they're not converting at the rate they should. This is almost always a framing problem — you're presenting features instead of diagnosing problems. The right consultative frame makes the close feel inevitable, not forced.",
  fulfillment:
    "You've got clients but delivery is slow, stressful, or fragile — which means you're capped on capacity and risking churn. The fulfillment stack is what turns a client into a case study and a case study into referrals and renewals.",
};

const MOVES: Record<string, { title: string; detail: string }[]> = {
  offer: [
    {
      title: "Define your offer in one sentence",
      detail:
        "Pick one niche (dentists, HVAC, med spas, real estate teams) and one pain they bleed money on (missed calls, slow lead follow-up, no appointment automation). Write: 'I install AI systems that stop [niche] from losing [specific pain].' That's your offer for the next 30 days. Refine it after you've sold it twice.",
    },
    {
      title: "Package it into a 90-day engagement",
      detail:
        "Structure it as a 90-day deliverable with a clear outcome: one AI system installed, tested, and live. Price it at $1,500–$3,000/mo or $3,000–$5,000 flat. The price only needs to feel like a no-brainer relative to what the pain costs them monthly — run that math on every prospect call.",
    },
    {
      title: "Validate before you polish",
      detail:
        "Message 5 businesses in your chosen niche — not to sell, to diagnose. Ask: 'What does a missed call cost you?' If they lean in and start doing the math with you, your offer is real. If they go blank, adjust the niche or the pain point before you touch anything else.",
    },
  ],
  market: [
    {
      title: "Score three niches against three criteria",
      detail:
        "Budget (do they charge clients $1k+/mo?), Pain (are they known for operational chaos?), AI demand (are competitors already selling to them?). Local services — dentists, HVAC, med spas, real estate, gyms — pass all three almost universally. Pick the one where you have any existing connection or knowledge edge.",
    },
    {
      title: "Build a list of 50 targets this week",
      detail:
        "Use Google Maps, Apollo.io, or LinkedIn to pull 50 businesses. Filter for: under 10 employees (they feel the pain acutely), 2+ years in business (they have budget), no obvious AI vendor already (open opportunity). This list is your first real business asset.",
    },
    {
      title: "Validate demand before you build anything",
      detail:
        "Send a simple cold message or make 10 cold calls before you touch any tech stack. If you can book 3 exploratory calls from 50 outreach attempts, the market validates. If not, adjust the message or the market — not the tech. Don't build a solution looking for a problem.",
    },
  ],
  acquisition: [
    {
      title: "Run one cold outreach channel for 30 straight days",
      detail:
        "Pick one: cold email via Apollo + Instantly, or cold DM via Instagram or LinkedIn. Write a 3-step sequence: message 1 = a specific diagnosis hook ('Most HVAC owners I talk to are losing 4–6 leads per week because nobody texts back within 5 minutes...'), message 2 = proof or case study, message 3 = simple calendar ask. Send 25–50 per day. Don't switch channels mid-cycle.",
    },
    {
      title: "Reactivate your warm network this week",
      detail:
        "Message every person you've had any professional conversation with in the last 2 years. Not a pitch — a genuine check-in on what they're working on. Warm conversations book 5–10x faster than cold. This is the fastest path to your next qualified call and most people skip it entirely.",
    },
    {
      title: "Create one piece of content per week",
      detail:
        "One short video or LinkedIn post showing a real AI system you built or a real problem it solves. This isn't a growth hack — it's slow-burn credibility. At 4 weeks you have a library. At 12 weeks, people reach out to you before you reach out to them. Compound this alongside cold outreach.",
    },
  ],
  sales: [
    {
      title: "Stop pitching — start diagnosing",
      detail:
        "In the first 10 minutes of every call: 'Walk me through what happens when a new lead comes in.' Then: 'What's the biggest gap between where you are and where you want to be?' You're not selling — you're finding their leak. When they name the leak themselves, the fix sells itself. Your close rate will double.",
    },
    {
      title: "Kill your deck — do a live audit instead",
      detail:
        "Screen share and audit their CRM, Google profile, or Facebook ads account. Show them the leak in real time: 'You're losing 4 leads a day at this response time — that's roughly $3,200/month at your average ticket.' That one number is worth 40 slides about your methodology.",
    },
    {
      title: "Handle the price objection with their own math",
      detail:
        "When they say '$2,000/mo is a lot,' ask: 'How many leads do you lose per week because nobody followed up fast enough?' If it's 5/week at a $200 average ticket, that's $1,000/week — $52k/year. Your system costs $24k/year and recovers $52k. Do that math on every call. They close themselves.",
    },
  ],
  fulfillment: [
    {
      title: "Build one GHL snapshot for your core use case",
      detail:
        "Pick your most requested deliverable (missed call text-back, AI lead nurture, appointment bot) and build it once, cleanly. Turn it into a GHL snapshot. From now on, client onboarding = snapshot import + 2 hours of configuration. Installation time drops from 3 days to 3 hours.",
    },
    {
      title: "Build a 14-day client onboarding SOP",
      detail:
        "Map out exactly what happens in the first 14 days: day 1 kickoff call, day 2–3 CRM setup, day 4–7 automation install, day 8–10 testing, day 11–14 go-live + training. Turn this into a Notion checklist or GHL task template. Send it to every client at kickoff. They feel held; you feel organized.",
    },
    {
      title: "Create a monthly results report template",
      detail:
        "Build a one-page report: leads captured, calls booked, response time improvement, estimated revenue recovered. Send it on the 1st of every month. Clients who see their results on paper don't cancel. Clients who never see proof always eventually do. This one asset is worth more than any upsell conversation.",
    },
  ],
};

const ARC: Record<string, { phase: string; focus: string }[]> = {
  first: [
    {
      phase: "Days 1–30",
      focus:
        "Define and validate your offer with 5 real conversations. Book your first 3 discovery calls.",
    },
    {
      phase: "Days 31–60",
      focus:
        "Close your first paying client. Deploy your core system. Document the case study.",
    },
    {
      phase: "Days 61–90",
      focus:
        "Use that case study to book 5 more calls. Aim for a second client and a repeatable loop.",
    },
  ],
  retainers: [
    {
      phase: "Days 1–30",
      focus:
        "Audit your current offer for retainer viability. Build the acquisition engine that runs without daily attention.",
    },
    {
      phase: "Days 31–60",
      focus:
        "Close 1–2 retainer clients. Build the fulfillment SOP that keeps them paying month two.",
    },
    {
      phase: "Days 61–90",
      focus:
        "Stack monthly recurring revenue. Every retainer is a case study — use them to shorten the next close.",
    },
  ],
  scale: [
    {
      phase: "Days 1–30",
      focus:
        "Identify the bottleneck preventing scale. Fix the leaking layer — usually acquisition volume or fulfillment capacity.",
    },
    {
      phase: "Days 31–60",
      focus:
        "Install systems that run without your daily involvement. Bring in a contractor for fulfillment overflow.",
    },
    {
      phase: "Days 61–90",
      focus:
        "Sprint toward $10k/mo with 60%+ gross margin. Document what drove it so the next $10k costs less effort than the first.",
    },
  ],
  systemize: [
    {
      phase: "Days 1–30",
      focus:
        "Map every task you're doing by hand. Automate or delegate the bottom 50%, starting with delivery.",
    },
    {
      phase: "Days 31–60",
      focus:
        "Build SOPs for onboarding, reporting, and QA. These become the playbook your team runs without you.",
    },
    {
      phase: "Days 61–90",
      focus:
        "Remove yourself from 3 core workflows. Measure quality — if it holds, you've built leverage, not a job.",
    },
  ],
};

const OUTCOMES: Record<string, Record<string, string>> = {
  first: {
    consuming:
      "In 90 days, you have your first paying client, a deployed AI system you built yourself, and proof that your offer works — enough to do it again faster.",
    built:
      "In 90 days, you've crossed the line from builder to operator — your first invoice is paid, your first system is live, and you have the case study that makes the second close twice as fast.",
    early:
      "In 90 days, you've added at least one reliable retainer client and a case study worth sharing — your business has a floor, not just a ceiling.",
    scaling:
      "In 90 days, your close rate is higher, your delivery time is shorter, and you've freed 10+ hours a week to focus on growth instead of execution.",
  },
  retainers: {
    consuming:
      "In 90 days, you have at least one client paying you every month for an AI system that keeps working — recurring revenue on a business you understand end to end.",
    built:
      "In 90 days, you have your first monthly retainer — a client who sees results, doesn't question the renewal, and becomes your first real case study.",
    early:
      "In 90 days, 2–3 retainers give your income a floor — predictable, stackable, compounding.",
    scaling:
      "In 90 days, 70%+ of your revenue is recurring and the business feels stable — less chasing, more compounding.",
  },
  scale: {
    consuming:
      "In 90 days, you've built the foundation that makes $10k/mo possible — a validated offer, a real market, and your first proof point.",
    built:
      "In 90 days, you have 2–3 clients and a clear line of sight to $5k–$10k/mo — the gap now is execution, not opportunity.",
    early:
      "In 90 days, you've cracked $10k/mo, you know exactly what drove it, and you have the system to repeat it without adding stress.",
    scaling:
      "In 90 days, you're past $10k/mo with healthy margins and real leverage — the next $10k costs less than the first one did.",
  },
  systemize: {
    consuming:
      "In 90 days, you have a documented, lean operation — every client delivered through a system, not through you scrambling.",
    built:
      "In 90 days, your first clients are delivered through a real process, not ad hoc hustle — and you can see exactly how this scales.",
    early:
      "In 90 days, you've stopped being the bottleneck — clients onboard on a schedule, delivery runs on SOPs, and you have 10+ hours a week back.",
    scaling:
      "In 90 days, your agency runs through systems you built — not through you — and you have the mental bandwidth to work on the business, not in it.",
  },
};

export type FallbackRoadmap = {
  diagnosis: string;
  priorityLayer: number;
  stack: {
    n: number;
    name: string;
    purpose: string;
    status: "priority" | "supporting";
  }[];
  moves: { title: string; detail: string }[];
  arc: { phase: string; focus: string }[];
  outcome: string;
};

export function generateFallbackRoadmap(
  stage: string,
  bottleneck: string,
  goal: string
): FallbackRoadmap {
  const priorityLayer = LAYER_MAP[bottleneck] ?? 1;
  const safeBottleneck = bottleneck in MOVES ? bottleneck : "offer";
  const safeGoal = goal in ARC ? goal : "first";
  const safeStage = stage in { consuming: 1, built: 1, early: 1, scaling: 1 }
    ? stage
    : "consuming";

  const stack = STACK_LAYERS.map((layer) => ({
    n: layer.n,
    name: layer.name,
    purpose: layer.purpose,
    status: (layer.n === priorityLayer ? "priority" : "supporting") as
      | "priority"
      | "supporting",
  }));

  return {
    diagnosis: DIAGNOSIS[safeBottleneck] ?? DIAGNOSIS.offer,
    priorityLayer,
    stack,
    moves: MOVES[safeBottleneck] ?? MOVES.offer,
    arc: ARC[safeGoal] ?? ARC.first,
    outcome:
      OUTCOMES[safeGoal]?.[safeStage] ??
      "In 90 days, you have a real AI business — an offer that converts, a system that delivers, and proof you can do it again.",
  };
}
