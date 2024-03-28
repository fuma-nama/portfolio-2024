"use client";

import { cn } from "@/lib/cn";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, useEffect, useId, useRef } from "react";

export function Shell({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;
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
      rgba(255,205,255,0.1),
      transparent 50%)`
      );
      box.style.setProperty(
        "transform",
        `rotate3d(
      ${centerY / 100},
      ${-centerX / 100},
      0,
      ${Math.log(distance) * 1.5}deg)`
      );
    };

    const onLeave = () => {
      box.style.setProperty("transition", `all 1s`);
      box.style.setProperty("background-image", `none`);
      box.style.setProperty("transform", `none`);
    };

    box.addEventListener("mousemove", listener);
    box.addEventListener("mouseleave", onLeave);

    return () => {
      box.removeEventListener("mousemove", listener);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={cn(
        "relative w-[94vw] h-[400px] max-w-[800px] flex-shrink-0 bg-neutral-600/60 backdrop-blur-3xl p-4 rounded-2xl shadow-xl shadow-neutral-950/50",
        className
      )}
      {...props}
    >
      <Border
        color={[
          "rgba(255,235,235, 0.5)",
          "rgba(20,30,20, 0.5)",
          "rgba(140,140,100, 0.5)",
        ]}
      />
      {children}
    </div>
  );
}

export function Border({ color }: { color: string[] }) {
  const id = useId();

  return (
    <svg className="absolute inset-0 size-full z-[-1]">
      <linearGradient id={`${id}_border_gradient`} x1="0" x2="1" y1="0" y2="1">
        {color.map((c, i) => (
          <stop key={c} stopColor={c} offset={i / (color.length - 1)} />
        ))}
      </linearGradient>
      <rect
        width="100%"
        height="100%"
        stroke={`url(#${id}_border_gradient)`}
        strokeWidth="4px"
        fill="none"
        rx="16px"
      />
    </svg>
  );
}

export function ExitButton(props: LinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "absolute top-4 right-4 p-1 rounded-lg transition-colors hover:bg-neutral-400/30"
      )}
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
  );
}
