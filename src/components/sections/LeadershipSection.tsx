"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { scrollReveal } from "@/lib/animations";
import { LEADERSHIP } from "@/lib/data";
import { BilingualSectionHeader } from "@/components/ui/BilingualLayout";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

export function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      scrollReveal("[data-leader-card]", {
        trigger: sectionRef.current,
        start: "top 75%",
        stagger: 0.2,
        y: 50,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-emerald-deep/5 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <BilingualSectionHeader
          urduTitle="ہماری قیادت"
          urduSubtitle="تجربہ کار رہنما جو بچوں، والدین اور اساتذہ کے لیے آن لائن تعلیم کی بصیرت تشکیل دے رہے ہیں۔"
          englishTitle="Our Leadership"
          englishSubtitle="Experienced guides shaping Ash-Shajrah's online learning vision for children, parents, and educators."
          badge="Leadership"
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {LEADERSHIP.map((leader) => (
            <article
              key={leader.name}
              data-leader-card
              className="group relative overflow-hidden rounded-3xl border border-gold/25 bg-white p-8 shadow-xl shadow-emerald-deep/5 transition-shadow hover:shadow-2xl hover:shadow-emerald/10 md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-emerald-light to-gold" />
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/10" />

              {/* Avatar + Names */}
              <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald-deep font-display text-2xl font-bold text-cream shadow-lg shadow-emerald/30">
                    {getInitials(leader.name)}
                  </div>

                  <div dir="ltr" lang="en" className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-semibold text-emerald-deep">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                      {leader.title}
                    </p>
                  </div>
                </div>

                {/* Urdu Name - Right */}
                <div dir="rtl" lang="ur" className="text-right sm:mt-1">
                  <p className="font-urdu text-xl font-bold leading-[1.8] text-emerald-deep">
                    {leader.urduName}
                  </p>
                  <p className="font-urdu text-sm font-semibold leading-[1.8] text-gold">
                    {leader.urduTitle}
                  </p>
                </div>
              </div>

              {/* Bilingual bio — two columns */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                {/* English bio */}
                <div dir="ltr" lang="en">
                  <p className="text-sm leading-relaxed text-emerald/80 md:text-base">
                    {leader.bio}
                  </p>
                </div>
                {/* Urdu bio */}
                <div dir="rtl" lang="ur" className="text-right">
                  <p className="font-urdu text-sm leading-[2.1] text-emerald/80 sm:text-[0.9rem]">
                    {leader.urduBio}
                  </p>
                </div>
              </div>

              {/* Focus tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {leader.focus.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald/15 bg-emerald/5 px-3 py-1 text-[11px] font-semibold text-emerald-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
