import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";
import { createMetadata } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = createMetadata({
  title: {
    absolute: "Fuma Nama",
    template: "Fuma Nama | %s",
  },
  description: "My personal website.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-neutral-950 text-neutral-50 min-h-screen"
        )}
      >
        {children}
      </body>
    </html>
  );
}
