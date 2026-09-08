import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Images from "@/utils/image";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true } });
  if (!post) return { title: "Post not found" };
  return { title: `${post.title} — Blog`, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true } });
  if (!post) notFound();

  const { marked } = await import("marked");
  const html = await marked.parse(post.content);

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200 relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />
      <nav className="sticky top-2 z-20 max-w-4xl mx-auto px-6 py-4 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-lg shadow-black/20">
        <Link href="/" className="text-sm text-slate-400 hover:text-brand-light font-mono">
          <Image
            src={Images.Logo}
            alt="Zulker Nien"
            className="pointer-events-none w-16 lg:w-16 select-none"
          />
        </Link>
        <Link href="/blog" className="text-xs text-slate-500 hover:text-brand-light font-mono">
          &larr; all posts
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-6 pt-8">
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
        <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-slate-100 leading-tight mb-8">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg text-slate-400 font-light leading-relaxed mb-10 border-l-2 border-brand/40 pl-4">
            {post.excerpt}
          </p>
        )}
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-2xl border border-white/5 mb-10"
          />
        )}

        <div
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}