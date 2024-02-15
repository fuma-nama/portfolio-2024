"use client";
import Link from "next/link";
import { documents } from "../source";
import { useEffect, useState } from "react";

export function Card({
  id,
  info,
}: {
  id: string;
  info: (typeof documents)[number]["info"];
}) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(info.date.toLocaleDateString(undefined, { dateStyle: "medium" }));
  }, [info.date]);

  return (
    <Link
      href={`/blog/${id}`}
      className="relative group overflow-hidden z-[2] flex flex-col shadow-inner shadow-neutral-800 p-4 rounded-lg border border-neutral-800 bg-gradient-to-b from-neutral-800 transition-colors hover:bg-neutral-900 hover:border-neutral-600"
    >
      <div className="flex justify-between">
        <h2 className="text-sm font-medium mb-2">{info.title}</h2>
        <span className="text-xs text-neutral-400">{date}</span>
      </div>
      <p className="text-xs text-neutral-400">{info.description}</p>
      <div className="z-[-1] size-40 absolute right-0 bottom-0 bg-neutral-400 blur-3xl opacity-0 rounded-full transition-opacity group-hover:opacity-20" />
    </Link>
  );
}
