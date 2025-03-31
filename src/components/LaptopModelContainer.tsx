"use client";
import { Canvas } from "@react-three/fiber";
import { useSpring, a as web } from "@react-spring/web";
import LaptopModel from "./LaptopModel";
import { Suspense, useEffect, useState } from "react";
import { a as three } from "@react-spring/three";

import { Environment, ContactShadows } from "@react-three/drei";
import { laptopStore } from "@/store/store";
import { laptopType } from "@/utils/types";
import ArrowDown from "./ArrowDown";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { TriangleAlert } from "lucide-react";

const LaptopModelContainer = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(false); // Explicitly set a default for smaller screens
    }
  }, []);
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);
  const setOpenLaptop = laptopStore((state: laptopType) => state.setOpenLaptop);
  const props = useSpring({ open: Number(openLaptop) });

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Popover>
        <PopoverTrigger className="absolute right-0 lg:py-8 py-3 lg:pr-12 pr-4 z-20">
          <TriangleAlert size={36} className="animate-bounce" />
        </PopoverTrigger>
        <PopoverContent side="left" className="bg-slate-950">
          <h1 className="text-slate-300 font-bold">
            Viewer Discretion Advised
          </h1>
          <br />
          <p className="text-yellow-300">
            This website is designed with bold colors and high contrast to
            reflect my creative energy. If you’re sensitive to vibrant visuals,
            you may want to adjust your screen settings or take breaks while
            browsing.
          </p>
          <br />
          <p className="text-slate-300">
            Enjoy the experience—just maybe not on an empty stomach.{" "}
            <span className="text-3xl">😉</span>
          </p>
          <br />
          <h1 className="text-slate-300 font-bold">Click the Laptop to begin</h1>
        </PopoverContent>
      </Popover>
      {openLaptop ? (
        <div className="w-full absolute bottom-20 z-20 text-center w-screen flex flex-col lg:items-end items-center justify-center lg:px-64 lg:px-0">
          <ArrowDown />
          <h2 className="text-black text-2xl p-0 m-0">Lets Go</h2>
        </div>
      ) : (
        <div className="absolute bottom-20 z-20 text-center w-screen duration-100">
          <h2 className="text-black text-2xl animate-pulse">Open the laptop</h2>
        </div>
      )}
      <web.main
        style={{
          background: props.open.to([0, 1], ["#f0f0f0cf", "#eab208cf"]),
          padding: 0,
          margin: 0,
          height: "100%",
        }}
      >
        <web.h6
          style={{
            opacity: props.open.to([0, 1], [1, 0]),
            transform: props.open.to(
              (o) => `translate3d(-50%,${o * 50 - 100}px,0)`
            ),
            color: "#000",
          }}
          className={"lg:!text-[8rem] !text-[2rem]"}
        >
          hello. This is Zulker.
        </web.h6>

        <Canvas
          className="h-full"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 0], fov: 35 }}
        >
          <three.pointLight
            position={[10, 10, 10]}
            intensity={1.5}
            color={props.open.to([0, 1], ["#00", "#000"])}
          />
          <Suspense fallback={"loading"}>
            <group
              rotation={[0, Math.PI, 0]}
              onClick={(e) => (e.stopPropagation(), setOpenLaptop(!open))}
              scale={isLargeScreen ? [1, 1, 1] : [0.5, 0.5, 0.5]}
            >
              <LaptopModel
                open={openLaptop}
                hinge={props.open.to([0, 1], [1.575, -0.425])}
              ></LaptopModel>
            </group>
            <Environment files="potsdamer_platz_1k.jpg" />
          </Suspense>
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -4.5, 0]}
            opacity={0.4}
            width={20}
            height={20}
            blur={2}
            far={4.5}
          />
        </Canvas>
      </web.main>
    </div>
  );
};

export default LaptopModelContainer;
