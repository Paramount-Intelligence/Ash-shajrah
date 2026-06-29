"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { scrollReveal } from "@/lib/animations";
import { FloatingIcons } from "@/components/ui/FloatingIcons";
import { BilingualSectionHeader, BilingualTextBlock } from "@/components/ui/BilingualLayout";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      scrollReveal("[data-about-content]", {
        trigger: sectionRef.current,
        start: "top 75%",
        stagger: 0.15,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32"
    >
      <FloatingIcons />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div data-about-content>
          <BilingualSectionHeader
            urduTitle="تعارف"
            urduSubtitle="الشجرہ لرننگ ہب — ایک ابھرتا ہوا آن لائن تعلیمی و تربیتی ادارہ"
            englishTitle="About Ash-Shajrah Learning Hub"
            englishSubtitle="An emerging online educational and developmental institution"
            badge="Who We Are"
          />
        </div>

        <div data-about-content>
          <BilingualTextBlock
            urduText="الشجرہ ایک ابھرتا ہوا آن لائن تعلیمی و تربیتی ادارہ ہے جو اس یقین پر قائم ہے کہ گھر بچے کا پہلا تعلیمی ماحول ہے اور والدین بچے کے سب سے پہلے، سب سے زیادہ اثرانداز اور عمر بھر کے معلم ہیں۔ ہم پلے گروپ، پری پہلی اور پری دوئم کے بچوں کے لیے آن لائن تعلیم، کردار سازی اور قیادت کی بنیادیں فراہم کرتے ہیں۔"
            englishText="Ash-Shajrah is an emerging online educational and developmental institution founded on the belief that the home is a child's first learning environment and parents are a child's earliest, most influential, and lifelong educators. We provide online learning, character building, and leadership foundations for Play Group, Prep-I, and Prep-II children through a parent-guided model."
          />
        </div>

        {/* Key pillars row */}
        <div data-about-content className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { en: "Play Group", ur: "پلے گروپ" },
            { en: "Prep-I", ur: "پری پہلی" },
            { en: "Prep-II", ur: "پری دوئم" },
            { en: "Parent Partnership", ur: "والدین کی شراکت" },
          ].map((item) => (
            <div
              key={item.en}
              className="flex flex-col items-center gap-1 rounded-2xl border border-emerald/10 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm"
            >
              <span dir="rtl" lang="ur" className="font-urdu text-sm font-bold leading-[1.9] text-emerald-deep">
                {item.ur}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald/60">
                {item.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
