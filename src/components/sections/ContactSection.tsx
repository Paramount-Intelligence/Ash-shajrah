"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { scrollReveal } from "@/lib/animations";
import { AdmissionForm } from "@/components/sections/AdmissionForm";
import { BilingualSectionHeader } from "@/components/ui/BilingualLayout";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      scrollReveal("[data-contact-item]", {
        trigger: sectionRef.current,
        start: "top 82%",
        stagger: 0.12,
        y: 35,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/20 to-emerald/[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,162,39,0.08),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#0d3b2e 1px, transparent 1px), linear-gradient(90deg, #0d3b2e 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div data-contact-item>
          <BilingualSectionHeader
            urduTitle="اپنا آن لائن تعلیمی سفر شروع کریں"
            urduSubtitle="نیچے دیا گیا فارم مکمل کریں، ہماری ٹیم جلد آپ سے رابطہ کرے گی۔"
            englishTitle="Start Your Online Learning Journey"
            englishSubtitle="Fill out the form below and our team will contact you soon."
            badge="Contact Us"
          />
        </div>





        {/* Admission Form */}
        <div data-contact-item>
          <AdmissionForm />
        </div>
      </div>
    </section>
  );
}
