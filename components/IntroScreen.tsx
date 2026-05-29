"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

interface IntroScreenProps {
  onStart: () => void;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  const handleStart = () => {
    track("funnel_started");
    onStart();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-16 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl flex flex-col items-center gap-6"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-primary" />
          </span>
          <span className="text-xs font-mono text-cyan-primary tracking-widest uppercase">
            Applications Now Open
          </span>
        </motion.div>

        {/* Logo / Brand */}
        <motion.div variants={item} className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3 mb-2">
            {/* Monogram mark */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-display font-bold text-white border border-blue-dim"
              style={{
                background:
                  "linear-gradient(135deg, #0E2260 0%, #1A3B8A 100%)",
                boxShadow: "0 0 20px rgba(45, 107, 255, 0.2)",
              }}
            >
              LL
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                Legacy Labs
              </p>
              <p className="text-sm font-mono text-text-secondary tracking-wider">
                Inner Circle
              </p>
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-[1.05] text-balance"
        >
          The AI Operator{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #2D6BFF 0%, #3EC9F5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Method™
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl text-balance"
        >
          Thousands of people are consuming AI content. A much quieter group is
          charging local businesses $5k–$25k/month to install AI systems those
          businesses are already begging to buy.
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm text-text-muted leading-relaxed max-w-lg text-balance"
        >
          The difference isn't intelligence or timing. Apply below and we'll
          build your personalized AI Operator Gameplan — free, in 60 seconds,
          tailored to exactly where you are right now.
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <Button
            size="lg"
            onClick={handleStart}
            className="w-full sm:w-auto px-10 font-semibold text-base tracking-wide animate-glow-pulse"
          >
            Apply to Legacy Labs Inner Circle →
          </Button>
          <p className="text-[11px] text-text-muted">
            Takes 60 seconds · Free AI gameplan for every applicant
          </p>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 pt-6 border-t border-blue-faint w-full"
        >
          {[
            { n: "3M+", label: "generated online" },
            { n: "1,500+", label: "clients served" },
            { n: "60K+", label: "community members" },
            { n: "30+", label: "countries" },
          ].map(({ n, label }) => (
            <div key={n} className="flex flex-col items-center">
              <span className="font-display font-bold text-white text-lg">{n}</span>
              <span className="text-[11px] text-text-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
