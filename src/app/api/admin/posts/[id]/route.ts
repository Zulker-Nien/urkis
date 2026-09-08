import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { AuthError, requireAdmin } from "@/lib/auth";

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "untitled"
  );
}

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const data: {
      title?: string;
      slug?: string;
      excerpt?: string | null;
      coverImage?: string | null;
      content?: string;
      tags?: string[];
      published?: boolean;
    } = {};

    if (body.title !== undefined) {
      const title = isString(body.title) ? body.title.trim() : "";
      if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }
      data.title = title;
    }

    const hasSlug = body.slug !== undefined;
    if (hasSlug && body.slug !== "") {
      const base = isString(body.slug) ? slugify(body.slug) : slugify(data.title ?? existing.title);
      data.slug = await uniqueSlug(base, id);
    }

    if (body.content !== undefined) {
      data.content = isString(body.content) ? body.content.trim() : "";
      if (!data.content) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
      }
    }

    if (body.excerpt !== undefined) {
      data.excerpt = isString(body.excerpt) ? body.excerpt.trim() : null;
    }

    if (body.coverImage !== undefined) {
      data.coverImage = isString(body.coverImage) ? body.coverImage.trim() : null;
    }

    if (body.tags !== undefined) {
      data.tags = Array.isArray(body.tags)
        ? body.tags.filter(isString).map((t) => t.trim()).filter(Boolean)
        : [];
    }

    if (body.published !== undefined) {
      data.published = body.published === true;
    }

    const post = await prisma.post.update({ where: { id }, data });
    return NextResponse.json({ post });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let candidate = base;
  let i = 2;
  for (;;) {
    const existing = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === ignoreId) return candidate;
    candidate = `${base}-${i++}`;
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const result = await prisma.post.deleteMany({ where: { id } });
    if (result.count === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}