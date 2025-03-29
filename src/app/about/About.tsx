"use client";
import { useEffect, useState } from "react";
import { aboutStore } from "@/store/store";
import Images from "@/utils/image";
import { aboutType } from "@/utils/types";
import Image from "next/image";
import { useSpring, a as web } from "@react-spring/web";
import { Button } from "@/components/ui/button";

const About = () => {
  const openAboutSlider = aboutStore(
    (state: aboutType) => state.openAboutSlider
  );
  const setOpenAboutSlider = aboutStore(
    (state: aboutType) => state.setOpenAboutSlider
  );
  const aboutTextStyle = useSpring({ open: Number(openAboutSlider) });
  const [viewCV, setViewCV] = useState(false);

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
        className={` duration-300 bg-gradient-to-b from-violet-800/80 via-violet-500/80 via-75% to-violet-800/80 h-screen w-screen flex flex-col items-center justify-center gap-12 sticky top-0 lg:pr-0 pr-2`}
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
            className={`duration-300 ${
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
        {!openAboutSlider && (
          <div className="w-screen flex items-end justify-end">
            <h1 className="h-full px-8 py-4 text-white animate-bounce">
              Keep on scrolling ⇣
            </h1>
          </div>
        )}
        <web.div
          style={{
            opacity: aboutTextStyle.open.to([1, 0], [1, 0]),
            transform: aboutTextStyle.open.to(() => `translateY(-25%,0)`),
            color: "#000",
          }}
          className={"flex flex-col lg:gap-8 absolute "}
        >
          <div className="h-full tracking-wide lg:text-xl text-justify lg:px-96 px-4 pb-4 lg:pt-80 pt-64 text-white">
            <h1>
              I blend technology, design, and analysis to craft seamless digital
              experiences. With a Master’s in Software Engineering and
              experience across startups and industries, I merge technical
              innovation with user-focused design to build impactful solutions.
            </h1>
            <hr className="lg:block hidden mt-4 drop-shadow-md text-transparent" />
            <br />
            <h1>My Core Skills include:</h1>
            <ul>
              <li className="lg:text-xl text-sm">
                <span className="text-yellow-300 lg:font-bold">
                  Full-Stack Development:
                </span>{" "}
                React, Next.js, NestJS, Node.js, PostgreSQL
              </li>
              <li className="lg:text-xl text-sm">
                <span className="text-yellow-300 lg:font-bold">3D Web:</span>{" "}
                Immersive experiences with Three.js & WebGL
              </li>
              <li className="lg:text-xl text-sm">
                <span className="text-yellow-300 lg:font-bold">UI/UX Design:</span>{" "}
                Creating intuitive and engaging user experiences
              </li>
              <li className="lg:text-xl text-sm">
                <span className="text-yellow-300 lg:font-bold">
                  Team & Product Management:
                </span>{" "}
                Leading teams and driving product strategy
              </li>
              <li className="lg:text-xl text-sm">
                <span className="text-yellow-300 lg:font-bold">
                  AI & Research:
                </span>{" "}
                Technical analysis and AI applications in healthcare
              </li>
            </ul>
          </div>
          <div className="min-w-screen py-4 px-8 gap-4 flex items-center justify-center sticky bottom-20 ">
            <Button
              size={"lg"}
              onClick={() => {
                setViewCV(true);
              }}
            >
              View CV
            </Button>
          </div>
        </web.div>
        {viewCV && (
          <div className="absolute w-screen h-screen flex items-start justify-center">
            <iframe
              src="/Zulker_CV.pdf"
              className="w-3/4 h-full"
              title="Zulker CV"
              seamless={true}
            />
            <div
              className={`relative top-8 left-4 flex flex-col gap-1.5 items-end
               justify-center rounded-md ease-in duration-100 cursor-pointer`}
              onClick={() => {
                setViewCV(false);
              }}
            >
              <div
                className={`rotate-45 origin-center translate-y-1.5 w-10 h-1.5 rounded-sm bg-white transition-all duration-300 ease-in-out `}
              ></div>
              <div
                className={`-rotate-45 origin-center -translate-y-1.5 w-10 h-1.5 rounded-sm bg-white transition-all duration-300 ease-in-out`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
