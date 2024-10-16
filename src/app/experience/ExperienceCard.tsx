import { animated, useInView, useSpring } from "@react-spring/web";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import { experienceType } from "@/utils/types";
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

  const springStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={springStyles} ref={ref}>
      {/* shadow-md blur-2xl bg-white/10 */}
      <VerticalTimelineElement
        position={index % 2 === 0 ? "left" : "right"}
        visible={true}
        contentStyle={{
          background: "white",
          color: "#3d3d3d",
          fontWeight: "800",
          borderRadius: "24px",
          boxShadow: "0 4px 6px -1px #000",
          gap: "8px",
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
        <div>
          <h3 className="text-gray-800 text-xl font-bold">
            {experience.title}
          </h3>
          <h3 className="text-xl font-bold text-pink-500 !m-0">
            {experience.company_name}
          </h3>
        </div>
      </VerticalTimelineElement>
    </animated.div>
  );
};
export default ExperienceCard;
