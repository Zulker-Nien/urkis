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

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let candidate = base;
  let i = 2;
  for (;;) {
    const existing = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === ignoreId) return candidate;
    candidate = `${base}-${i++}`;
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const title = isString(body.title) ? body.title.trim() : "";
    const content = isString(body.content) ? body.content.trim() : "";
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const baseSlug = isString(body.slug) && body.slug.trim()
      ? slugify(body.slug)
      : slugify(title);
    const slug = await uniqueSlug(baseSlug);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: isString(body.excerpt) ? body.excerpt.trim() : null,
        coverImage: isString(body.coverImage) ? body.coverImage.trim() : null,
        content,
        tags:
          Array.isArray(body.tags)
            ? body.tags.filter(isString).map((t) => t.trim()).filter(Boolean)
            : [],
        published: body.published === true,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}