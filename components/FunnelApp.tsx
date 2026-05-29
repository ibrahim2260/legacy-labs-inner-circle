"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroScreen } from "@/components/IntroScreen";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ResultsScreen } from "@/components/ResultsScreen";
import { LoadingState } from "@/components/ui/LoadingState";
import { GridBackground } from "@/components/ui/GridBackground";
import { track } from "@/lib/analytics";
import type { FormAnswers, SubmitResponse } from "@/lib/schema";

type Phase =
  | { name: "intro" }
  | { name: "form" }
  | { name: "submitting" }
  | { name: "results"; data: SubmitResponse; contactName: string }
  | { name: "error"; message: string };

export function FunnelApp() {
  const [phase, setPhase] = useState<Phase>({ name: "form" });

  const handleStart = () => {
    setPhase({ name: "form" });
  };

  const handleSubmit = async (answers: FormAnswers) => {
    setPhase({ name: "submitting" });
    track("application_submit", {
      stage: answers.stage,
      goal: answers.goal,
      bottleneck: answers.bottleneck,
      commitment: answers.commitment,
      capital: answers.capital,
    });

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as SubmitResponse;

      track(data.qualified ? "qualified" : "not_qualified", {
        capital: answers.capital,
      });

      setPhase({
        name: "results",
        data,
        contactName: answers.contact.name,
      });
    } catch (err) {
      console.error("[submit]", err);
      setPhase({
        name: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong. Please refresh and try again.",
      });
    }
  };

  const handleReset = () => {
    setPhase({ name: "intro" });
  };

  return (
    <>
      <GridBackground />

      <AnimatePresence mode="wait">
        {phase.name === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IntroScreen onStart={handleStart} />
          </motion.div>
        )}

        {phase.name === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ApplicationForm onSubmit={handleSubmit} />
          </motion.div>
        )}

        {phase.name === "submitting" && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState />
          </motion.div>
        )}

        {phase.name === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsScreen
              data={phase.data}
              contactName={phase.contactName}
              onReset={handleReset}
            />
          </motion.div>
        )}

        {phase.name === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-8"
          >
            <div className="text-center max-w-md">
              <p className="text-[11px] font-mono text-text-muted tracking-widest uppercase mb-4">
                Something went wrong
              </p>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                {phase.message}
              </p>
              <button
                onClick={handleReset}
                className="text-sm text-blue-primary hover:text-white transition-colors underline underline-offset-2"
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
