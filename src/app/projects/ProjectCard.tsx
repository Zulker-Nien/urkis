"use client";
import Image from "next/image";
import Images from "@/utils/image";
import { useInView, useSpring, animated } from "@react-spring/web";
import { tagType } from "@/utils/types";
import { Globe, Github } from "lucide-react"; // Swapped out custom icon wrapper for sleek uniform Lucide icons

const ProjectCard = ({
  index,
  name,
  tags,
  source_code_link,
  website,
  image,
}: {
  index: number;
  name: string;
  tags: tagType[];
  image?: string;
  source_code_link?: string;
  website?: string;
}) => {
  const [ref, inView] = useInView({
    rootMargin: "-40px 0px",
    once: true,
  });

  const projectCardStyles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(40px)",
    config: { tension: 140, friction: 18 },
  });

  return (
    <animated.div
      ref={ref}
      style={projectCardStyles}
      className="group relative w-full rounded-2xl flex items-center justify-start overflow-hidden p-5 gap-6 bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-xl shadow-black/20"
    >
      {/* Project Thumbnail Image Container */}
      <div className="relative aspect-square w-24 h-24 lg:w-28 lg:h-28 rounded-xl bg-slate-950/60 border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
        <Image
          src={image || Images.Logo}
          fill
          alt={`${name} preview`}
          className="object-cover p-2 transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        />
      </div>

      {/* Details Area */}
      <div className="flex-1 flex flex-col justify-center pr-10">
        <h3 className="text-slate-100 font-medium text-lg tracking-wide group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        {/* Sleek lowercase/minimal tags instead of heavy colors */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {tags.map((tag: tagType) => (
            <span
              key={`${name}-${tag.name}`}
              className="text-xs font-mono font-medium text-blue-400/80"
            >
              #{tag.name.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Modern Actions Panel Container */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        {source_code_link && (
          <button
            onClick={() => window.open(source_code_link, "_blank")}
            className="w-9 h-9 flex justify-center items-center rounded-xl bg-slate-950/80 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-200"
            title="View Source Code"
          >
            <Github className="w-4 h-4" />
          </button>
        )}
        {website && (
          <button
            onClick={() => window.open(website, "_blank")}
            className="w-9 h-9 flex justify-center items-center rounded-xl bg-slate-950/80 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-200"
            title="Live Website"
          >
            <Globe className="w-4 h-4" />
          </button>
        )}
      </div>
    </animated.div>
  );
};

export default ProjectCard;