"use client";
import Image from "next/image";
import Images from "@/utils/image";
import { useInView, useSpring, animated } from "@react-spring/web";
import { tagType } from "@/utils/types";
const ProjectCard = ({
  index,
  name,
  tags,
  source_code_link,
}: {
  index: number;
  name: string;
  tags: tagType[];
  source_code_link: string;
}) => {
  const [ref, inView] = useInView({
    rootMargin: "-50px 0px",
  });
  const projectCardStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(100px)",
    config: { tension: 120, friction: 14 },
    delay: index * 100,
  });
  return (
    <animated.div
      ref={ref}
      style={projectCardStyles}
      className={
        " h-full w-full rounded-3xl flex items-center justify-center overflow-hidden gap-4 relative bg-white shadow-md shadow-black"
      }
    >
      <Image
        src={Images.Aveneur}
        alt="project_image"
        className="lg:w-1/5 w-1/4 z-10"
      />
      <div className="lg:w-4/5 w-3/4 flex flex-col items-start justify-center z-10">
        <div className="absolute inset-0 flex justify-end p-3 card-img_hover">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="black-gradient w-10 h-10 flex justify-center items-center cursor-pointer"
          >
            <Image
              src={Images.Github}
              alt="source code"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
        </div>
        <h3 className="text-gray-800 font-semibold text-xl">{name}</h3>
        <div className=" flex flex-wrap gap-2">
          {tags.map((tag: tagType) => (
            <p
              key={`${name}-${tag.name}`}
              className="text-md font-semibold text-blue-500"
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </animated.div>
  );
};

export default ProjectCard;
