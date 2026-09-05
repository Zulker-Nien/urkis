import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { projectOverviews, ProjectOverview, FeatureBlock } from "@/utils/projectOverviews";

export function generateStaticParams() {
  return projectOverviews.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const overview = projectOverviews.find((o) => o.slug === slug);
  return {
    title: overview ? `${overview.title} — Feature Overview` : "Project",
  };
}

function Block({ block }: { block: FeatureBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-slate-300 font-light leading-relaxed">{block.text}</p>;
    case "subheading":
      return (
        <h3 className="text-lg lg:text-xl font-normal text-slate-200 flex items-center gap-3">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand/60" />
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-slate-300 font-light leading-relaxed">
              <span className="text-brand mt-1.5 shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm font-light border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10">
                {block.head.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs uppercase tracking-widest text-brand font-mono font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 text-slate-300 align-top font-light"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="rounded-xl border border-brand/25 bg-brand/5 p-5">
          <p className="text-xs uppercase tracking-widest text-brand font-mono font-medium mb-2">
            {block.title}
          </p>
          <p className="text-slate-300 font-light leading-relaxed">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const overview = projectOverviews.find((o) => o.slug === slug);

  if (!overview) notFound();

  return <OverviewContent overview={overview} />;
}

function OverviewContent({ overview }: { overview: ProjectOverview }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-4 h-4 text-brand" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
            Feature Overview
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extralight tracking-tight text-slate-100 leading-[1.05]">
          {overview.title}
        </h1>
        <p className="mt-3 text-brand font-light text-lg tracking-wide">
          {overview.tagline}
        </p>
        <p className="mt-6 text-slate-300 font-light leading-relaxed max-w-2xl">
          {overview.hero}
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {overview.meta.map((m) => (
            <div
              key={m.label}
              className="border border-white/10 bg-zinc-900/40 rounded-xl px-4 py-3"
            >
              <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-1">
                {m.label}
              </span>
              <span className="text-slate-100 font-medium text-sm">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-12">
          {overview.sections.map((section) => (
            <section key={section.title} className="scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-extralight tracking-tight text-slate-100 mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
                {section.title}
              </h2>
              <div className="flex flex-col gap-5">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-light">
            {overview.title} — {overview.tagline}
          </p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-brand transition-colors group"
          >
            Back to projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}