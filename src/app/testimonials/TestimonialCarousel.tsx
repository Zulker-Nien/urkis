"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SpotlightCard from "@/components/SpotlightCard";
import { testimonials } from "@/utils/constant";

const TestimonialCarousel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-950/80 relative  pb-0 px-0">
      <h5
        className={`lg:text-[4em] text-[2em] text-center text-white sticky top-0 w-full drop-shadow-lg drop-shadow-black z-30 bg-gradient-to-b from-slate-950 from-30% to-transparent`}
      >
        Testimonials
      </h5>
      <div className="w-full h-full flex items-center justify-center mt-24 gap-4">
        <Carousel className="w-4/5">
          <CarouselContent className="-ml-1">
            {testimonials.map((_, index) => (
              <>
                <CarouselItem
                  key={index}
                  className="w-2xl px-4 md:basis-1/2 lg:basis-1/3 flex gap-4"
                >
                  <SpotlightCard
                    className="custom-spotlight-card h-full"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <div className="h-full w-full flex flex-col justify-end gap-4">
                      <div className="h-1/4 flex justify-between items-center">
                        <p className="text-2xl font-bold text-white">
                          {testimonials[index].name}
                        </p>
                      </div>
                      <p className="h-3/4 text-white">
                        {testimonials[index].testimonial}
                      </p>
                      <p className="h-1/8 text-lg font-semibold text-[#00e5ff]">
                        {testimonials[index].company}
                      </p>
                      <p className="h-1/8 text-white">
                        {testimonials[index].designation}
                      </p>
                    </div>
                  </SpotlightCard>
                </CarouselItem>
              </>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
export default TestimonialCarousel;
