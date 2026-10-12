import type { MetadataRoute } from "next";
import { SITE_URL, journeySlugs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/story`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/journeys`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...journeySlugs.map((slug) => ({
      url: `${SITE_URL}${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
