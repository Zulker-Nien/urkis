"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import LaptopModelContainer from "@/components/LaptopModelContainer";
import { laptopStore } from "@/store/store";
import { laptopType } from "@/utils/types";
import SettingsDialog from "@/components/SettingsDialog";
import SupportKoriWidget from "@/components/SupportKoriWidget";
import ScrollTimeline from "@/components/ScrollTimeline";
import BackToTop from "@/components/BackToTop";
import { Toaster } from "@/components/ui/toaster";

const About = dynamic(() => import("./about/About"));
const Experience = dynamic(() => import("./experience/Experience"));
const Projects = dynamic(() => import("./projects/Projects"));
const Research = dynamic(() => import("./research/Research"));
const TestimonialCarousel = dynamic(
  () => import("./testimonials/TestimonialCarousel")
);
const Contact = dynamic(() => import("./contact/Contact"));

function SectionSkeleton() {
  return (
    <div className="w-full px-6 py-24 animate-pulse" aria-hidden="true">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="h-4 w-32 rounded bg-white/5" />
        <div className="h-10 w-2/3 rounded bg-white/10" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);

  return (
    <div id="scroll-container" className="w-full">
      <a id="main-content" className="absolute -top-24" aria-hidden="true" />
      <Toaster />
      <SettingsDialog />
      <ScrollTimeline />
      <BackToTop />
      <div className="h-screen">
        <SupportKoriWidget />
        <LaptopModelContainer />
      </div>
      {openLaptop && (
        <>
          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Research />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <TestimonialCarousel />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </>
      )}
    </div>
  );
}