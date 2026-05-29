import { NextResponse } from "next/server";
import { PartialFormSchema } from "@/lib/schema";
import { capturePartialLead } from "@/lib/ghl";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const data = PartialFormSchema.parse(body);

    // Fire and forget — don't block the UX on GHL responding
    capturePartialLead({
      name: data.contact.name,
      email: data.contact.email,
      phone: data.contact.phone,
      age: data.contact.age,
      instagram: data.contact.instagram,
      stage: data.stage,
      goal: data.goal,
      bottleneck: data.bottleneck,
      commitment: data.commitment,
    }).catch((err: unknown) =>
      console.error(
        "[GHL] Partial capture failed:",
        err instanceof Error ? err.message : err
      )
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[capture] Validation error:", err);
    return NextResponse.json(
      { success: false, error: "Invalid submission data" },
      { status: 400 }
    );
  }
}
