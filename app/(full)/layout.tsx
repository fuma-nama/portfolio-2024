import { Nav } from "@/components/nav";
import { Shell } from "@/components/ui/3d-shell";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="px-6 py-8">
      <Nav />
      <Shell>{children}</Shell>
    </main>
  );
}
