import { Border, Shell } from "@/components/ui/3d-shell";

export default function Page() {
  return (
    <Shell>
      <div className="relative p-4">
        <Border
          color={[
            "rgba(255,255,255,0.5)",
            "rgba(255,255,255,0.1)",
            "rgba(255,255,255,0.3)",
          ]}
        />
        <p>Hello World</p>
      </div>
    </Shell>
  );
}
