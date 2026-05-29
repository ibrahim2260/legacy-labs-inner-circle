"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Analyzing your bottleneck layer…",
  "Mapping your 90-day arc…",
  "Generating your next moves…",
  "Calibrating your priority stack…",
  "Building your gameplan…",
];

export function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      role="status"
      aria-label="Generating your AI Operator Gameplan"
    >
      {/* Animated ring */}
      <div className="relative mb-10">
        <div className="w-20 h-20 rounded-full border-2 border-blue-faint" />
        <div
          className="absolute inset-0 w-20 h-20 rounded-full border-2 border-t-blue-primary border-r-blue-primary border-transparent animate-spin"
          style={{ animationDuration: "1.2s" }}
        />
        <div
          className="absolute inset-2 w-16 h-16 rounded-full border border-t-cyan-primary border-transparent animate-spin"
          style={{ animationDuration: "0.8s", animationDirection: "reverse" }}
        />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-blue-primary shadow-glow-blue-sm animate-glow-pulse" />
        </div>
      </div>

      <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
        Building your gameplan
      </h2>

      {/* Rotating status message */}
      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-text-muted font-mono text-center"
          >
            {MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5 mt-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-blue-primary"
            style={{
              animation: `dot-bounce 1.4s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
