import { z } from "zod";

// ─── Form field schemas ───────────────────────────────────────────────────────

export const StageSchema = z.enum(["consuming", "built", "early", "scaling"]);
export const GoalSchema = z.enum([
  "first",
  "retainers",
  "scale",
  "systemize",
]);
export const BottleneckSchema = z.enum([
  "offer",
  "market",
  "acquisition",
  "sales",
  "fulfillment",
]);
export const CommitmentSchema = z.enum([
  "ready",
  "committed",
  "exploring",
  "curious",
]);
export const CapitalSchema = z.enum([
  "5to10k",
  "3to5k",
  "1to3k",
  "700to1k",
  "300to700",
  "under300",
]);

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .transform((v) => v.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .int("Age must be a whole number")
    .min(13, "Must be 13 or older")
    .max(100, "Please enter a valid age"),
  instagram: z
    .string()
    .min(1, "Instagram username is required")
    .max(50, "Username is too long")
    .transform((v) => {
      const stripped = v.trim().replace(/^@/, "");
      return stripped ? `@${stripped}` : v.trim();
    }),
  phone: z.string().optional(),
});

// ─── Full form submission ─────────────────────────────────────────────────────

export const FormAnswersSchema = z.object({
  stage: StageSchema,
  goal: GoalSchema,
  bottleneck: BottleneckSchema,
  commitment: CommitmentSchema,
  contact: ContactSchema,
  capital: CapitalSchema,
});

export type FormAnswers = z.infer<typeof FormAnswersSchema>;
export type Contact = z.infer<typeof ContactSchema>;

// ─── Partial capture schema (after contact step, before capital) ──────────────

export const PartialFormSchema = z.object({
  stage: StageSchema,
  goal: GoalSchema,
  bottleneck: BottleneckSchema,
  commitment: CommitmentSchema,
  contact: ContactSchema,
});

export type PartialForm = z.infer<typeof PartialFormSchema>;

// ─── Roadmap schema (returned by Anthropic / fallback generator) ──────────────

export const StackLayerSchema = z.object({
  n: z.number().int().min(1).max(5),
  name: z.string().min(1),
  purpose: z.string().min(1),
  status: z.enum(["priority", "supporting"]),
});

export const MoveSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});

export const ArcPhaseSchema = z.object({
  phase: z.string().min(1),
  focus: z.string().min(1),
});

export const RoadmapSchema = z.object({
  diagnosis: z.string().min(1),
  priorityLayer: z.number().int().min(1).max(5),
  stack: z.array(StackLayerSchema).length(5),
  moves: z.array(MoveSchema).min(3).max(3),
  arc: z.array(ArcPhaseSchema).length(3),
  outcome: z.string().min(1),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

// ─── API response ─────────────────────────────────────────────────────────────

export type SubmitResponse = {
  success: true;
  qualified: boolean;
  roadmap: Roadmap;
};

export type CaptureResponse = {
  success: boolean;
};
