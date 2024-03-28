import BackgoundImage from "@/public/background.jpg";
import { Nav } from "@/components/nav";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="px-6 py-8">
      <Nav />
      <div className="relative flex items-center justify-center bg-neutral-900 p-8 rounded-xl min-h-[400px] h-[calc(100vh-200px)] [perspective:2000px]">
        <Image
          alt="background"
          sizes="100vw"
          src={BackgoundImage}
          className="absolute size-full object-cover rounded-xl z-[-1]"
          priority
        />
        {children}
      </div>
    </main>
  );
}
