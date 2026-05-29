"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number; // 1-based current step
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      {/* Track */}
      <div className="h-[2px] w-full bg-blue-faint rounded-full overflow-hidden">
        {/* Fill */}
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background:
              "linear-gradient(90deg, #2D6BFF 0%, #3EC9F5 100%)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Leading glow */}
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: "rgba(62, 201, 245, 0.5)",
              filter: "blur(6px)",
              transform: "translateX(50%) translateY(-50%)",
            }}
          />
        </motion.div>
      </div>

      {/* Step label */}
      <p className="mt-2 text-[11px] font-mono text-text-muted tracking-widest uppercase">
        Step {current} of {total}
      </p>
    </div>
  );
}
