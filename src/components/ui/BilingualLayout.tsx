import type { ReactNode } from "react";

// ─── Shared utility ────────────────────────────────────────────────────────────

/** Urdu column: right-to-left, Noto Nastaliq font, slightly larger line-height */
export function UrduCol({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div dir="rtl" lang="ur" className={`font-urdu text-right ${className}`}>
      {children}
    </div>
  );
}

/** English column: left-to-right, body font */
export function EnglishCol({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div dir="ltr" lang="en" className={`text-left ${className}`}>
      {children}
    </div>
  );
}

// ─── BilingualSectionHeader ────────────────────────────────────────────────────

/**
 * Full-width two-column section heading.
 * Urdu title/subtitle on the LEFT, English on the RIGHT.
 */
export function BilingualSectionHeader({
  urduTitle,
  urduSubtitle,
  englishTitle,
  englishSubtitle,
  badge,
  centered = false,
  lightMode = false,
  className = "",
}: {
  urduTitle: string;
  urduSubtitle?: string;
  englishTitle: string;
  englishSubtitle?: string;
  badge?: string;
  centered?: boolean;
  lightMode?: boolean;
  className?: string;
}) {
  const headingClass = lightMode
    ? "text-cream"
    : "text-emerald-deep";
  const subClass = lightMode
    ? "text-cream/70"
    : "text-emerald/70";
  const badgeBorder = lightMode
    ? "border-cream/20 bg-white/10 text-gold-soft"
    : "border-emerald/20 bg-emerald/8 text-emerald";

  return (
    <div className={`mb-12 sm:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      {badge && (
        <span
          className={`mb-5 inline-block rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] ${badgeBorder}`}
        >
          {badge}
        </span>
      )}

      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 ${centered ? "items-center" : "items-start"}`}
      >
        {/* LEFT — English */}
        <EnglishCol>
          <h2
            className={`font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${headingClass}`}
          >
            {englishTitle}
          </h2>
          {englishSubtitle && (
            <p className={`mt-3 text-base leading-relaxed sm:text-lg ${subClass}`}>
              {englishSubtitle}
            </p>
          )}
        </EnglishCol>

        {/* RIGHT — Urdu */}
        <UrduCol>
          <h2
            className={`font-urdu text-3xl font-bold leading-[1.7] sm:text-4xl lg:text-[2.6rem] ${headingClass}`}
          >
            {urduTitle}
          </h2>
          {urduSubtitle && (
            <p className={`mt-3 text-base leading-[2] sm:text-lg sm:leading-[2.1] ${subClass}`}>
              {urduSubtitle}
            </p>
          )}
        </UrduCol>
      </div>

      {/* Decorative separator */}
      <div
        className={`mt-8 h-px w-full bg-gradient-to-r from-transparent ${lightMode ? "via-gold/40" : "via-emerald/20"} to-transparent`}
      />
    </div>
  );
}

// ─── BilingualTextBlock ────────────────────────────────────────────────────────

/**
 * A two-column text block. English on left, Urdu on right.
 * Use inside a section for body copy.
 */
export function BilingualTextBlock({
  urduText,
  englishText,
  lightMode = false,
  className = "",
}: {
  urduText: string;
  englishText: string;
  lightMode?: boolean;
  className?: string;
}) {
  const bodyClass = lightMode ? "text-cream/80" : "text-emerald/80";

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 ${className}`}>
      <EnglishCol>
        <p className={`text-base leading-relaxed sm:text-lg sm:leading-loose ${bodyClass}`}>
          {englishText}
        </p>
      </EnglishCol>
      <UrduCol>
        <p className={`text-base leading-[2.1] sm:text-lg sm:leading-[2.2] font-urdu ${bodyClass}`}>
          {urduText}
        </p>
      </UrduCol>
    </div>
  );
}

// ─── BilingualCTA ──────────────────────────────────────────────────────────────

/**
 * Bilingual CTA button pair.
 * English button (primary) + Urdu label alongside it.
 */
export function BilingualCTA({
  englishHref,
  englishLabel,
  urduLabel,
  secondaryHref,
  secondaryLabel,
  secondaryUrduLabel,
}: {
  englishHref: string;
  englishLabel: string;
  urduLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryUrduLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      <a
        href={englishHref}
        className="group inline-flex flex-col items-center rounded-full bg-emerald px-6 py-3 shadow-lg shadow-emerald/30 transition-all duration-300 hover:bg-emerald-light hover:shadow-emerald/45"
      >
        <span className="text-sm font-semibold text-cream sm:text-base">{englishLabel}</span>
        <span className="font-urdu text-xs leading-[1.8] text-cream/75">{urduLabel}</span>
      </a>
      {secondaryHref && secondaryLabel && (
        <a
          href={secondaryHref}
          target={secondaryHref.startsWith("http") ? "_blank" : undefined}
          rel={secondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group inline-flex flex-col items-center rounded-full border border-emerald/30 bg-white/10 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-white/15"
        >
          <span className="text-sm font-semibold text-cream sm:text-base">{secondaryLabel}</span>
          {secondaryUrduLabel && (
            <span className="font-urdu text-xs leading-[1.8] text-cream/75">{secondaryUrduLabel}</span>
          )}
        </a>
      )}
    </div>
  );
}

// ─── BilingualCard ─────────────────────────────────────────────────────────────

/**
 * A card that shows bilingual content stacked:
 * Top half — Urdu (RTL), Bottom half — English (LTR)
 * separated by a thin gold line.
 */
export function BilingualCard({
  urduTitle,
  urduBody,
  englishTitle,
  englishBody,
  icon,
  index,
  className = "",
}: {
  urduTitle: string;
  urduBody: string;
  englishTitle: string;
  englishBody: string;
  icon?: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-emerald/10 bg-white/75 p-6 shadow-lg shadow-emerald-deep/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-xl hover:shadow-emerald/10 ${className}`}
    >
      {/* Decorative blur */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/10 blur-2xl transition-all group-hover:bg-gold/18" />

      {/* Header row */}
      <div className="mb-4 flex items-start justify-between">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald/15 bg-gradient-to-br from-emerald/10 to-gold/10 text-emerald shadow-inner">
            {icon}
          </div>
        )}
        {index !== undefined && (
          <span className="font-display ml-auto text-sm font-semibold text-gold/55">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Urdu — top */}
      <div dir="rtl" lang="ur" className="mb-4 text-right">
        <h3 className="font-urdu text-lg font-bold leading-[1.9] text-emerald-deep sm:text-xl">
          {urduTitle}
        </h3>
        <p className="font-urdu mt-1 text-sm leading-[2] text-emerald/70 sm:text-[0.9rem]">
          {urduBody}
        </p>
      </div>

      {/* Divider */}
      <div className="my-3 h-px w-full bg-gradient-to-r from-gold/25 via-emerald/15 to-transparent" />

      {/* English — bottom */}
      <div dir="ltr" lang="en" className="text-left">
        <h3 className="font-display text-base font-semibold leading-snug text-emerald-deep sm:text-lg">
          {englishTitle}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-emerald/70">
          {englishBody}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

// ─── BilingualValueCard (within carousel) ─────────────────────────────────────

/**
 * Bilingual content for inside a value card.
 * Urdu on top, English below, separated by a thin line.
 */
export function BilingualValueContent({
  urduTitle,
  urduLine,
  englishTitle,
  englishLine,
  isActive,
}: {
  urduTitle: string;
  urduLine: string;
  englishTitle: string;
  englishLine: string;
  isActive: boolean;
}) {
  return (
    <>
      {/* Urdu block */}
      <div dir="rtl" lang="ur" className="text-right">
        <p
          className={`font-urdu text-xl font-bold leading-[1.9] transition-colors duration-500 sm:text-2xl ${
            isActive ? "text-emerald-deep" : "text-emerald/80"
          }`}
        >
          {urduTitle}
        </p>
        <p
          className={`font-urdu mt-1 text-sm leading-[2] transition-colors duration-500 ${
            isActive ? "text-emerald/80" : "text-emerald/55"
          }`}
        >
          {urduLine}
        </p>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-gradient-to-r from-gold/30 via-emerald/20 to-transparent" />

      {/* English block */}
      <div dir="ltr" lang="en" className="text-left">
        <h3
          className={`font-display text-2xl font-semibold leading-tight transition-colors duration-500 sm:text-[1.65rem] lg:text-3xl ${
            isActive ? "text-emerald-deep" : "text-emerald group-hover:text-emerald-deep"
          }`}
        >
          {englishTitle}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed transition-colors duration-500 sm:text-base ${
            isActive ? "text-emerald/80" : "text-emerald/60 group-hover:text-emerald/75"
          }`}
        >
          {englishLine}
        </p>
      </div>
    </>
  );
}
