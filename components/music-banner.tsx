import Eve from "@/public/eve.jpg";
import Iori from "@/public/iori-kanzaki.jpg";
import Yorushika from "@/public/yorushika.jpg";
import Image from "next/image";

export function MusicBanner() {
  return (
    <div className="not-prose grid grid-cols-3 gap-4 rounded-xl bg-neutral-900 border border-neutral-800 p-2">
      <Image
        alt="iori"
        src={Iori}
        className="col-span-2 row-span-2 object-cover size-full rounded-md"
      />
      <Image
        alt="eve"
        src={Eve}
        className="col-start-3 row-start-1 object-cover size-full rounded-md"
      />
      <Image
        alt="Yorushika"
        src={Yorushika}
        className="col-start-3 row-start-2 object-cover size-full rounded-md"
      />
    </div>
  );
}
