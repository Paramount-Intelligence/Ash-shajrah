"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollReveal } from "@/lib/animations";
import { BilingualSectionHeader, BilingualTextBlock } from "@/components/ui/BilingualLayout";

const LEAVES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 5.8) % 84}%`,
  size: 11 + (i % 4) * 3,
}));

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !leavesRef.current) return;

      scrollReveal("[data-vision-content]", {
        trigger: sectionRef.current,
        start: "top 75%",
        stagger: 0.2,
      });

      const leaves = leavesRef.current.querySelectorAll("[data-leaf]");
      gsap.fromTo(
        leaves,
        { y: 80, opacity: 0.3 },
        {
          y: -120,
          opacity: 0.9,
          duration: 2,
          stagger: 0.08,
          ease: "power1.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative overflow-hidden bg-emerald-deep px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,138,106,0.35),transparent_70%)]" />

      <div ref={leavesRef} className="pointer-events-none absolute inset-0 overflow-hidden">
        {LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            data-leaf
            className="absolute bottom-[20%]"
            style={{ left: leaf.left, width: leaf.size, height: leaf.size * 1.6 }}
          >
            <svg viewBox="0 0 20 32" fill="none" className="h-full w-full">
              <ellipse
                cx="10"
                cy="16"
                rx="8"
                ry="14"
                fill={leaf.id % 3 === 0 ? "#c9a227" : "#2d8a6a"}
                opacity="0.8"
              />
            </svg>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── Mission ── */}
        <div data-vision-content className="mb-16 lg:mb-20">
          <BilingualSectionHeader
            urduTitle="ہمارا مشن"
            englishTitle="Our Mission"
            badge="Mission"
            lightMode
          />
          <BilingualTextBlock
            urduText="الشجرہ کا مقصد ایک متوازن اور بامقصد آن لائن تعلیمی و تربیتی ماحول فراہم کرنا ہے جو بچوں میں علم، عملی مہارتوں، اعلیٰ اقدار اور مثبت رویوں کی نشوونما کرے۔"
            englishText="Our mission is to provide a balanced and purposeful online educational and developmental environment that nurtures knowledge, practical skills, strong values, and positive attitudes in children."
            lightMode
          />
        </div>

        {/* Gold divider */}
        <div
          data-vision-content
          className="mx-auto mb-16 h-px max-w-sm bg-gradient-to-r from-transparent via-gold/60 to-transparent lg:mb-20"
        />

        {/* ── Vision ── */}
        <div data-vision-content>
          <BilingualSectionHeader
            urduTitle="ہمارا نصب العین"
            englishTitle="Our Vision"
            badge="Vision"
            lightMode
          />
          <BilingualTextBlock
            urduText="الشجرہ ایک ایسے مستقبل کا خواب دیکھتا ہے جہاں بچے علم، کردار، قیادت اور اپنے خالق سے مضبوط تعلق کے ساتھ اپنے خاندان، معاشرے اور انسانیت کے لیے خیر کا ذریعہ بنیں۔"
            englishText="Ash-Shajrah envisions a future where children, grounded in knowledge, character, leadership, and connection with their Creator, become a source of goodness for their families, society, and humanity."
            lightMode
          />
        </div>
      </div>
    </section>
  );
}
