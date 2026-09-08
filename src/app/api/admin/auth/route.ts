import { NextRequest, NextResponse } from "next/server";
import {
  AuthError,
  createAdminSession,
  destroySession,
  getSession,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as { token?: string } | null;
    const token = body?.token?.trim();
    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }
    const session = await createAdminSession(token);
    return NextResponse.json({ ok: true, login: session.login ?? null });
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    return NextResponse.json({
      authenticated: true,
      login: session.login ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (session) {
    await destroySession(session.id);
  }
  return NextResponse.json({ ok: true });
}