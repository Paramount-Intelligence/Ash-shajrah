"use client";

import { useState, FormEvent } from "react";
import {
  validateRegistrationForm,
  PROGRAMME_LEVELS,
  type RegistrationFormData,
  type RegistrationFormErrors,
} from "@/lib/register-form";

const INITIAL: RegistrationFormData = {
  parentName: "",
  whatsapp: "",
  email: "",
  childName: "",
  childAge: "",
  level: "",
  cityCountry: "",
  message: "",
  website: "",
};

const inputClass =
  "form-input w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-cream outline-none transition-all duration-300 placeholder:text-cream/30 focus:border-gold focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.15)]";

const selectClass =
  "form-select w-full rounded-xl border border-white/20 bg-emerald-deep px-4 py-2.5 text-sm text-cream outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.15)]";

function BilingualLabel({
  htmlFor,
  en,
  ur,
  required,
}: {
  htmlFor: string;
  en: string;
  ur: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-baseline justify-between gap-2"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-cream/85">
        {en} {required && <span className="text-gold">*</span>}
      </span>
      <span dir="rtl" lang="ur" className="font-urdu text-xs leading-[2] text-gold-soft/75">
        {ur}
      </span>
    </label>
  );
}

export function RegistrationForm() {
  const [form, setForm] = useState<RegistrationFormData>(INITIAL);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field: keyof RegistrationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateRegistrationForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setForm(INITIAL);
      setErrors({});
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-white/20 bg-white/10 p-8 text-center shadow-xl backdrop-blur-md">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl text-gold">
          ✓
        </div>
        <p className="font-display text-xl font-semibold leading-relaxed text-cream">
          Thank you! Your registration has been submitted successfully. Our admissions team will contact you soon.
        </p>
        <p dir="rtl" lang="ur" className="font-urdu mt-3 text-lg leading-[2] text-gold-soft">
          شکریہ! آپ کی رجسٹریشن کامیابی سے جمع ہو گئی ہے۔ ہماری داخلہ ٹیم جلد آپ سے رابطہ کرے گی۔
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-gold transition-colors hover:text-cream"
        >
          Submit another registration
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-emerald-light/10 blur-3xl" />

      <div className="relative">
        {submitError && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50/10 px-4 py-3 text-center">
            <p className="text-sm font-medium text-red-200">{submitError}</p>
            <p dir="rtl" lang="ur" className="font-urdu mt-1 text-sm leading-[2] text-red-300">
              کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں یا واٹس ایپ پر رابطہ کریں۔
            </p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {/* Parent Name */}
          <div>
            <BilingualLabel htmlFor="parentName" en="Parent / Guardian Name" ur="والدین کا نام" required />
            <input
              id="parentName"
              type="text"
              required
              value={form.parentName}
              onChange={(e) => update("parentName", e.target.value)}
              className={inputClass}
              placeholder="Your full name"
            />
            {errors.parentName && <p className="mt-1 text-xs text-red-300">{errors.parentName}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <BilingualLabel htmlFor="whatsapp" en="WhatsApp Number" ur="واٹس ایپ نمبر" required />
            <input
              id="whatsapp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              className={inputClass}
              placeholder="+92 300 0000000"
            />
            {errors.whatsapp && <p className="mt-1 text-xs text-red-300">{errors.whatsapp}</p>}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <BilingualLabel htmlFor="email" en="Email Address" ur="ای میل" required />
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              placeholder="you@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
          </div>

          {/* Child Name */}
          <div>
            <BilingualLabel htmlFor="childName" en="Child's Name" ur="بچے کا نام" required />
            <input
              id="childName"
              type="text"
              required
              value={form.childName}
              onChange={(e) => update("childName", e.target.value)}
              className={inputClass}
              placeholder="Child's full name"
            />
            {errors.childName && <p className="mt-1 text-xs text-red-300">{errors.childName}</p>}
          </div>

          {/* Child Age */}
          <div>
            <BilingualLabel htmlFor="childAge" en="Child's Age" ur="بچے کی عمر" required />
            <input
              id="childAge"
              type="text"
              required
              value={form.childAge}
              onChange={(e) => update("childAge", e.target.value)}
              className={inputClass}
              placeholder="e.g. 4 years"
            />
            {errors.childAge && <p className="mt-1 text-xs text-red-300">{errors.childAge}</p>}
          </div>

          {/* Programme Level */}
          <div>
            <BilingualLabel htmlFor="level" en="Interested Level" ur="مطلوبہ کلاس" required />
            <select
              id="level"
              required
              value={form.level}
              onChange={(e) => update("level", e.target.value)}
              className={selectClass}
            >
              <option value="" className="text-[#0d3b2e] bg-cream">Select a level</option>
              {PROGRAMME_LEVELS.map((level) => (
                <option key={level} value={level} className="text-[#0d3b2e] bg-cream">
                  {level}
                </option>
              ))}
            </select>
            {errors.level && <p className="mt-1 text-xs text-red-300">{errors.level}</p>}
          </div>

          {/* City / Country */}
          <div>
            <BilingualLabel htmlFor="cityCountry" en="City / Country" ur="شہر / ملک" required />
            <input
              id="cityCountry"
              type="text"
              required
              value={form.cityCountry}
              onChange={(e) => update("cityCountry", e.target.value)}
              className={inputClass}
              placeholder="e.g. Islamabad, Pakistan"
            />
            {errors.cityCountry && <p className="mt-1 text-xs text-red-300">{errors.cityCountry}</p>}
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <BilingualLabel htmlFor="message" en="Message / Note" ur="پیغام" />
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Any additional details or questions..."
            />
          </div>
        </div>

        {/* Honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0d3b2e] shadow-lg shadow-gold/25 transition-all duration-300 hover:bg-gold-soft hover:shadow-gold/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]"
          >
            {loading ? "Submitting..." : "Submit Registration / رجسٹریشن جمع کریں"}
          </button>
        </div>
      </div>
    </form>
  );
}
