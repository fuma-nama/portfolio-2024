"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const apps = [
    {
      icon: "/icons/webgl.png",
      name: "WebGL",
      url: "/webgl",
    },
    {
      icon: "/icons/demo.png",
      name: "UI Demo",
      url: "/playground/demo",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center gap-4 size-full">
      {apps.map((app) => (
        <Link
          key={app.name}
          href={app.url}
          className="flex flex-col items-center gap-4 group cursor-pointer"
        >
          <Image
            alt="webgl"
            src={app.icon}
            width={300}
            height={300}
            className="w-24 rounded-full shadow-xl shadow-neutral-950/50 transition-transform z-[-1] group-hover:scale-110"
          />
          <span className="text-center text-sm opacity-80 transition-opacity group-hover:opacity-100">
            {app.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
