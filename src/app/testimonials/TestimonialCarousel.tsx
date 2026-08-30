"use client";

import { testimonials } from "@/utils/constant";
import SpotlightCard from "@/components/SpotlightCard";
import SectionHeading from "@/components/SectionHeading";

const TestimonialGrid = () => {
  return (
    <div className="min-h-screen bg-zinc-950 relative pb-24 px-0 antialiased overflow-hidden">

      <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent pt-8 pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.07),transparent_70%)]" />
        <SectionHeading
          index="05"
          title="Endorsements"
          description="Notes from engineering leaders, product partners, and technical colleagues."
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const isFeatured = index === 0 || index === 4;

            return (
              <div
                key={index}
                className={`w-full group ${isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                  }`}
              >
                <SpotlightCard
                  className="custom-spotlight-card h-full flex flex-col justify-between bg-zinc-900/40 hover:bg-zinc-900/70 border border-amber-400/10 hover:border-amber-400/40 p-6 rounded-2xl shadow-xl shadow-black/60 transition-all duration-300 relative overflow-hidden"
                  spotlightColor="rgba(251, 191, 36, 0.08)"
                >
                  <span className="absolute -top-4 -right-2 text-8xl font-serif text-amber-400/[0.04] select-none pointer-events-none group-hover:text-amber-400/[0.08] transition-colors duration-300">
                    ”
                  </span>

                  <div className="flex-1 flex flex-col justify-start relative z-10">
                    <p className="text-slate-300 font-light text-sm leading-relaxed tracking-wide">
                      {testimonial.testimonial}
                    </p>
                  </div>

                  <div className="w-12 h-px bg-amber-400/30 my-5 transition-all duration-300 group-hover:w-full group-hover:bg-amber-400/20" />

                  <div className="relative z-10 flex flex-col gap-0.5">
                    <h4 className="text-slate-100 font-medium text-sm tracking-wide">
                      {testimonial.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-light">
                      <span className="text-amber-400 font-medium tracking-wide">
                        {testimonial.company}
                      </span>
                      <span className="text-zinc-600 hidden sm:inline">•</span>
                      <span className="text-slate-400">
                        {testimonial.designation}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialGrid;