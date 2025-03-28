"use client";
import { animated, useInView, useSpring } from "@react-spring/web";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import { experienceType } from "@/utils/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
const ExperienceCard = ({
  experience,
  index,
}: {
  experience: experienceType[0];
  index: number;
}) => {
  const [ref, inView] = useInView({
    rootMargin: "-50px 0px",
  });
  const [isOpen, setIsOpen] = useState(false);
  const springStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={springStyles} ref={ref}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <VerticalTimelineElement
              position={index % 2 === 0 ? "left" : "right"}
              visible={true}
              contentStyle={{
                background: "transparent",
                color: "#3d3d3d",
                fontWeight: "800",
                boxShadow: "0 0 0 0 #000",
                padding: "0px",
              }}
              contentArrowStyle={{ borderRight: "7px solid #000" }}
              date={experience.date}
              dateClassName="!font-bold !text-black !opacity-1"
              iconStyle={{
                background: experience.iconBg,
                overflow: "hidden",
              }}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={experience.icon}
                    alt={experience.company_name}
                    className="w-full h-full object-contain"
                  />
                </div>
              }
            >
              <SpotlightCard
                className="custom-spotlight-card h-full"
                spotlightColor="rgba(255, 0, 128, 0.53)"
              >
                <h3 className="text-white lg:text-xl font-bold">
                  {experience.title}
                </h3>
                <h3 className="lg:text-md font-bold text-pink-500 !m-0">
                  {experience.company_name}
                </h3>
              </SpotlightCard>
            </VerticalTimelineElement>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex items-center justify-center">
              <Image
                src={experience.icon}
                alt={experience.company_name}
                className="h-24 object-contain"
              />
            </div>
            <SheetTitle>{experience.company_name}</SheetTitle>
            <SheetDescription>
              Worked as a {experience.title} from {experience.date}
            </SheetDescription>
          </SheetHeader>
          <br />
          <h1>{experience.points}</h1>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </animated.div>
  );
};
export default ExperienceCard;
