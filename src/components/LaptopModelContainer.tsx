"use client";
import { Canvas } from "@react-three/fiber";
import { useSpring, a as web } from "@react-spring/web";
import LaptopModel from "./LaptopModel";
import { Suspense, useSyncExternalStore } from "react";
import { a as three } from "@react-spring/three";

import { Environment, ContactShadows } from "@react-three/drei";
import { laptopStore } from "@/store/store";
import { laptopType } from "@/utils/types";
import ArrowDown from "./ArrowDown";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ShieldAlert, Sparkles, TriangleAlert } from "lucide-react";

const LaptopModelContainer = () => {
  const isLargeScreen = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true
  );
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);
  const setOpenLaptop = laptopStore((state: laptopType) => state.setOpenLaptop);
  const props = useSpring({ open: Number(openLaptop) });

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Popover>
        <PopoverTrigger className="absolute right-6 top-6 lg:right-12 lg:top-8 z-30 p-2 rounded-xl bg-white/5 border border-slate-900 text-slate-900 hover:text-slate-800 backdrop-blur-md transition-all duration-200">
          <ShieldAlert size={20} className="animate-pulse" />
        </PopoverTrigger>
        <PopoverContent
          side="left"
          align="start"
          className="bg-slate-950/95 border border-white/10 backdrop-blur-md p-5 rounded-2xl max-w-sm text-slate-900 shadow-2xl z-40"
        >
          <div className="space-y-3 text-sm">
            <h4 className="font-semibold tracking-wide text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Visual Experience Advised
            </h4>
            <p className="text-slate-400 font-light leading-relaxed">
              This digital portfolio utilizes highly energetic contrast, deep black lines, and intentional physics simulations to reflect raw creative momentum.
            </p>
            <p className="text-slate-400 font-light leading-relaxed">
              Interact directly with the 3D model environment to begin navigation.
            </p>
            <div className="w-full h-px bg-white/5 pt-1" />
            <span className="text-xs font-mono text-slate-500 block">Click or tap the laptop to begin.</span>
          </div>
        </PopoverContent>
      </Popover>
      {openLaptop ? (
        <div className="w-full absolute bottom-20 z-20 text-center flex flex-col lg:items-end items-center justify-center lg:px-64 lg:px-0">
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
