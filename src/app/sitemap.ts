import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";
import { projectOverviews } from "@/utils/projectOverviews";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...posts.map(
      (post): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      })
    ),
    ...projectOverviews.map(
      (overview): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/projects/${overview.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      })
    ),
  ];
}