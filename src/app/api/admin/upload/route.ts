import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { AuthError, requireAdmin } from "@/lib/auth";

const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
]);

const BLOB_HOST = "public.blob.vercel-storage.com";

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image is too large (max 4MB)" }, { status: 400 });
    }

    const dotIndex = file.name.lastIndexOf(".");
    const ext = dotIndex >= 0 ? file.name.slice(dotIndex).toLowerCase() : "";
    const base = dotIndex >= 0 ? file.name.slice(0, dotIndex) : file.name;
    const pathname = `blog/${Date.now()}-${safeName(base).slice(0, 60)}${ext}`;

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const body = (await req.json().catch(() => null)) as { url?: string } | null;
    const url = body?.url;
    if (!url || !url.includes(BLOB_HOST)) {
      return NextResponse.json({ ok: true });
    }
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}