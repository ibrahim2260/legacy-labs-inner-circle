"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gameplan } from "@/components/Gameplan";
import { Button } from "@/components/ui/Button";
import { FUNNEL_CONFIG } from "@/config/funnel";
import { track } from "@/lib/analytics";
import type { SubmitResponse } from "@/lib/schema";

interface ResultsScreenProps {
  data: SubmitResponse;
  contactName: string;
  onReset: () => void;
}

export function ResultsScreen({ data, contactName, onReset }: ResultsScreenProps) {
  const { qualified, roadmap } = data;
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qualified) return;
    const script = document.createElement("script");
    script.src = FUNNEL_CONFIG.calendarScriptUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [qualified]);

  const scrollToCalendar = () => {
    track("booking_click");
    calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSkoolClick = () => track("skool_click");

  // Shared top bar
  const TopBar = (
    <div className="w-full max-w-2xl flex items-center justify-end mb-10">
      {FUNNEL_CONFIG.showResetButton && (
        <button
          onClick={onReset}
          className="text-[11px] font-mono text-text-ghost hover:text-text-muted transition-colors px-2 py-1 border border-text-ghost/20 rounded"
        >
          ↺ Reset (dev)
        </button>
      )}
    </div>
  );

  // ─── QUALIFIED PATH ───────────────────────────────────────────────────────────
  if (qualified) {
    return (
      <div className="min-h-screen flex flex-col items-center px-5 pt-12 pb-20">
        {TopBar}

        <div className="w-full max-w-2xl flex flex-col gap-0">

          {/* 1. Intro copy block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Qualified badge */}
            {(() => {
              const firstName = contactName.trim().split(/\s+/)[0];
              const label = firstName ? `Built for you, ${firstName}` : "Built for you";
              return (
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-primary" />
                  </span>
                  <span className="text-xs font-mono text-cyan-primary tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              );
            })()}

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-snug text-balance mb-4">
              Your AI Operator Roadmap is ready —<br className="hidden sm:block" /> here's your next move.
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl text-balance mb-3">
              Your personalized gameplan is waiting just below. It maps your exact
              bottleneck, your 3 immediate next moves, and your full 90-day arc.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl text-balance">
              The fastest way to execute it is a free build call with my team. We'll
              take your roadmap, pressure-test it against your specific situation, and
              build a real action plan together. Spots are limited — applications are
              reviewed for fit. Grab a time now, then read your roadmap below.
            </p>
          </motion.div>

          {/* 2. Calendar section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="mb-14"
          >
            <div
              className="rounded-2xl border border-blue-primary/30 overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(45,107,255,0.1)" }}
            >
              {/* Calendar header bar */}
              <div
                className="px-5 sm:px-7 py-5 border-b border-blue-faint"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,34,96,0.6) 0%, rgba(26,59,138,0.4) 100%)",
                }}
              >
                <p className="text-[10px] font-mono text-cyan-primary tracking-widest uppercase mb-1">
                  Free · No pitch · Fit-reviewed
                </p>
                <h2 className="font-display text-lg sm:text-xl font-bold text-text-primary">
                  Book your free build call.
                </h2>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  This is a real conversation with my team — not a sales pitch. We
                  figure out if this is the right fit on both sides.
                </p>
              </div>

              {/* Iframe */}
              <div
                ref={calendarRef}
                className="bg-bg-card w-full"
                style={{ minHeight: "680px" }}
              >
                <iframe
                  src={FUNNEL_CONFIG.calendarEmbedUrl}
                  id={FUNNEL_CONFIG.calendarEmbedId}
                  title="Book your free build call with the Legacy Labs team"
                  style={{
                    width: "100%",
                    border: "none",
                    minHeight: "680px",
                    display: "block",
                  }}
                  scrolling="no"
                />
              </div>
            </div>

            <p className="text-[11px] text-text-muted text-center mt-3 leading-relaxed">
              Spots are limited. Serious builders only.
            </p>
          </motion.div>

          {/* 3. Divider + gameplan intro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(45,107,255,0.4) 100%)",
                }}
              />
              <p className="text-[10px] font-mono text-text-muted tracking-widest uppercase whitespace-nowrap">
                Your roadmap
              </p>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(45,107,255,0.4) 0%, transparent 100%)",
                }}
              />
            </div>

            <p className="text-sm text-text-secondary leading-relaxed text-balance max-w-xl">
              This is your personalized AI Operator Roadmap — built on your answers,
              specific to where you are right now. Read it, use it, and bring your
              questions to the call.
            </p>
          </motion.div>

          {/* 4. Full gameplan */}
          <Gameplan roadmap={roadmap} name={contactName} />

          {/* 5. Bottom booking nudge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-14 rounded-2xl border border-blue-faint bg-bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ boxShadow: "0 0 30px rgba(45,107,255,0.06)" }}
          >
            <p className="font-display text-sm sm:text-base font-semibold text-text-primary text-balance sm:text-left text-center leading-snug max-w-sm">
              Your roadmap is only as good as the action behind it — book your call.
            </p>
            <Button
              variant="cyan"
              size="md"
              onClick={scrollToCalendar}
              className="flex-shrink-0 font-semibold px-7"
            >
              Book your call ↑
            </Button>
          </motion.div>

        </div>
      </div>
    );
  }

  // ─── UNQUALIFIED PATH — unchanged ─────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-12 pb-20">
      {TopBar}

      {/* Gameplan first, same as before */}
      <Gameplan roadmap={roadmap} name={contactName} />

      {/* Divider */}
      <div className="w-full max-w-2xl my-12">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(45,107,255,0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Skool community section */}
      <UnqualifiedSection onSkoolClick={handleSkoolClick} />
    </div>
  );
}

// ─── Unqualified: Skool community — untouched ────────────────────────────────

function UnqualifiedSection({ onSkoolClick }: { onSkoolClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl text-center"
    >
      <div
        className="rounded-2xl border border-blue-faint bg-bg-card p-8 sm:p-10"
        style={{ boxShadow: "0 0 40px rgba(45,107,255,0.06)" }}
      >
        <div
          className="w-12 h-12 rounded-xl border border-blue-dim flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(45,107,255,0.08)" }}
        >
          <span className="text-2xl">🏗</span>
        </div>

        <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-3 text-balance">
          Your Gameplan Is Yours — Start Building
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-md mx-auto text-balance">
          Every business starts somewhere. The gameplan above is real — use it.
          While you build your foundation, The Founders Club is the free community
          where 60,000+ builders are doing exactly what you&apos;re working toward.
          Live sessions, accountability, and operators sharing what&apos;s working now.
        </p>

        <a
          href={FUNNEL_CONFIG.skoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSkoolClick}
          className="inline-flex"
        >
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto px-10 font-semibold"
          >
            Join The Founders Club →
          </Button>
        </a>

        <p className="text-[11px] text-text-muted mt-5 leading-relaxed max-w-sm mx-auto">
          Free, no credit card. When you&apos;re ready to move faster, apply again —
          the door is open.
        </p>
      </div>
    </motion.div>
  );
}
