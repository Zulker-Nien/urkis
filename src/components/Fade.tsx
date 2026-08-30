"use client";
import { ReactNode } from "react";
import { animated, useInView, useSpring } from "@react-spring/web";

interface FadeProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

const Fade = ({ children, className, y = 28 }: FadeProps) => {
  const [ref, inView] = useInView({
    rootMargin: "-40px 0px",
    once: true,
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : `translateY(${y}px)`,
    config: { tension: 120, friction: 20 },
  });

  return (
    <animated.div ref={ref} style={spring} className={className}>
      {children}
    </animated.div>
  );
};

export default Fade;