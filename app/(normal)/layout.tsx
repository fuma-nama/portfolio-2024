import { Nav } from "@/components/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[600px] px-6 mx-auto py-8">
      <Nav />
      {children}
    </main>
  );
}
