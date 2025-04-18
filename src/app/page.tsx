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
import Threads from "@/components/ThreadsBg";

export default function Home() {
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);

  return (
    <div className="snap-mandatory overflow-x-hidden overflow-y-scroll scroll-smooth h-screen w-screen">
      <Toaster />
      <div className="absolute lg:top-0 w-screen h-screen min-h-screen">
        <Threads amplitude={1} distance={0.3} enableMouseInteraction={false} />
      </div>
      <div className=" snap-start h-screen">
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
