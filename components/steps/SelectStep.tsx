"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface Option {
  value: string;
  label: string;
  sub?: string;
}

interface SelectStepProps {
  heading: string;
  sub?: string;
  options: readonly Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function SelectStep({
  heading,
  sub,
  options,
  selectedValue,
  onSelect,
}: SelectStepProps) {
  const [justSelected, setJustSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    if (justSelected) return; // prevent double-fire
    setJustSelected(value);
    // Small delay so user sees the selection before transition
    setTimeout(() => onSelect(value), 280);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="w-full"
    >
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mb-2 text-balance leading-snug">
        {heading}
      </h2>
      {sub && (
        <p className="text-sm text-text-secondary mb-6 leading-relaxed">{sub}</p>
      )}
      {!sub && <div className="mb-6" />}

      <div className="flex flex-col gap-3">
        {options.map((option, i) => {
          const isSelected =
            selectedValue === option.value || justSelected === option.value;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              onClick={() => handleSelect(option.value)}
              disabled={!!justSelected}
              aria-pressed={isSelected}
              className={clsx(
                "group w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-primary",
                "disabled:cursor-default",
                isSelected
                  ? "border-blue-primary bg-bg-card-active shadow-[0_0_16px_rgba(45,107,255,0.18)]"
                  : "border-blue-dim bg-bg-card hover:border-blue-primary hover:bg-bg-card-hover hover:shadow-[0_0_10px_rgba(45,107,255,0.1)]"
              )}
              whileHover={justSelected ? {} : { scale: 1.01 }}
              whileTap={justSelected ? {} : { scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <span
                  className={clsx(
                    "flex-shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                    isSelected
                      ? "border-blue-primary"
                      : "border-text-ghost group-hover:border-blue-dim"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="block w-2 h-2 rounded-full bg-blue-primary"
                    />
                  )}
                </span>

                <div className="min-w-0">
                  <p
                    className={clsx(
                      "font-body font-medium text-sm sm:text-base leading-snug transition-colors duration-150",
                      isSelected ? "text-white" : "text-text-primary"
                    )}
                  >
                    {option.label}
                  </p>
                  {option.sub && (
                    <p
                      className={clsx(
                        "text-xs mt-0.5 leading-relaxed transition-colors duration-150",
                        isSelected ? "text-text-secondary" : "text-text-muted"
                      )}
                    >
                      {option.sub}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
