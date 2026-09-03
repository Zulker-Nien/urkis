"use client";

import { useEffect, useState } from "react";
import { Moon, Palette, Settings, Sun, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { themeStore, THEMES } from "@/store/themeStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const theme = themeStore((s) => s.theme);
  const mode = themeStore((s) => s.mode);
  const setTheme = themeStore((s) => s.setTheme);
  const setMode = themeStore((s) => s.setMode);
  const reset = themeStore((s) => s.reset);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const isDefault = theme === "amber" && mode === "dark";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-zinc-900/80 border border-white/10 text-slate-400 hover:text-brand hover:border-brand/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg shadow-black/40"
        aria-label="Open settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden border border-brand/15 shadow-2xl shadow-black/60 flex flex-col">
            <div className="w-full h-12 bg-black/60 border-b border-white/5 flex items-center justify-between px-5">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium font-mono">
                Settings
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-brand-light hover:bg-white/5 transition-all duration-200"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row min-h-0 sm:min-h-[380px]">
              <Tabs
                defaultValue="theme"
                className="flex flex-col sm:flex-row flex-1"
              >
                <TabsList className="flex-row sm:flex-col w-full sm:w-44 shrink-0 items-stretch sm:items-stretch justify-start sm:justify-start gap-1 rounded-none border-b sm:border-b-0 sm:border-r border-white/5 bg-zinc-950/40 p-2 sm:p-3">
                  <p className="hidden sm:block px-2 pt-1 pb-2 text-[10px] uppercase tracking-widest text-slate-600 font-mono">
                    Themes
                  </p>
                  <TabsTrigger
                    value="theme"
                    className="justify-center sm:justify-start gap-2.5 rounded-lg px-3 py-2 data-[state=active]:bg-zinc-900 data-[state=active]:text-brand"
                  >
                    <Palette className="w-4 h-4" />
                    Themes
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <TabsContent value="theme" className="mt-0 flex flex-col gap-6">
                    <div className="border-b border-white/5 pb-5">
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-medium font-mono mb-3">
                        Color
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {THEMES.map((t) => (
                          <button
                            key={t.name}
                            onClick={() => setTheme(t.name)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200",
                              theme === t.name
                                ? "border-brand/60 bg-brand/10"
                                : "border-white/5 bg-zinc-950/40 hover:border-white/15"
                            )}
                          >
                            <span className="flex gap-1">
                              {t.swatch.map((c) => (
                                <span
                                  key={c}
                                  className="w-3.5 h-3.5 rounded-full border border-white/10"
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </span>
                            <span
                              className={cn(
                                "text-xs font-medium",
                                theme === t.name
                                  ? "text-brand"
                                  : "text-slate-400"
                              )}
                            >
                              {t.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-b border-white/5 pb-5">
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-medium font-mono mb-3">
                        Mode
                      </p>
                      <button
                        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-200",
                          mode === "light"
                            ? "border-brand/60 bg-brand/10"
                            : "border-white/5 bg-zinc-950/40 hover:border-white/15"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-8 h-8 flex items-center justify-center rounded-full",
                              mode === "light"
                                ? "bg-brand/20 text-brand"
                                : "bg-white/5 text-slate-300"
                            )}
                          >
                            {mode === "light" ? (
                              <Sun className="w-4 h-4" />
                            ) : (
                              <Moon className="w-4 h-4" />
                            )}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              mode === "light"
                                ? "text-brand"
                                : "text-slate-200"
                            )}
                          >
                            {mode === "light" ? "Light mode" : "Dark mode"}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "w-10 h-6 rounded-full flex items-center px-0.5 transition-colors duration-300",
                            mode === "light"
                              ? "bg-brand justify-end"
                              : "bg-white/10 justify-start"
                          )}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow" />
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <p className="text-xs text-slate-500 font-light">
                        {isDefault
                          ? "Currently using the default theme."
                          : "Set the current appearance as your default."}
                      </p>
                      <Button
                        onClick={reset}
                        disabled={isDefault}
                        className="bg-brand text-black hover:bg-brand-light font-semibold tracking-wide rounded-full px-5 transition-all duration-200 active:scale-95 disabled:opacity-40"
                      >
                        Set default
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
