import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Images from "@/utils/image";
import { SITE_URL, SITE_NAME, DESCRIPTION, AUTHOR } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
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
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />
      <nav className="sticky top-2 z-20 max-w-4xl mx-auto px-6 py-4 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-lg shadow-black/20">
        <Link href="/" className="text-sm text-slate-400 hover:text-brand-light font-mono">
          <Image
            src={Images.Logo}
            alt="Zulker Nien"
            className="hover:animate-spin pointer-events-none w-16 lg:w-16 select-none"
          />

        </Link>
        <Link href="/blog/admin" className="text-xs text-slate-500 hover:text-brand-light font-mono">
          admin
        </Link>
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

        {posts.length === 0 ? (
          <p className="text-slate-500 font-light">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-brand/30 rounded-2xl p-6 sm:p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-3">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {post.tags.length > 0 && (
                    <>
                      <span className="text-slate-700">&middot;</span>
                      <span className="flex items-center gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full border border-white/10 text-brand/80 text-[10px] uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-slate-100 group-hover:text-brand transition-colors duration-300">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-slate-400 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-block mt-5 text-sm font-mono text-brand">
                  read&nbsp;&nbsp;&rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}