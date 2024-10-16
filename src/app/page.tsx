"use client";

import LaptopModelContainer from "@/components/LaptopModelContainer";
import { laptopStore } from "@/store/store";
import { laptopType } from "@/utils/types";
import About from "./about/About";
import Experience from "./experience/Experience";
import Projects from "./projects/Projects";
import Research from "./research/Research";
import Contact from "./contact/Contact";

export default function Home() {
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);

  return (
    <div className="snap-mandatory overflow-x-hidden overflow-y-scroll h-screen w-screen">
      <div className=" snap-start h-screen">
        <LaptopModelContainer />
      </div>
      {openLaptop && (
        <>
          <About />
          <Experience />
          <Projects />
          <Research />
          <Contact />
        </>
      )}
    </div>
  );
}
