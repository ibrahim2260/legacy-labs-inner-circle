import Anthropic from "@anthropic-ai/sdk";
import {
  FUNNEL_CONFIG,
  GAMEPLAN_SYSTEM_PROMPT,
  generateFallbackRoadmap,
} from "@/config/funnel";
import { RoadmapSchema, type FormAnswers, type Roadmap } from "./schema";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const STAGE_LABELS: Record<string, string> = {
  consuming: "Still consuming content — no offer or clients yet",
  built: "Has built AI tools but has no paying client yet",
  early: "Has 1–3 clients with inconsistent, unpredictable revenue",
  scaling: "Running an agency, wants to scale past current ceiling and systemize",
};

const GOAL_LABELS: Record<string, string> = {
  first: "Land their very first paying client in the next 90 days",
  retainers: "Build consistent, predictable monthly retainer revenue",
  scale: "Scale the business past $10,000/month",
  systemize: "Systemize operations so the business runs without their daily presence",
};

const BOTTLENECK_LABELS: Record<string, string> = {
  offer: "Layer 1 — The Offer: what they sell isn't clear, productized, or compelling to buyers",
  market: "Layer 2 — The Market: they haven't picked a niche with real budget and AI demand",
  acquisition: "Layer 3 — The Acquisition Engine: they're not booking enough qualified calls consistently",
  sales: "Layer 4 — The Sales Frame: calls are happening but they're not converting at the needed rate",
  fulfillment: "Layer 5 — The Fulfillment Stack: delivery is slow, manual, stressful, or inconsistent",
};

const COMMITMENT_LABELS: Record<string, string> = {
  ready: "Ready to execute immediately — outreach, calls, implementation starting now",
  committed: "Fully committed, has the bandwidth, needs the right plan to execute",
  exploring: "Still exploring the opportunity, hasn't committed to execution yet",
  curious: "Mostly curious, still in research/evaluation mode",
};

function buildUserMessage(answers: FormAnswers): string {
  return `Generate a personalized AI Operator Roadmap for this applicant. Make it feel written for them specifically — not a template.

APPLICANT PROFILE:
• Current Stage: ${STAGE_LABELS[answers.stage] ?? answers.stage}
• 90-Day Goal: ${GOAL_LABELS[answers.goal] ?? answers.goal}
• Primary Bottleneck (PRIORITY LAYER): ${BOTTLENECK_LABELS[answers.bottleneck] ?? answers.bottleneck}
• Commitment Level: ${COMMITMENT_LABELS[answers.commitment] ?? answers.commitment}

INSTRUCTIONS:
- The diagnosis must name a specific cost this bottleneck is causing them RIGHT NOW given their stage.
- The 3 moves must be things they can do THIS WEEK — specific tools, specific actions, specific numbers.
- The 90-day arc should show a realistic trajectory from their current stage toward their stated goal.
- The outcome sentence should make them feel the gap between where they are and where they'll be.
- Return ONLY valid JSON. No markdown. No prose outside the JSON object.`;
}

export async function generateRoadmap(answers: FormAnswers): Promise<Roadmap> {
  try {
    const message = await client.messages.create({
      model: FUNNEL_CONFIG.anthropicModel,
      max_tokens: 2048,
      system: GAMEPLAN_SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserMessage(answers) }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected Anthropic response type");
    }

    // Strip any accidental markdown fences before parsing
    const cleaned = content.text
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "");

    const parsed: unknown = JSON.parse(cleaned);
    return RoadmapSchema.parse(parsed);
  } catch (err) {
    console.error(
      "[Anthropic] Roadmap generation failed — using deterministic fallback:",
      err instanceof Error ? err.message : err
    );
    return generateFallbackRoadmap(
      answers.stage,
      answers.bottleneck,
      answers.goal
    );
  }
}
