"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "./renderer";

export default function Page() {
  return <Canvas />;
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

  return <canvas ref={ref} className="w-full h-[500px] rounded-xl" />;
}
