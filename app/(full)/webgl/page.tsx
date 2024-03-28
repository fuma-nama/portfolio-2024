"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "./renderer";
import { ExitButton, Shell } from "@/components/ui/3d-shell";

export default function Page() {
  return (
    <Shell className="p-0">
      <Canvas />
      <ExitButton href="/playground" />
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
