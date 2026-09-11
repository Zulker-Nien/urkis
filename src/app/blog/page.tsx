import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Images from "@/utils/image";
import { SITE_URL, SITE_NAME, DESCRIPTION, AUTHOR } from "@/lib/site";
import { getReadingTime } from "@/lib/blog";
import BlogFilter from "@/components/BlogFilter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    title: "Blog",
    description: DESCRIPTION,
    images: [{ url: "/Zulker_Logo_W.png", alt: `${AUTHOR} — ${SITE_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: DESCRIPTION,
    images: ["/Zulker_Logo_W.png"],
  },
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const summaries = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    tags: post.tags,
    createdAt: post.createdAt.toISOString(),
    readingTime: getReadingTime(post.content),
  }));

  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} — Blog`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    author: { "@type": "Person", name: AUTHOR },
    blogPost: summaries.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.createdAt,
      author: { "@type": "Person", name: AUTHOR },
      keywords: post.tags.join(", "),
    })),
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />
      <nav className="sticky top-2 z-20 max-w-4xl mx-auto px-6 py-4 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-lg shadow-black/20">
        <Link href="/" className="text-sm text-slate-400 hover:text-brand-light font-mono">
          <Image
            src={Images.Logo}
            alt="Zulker Nien"
            className="hover:animate-spin pointer-events-none w-16 lg:w-16 select-none"
          />
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="/rss.xml"
            className="text-xs text-slate-500 hover:text-brand-light font-mono"
            aria-label="RSS feed"
          >
            rss
          </a>
          <Link href="/blog/admin" className="text-xs text-slate-500 hover:text-brand-light font-mono">
            admin
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-3 mb-10 pt-8">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
            {`/// Blog`}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-slate-100 leading-tight mb-12">
          Notes from the edge.
        </h1>

        {summaries.length === 0 ? (
          <p className="text-slate-500 font-light">
            No posts yet. Check back soon.
          </p>
        ) : (
          <BlogFilter posts={summaries} allTags={allTags} />
        )}
      </main>
    </div>
  );
}