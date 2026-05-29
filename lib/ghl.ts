import { FUNNEL_CONFIG } from "@/config/funnel";

type GHLPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  age?: number;
  instagram?: string;
  stage?: string;
  goal?: string;
  bottleneck?: string;
  commitment?: string;
  capital?: string;
  qualified?: boolean;
  tags?: string[];
  source?: string;
};

function splitName(fullName: string): { firstName: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : undefined,
  };
}

async function pushWebhook(payload: GHLPayload): Promise<void> {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    console.warn("[GHL] GHL_WEBHOOK_URL not set — skipping CRM push");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GHL webhook ${res.status}: ${body}`);
  }
}

// Called after the contact step — saves the lead before the capital question
export async function capturePartialLead(data: {
  name: string;
  email: string;
  phone?: string;
  age: number;
  instagram: string;
  stage: string;
  goal: string;
  bottleneck: string;
  commitment: string;
}): Promise<void> {
  const { firstName, lastName } = splitName(data.name);
  await pushWebhook({
    firstName,
    lastName,
    email: data.email,
    phone: data.phone || undefined,
    age: data.age,
    instagram: data.instagram,
    stage: data.stage,
    goal: data.goal,
    bottleneck: data.bottleneck,
    commitment: data.commitment,
    tags: [FUNNEL_CONFIG.tags.partial],
    source: "llic-application",
  });
}

// Called on full submission — updates the lead with capital + qualification tag
export async function submitFullApplication(data: {
  name: string;
  email: string;
  phone?: string;
  age: number;
  instagram: string;
  stage: string;
  goal: string;
  bottleneck: string;
  commitment: string;
  capital: string;
  qualified: boolean;
}): Promise<void> {
  const { firstName, lastName } = splitName(data.name);
  const tag = data.qualified
    ? FUNNEL_CONFIG.tags.qualified
    : FUNNEL_CONFIG.tags.unqualified;

  await pushWebhook({
    firstName,
    lastName,
    email: data.email,
    phone: data.phone || undefined,
    age: data.age,
    instagram: data.instagram,
    stage: data.stage,
    goal: data.goal,
    bottleneck: data.bottleneck,
    commitment: data.commitment,
    capital: data.capital,
    qualified: data.qualified,
    tags: [FUNNEL_CONFIG.tags.partial, tag],
    source: "llic-application",
  });
}
