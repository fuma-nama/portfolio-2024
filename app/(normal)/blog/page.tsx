import { createMetadata } from "@/lib/metadata";
import { documents } from "../../source";
import { Card } from "./card";

export const metadata = createMetadata({
  title: "Blog",
  description: "My precious thoughts and inspirations.",
});

export default function Page() {
  return (
    <main>
      <h1 className="font-semibold text-xl mb-2">Blog</h1>
      <p className="text-sm text-neutral-400 mb-4">
        My precious thoughts and inspirations.
      </p>
      <div className="flex flex-col gap-2">
        {documents.map((d) => (
          <Card key={d.id} id={d.id} info={d.info} />
        ))}
      </div>
    </main>
  );
}
