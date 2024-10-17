"use client";
import { useEffect } from "react";
import { aboutStore } from "@/store/store";
import Images from "@/utils/image";
import { aboutType } from "@/utils/types";
import Image from "next/image";
import { useSpring, a as web } from "@react-spring/web";

const About = () => {
  const openAboutSlider = aboutStore(
    (state: aboutType) => state.openAboutSlider
  );
  const setOpenAboutSlider = aboutStore(
    (state: aboutType) => state.setOpenAboutSlider
  );
  const aboutTextStyle = useSpring({ open: Number(openAboutSlider) });

  useEffect(() => {
    const scrollContainer = document.querySelector(".snap-mandatory");

    const handleScroll = () => {
      const scrollY = scrollContainer?.scrollTop || 0;

      if (scrollY > 1600 && !openAboutSlider) {
        setOpenAboutSlider(true);
      } else if (scrollY <= 1600 && openAboutSlider) {
        setOpenAboutSlider(false);
      }
    };
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [openAboutSlider, setOpenAboutSlider]);

  return (
    <div className=" h-[200vh] relative flex flex-col">
      <div
        className={` duration-300 bg-gradient-to-b from-violet-800 via-violet-500 via-75% to-violet-800 h-screen w-screen flex flex-col items-center justify-center gap-12 sticky top-0 lg:pr-0 pr-2`}
      >
        <div
          className={`duration-300 flex justify-center items-center w-screen`}
        >
          <div
            className={`duration-300 origin-center ${
              openAboutSlider ? "-translate-y-[250px]" : "translate-y-[0]"
            } lg:text-5xl text-2xl text-white`}
          >
            Zulker {`{`}
          </div>
          <Image
            className={`duration-300 animate-pulse ${
              openAboutSlider
                ? "lg:w-1/5 w-1/3 -translate-y-[250px]"
                : "lg:w-1/3 w-1/2 translate-y-[0]"
            } `}
            src={Images.Logo}
            alt="Logo"
          />
          <div
            className={`duration-300 lg:text-5xl text-2xl text-white ${
              openAboutSlider ? "-translate-y-[250px]" : "translate-y-[0]"
            } `}
          >
            {`}`} Nien{" "}
          </div>
        </div>

        <web.div
          style={{
            opacity: aboutTextStyle.open.to([1, 0], [1, 0]),
            transform: aboutTextStyle.open.to(() => `translateY(-25%,0)`),
            color: "#000",
          }}
          className={"flex flex-col gap-8 absolute "}
        >
          <p className="lg:text-2xl tracking-wide text-xl text-justify lg:px-96 px-4 pb-4 pt-36 text-white">
            As a skilled JavaScript web developer with expertise in frontend and
            backend frameworks, I excel at creating dynamic React/Next web
            applications and visually captivating 3D interactive websites using
            three.js. Additionally, my certification in UI/Ux designing and the
            technical analysis skills that I have gotten through academic
            research are one of my most treasured and hard earned skills that I
            implement in my daily tasks.
          </p>
          <div className="min-w-screen py-4 px-8 gap-4 flex items-center justify-center sticky bottom-20 ">
            <button className="duration-300 lg:text-2xl text-xl py-2 px-4 rounded-3xl border border-white hover:bg-violet-500 text-white absolute shadow-xl">
              Get to know me in depth
            </button>
          </div>
        </web.div>
      </div>
    </div>
  );
};

export default About;
