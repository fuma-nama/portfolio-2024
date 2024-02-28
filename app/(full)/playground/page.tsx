"use client";

import { Shell } from "@/components/ui/3d-shell";
import { cn } from "@/lib/cn";
import Link from "next/link";

const user = "Fuma";

export default function Page() {
  return (
    <Shell>
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
    </Shell>
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
