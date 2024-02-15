import entry from "content";
import { document } from "fuma-content";
import * as path from "node:path";

export const documents = document(entry)
  .map((d) => ({
    id: path.basename(d.file, path.extname(d.file)),
    ...d,
    info: d.info as { title: string; description: string; date: Date },
  }))
  .sort((a, b) => b.info.date.getTime() - a.info.date.getTime());
