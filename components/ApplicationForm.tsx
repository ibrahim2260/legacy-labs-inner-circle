"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar } from "@/components/ProgressBar";
import { SelectStep } from "@/components/steps/SelectStep";
import { ContactStep } from "@/components/steps/ContactStep";
import { Button } from "@/components/ui/Button";
import { QUESTIONS } from "@/config/funnel";
import { track } from "@/lib/analytics";
import type { Contact, FormAnswers } from "@/lib/schema";

const STEP_ORDER = [
  "stage",
  "goal",
  "bottleneck",
  "commitment",
  "contact",
  "capital",
] as const;

type StepKey = (typeof STEP_ORDER)[number];
type SelectAnswers = Omit<Partial<FormAnswers>, "contact">;

interface ApplicationFormProps {
  onSubmit: (answers: FormAnswers) => void;
}

export function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SelectAnswers>({});
  const [contact, setContact] = useState<Contact | null>(null);

  const stepKey = STEP_ORDER[currentStep];
  const totalSteps = STEP_ORDER.length;

  const goBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSelect = (field: StepKey, value: string) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers as SelectAnswers);

    track("step_complete", { step: currentStep + 1, field, value });

    if (field === "capital") {
      // Last step — fire submit
      const fullAnswers: FormAnswers = {
        stage: (newAnswers as FormAnswers).stage,
        goal: (newAnswers as FormAnswers).goal,
        bottleneck: (newAnswers as FormAnswers).bottleneck,
        commitment: (newAnswers as FormAnswers).commitment,
        contact: contact!,
        capital: value as FormAnswers["capital"],
      };
      onSubmit(fullAnswers);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleContactSubmit = (c: Contact) => {
    setContact(c);
    track("step_complete", { step: currentStep + 1, field: "contact" });

    // Fire partial lead capture in the background (non-blocking)
    void fetch("/api/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stage: answers.stage,
        goal: answers.goal,
        bottleneck: answers.bottleneck,
        commitment: answers.commitment,
        contact: c,
      }),
    }).catch((err: unknown) =>
      console.error("[capture] Background request failed:", err)
    );

    setCurrentStep((s) => s + 1);
  };

  // Track step views
  const handleStepView = (step: number) => {
    track("step_view", { step: step + 1, field: STEP_ORDER[step] });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 px-5 pb-16">
      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center mb-4">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep > 0 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              disabled={currentStep === 0}
              aria-label="Go to previous step"
              className="text-text-muted hover:text-text-secondary -ml-2"
            >
              ← Back
            </Button>
          </motion.div>
        </div>

        <ProgressBar current={currentStep + 1} total={totalSteps} />
      </div>

      {/* Hero copy — step 1 only */}
      <AnimatePresence>
        {currentStep === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-lg text-center mb-8"
          >
            <p className="text-[11px] font-mono text-cyan-primary tracking-widest uppercase mb-3">
              Free AI Operator Roadmap
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-snug text-balance mb-3">
              Get your custom AI Operator Roadmap — built for exactly where you are right now.
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed text-balance">
              Answer a few quick questions and I&apos;ll map your path from where you are
              today to building, scaling, and winning with AI... in under 60 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait" onExitComplete={() => handleStepView(currentStep)}>
          <div key={stepKey}>
            {stepKey === "contact" ? (
              <ContactStep onSubmit={handleContactSubmit} />
            ) : stepKey === "stage" ? (
              <SelectStep
                heading={QUESTIONS.stage.heading}
                sub={QUESTIONS.stage.sub}
                options={QUESTIONS.stage.options}
                selectedValue={answers.stage}
                onSelect={(v) => handleSelect("stage", v)}
              />
            ) : stepKey === "goal" ? (
              <SelectStep
                heading={QUESTIONS.goal.heading}
                sub={QUESTIONS.goal.sub}
                options={QUESTIONS.goal.options}
                selectedValue={answers.goal}
                onSelect={(v) => handleSelect("goal", v)}
              />
            ) : stepKey === "bottleneck" ? (
              <SelectStep
                heading={QUESTIONS.bottleneck.heading}
                sub={QUESTIONS.bottleneck.sub}
                options={QUESTIONS.bottleneck.options}
                selectedValue={answers.bottleneck as string | undefined}
                onSelect={(v) => handleSelect("bottleneck", v)}
              />
            ) : stepKey === "commitment" ? (
              <SelectStep
                heading={QUESTIONS.commitment.heading}
                sub={QUESTIONS.commitment.sub}
                options={QUESTIONS.commitment.options}
                selectedValue={answers.commitment as string | undefined}
                onSelect={(v) => handleSelect("commitment", v)}
              />
            ) : (
              // capital
              <SelectStep
                heading={QUESTIONS.capital.heading}
                sub={QUESTIONS.capital.sub}
                options={QUESTIONS.capital.options}
                selectedValue={answers.capital as string | undefined}
                onSelect={(v) => handleSelect("capital", v)}
              />
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
