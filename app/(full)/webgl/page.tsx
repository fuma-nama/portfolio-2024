"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "./renderer";
import Link from "next/link";
import { Shell } from "@/components/ui/3d-shell";

export default function Page() {
  return (
    <Shell className="block p-0">
      <Canvas />
      <div className="-mb-8 flex flex-col items-center p-4">
        <Link
          href="/playground"
          className="relative mt-2 px-8 py-2 text-sm font-medium"
        >
          <svg className="absolute inset-0 z-[-1] size-full" overflow="visible">
            <linearGradient
              id="borderGradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
              gradientTransform="rotate(0 0 0)"
            >
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values="0 0 0;360 0 0"
                dur="2s"
                repeatCount="indefinite"
              />
              <stop offset="0%" stopColor="rgb(50,50,50)" />
              <stop offset="75%" stopColor="white" />
              <stop offset="100%" stopColor="rgb(50,50,50)" />
            </linearGradient>
            <linearGradient id="bgGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(50,50,50)" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="4"
                floodColor="white"
                floodOpacity="0.2"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              stroke="url(#borderGradient)"
              strokeWidth="1"
              fill="url(#bgGradient)"
              filter="url(#shadow)"
              rx="8"
            />
          </svg>
          <p>Back</p>
        </Link>
      </div>
    </Shell>
  );
}

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const renderer = createRenderer(ref.current);

    return () => {
      renderer.destroy();
    };
  }, []);

  return <canvas ref={ref} className="w-full h-full rounded-xl" />;
}
