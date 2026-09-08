"use client";

import LaptopModelContainer from "@/components/LaptopModelContainer";
import { laptopStore } from "@/store/store";
import { laptopType } from "@/utils/types";
import About from "./about/About";
import Experience from "./experience/Experience";
import Projects from "./projects/Projects";
import Research from "./research/Research";
import Contact from "./contact/Contact";
import { Toaster } from "@/components/ui/toaster";
import TestimonialCarousel from "./testimonials/TestimonialCarousel";
import SettingsDialog from "@/components/SettingsDialog";
import SupportKoriWidget from "@/components/SupportKoriWidget";
import ScrollTimeline from "@/components/ScrollTimeline";

export default function Home() {
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);

  return (
    <div id="scroll-container" className="w-full">
      <Toaster />
      <SettingsDialog />
      <ScrollTimeline />
      <div className="h-screen">
        <SupportKoriWidget />
        <LaptopModelContainer />
      </div>
      {openLaptop && (
        <>
          <About />
          <Experience />
          <Projects />
          <Research />
          <TestimonialCarousel />
          <Contact />
        </>
      )}
    </div>
  );
}
