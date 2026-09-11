"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: string;
  readingTime: number;
};

interface Props {
  posts: BlogPostSummary[];
  allTags: string[];
}

const ALL_TAG = "All";

export default function BlogFilter({ posts, allTags }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(ALL_TAG);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = tag === ALL_TAG || post.tags.includes(tag);
      if (!matchesTag) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        (post.excerpt ?? "").toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, tag]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, tags, topics..."
            aria-label="Search blog posts"
            className="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-2.5 pl-10 pr-10 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-colors focus:border-brand/50 focus:ring-1 focus:ring-brand/40"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-brand"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {[ALL_TAG, ...allTags].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
                className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-widest transition-all duration-200 ${
                  tag === t
                    ? "border-brand/60 bg-brand/15 text-brand"
                    : "border-white/10 text-slate-400 hover:border-brand/30 hover:text-brand/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mb-6 font-mono text-xs text-slate-500" aria-live="polite">
        {filtered.length === 0
          ? "No posts match your filters."
          : `${filtered.length} ${filtered.length === 1 ? "post" : "posts"}${tag !== ALL_TAG ? ` in ${tag}` : ""}`}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-10 text-center">
          <p className="text-slate-500 font-light">
            Nothing here yet. Try a different search or tag.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-brand/30 rounded-2xl p-6 sm:p-8 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono mb-3">
                <span>
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-slate-700">&middot;</span>
                <span>{post.readingTime} min read</span>
                {post.tags.length > 0 && (
                  <>
                    <span className="text-slate-700">&middot;</span>
                    <span className="flex items-center gap-1.5">
                      {post.tags.map((tagName) => (
                        <span
                          key={tagName}
                          className="px-2 py-0.5 rounded-full border border-white/10 text-brand/80 text-[10px] uppercase tracking-widest"
                        >
                          {tagName}
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
    </div>
  );
}