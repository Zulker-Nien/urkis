"use client";

import { testimonials } from "@/utils/constant";
import Fade from "@/components/Fade";
import SectionIntro from "@/components/SectionIntro";

const TestimonialGrid = () => {
  const [featured, ...rest] = testimonials;

  return (
    <section id="endorsements" className="relative bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 lg:pt-32">
        <SectionIntro
          index="06 — Endorsements"
          title="Kind words, unfiltered."
          description="Notes from engineering leaders, product partners, and colleagues I've had the pleasure of building with."
        />

        <Fade className="mt-14 lg:mt-20">
          <blockquote className="relative">
            <span className="absolute -top-14 -left-4 lg:-left-8 text-[10rem] lg:text-[14rem] leading-none font-serif text-amber-400/[0.08] select-none pointer-events-none">
              ”
            </span>
            <div className="relative lg:pl-20">
              <p className="text-2xl sm:text-3xl lg:text-5xl font-extralight tracking-tight text-slate-100 leading-snug max-w-4xl">
                {featured.testimonial}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-amber-400/60" />
                <div>
                  <div className="text-slate-200 font-medium tracking-wide">
                    {featured.name}
                  </div>
                  <div className="text-sm text-slate-500 font-light">
                    {featured.designation} ·{" "}
                    <span className="text-amber-400">{featured.company}</span>
                  </div>
                </div>
              </footer>
            </div>
          </blockquote>
        </Fade>

        <div className="grid md:grid-cols-2 gap-12 mt-16 pb-24 lg:gap-16 lg:mt-24">
          {rest.map((testimonial, index) => (
            <Fade key={index} y={20}>
              <blockquote className="border-l-2 border-amber-400/25 pl-6 lg:pl-8">
                <p className="text-lg lg:text-2xl font-light leading-relaxed text-slate-300 tracking-wide">
                  {testimonial.testimonial}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-amber-400/40" />
                  <div>
                    <div className="text-slate-200 font-medium text-sm tracking-wide">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-500 font-light">
                      {testimonial.designation} ·{" "}
                      <span className="text-amber-400">{testimonial.company}</span>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialGrid;