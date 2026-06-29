"use client";

import { useId, useState } from "react";

export function TechnologyAdvisorySection() {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <section
      aria-label="Technology advisory partner"
      className="border-t border-emerald/8 bg-cream px-5 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-emerald/12 bg-white/75 px-5 py-5 shadow-sm shadow-emerald-deep/5 backdrop-blur-sm sm:px-6 sm:py-6">
          <div
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold/70 via-gold-soft/50 to-emerald-light/40"
            aria-hidden
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1 pl-2 sm:pl-3">
              {/* Bilingual header */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald/12 bg-emerald/[0.06] text-emerald"
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M12 3l1.5 5h5l-4 3.5 1.2 4.5L12 14l-3.7 2 1.2-4.5L5.5 8h5L12 3z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h2 className="text-sm font-semibold tracking-wide text-[#063F32] sm:text-[0.9375rem]">
                    Technology Advisory Partner
                  </h2>
                </div>
                <p dir="rtl" lang="ur" className="font-urdu text-right text-xs leading-[2] text-[#245C4F] sm:text-sm">
                  ٹیکنالوجی ایڈوائزری پارٹنر
                </p>
              </div>

              {/* Bilingual body */}
              <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div dir="ltr" lang="en">
                  <p className="text-sm leading-relaxed text-[#245C4F] sm:text-[0.9375rem] sm:leading-[1.65]">
                    Ash-Shajrah Learning Hub is supported by Paramount Intelligence for digital
                    learning, AI readiness, and technology advisory.
                  </p>
                </div>
                <div dir="rtl" lang="ur" className="text-right">
                  <p className="font-urdu text-xs leading-[2.1] text-[#245C4F] sm:text-sm">
                    الشجرہ لرننگ ہب کو ڈیجیٹل لرننگ، اے آئی تیاری اور ٹیکنالوجی رہنمائی میں پیراماؤنٹ انٹیلیجنس کی معاونت حاصل ہے۔
                  </p>
                </div>
              </div>

              {/* Expandable details */}
              <div
                id={panelId}
                className="grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                aria-hidden={!expanded}
              >
                <div className="overflow-hidden">
                  <div className="pt-4">
                    <p className="text-sm leading-relaxed text-[#245C4F]/90 sm:text-[0.9375rem] sm:leading-[1.7]">
                      Ash-Shajrah Learning Hub is proud to collaborate with Paramount
                      Intelligence, a specialized AI and digital transformation consultancy.
                      Paramount&apos;s team includes experienced technology leaders and AI
                      practitioners who have supported Fortune 500 companies, private
                      equity-backed businesses, and global enterprises. This partnership helps
                      Ash-Shajrah integrate modern learning methodologies, digital innovation,
                      and future-ready educational thinking into its programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="shrink-0 self-start rounded-full border border-emerald/15 bg-cream/80 px-4 py-2 text-xs font-semibold text-[#0D5C48] transition-all duration-300 hover:border-gold/35 hover:bg-white hover:text-[#063F32] sm:mt-1"
            >
              {expanded ? "Show less" : "Learn more"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
