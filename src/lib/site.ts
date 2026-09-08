export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "Urkis";
export const AUTHOR = "Zulker Nien";

export const KEYWORDS = [
  "Zulker Nien",
  "Urkis",
  "software engineer",
  "full-stack developer",
  "web developer",
  "portfolio",
  "creative developer",
  "react",
  "next.js",
  "typescript",
  "three.js",
  "3D web",
  "blog",
  "engineering blog",
];

export const DESCRIPTION =
  "Zulker Nien — design-minded software engineer building on the web's edge. Selected projects, engineering notes and a 3D-built portfolio.";
 