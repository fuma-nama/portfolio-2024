import entry from "content";
import { document } from "fuma-content";

export const documents = document(entry)
  .map((d) => ({
    id: d.file.split("/")[1],
    ...d,
    info: d.info as { title: string; description: string; date: Date },
  }))
  .sort((a, b) => b.info.date.getTime() - a.info.date.getTime());
