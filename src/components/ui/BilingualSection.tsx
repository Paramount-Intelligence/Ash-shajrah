import type { BilingualSectionData } from "@/lib/bilingualContent";

interface BilingualSectionProps {
  section: BilingualSectionData;
  /** Alternate row background for visual rhythm */
  alternate?: boolean;
  /** Show a top divider */
  divider?: boolean;
}

export function BilingualSection({ section, alternate = false, divider = false }: BilingualSectionProps) {
  return (
    <div
      className={`bilingual-section relative overflow-hidden ${alternate ? "bg-cream-dark/40" : "bg-white/60"}`}
    >
      {/* Soft decorative gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,162,39,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_80%,rgba(26,92,69,0.05),transparent_60%)]" />

      {divider && (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald/15 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Two-column grid: English LEFT, Urdu RIGHT */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          {/* ─── LEFT: English ─── */}
          <div
            dir="ltr"
            lang="en"
            className="bilingual-col-english pb-8 pl-0 pt-0 md:border-r md:border-emerald/10 md:pb-0 md:pr-8 md:pl-6 order-1"
          >
            <div className="bilingual-card-inner h-full rounded-2xl border border-emerald/10 bg-white/75 p-6 shadow-lg shadow-emerald-deep/5 backdrop-blur-sm md:p-8">
              {/* English section label */}
              <span className="mb-4 inline-block rounded-full border border-emerald/25 bg-emerald/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald">
                English
              </span>

              <h3 className="font-display mb-4 text-2xl font-bold leading-tight text-emerald-deep md:text-3xl">
                {section.englishTitle}
              </h3>

              <p className="text-base leading-relaxed text-emerald-deep/75 md:text-lg md:leading-loose">
                {section.englishBody}
              </p>
            </div>
          </div>

          {/* ─── RIGHT: Urdu ─── */}
          <div
            dir="rtl"
            lang="ur"
            className="bilingual-col-urdu border-b border-emerald/10 pb-8 pr-0 pt-0 md:border-b-0 md:pb-0 md:pr-8 md:pl-6 order-2"
          >
            <div className="bilingual-card-inner h-full rounded-2xl border border-gold/20 bg-white/75 p-6 shadow-lg shadow-emerald-deep/5 backdrop-blur-sm md:p-8">
              {/* Urdu section label */}
              <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wider text-gold">
                اردو
              </span>

              <h3 className="font-urdu mb-4 text-2xl font-bold leading-[2] text-emerald-deep md:text-3xl">
                {section.urduTitle}
              </h3>

              <p className="font-urdu text-base leading-[2.2] text-emerald-deep/80 md:text-lg md:leading-[2.4]">
                {section.urduBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Renders a full list of bilingual sections with alternating backgrounds */
export function BilingualSectionList({ sections }: { sections: BilingualSectionData[] }) {
  return (
    <div className="divide-y divide-emerald/8">
      {sections.map((section, i) => (
        <BilingualSection
          key={section.id}
          section={section}
          alternate={i % 2 === 1}
          divider={false}
        />
      ))}
    </div>
  );
}
