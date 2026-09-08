import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200 flex flex-col items-center justify-center px-6 relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />
      <div className="relative z-10 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
          {`/// 404`}
        </span>
        <h1 className="mt-6 text-6xl sm:text-8xl font-extralight tracking-tight text-slate-100">
          This page is lost.
        </h1>
        <p className="mt-6 text-slate-400 font-light leading-relaxed max-w-md mx-auto">
          The URL you followed doesn&apos;t exist on this site. The laptop is
          here if you need a place to sit and think.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-brand text-black hover:bg-brand-light font-semibold tracking-wide transition-colors duration-300"
          >
            Back home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full border border-white/10 text-slate-300 hover:text-brand-light hover:border-brand/40 transition-colors duration-300"
          >
            My Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}