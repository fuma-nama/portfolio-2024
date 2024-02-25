"use client";

import { useEffect, useRef } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!boxRef.current) return;
    const container = containerRef.current;
    const box = boxRef.current;

    const listener = (e: MouseEvent) => {
      const bounds = box.getBoundingClientRect();

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      box.style.setProperty("transition", `none`);
      box.style.setProperty(
        "background-image",
        `radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      rgba(255,255,255,0.1),
      transparent)`
      );
      box.style.setProperty(
        "transform",
        `rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
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
      className="flex bg-gradient-to-br from-cyan-400 to-pink-400 p-8 rounded-xl h-[800px] overflow-clip"
    >
      <div className="w-[800px] m-auto flex-shrink-0">
        <div
          ref={boxRef}
          className="bg-neutral-950/60 backdrop-blur-3xl p-4 rounded-2xl border border-neutral-700/30 flex flex-row gap-4 shadow-xl shadow-neutral-950/50"
        >
          <div className="flex flex-col gap-1.5 bg-neutral-600/20 border border-neutral-500/30 rounded-xl p-1 w-[20%] h-[400px]">
            {["Joulev", "Fuma", "John", "Alfonsus"].map((user) => (
              <User key={user} name={user} />
            ))}
            <button className="mt-auto border border-neutral-500/30 rounded-lg p-2 text-xs font-medium transition-colors hover:bg-neutral-500/40">
              Open Chat
            </button>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-lg font-semibold">Hello There, Fuma</h2>
            <p className="text-sm text-neutral-400">New messages.</p>
            <div className="mt-4 -m-2 p-2 bg-gradient-to-b from-neutral-600/30 to-neutral-700/30 rounded-lg">
              <p className="text-xs font-medium">Joulev</p>
              <p className="text-neutral-400 text-xs">
                I thought you won't be here anymore.
              </p>
            </div>
            <div className="mt-auto p-4 border border-neutral-500/30 text-sm text-neutral-400 bg-neutral-600/20 rounded-xl">
              Type...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function User({ name }: { name: string }) {
  return (
    <button className="p-1 flex flex-row items-center gap-2 rounded-md text-xs font-medium transition-colors hover:bg-neutral-500/40">
      <img src="https://i.pravatar.cc/40" className="size-8 rounded-full" />
      <div>
        <p>{name}</p>
        <p className="text-left text-neutral-400">Idle</p>
      </div>
    </button>
  );
}
