"use client";

import { cn } from "@/lib/cn";
import { HTMLAttributes, useEffect, useRef } from "react";

export function Shell({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!boxRef.current) return;
    const container = containerRef.current;
    const box = boxRef.current;

    const listener = (e: MouseEvent) => {
      const bounds = box.getBoundingClientRect();
      const leftX = e.clientX - bounds.x;
      const topY = e.clientY - bounds.y;
      const centerX = leftX - bounds.width / 2;
      const centerY = topY - bounds.height / 2;

      const distance = Math.sqrt(centerX ** 2 + centerY ** 2);

      box.style.setProperty("transition", `none`);
      box.style.setProperty(
        "background-image",
        `radial-gradient(
      circle at
      ${centerX * 2 + bounds.width / 2}px
      ${centerY * 2 + bounds.height / 2}px,
      rgba(255,255,255,0.15),
      transparent 50%)`
      );
      box.style.setProperty(
        "transform",
        `rotate3d(
      ${centerY / 100},
      ${-centerX / 100},
      0,
      ${Math.log(distance) * 2}deg)`
      );
    };

    const onLeave = () => {
      box.style.setProperty("transition", `all 1s`);
      box.style.setProperty("background-image", `none`);
      box.style.setProperty("transform", `none`);
    };

    container.addEventListener("mousemove", listener);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", listener);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-gradient-to-br from-cyan-400 to-pink-400 p-8 rounded-xl h-[800px] [perspective:2000px]"
    >
      <div
        ref={boxRef}
        className={cn(
          "relative w-[94vw] h-[400px] max-w-[800px] flex-shrink-0 bg-neutral-950/60 backdrop-blur-3xl p-4 rounded-2xl border border-neutral-500/30 flex flex-row gap-4 shadow-xl shadow-neutral-950/50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
