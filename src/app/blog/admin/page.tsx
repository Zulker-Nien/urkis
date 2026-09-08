"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ShieldAlert,
  Sparkles,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  ImagePlus,
} from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type View = "auth" | "loading" | "list" | "editor";

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  content: "",
  tags: "",
  published: false,
};

export default function BlogAdminPage() {
  const [view, setView] = useState<View>("loading");
  const [login, setLogin] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        const data = await res.json();
        if (!mounted) return;
        if (data.authenticated) {
          setLogin(data.login ?? null);
          setView("list");
          const postsRes = await fetch("/api/admin/posts", { cache: "no-store" });
          if (postsRes.ok) {
            const postsData = await postsRes.json();
            setPosts(postsData.posts);
          }
        } else {
          setView("auth");
        }
      } catch {
        if (mounted) setView("auth");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function loadPosts() {
    const res = await fetch("/api/admin/posts", { cache: "no-store" });
    if (res.status === 401) {
      setView("auth");
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
    }
  }

  async function uploadToBlob(file: File): Promise<{ url: string }> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return data;
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingCover(true);
    setError(null);
    try {
      const { url } = await uploadToBlob(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleContentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingImage(true);
    setError(null);
    try {
      const { url } = await uploadToBlob(file);
      const alt = file.name.replace(/\.[^.]+$/, "") || "image";
      const snippet = `\n![${alt}](${url})\n`;
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart ?? form.content.length;
        const end = textarea.selectionEnd ?? form.content.length;
        const next = form.content.slice(0, start) + snippet + form.content.slice(end);
        setForm((f) => ({ ...f, content: next }));
        requestAnimationFrame(() => {
          textarea.focus();
          textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
        });
      } else {
        setForm((f) => ({ ...f, content: `${f.content}${snippet}` }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token.trim()) {
      setError("Enter your GitHub fine-grained token");
      return;
    }
    setView("loading");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken("");
      setLogin(data.login ?? null);
      setView("list");
      loadPosts();
    } else {
      setError(data.error ?? "Login failed");
      setView("auth");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setLogin(null);
    setPosts([]);
    setView("auth");
  };

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowPreview(false);
    setError(null);
    setView("editor");
  };

  const openEdit = (post: Post) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      coverImage: post.coverImage ?? "",
      content: post.content,
      tags: post.tags.join(", "),
      published: post.published,
    });
    setShowPreview(false);
    setError(null);
    setView("editor");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const prevCover = editing?.coverImage ?? null;
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      coverImage: form.coverImage,
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: form.published,
    };

    try {
      const res = editing
        ? await fetch(`/api/admin/posts/${editing.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save post");
        return;
      }
      if (
        prevCover &&
        prevCover !== payload.coverImage &&
        prevCover.includes("public.blob.vercel-storage.com")
      ) {
        fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: prevCover }),
        }).catch(() => {});
      }
      await loadPosts();
      setView("list");
    } catch {
      setError("Could not save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: Post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const blobUrls = new Set<string>();
    if (post.coverImage?.includes("public.blob.vercel-storage.com")) {
      blobUrls.add(post.coverImage);
    }
    const matches =
      post.content.match(/https:\/\/[^\s()<>]+\.vercel-storage\.com\/[^\s()<>]+/g) ?? [];
    for (const match of matches) {
      blobUrls.add(match.replace(/[.,;:!?)]+$/, ""));
    }
    await Promise.allSettled(
      [...blobUrls].map((url) =>
        fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        })
      )
    );
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) {
      loadPosts();
    } else {
      const data = await res.json();
      setError(data.error ?? "Could not delete post");
    }
  };

  if (view === "loading") {
    return (
      <Shell>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-brand" />
        </div>
      </Shell>
    );
  }

  if (view === "auth") {
    return (
      <Shell>
        <div className="max-w-md mx-auto w-full pt-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
              {`/// Blog Admin`}
            </span>
          </div>
          <h1 className="text-3xl font-extralight text-slate-100 mb-2">
            Authorize with GitHub
          </h1>
          <p className="text-slate-400 font-light text-sm leading-relaxed mb-8">
            Only the owner&apos;s GitHub fine-grained token can manage posts.
            Your token is verified against GitHub and never stored &mdash; only
            a hashed session cookie is kept.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-xs font-mono text-slate-500">github_pat_***</div>
            <Input
              type="password"
              autoComplete="off"
              placeholder="Paste your GitHub fine-grained token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="h-11 bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-brand text-black hover:bg-brand-light font-semibold rounded-full h-11"
            >
              Unlock dashboard
            </Button>
          </form>
        </div>
      </Shell>
    );
  }

  if (view === "editor") {
    return (
      <Shell>
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
                {editing ? "Edit post" : "New post"}
              </span>
            </div>
            <Button variant="ghost" onClick={() => setView("list")}>
              &larr; Back
            </Button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Title *
              </span>
              <Input
                required
                placeholder="Post title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="h-11 bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Slug
                </span>
                <Input
                  placeholder="auto-generated from title"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="h-11 bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Tags
                </span>
                <Input
                  placeholder="nextjs, webgl, tailwind"
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  className="h-11 bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Excerpt
              </span>
              <Input
                placeholder="Short summary shown on the blog listing"
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="h-11 bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Cover image
              </span>
              <div className="flex gap-2">
                <Input
                  placeholder="https://... or upload"
                  value={form.coverImage}
                  onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                  className="h-11 bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
                />
                <Button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover}
                  variant="outline"
                  className="h-11 shrink-0 border-white/10 text-slate-300 hover:text-brand-light"
                >
                  {uploadingCover ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ImagePlus className="w-4 h-4" />
                  )}
                  {uploadingCover ? "Uploading" : "Upload"}
                </Button>
              </div>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />
              {form.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="mt-2 h-28 object-cover rounded-xl border border-white/5 bg-zinc-900/60"
                />
              )}
            </label>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Content (markdown) *
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="border-white/10 text-slate-400 hover:text-brand-light"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ImagePlus className="w-4 h-4" />
                    )}
                    {uploadingImage ? "Uploading" : "Image"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowPreview((p) => !p)}
                    className="border-white/10 text-slate-400 hover:text-brand-light"
                  >
                    {showPreview ? "Write" : "Preview"}
                  </Button>
                </div>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleContentUpload}
              />
              {showPreview ? (
                <div className="min-h-[320px] rounded-md border border-white/10 bg-zinc-900/40 px-5 py-4">
                  <MarkdownPreview markdown={form.content || "*Nothing to preview yet.*"} />
                </div>
              ) : (
                <Textarea
                  ref={contentRef}
                  required
                  rows={12}
                  placeholder={"Write your post in markdown...\n\n## Heading\n\nSome **bold** text and `code`."}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="min-h-[320px] font-mono text-sm bg-zinc-900/60 border-white/10 text-slate-100 placeholder:text-slate-600"
                />
              )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="h-4 w-4 accent-brand"
              />
              <span className="text-sm text-slate-300">
                Published (visible on the public blog)
              </span>
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={saving}
                className="bg-brand text-black hover:bg-brand-light font-semibold rounded-full px-8"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Save changes" : "Create post"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setView("list")}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
              {`/// Blog Admin`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              {login ? `@${login}` : ""}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-white/10 text-slate-400 hover:text-brand-light"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extralight text-slate-100">Posts</h1>
          <Button
            onClick={openNew}
            className="bg-brand text-black hover:bg-brand-light font-semibold rounded-full"
          >
            <Plus className="w-4 h-4" /> New post
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center">
            <Sparkles className="w-8 h-8 mx-auto text-brand/60 mb-4" />
            <p className="text-slate-400 font-light">No posts yet. Create your first one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex items-center gap-4 border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/70 rounded-2xl p-4 sm:p-5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-slate-100 font-medium truncate">
                      {post.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                        post.published
                          ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
                          : "text-slate-500 border-white/10 bg-white/5"
                      }`}
                    >
                      {post.published ? "published" : "draft"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate mt-0.5">
                    /blog/{post.slug}
                    <span className="mx-2 text-slate-700">&middot;</span>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-brand-light hover:bg-white/5 transition-colors"
                    title="View on blog"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => openEdit(post)}
                    className="p-2 rounded-lg text-slate-500 hover:text-brand-light hover:bg-white/5 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_70%)]" />
      <nav className="relative z-10 max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-400 hover:text-brand-light font-mono">
          urkis<span className="text-brand">_</span>dev
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldAlert className="w-3.5 h-3.5 text-brand animate-pulse" />
          token-guarded
        </div>
      </nav>
      <main className="relative z-10 px-6 pb-24">{children}</main>
    </div>
  );
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  const html = useMemo(() => marked.parse(markdown) as string, [markdown]);
  return (
    <div
      className="blog-post text-slate-200"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}