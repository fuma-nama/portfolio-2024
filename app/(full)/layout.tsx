import { Nav } from "@/components/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="px-6 py-8">
      <Nav />
      {children}
    </main>
  );
}
