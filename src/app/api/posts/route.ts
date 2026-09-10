import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { title: true, slug: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return NextResponse.json(posts);
}
