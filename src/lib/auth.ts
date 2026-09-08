import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

export const SESSION_COOKIE = "blog_admin_session";

export class AuthError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function verifyGitHubToken(token: string): Promise<{ login: string | null }> {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "urkis-blog",
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    throw new AuthError(401, "Invalid GitHub token");
  }
  if (!res.ok) {
    throw new AuthError(502, "Could not verify token with GitHub");
  }

  const data = (await res.json()) as { login?: string };
  const login = data.login ?? null;

  const owner = process.env.GITHUB_TOKEN_OWNER;
  if (owner && (!login || login.toLowerCase() !== owner.toLowerCase())) {
    throw new AuthError(403, "Token does not belong to the authorized account");
  }

  return { login };
}

async function getSessionId() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function getSession() {
  const id = await getSessionId();
  if (!id) return null;
  const session = await prisma.adminSession.findUnique({ where: { id } });
  return session ?? null;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new AuthError(401, "Not authenticated");
  return session;
}

export async function createAdminSession(token: string) {
  const { login } = await verifyGitHubToken(token);
  const session = await prisma.adminSession.create({
    data: { tokenHash: hashToken(token), login },
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return session;
}

export async function destroySession(sessionId: string) {
  await prisma.adminSession.delete({ where: { id: sessionId } });
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}