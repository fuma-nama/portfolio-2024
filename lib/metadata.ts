import type { Metadata } from "next/types";

export const baseUrl = "https://fuma-nama.vercel.app";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseUrl,
      images: "/banner.png",
      siteName: "Portfolio",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/banner.png",
      ...override.twitter,
    },
    metadataBase: new URL(baseUrl),
  };
}
