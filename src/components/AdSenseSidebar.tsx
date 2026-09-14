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
    <ins
      className="adsbygoogle pointer-events-auto block"
      style={{ minHeight: 600 }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={ADSENSE_SLOT}
      data-ad-format="vertical"
      data-full-width-responsive="true"
    />
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