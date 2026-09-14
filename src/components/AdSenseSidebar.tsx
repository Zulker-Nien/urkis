"use client";

import { useEffect } from "react";
import Script from "next/script";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

function AdUnit() {
  useEffect(() => {
    try {
      const win = window as Window & { adsbygoogle?: unknown[] };
      (win.adsbygoogle = win.adsbygoogle || []).push({});
    } catch {
      // AdSense occasionally errors before it's ready; ignore.
    }
  }, []);

  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded-2xl border border-white/5 bg-zinc-900/50">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
          ad
        </span>
      </div>
      <ins
        className="adsbygoogle pointer-events-auto relative z-10 block h-full w-full"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default function AdSenseSidebar() {
  if (!ADSENSE_CLIENT) return null;
  if (!ADSENSE_SLOT) return null;

  return (
    <>
      <Script
        id="adsense-loader"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
      <aside
        aria-label="Advertisement"
        className="pointer-events-none fixed inset-y-0 left-0 z-10 hidden w-44 items-center justify-center pt-20 pb-28 xl:flex"
      >
        <AdUnit />
      </aside>
      <aside
        aria-label="Advertisement"
        className="pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-44 items-center justify-center pt-20 pb-28 xl:flex"
      >
        <AdUnit />
      </aside>
    </>
  );
}