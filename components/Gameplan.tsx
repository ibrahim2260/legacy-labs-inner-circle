"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { Roadmap } from "@/lib/schema";

interface GameplanProps {
  roadmap: Roadmap;
  name: string;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Gameplan({ roadmap, name }: GameplanProps) {
  const firstName = name.trim().split(" ")[0];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <p className="text-[11px] font-mono text-cyan-primary tracking-widest uppercase mb-2">
          AI Operator Gameplan
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-snug">
          {firstName ? `${firstName}'s` : "Your"} Personalized Roadmap
        </h2>
      </motion.div>

      {/* Diagnosis */}
      <motion.div
        variants={fadeUp}
        className="relative rounded-xl border border-blue-primary/30 bg-bg-card p-5 overflow-hidden"
        style={{ boxShadow: "0 0 30px rgba(45,107,255,0.08)" }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
          style={{ background: "linear-gradient(to bottom, #2D6BFF, #3EC9F5)" }}
        />
        <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase ml-4 mb-2">
          Diagnosis
        </p>
        <p className="text-text-primary leading-relaxed ml-4 text-sm sm:text-base">
          {roadmap.diagnosis}
        </p>
      </motion.div>

      {/* 5-Layer Stack */}
      <motion.div variants={fadeUp}>
        <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase mb-4">
          The AI Operator Stack — Your Priority
        </p>
        <div className="flex flex-col gap-2.5">
          {roadmap.stack.map((layer, i) => {
            const isPriority = layer.status === "priority";
            return (
              <motion.div
                key={layer.n}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                className={clsx(
                  "flex items-start gap-3.5 rounded-xl border p-4 transition-all duration-300",
                  isPriority
                    ? "border-blue-primary bg-bg-card-active shadow-[0_0_20px_rgba(45,107,255,0.15)]"
                    : "border-blue-faint bg-bg-card opacity-60"
                )}
              >
                {/* Layer number */}
                <div
                  className={clsx(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-bold",
                    isPriority
                      ? "bg-blue-primary text-white"
                      : "bg-bg-secondary text-text-muted border border-blue-faint"
                  )}
                >
                  {layer.n}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={clsx(
                        "font-display font-semibold text-sm leading-snug",
                        isPriority ? "text-white" : "text-text-secondary"
                      )}
                    >
                      {layer.name}
                    </p>
                    {isPriority && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-primary border border-cyan-dim/40 rounded-full px-2 py-0.5 bg-cyan-dim/10">
                        <span className="w-1 h-1 rounded-full bg-cyan-primary inline-block" />
                        PRIORITY
                      </span>
                    )}
                  </div>
                  <p
                    className={clsx(
                      "text-xs mt-0.5 leading-relaxed",
                      isPriority ? "text-text-secondary" : "text-text-muted"
                    )}
                  >
                    {layer.purpose}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 3 Next Moves */}
      <motion.div variants={fadeUp}>
        <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase mb-4">
          Your 3 Next Moves — Start Here
        </p>
        <div className="flex flex-col gap-4">
          {roadmap.moves.map((move, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.1 }}
              className="flex gap-4 rounded-xl border border-blue-faint bg-bg-card p-4 hover:border-blue-dim transition-colors duration-200"
            >
              {/* Number */}
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold text-blue-primary border border-blue-dim mt-0.5"
                style={{ background: "rgba(45,107,255,0.08)" }}
              >
                {i + 1}
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm text-text-primary mb-1 leading-snug">
                  {move.title}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {move.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 90-Day Arc */}
      <motion.div variants={fadeUp}>
        <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase mb-4">
          Your 90-Day Arc
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {roadmap.arc.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.1 }}
              className="relative rounded-xl border border-blue-faint bg-bg-card p-4 overflow-hidden"
            >
              {/* Phase accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${
                    i === 0
                      ? "#2D6BFF"
                      : i === 1
                      ? "#3596FF"
                      : "#3EC9F5"
                  } 0%, transparent 100%)`,
                }}
              />
              <p className="text-[10px] font-mono text-blue-primary tracking-widest uppercase mb-2">
                {phase.phase}
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                {phase.focus}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Outcome */}
      <motion.div
        variants={fadeUp}
        className="rounded-xl border border-cyan-dim/30 p-5 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,107,255,0.06) 0%, rgba(62,201,245,0.06) 100%)",
        }}
      >
        <p className="text-[10px] font-mono text-cyan-primary tracking-widest uppercase mb-3">
          Day 90 Outcome
        </p>
        <p className="font-display text-base sm:text-lg font-semibold text-text-primary leading-snug text-balance">
          {roadmap.outcome}
        </p>
      </motion.div>
    </motion.div>
  );
}
