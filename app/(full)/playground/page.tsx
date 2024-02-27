"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
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

  const user = "Fuma";

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-gradient-to-br from-cyan-400 to-pink-400 p-8 rounded-xl h-[800px] overflow-clip [perspective:2000px]"
    >
      <div
        ref={boxRef}
        className="relative w-[400px] h-[400px] flex-shrink-0 bg-neutral-950/60 backdrop-blur-3xl p-4 rounded-2xl border border-neutral-500/30 flex flex-row gap-4 shadow-xl shadow-neutral-950/50 sm:w-[800px]"
      >
        <div className="flex flex-col gap-1.5 bg-neutral-600/20 border border-neutral-500/30 rounded-xl p-1 w-[20%] max-sm:hidden">
          {["Fuma", "Joulev", "John", "Alfonsus"].map((name) => (
            <User key={name} name={name} active={name === user} />
          ))}
          <button className="mt-auto rounded-full p-2 text-xs font-medium bg-neutral-500/30 transition-colors hover:bg-neutral-400/30">
            Open Chat
          </button>
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="text-lg font-semibold">Hello There, My friend</h2>
          <p className="text-sm text-neutral-400">New messages.</p>
          <Message name={user}>
            <p className="text-neutral-400 text-xs">
              Here is my secret basement :)
            </p>
          </Message>
          <Message name={user}>
            <Link
              href="/webgl"
              className="px-2 py-1 rounded-lg text-xs text-neutral-900 font-medium bg-neutral-50/80 transition-colors hover:bg-neutral-200/80"
            >
              WebGL
            </Link>
          </Message>

          <div className="mt-auto flex flex-row items-center gap-2 p-2 border border-neutral-500/30 bg-neutral-600/20 rounded-xl">
            <button className="rounded-full p-1.5 text-neutral-900 bg-neutral-50/80 hover:bg-neutral-200/80">
              <svg
                className="size-3"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
            <p className="text-sm text-neutral-400">Type...</p>
          </div>
        </div>
        <Link
          href="/"
          className="absolute top-4 right-4 p-1 rounded-lg transition-colors hover:bg-neutral-400/30"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function Message({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-2 mt-4 p-2 bg-neutral-600/30 rounded-lg">
      <img
        src={`https://i.pravatar.cc/40?u=${name}`}
        alt="avatar"
        className="size-6 rounded-full"
      />
      <div>
        <p className="text-xs font-medium">{name}</p>
        {children}
      </div>
    </div>
  );
}

function User({ name, active }: { name: string; active: boolean }) {
  return (
    <button
      className={cn(
        "p-1 flex flex-row items-center gap-2 rounded-md text-xs font-medium transition-colors hover:bg-neutral-500/30",
        active && "bg-neutral-500/30"
      )}
    >
      <img
        src={`https://i.pravatar.cc/40?u=${name}`}
        className="size-8 rounded-full"
      />
      <div>
        <p>{name}</p>
        <p className="text-left text-neutral-400">Idle</p>
      </div>
    </button>
  );
}
