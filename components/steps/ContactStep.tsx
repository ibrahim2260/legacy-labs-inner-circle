"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import type { Contact } from "@/lib/schema";

interface ContactStepProps {
  onSubmit: (contact: Contact) => void;
}

interface FieldError {
  name?: string;
  email?: string;
  age?: string;
  instagram?: string;
}

function normalizeInstagram(value: string) {
  const stripped = value.trim().replace(/^@/, "");
  return stripped ? `@${stripped}` : "";
}

export function ContactStep({ onSubmit }: ContactStepProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    instagram: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FieldError => {
    const errs: FieldError = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Enter a valid email address";
    }
    const ageNum = parseInt(values.age, 10);
    if (!values.age) {
      errs.age = "Age is required";
    } else if (isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
      errs.age = "Enter a valid age (13–100)";
    }
    if (!values.instagram.trim()) {
      errs.instagram = "Instagram username is required";
    }
    return errs;
  };

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field as keyof FieldError]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      age: parseInt(values.age, 10),
      instagram: normalizeInstagram(values.instagram),
      phone: values.phone.trim() || undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="w-full"
    >
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mb-1 text-balance leading-snug">
        Where should we send your gameplan?
      </h2>
      <p className="text-sm text-text-secondary mb-6 leading-relaxed">
        Your personalized AI Operator Roadmap will be ready on the next screen.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name */}
        <Field
          label="Full name"
          htmlFor="name"
          error={errors.name}
          required
        >
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Ibrahim Ansari"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            hasError={!!errors.name}
          />
        </Field>

        {/* Email */}
        <Field label="Email address" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            hasError={!!errors.email}
          />
        </Field>

        {/* Age + Instagram side by side */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Age" htmlFor="age" error={errors.age} required>
            <Input
              id="age"
              type="number"
              inputMode="numeric"
              placeholder="25"
              min={13}
              max={100}
              value={values.age}
              onChange={(e) => handleChange("age", e.target.value)}
              hasError={!!errors.age}
            />
          </Field>

          <Field
            label="Instagram"
            htmlFor="instagram"
            error={errors.instagram}
            required
          >
            <Input
              id="instagram"
              type="text"
              autoComplete="username"
              placeholder="@yourusername"
              value={values.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              hasError={!!errors.instagram}
            />
          </Field>
        </div>

        {/* Phone (optional) */}
        <Field label="Phone number" htmlFor="phone" hint="Optional">
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          loading={submitting}
          className="w-full mt-2 font-semibold tracking-wide"
        >
          Get My Gameplan →
        </Button>

        <p className="text-[11px] text-text-muted text-center leading-relaxed">
          No spam. Your info is used to send your gameplan and route your application.
        </p>
      </form>
    </motion.div>
  );
}

// ─── Local sub-components ─────────────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={htmlFor}
          className="text-xs font-mono font-medium text-text-secondary uppercase tracking-widest"
        >
          {label}
          {required && <span className="text-blue-primary ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function Input({
  hasError,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      className={clsx(
        "w-full bg-bg-card border rounded-lg px-3.5 py-3 text-sm text-text-primary placeholder:text-text-ghost",
        "font-body transition-all duration-150 outline-none",
        "focus:border-blue-primary focus:shadow-[0_0_10px_rgba(45,107,255,0.15)]",
        hasError
          ? "border-red-500/60 focus:border-red-400"
          : "border-blue-dim hover:border-blue-faint",
        className
      )}
      {...props}
    />
  );
}
