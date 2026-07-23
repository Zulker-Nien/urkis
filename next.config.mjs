/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "feelthecelestial.com" },
      { protocol: "https", hostname: "scontent.fdac24-1.fna.fbcdn.net" },
    ],
  },
};

export default nextConfig;
