"use client";

import { testimonials } from "@/utils/constant";
import SpotlightCard from "@/components/SpotlightCard";
import { MessageSquareQuote } from "lucide-react";

const TestimonialGrid = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-zinc-950 relative pb-24 px-0 antialiased overflow-hidden">

      <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent backdrop-blur-sm pt-8 pb-12 text-center">
        <h2 className="lg:text-5xl text-3xl font-extralight tracking-tight text-slate-100 flex items-center justify-center gap-3">
          <MessageSquareQuote className="w-7 h-7 text-cyan-400 font-thin opacity-80" />
          Endorsements
        </h2>
        <p className="text-sm text-slate-400 font-light max-w-md mx-auto mt-2 px-4">
          Notes from engineering leaders, product partners, and technical colleagues.
        </p>
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
                  className="custom-spotlight-card h-full flex flex-col justify-between bg-slate-900/40 hover:bg-slate-900/70 border border-white/5 hover:border-cyan-500/20 p-6 rounded-2xl shadow-xl shadow-black/20 transition-all duration-300 relative overflow-hidden"
                  spotlightColor="rgba(0, 229, 255, 0.08)"
                >
                  <span className="absolute -top-4 -right-2 text-8xl font-serif text-cyan-500/[0.03] select-none pointer-events-none group-hover:text-cyan-500/[0.06] transition-colors duration-300">
                    ”
                  </span>

                  <div className="flex-1 flex flex-col justify-start relative z-10">
                    <p className="text-slate-300 font-light text-sm leading-relaxed tracking-wide">
                      {testimonial.testimonial}
                    </p>
                  </div>

                  <div className="w-12 h-px bg-cyan-500/20 my-5 transition-all duration-300 group-hover:w-full group-hover:bg-cyan-500/10" />

                  <div className="relative z-10 flex flex-col gap-0.5">
                    <h4 className="text-slate-100 font-medium text-sm tracking-wide">
                      {testimonial.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-light">
                      <span className="text-cyan-400/90 font-medium tracking-wide">
                        {testimonial.company}
                      </span>
                      <span className="text-slate-500 hidden sm:inline">•</span>
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