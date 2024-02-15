import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Projects",
  description: "My proud, high-quality treasures.",
});

const projects: (ProjectProps & { tag: string })[] = [
  {
    tag: "project",
    name: "Fumadocs",
    description:
      "The powerful framework for building documentation sites in Next.js.",
    href: "https://fumadocs.vercel.app",
  },
  {
    tag: "project",
    name: "Shark Chat",
    description: "A modern chat app.",
    href: "https://shark-chat.vercel.app",
  },
  {
    tag: "project",
    name: "Fuma Comment",
    description: "A comment area for your blog.",
    href: "https://fuma-comment.vercel.app",
  },
  {
    tag: "project",
    name: "Fuma Content",
    description: "A library for handling content.",
    href: "https://fuma-content.vercel.app",
  },
  {
    tag: "project",
    name: "Discord FP",
    description:
      "A Beautiful Application Command Library for Discord.js and Discordeno.",
    href: "https://github.com/fuma-nama/discord-fp",
  },
  {
    tag: "toy",
    name: "Kanji Animated",
    description:
      "Animation inspired by 命に嫌われている MV (by Iori Kanzaki), based on Canvas API.",
    href: "https://kanji-animated.vercel.app",
  },
  {
    tag: "toy",
    name: "No Deploy",
    description: "Robust and scalable hosting platform that supports nothing.",
    href: "https://nodeploy-neon.vercel.app",
  },
  {
    tag: "toy",
    name: "Simple Game",
    description: "A thing to waste your time.",
    href: "https://simple-game-pi.vercel.app",
  },
  {
    tag: "toy",
    name: "No Deploy CLI",
    description: "A CLI tool for No Deploy written in Rust.",
    href: "https://github.com/fuma-nama/nodeploy-cli",
  },
  {
    tag: "experimental",
    name: "Discord Bot Template",
    description: "A Discord bot template with dashboard and documentation.",
    href: "https://github.com/fuma-nama/discord-bot-template",
  },
  {
    tag: "legacy",
    name: "Old Portfolio",
    description: "My outdated yet well-designed portfolio.",
    href: "https://money-portfolio.vercel.app/",
  },
  {
    tag: "legacy",
    name: "JDAK",
    description:
      "A fast, flexible command framework for JDA written in Kotlin.",
    href: "https://github.com/fuma-nama/jdak",
  },
  {
    tag: "legacy",
    name: "Omagize",
    description:
      "A modern and powerful web chat app written in Java & TypeScript.",
    href: "https://github.com/fuma-nama/omagize",
  },
  {
    tag: "legacy",
    name: "Discord UI",
    description: "Write user interfaces for Discord bot.",
    href: "https://github.com/fuma-nama/discord-ui",
  },
];

export default function Page() {
  return (
    <article className="flex flex-col gap-2">
      <h1 className="font-semibold text-xl">Projects</h1>
      <p className="text-sm text-neutral-400 mb-2">
        Nice frameworks, libraries, web apps. My proud, high-quality harvests.
      </p>
      <div className="flex flex-col divide-y divide-neutral-800 mb-6">
        {projects
          .filter((p) => p.tag === "project")
          .map((p) => (
            <Project key={p.href} {...p} />
          ))}
      </div>

      <h2 className="font-semibold text-lg">My Toys</h2>
      <p className="text-sm text-neutral-400 mb-2">Fun projects.</p>
      <div className="flex flex-col divide-y divide-neutral-800 mb-6">
        {projects
          .filter((p) => p.tag === "toy")
          .map((p) => (
            <Project key={p.href} {...p} />
          ))}
      </div>

      <h2 className="font-semibold text-lg">Experimental</h2>
      <p className="text-sm text-neutral-400 mb-2">
        Bleeding edge stuffs for testing purposes.
      </p>
      <div className="flex flex-col divide-y divide-neutral-800 mb-6">
        {projects
          .filter((p) => p.tag === "experimental")
          .map((p) => (
            <Project key={p.href} {...p} />
          ))}
      </div>
      <h2 className="font-semibold text-lg">Legacy</h2>
      <p className="text-sm text-neutral-400 mb-2">
        My neglected, abandoned projects.
      </p>
      <div className="flex flex-col divide-y divide-neutral-800 mb-6">
        {projects
          .filter((p) => p.tag === "legacy")
          .map((p) => (
            <Project key={p.href} {...p} />
          ))}
      </div>
    </article>
  );
}

interface ProjectProps {
  name: string;
  description: string;
  href: string;
}

function Project(project: ProjectProps) {
  return (
    <a href={project.href} className="group py-2" rel="noreferrer noopener">
      <p className="text-sm font-medium group-hover:underline">
        {project.name}
      </p>
      <p className="text-sm text-neutral-400">{project.description}</p>
    </a>
  );
}
