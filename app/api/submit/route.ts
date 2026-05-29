import { NextResponse } from "next/server";
import { FormAnswersSchema, type SubmitResponse } from "@/lib/schema";
import { generateRoadmap } from "@/lib/anthropic";
import { submitFullApplication } from "@/lib/ghl";
import { FUNNEL_CONFIG } from "@/config/funnel";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const answers = FormAnswersSchema.parse(body);

    // Determine qualification server-side — never trust the client
    const qualified = (FUNNEL_CONFIG.qualifyTiers as readonly string[]).includes(
      answers.capital
    );

    // Push to GHL non-blocking — user shouldn't wait on CRM
    submitFullApplication({
      name: answers.contact.name,
      email: answers.contact.email,
      phone: answers.contact.phone,
      age: answers.contact.age,
      instagram: answers.contact.instagram,
      stage: answers.stage,
      goal: answers.goal,
      bottleneck: answers.bottleneck,
      commitment: answers.commitment,
      capital: answers.capital,
      qualified,
    }).catch((err: unknown) =>
      console.error(
        "[GHL] Full application push failed:",
        err instanceof Error ? err.message : err
      )
    );

    // Generate the roadmap — this is what the user waits for
    const roadmap = await generateRoadmap(answers);

    const response: SubmitResponse = {
      success: true,
      qualified,
      roadmap,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("[submit] Error:", err);

    if (err instanceof Error && err.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid submission data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong generating your gameplan" },
      { status: 500 }
    );
  }
}
