export type FeatureBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export type ProjectOverview = {
  slug: string;
  title: string;
  tagline: string;
  hero: string;
  meta: { label: string; value: string }[];
  sections: {
    title: string;
    blocks: FeatureBlock[];
  }[];
};

export const projectOverviews: ProjectOverview[] = [
  {
    slug: "the-deltagram",
    title: "The Deltagram",
    tagline: "Unfiltered and Unbound",
    hero:
      "Full-Stack Digital News Platform — Feature Overview",
    meta: [
      { label: "Backend", value: "NestJS 11" },
      { label: "Frontend", value: "Next.js 16" },
      { label: "Admin Panel", value: "Next.js 16" },
      { label: "Database", value: "PostgreSQL · Redis · Meilisearch" },
    ],
    sections: [
      {
        title: "1. System Architecture",
        blocks: [
          {
            type: "paragraph",
            text: "Three independent applications working together to deliver a complete digital news platform.",
          },
          {
            type: "table",
            head: ["Application", "Stack", "Purpose"],
            rows: [
              [
                "Backend (Port 3001)",
                "NestJS 11, TypeScript, Node.js 22",
                "REST API with 16 modular services — authentication, articles, payments, search, analytics, newsletters, videos, ads, activity logging, and more. Swagger docs at /api.",
              ],
              [
                "Frontend (Port 3000)",
                "Next.js 16, React 19, Tailwind CSS 4, shadcn/ui",
                "Public-facing news website with landing page, article browsing, video section, search, subscriptions, newsletters, and static pages.",
              ],
              [
                "Admin Dashboard (Port 3002)",
                "Next.js 16, Radix UI, TipTap Editor, Recharts",
                "Content management panel for editors — article creation with rich text editing, analytics, user/subscriber management, newsletter builder, ad placement, and activity audit logs.",
              ],
            ],
          },
          {
            type: "subheading",
            text: "Infrastructure Services",
          },
          {
            type: "table",
            head: ["Service", "Role"],
            rows: [
              ["PostgreSQL 16", "Primary database — 28 tables managed via TypeORM with 52 migrations."],
              ["Redis", "Caching, session store, BullMQ job queues for newsletter scheduling."],
              ["Meilisearch", "Self-hosted full-text search engine — federated search across articles, authors, and videos."],
              ["DigitalOcean Spaces (S3)", "File storage for images, videos, and uploads (with local filesystem fallback for development)."],
              ["Resend", "Email delivery service — password resets, invitations, newsletter campaigns."],
              ["SSLCommerz", "Bangladesh payment gateway — subscription payment processing with IPN callbacks."],
              ["Google Analytics 4", "User behavior tracking — integrated via GA4 Data API for admin analytics dashboard."],
              ["FFmpeg", "Video transcoding — generates multiple quality versions of uploaded videos."],
            ],
          },
          {
            type: "callout",
            title: "AI-Assisted Development",
            text: "Local AI models were used for code generation, review, and debugging support throughout the development lifecycle.",
          },
        ],
      },
      {
        title: "2. Backend API — Core Features",
        blocks: [
          {
            type: "paragraph",
            text: "A modular NestJS 11 REST API with versioned endpoints (/v1/...) and comprehensive Swagger documentation.",
          },
          {
            type: "list",
            items: [
              "Authentication — Email/password registration, Google OAuth2 login, JWT tokens, cookie-based sessions, OTP/2FA, password reset flow, editor login with verification codes.",
              "Role-Based Access — Four roles: EDITOR, SUBEDITOR, CONTRIBUTOR, READER. Custom guards and decorators enforce permissions at the endpoint level.",
              "Article Management — Full CRUD with rich categories, slug generation, scheduling, featured article positioning, review workflow, approval system with comments, article-author/contributor linking.",
              "Search — Meilisearch-powered federated search across articles, authors, and videos. Autocomplete support with ranked, typo-tolerant results.",
              "Subscriptions — SSLCommerz payment integration with monthly/yearly packages. IPN handling, transaction history, active subscription verification, coupon discounts.",
              "Newsletters — Compose with rich blocks (articles, custom HTML, images, ads). Scheduled via BullMQ/Redis cron jobs. Track sent logs, manage free/premium subscriber lists, unsubscribe handling.",
              "Video Management — Upload, FFmpeg transcoding to multiple quality levels, categorization, featured video placement.",
              "Image Handling — Upload with sharp-based processing/resizing, with cloud storage for production.",
              "Analytics — Comprehensive analytics via GA4 Data API — page views, unique visitors, engagement time, bounce rate, time-series trends, top articles, traffic sources, real-time stats, subscription and revenue metrics.",
              "Advertisements — Multi-type ad placements (Custom HTML, Google AdSense, Google Ad Manager). Position-based targeting on specific pages and zones.",
              "Activity Logging — Full audit trail via interceptor pattern — captures user context, action type, IP, timestamp for every state-changing operation.",
              "Invitation System — Email-based invitation workflow for new editors and contributors with secure accept/reject flow and token expiry.",
            ],
          },
          {
            type: "table",
            head: ["Module", "Path", "Key Capabilities"],
            rows: [
              ["Auth", "/v1/auth", "register, login, google/callback, forgot-password, reset-password, editor-login, 2fa"],
              ["Users", "/v1/users", "list, get, update profile, admin update, existence check"],
              ["Articles", "/v1/articles", "CRUD, featured, latest-three-per-category, slug lookup, schedule, feature toggle, contribute, review comments"],
              ["Authors", "/v1/authors", "CRUD, published articles listing"],
              ["Contributors", "/v1/contributors", "CRUD, email invitation"],
              ["Images", "/v1/images", "upload, delete, serve"],
              ["Videos", "/v1/videos", "upload, transcode, list, featured, categories"],
              ["Subscription", "/v1/subscription", "initiate payment, IPN callback, packages, active status, transaction history"],
              ["Coupon", "/v1/coupons", "CRUD, preview discount, validate"],
              ["Newsletters", "/v1/newsletters", "CRUD, send, schedule, subscribe, unsubscribe, list subscriptions, sent logs"],
              ["Search", "/v1/search", "federated search, autocomplete"],
              ["Analytics", "/v1/analytics", "overview, time-series, top articles, traffic sources, realtime, subscriptions, revenue"],
              ["Advertisements", "/v1/advertisements", "CRUD, position/page targeting"],
              ["Activity Log", "/v1/activity-log", "list logs with filters by user, action, date range"],
              ["Invitation", "/v1/invitations", "create, accept with token validation"],
              ["Healthcheck", "/v1/healthcheck", "{ status: 'ok' }"],
            ],
          },
        ],
      },
      {
        title: "3. Frontend — Public Website Features",
        blocks: [
          {
            type: "paragraph",
            text: "A Next.js 16 application delivering a modern, responsive news reading experience.",
          },
          {
            type: "list",
            items: [
              "Dynamic Landing Page — Curated layout featuring hero articles, latest news, popular stories, deeply-read content, oldest posts, and category-specific sections — all fetched server-side for SEO.",
              "Article Reading — Rich text rendering with banner images, author attribution, category tags, publishing date, estimated read time, and related article suggestions.",
              "Category Browsing — 20+ categories including Politics, Economy, Ideas, Culture, Books, TDTV, Documentaries, and more — with dedicated filtered views.",
              "Archive — Chronological archive with pagination, category filtering, and search for browsing historical content.",
              "The Deltagram TV — Dedicated video section with categorized playback — Documentaries, The Listening Post, Mediagram, and more. Built with a custom video player.",
              "Search — Meilisearch-powered full-text search with real-time autocomplete, federated results across articles, authors, and videos, and ranked relevance scoring.",
              "User Accounts — Registration via email/password or Google OAuth. Profile management, settings page, password change. Anonymous user tracking via device fingerprinting.",
              "Paid Subscriptions — Monthly and yearly plans processed via SSLCommerz. Subscription management dashboard, payment flow, access to premium content.",
              "Newsletter Subscriptions — Free and premium newsletter tiers. Self-service subscribe/unsubscribe with email preference management.",
              "SEO Optimization — Dynamic metadata, Open Graph tags, auto-generated sitemap.xml, robots.txt, Google Analytics 4, Google Tag Manager, structured data.",
              "Responsive Design — Mobile-first with Tailwind CSS 4. Accessible Radix UI components, smooth animations, carousels, toast notifications.",
              "Static Pages — About Us, Contact Us, Editorial Policy, Advertising Policy, Privacy Policy, Write for Us, Donation page.",
            ],
          },
          {
            type: "table",
            head: ["Layer", "Technology", "Details"],
            rows: [
              ["Framework", "Next.js 16 App Router", "Server components, client components, dynamic routes, API routes"],
              ["Styling", "Tailwind CSS 4 + animation utilities", "Utility-first CSS with design system consistency"],
              ["UI Library", "shadcn/ui + Radix UI", "Accessible, unstyled primitives with custom theming"],
              ["State Management", "Zustand", "7 stores: auth, article, nav, subscription, newsletter, video, advertisement"],
              ["Forms", "React Hook Form + Zod", "Type-safe form validation with schema-based rules"],
              ["HTTP Client", "Custom fetcher", "Fingerprint-based anonymous tracking, auth token injection, error handling"],
              ["Animations", "animejs, Embla Carousel", "Smooth transitions, animated landing sections, article carousels"],
            ],
          },
        ],
      },
      {
        title: "4. Admin Dashboard — Management Features",
        blocks: [
          {
            type: "paragraph",
            text: "A full-featured content management panel for editorial teams with analytics, publishing workflows, and system administration.",
          },
          {
            type: "list",
            items: [
              "Analytics Dashboard — Real-time metrics: page views, unique visitors, avg engagement time, bounce rate. Interactive charts: time-series trends, top articles, traffic sources, subscription & revenue KPIs.",
              "Article Editor — TipTap rich text editor (ProseMirror-based) with headings, bold/italic, lists, links, images, highlights, horizontal rules, bubble menus. Multi-step creation wizard with image upload, category assignment, SEO metadata.",
              "Article Workflow — Status tracking: Draft → To Review → In Review → Published / Scheduled / Changes Required. Review comments with highlighting, approval system, change requests.",
              "User Management — List all users with pagination, edit profiles, block/unblock accounts, assign roles (Editor/Subeditor), view activity history.",
              "Author Profiles — Manage author biographies, profile photos, social links, view all articles by each author.",
              "Contributor Management — Invite guest contributors via email, track contributed articles, manage profiles and invitation status.",
              "Subscription Manager — View all paid subscriptions, manage subscription packages, transaction history, subscriber list export.",
              "Coupon Engine — Create discount coupons with percentage/flat amounts, usage limits, expiry dates, applicable packages. Track redemption.",
              "Newsletter Builder — Compose newsletters using drag-and-drop blocks. Schedule delivery, manage subscriber segments, view sent logs.",
              "Video Library — Upload videos, track transcoding progress, manage categories, set featured videos, edit metadata.",
              "Ad Placement — Create and manage advertisements with three ad types (Custom HTML, Google AdSense, Google Ad Manager).",
              "Activity Logs — Full audit trail with filters by user, action type, date range.",
              "PDF Report Export — Generate downloadable PDF reports from analytics data — includes charts, tables, and AI-generated executive summaries.",
              "Onboarding Tour — Guided first-time user experience that highlights key dashboard features for new editors.",
              "Real-Time Ticker — Live notifications ticker showing recent admin activities across the platform.",
            ],
          },
          {
            type: "table",
            head: ["Layer", "Technology"],
            rows: [
              ["Framework", "Next.js 16 App Router"],
              ["Editor", "TipTap (ProseMirror) with bold, italic, heading, lists, link, image, highlight, history"],
              ["Charts", "Recharts — line, bar, pie, area, donut charts"],
              ["UI", "shadcn/ui + Radix UI — sidebar, sheet, dialog, dropdown, calendar, progress, tabs, tooltips"],
              ["State", "Zustand — 12 stores: auth, article, author, contributor, subscription, coupon, newsletter, video, advertisement, analytics, review, user"],
              ["PDF Generation", "jsPDF + html2canvas"],
              ["AI Integration", "Groq SDK — article summarization and analytics report generation"],
              ["Auth", "JWT decode, AuthProvider context, protected routes"],
              ["Date Handling", "date-fns"],
            ],
          },
        ],
      },
      {
        title: "5. Artificial Intelligence Integration",
        blocks: [
          {
            type: "paragraph",
            text: "AI is integrated into two key editorial workflows via the Groq Cloud API, enhancing productivity without replacing human editorial judgment.",
          },
          {
            type: "callout",
            title: "AI Provider: Groq Cloud · Model: openai/gpt-oss-20b",
            text: "Temperature 0.3, max 1000 tokens — optimized for factual summarization.",
          },
          {
            type: "subheading",
            text: "5.1 AI-Powered Article Summarization",
          },
          {
            type: "list",
            items: [
              "Workflow — After writing the article body in the creation wizard, an editor clicks 'Generate Summary'.",
              "Process — The full article body is sent to the Groq API with a system prompt instructing it to act as an expert content summarizer.",
              "Result — A concise summary is auto-populated into the summary field, which the editor can review, edit, or regenerate.",
              "Rate Limits — The UI displays API rate limit information via a popover, showing remaining requests and reset times.",
            ],
          },
          {
            type: "subheading",
            text: "5.2 AI-Generated Analytics Executive Summaries",
          },
          {
            type: "list",
            items: [
              "Workflow — When an admin exports an analytics report, the system automatically generates an AI executive summary.",
              "Process — Analytics data (page views, subscriptions, traffic sources, revenue) is formatted into a prompt and sent to the Groq API.",
              "Result — A narrative summary paragraph is included at the top of the generated PDF report.",
            ],
          },
          {
            type: "subheading",
            text: "5.3 AI Editorial Policy",
          },
          {
            type: "list",
            items: [
              "AI-generated or AI-assisted content must be reviewed by a human editor before publication.",
              "AI may not fabricate quotes, data, or sources.",
              "Internal AI use is allowed for transcription, research assistance, and language support.",
              "AI does not replace editorial judgment or human accountability.",
              "Guest contributors are explicitly prohibited from submitting AI-generated content.",
              "Glossary definitions distinguish between 'AI-generated content' and 'AI-assisted content'.",
            ],
          },
        ],
      },
      {
        title: "6. Database Schema Overview",
        blocks: [
          {
            type: "paragraph",
            text: "28 TypeORM entities managed via PostgreSQL 16 with 52 migration files ensuring schema versioning and rollback capability.",
          },
          {
            type: "table",
            head: ["Group", "Entities", "Key Fields"],
            rows: [
              ["Content", "Article, Author, Contributor, Image, Video", "title, slug, body, status, category, publishedAt, isPremium, bio, avatar, socialLinks, url, thumbnail, duration"],
              ["User & Auth", "User, AuthCode, PasswordReset, Invitation", "email, password, name, role, isActive, fingerprintId, googleId, token, expiresAt"],
              ["Subscription & Commerce", "Subscription, Package, Coupon", "userId, packageId, status, startDate, endDate, transactionId, price, discountType, maxUses"],
              ["Newsletter", "Newsletter, NewsletterBlock, NewsletterSubscription", "subject, body, type, scheduledAt, sentAt, content, position, isActive"],
              ["Logging & Workflow", "ActivityLog, ArticleReview, Approval, Feature", "userId, action, entityType, comment, status, position, startDate, endDate"],
              ["Advertisement", "Advertisement, AdvertisementPosition", "name, type, content, code, isActive, page, position, priority"],
            ],
          },
        ],
      },
      {
        title: "7. Content Workflow & Editorial Process",
        blocks: [
          {
            type: "paragraph",
            text: "A structured editorial pipeline ensuring quality control and accountability for every published piece.",
          },
          {
            type: "callout",
            title: "Article Lifecycle",
            text: "DRAFT → TO_REVIEW → IN_REVIEW → PUBLISHED | SCHEDULED | CHANGES_REQUIRED",
          },
          {
            type: "list",
            items: [
              "Draft — Editor or contributor creates an article using the TipTap rich text editor. Drafts are private and only visible to the author.",
              "Submit for Review — The author changes status to TO_REVIEW. The article appears in the review queue.",
              "In Review — A reviewer claims the article and changes status to IN_REVIEW. Review comments can be added with specific highlights.",
              "Changes Required — If the article needs revisions, the reviewer sets CHANGES_REQUIRED with comments. The author makes changes and re-submits.",
              "Publish — Once approved, the article is published immediately with a public URL and appears on the landing page.",
              "Schedule — Alternatively, the article can be scheduled for future publication at a specific date and time.",
            ],
          },
          {
            type: "subheading",
            text: "Review System & Featured Content",
          },
          {
            type: "list",
            items: [
              "Reviewers can add comments with highlighted text selections from the article.",
              "Approval records track who approved each article and when",
              "Article history is fully auditable via the Activity Log module.",
              "Editors can mark articles as 'featured' to appear in hero sections — with position, start date, and end date.",
              "Videos can also be featured with the same position-based system.",
            ],
          },
          {
            type: "subheading",
            text: "Newsletter Delivery Pipeline",
          },
          {
            type: "list",
            items: [
              "Compose — Editor builds a newsletter using blocks: featured articles, custom content, images, ad placements.",
              "Target — Choose between free and premium subscriber segments.",
              "Schedule — Set a delivery time; a background job queue handles the scheduling.",
              "Deliver — Newsletter is sent to all subscribers in the target segment.",
              "Log — Delivery is recorded with per-subscriber tracking.",
            ],
          },
        ],
      },
      {
        title: "8. Deployment & Infrastructure",
        blocks: [
          {
            type: "paragraph",
            text: "Containerized deployment with Docker multi-stage builds, designed for scalable production hosting.",
          },
          {
            type: "table",
            head: ["Application", "Build Stages", "Base Image"],
            rows: [
              ["Backend", "dev → build → production", "Node.js 22 (includes FFmpeg)"],
              ["Frontend", "dev → build → production (with nginx)", "Node.js 22 → nginx alpine"],
              ["Admin Dashboard", "dev → build → production", "Node.js 22"],
            ],
          },
          {
            type: "table",
            head: ["Area", "Details"],
            rows: [
              ["Testing", "Backend: Jest (unit + integration) · Frontend: Vitest + Testing Library · Admin: Lint checks"],
              ["Database Migrations", "52 TypeORM migration files ensuring versioned, rollback-capable schema changes. Auto-synchronize disabled in production."],
              ["Security", "Production-safe schema versioning with a custom migration generator script for consistent naming."],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "celestial",
    title: "Celestial",
    tagline: "Crafted by Hand, Verified by Code",
    hero:
      "Direct-to-consumer e-commerce platform for artisan handmade soaps and skincare — built on Next.js with a focus on product authenticity and a cinematic brand experience.",
    meta: [
      { label: "Framework", value: "Next.js 16.2.6 (App Router)" },
      { label: "Database", value: "PostgreSQL via Prisma 7" },
      { label: "Auth", value: "NextAuth v5 — Credentials + Google OAuth" },
      { label: "Media", value: "Vercel Blob + sharp" },
    ],
    sections: [
      {
        title: "Tech Stack & Architecture",
        blocks: [
          {
            type: "table",
            head: ["Layer", "Technology"],
            rows: [
              ["Framework", "Next.js 16.2.6 (App Router)"],
              ["Frontend", "React 19, Tailwind CSS v4, shadcn/radix-ui"],
              ["Auth", "NextAuth v5 (Credentials + Google OAuth, JWT sessions)"],
              ["Database", "PostgreSQL via Prisma 7 (@prisma/adapter-pg)"],
              ["State", "zustand (persisted cart), react-hook-form + zod"],
              ["Media", "Vercel Blob, sharp (WebP re-encoding)"],
              ["3D", "three.js (GLTF + DRACO/KTX2, GLSL shaders)"],
              ["Scanners", "react-barcode-scanner"],
              ["Payments/UX", "sonner toasts, lucide icons"],
            ],
          },
          {
            type: "callout",
            title: "Architecture Note",
            text: "No server actions. All mutations go through App Router API route handlers; server components query Prisma directly.",
          },
        ],
      },
      {
        title: "1. Storefront Experience",
        blocks: [
          {
            type: "subheading",
            text: "Cinematic 3D Homepage",
          },
          {
            type: "list",
            items: [
              "Full-screen scroll-driven 3D experience (ThreeScene + SceneManager) rendering a GLTF product model over a 2400vh scroll timeline.",
              "Procedural GLSL shader background (silk-field noise, film grain), mouse-reactive effects.",
              "~15 narrative scroll-text overlays (Process → Skin Care → Hair Care → Verify → Packaging → Made in Bangladesh).",
              "Camera choreography, animation scrubbing, and focal-length shifts driven by scroll progress via a shared useScrollProgress engine.",
            ],
          },
          {
            type: "subheading",
            text: "Shop / Catalog",
          },
          {
            type: "list",
            items: [
              "Category-filterable product grid with server-side pagination (9 per page), per-category counts.",
              "Product cards with dual-image hover crossfade and one-click add-to-cart.",
            ],
          },
          {
            type: "subheading",
            text: "Product Detail Pages",
          },
          {
            type: "list",
            items: [
              "Three-section marketing layout: image carousel + buy box, the \"Intention\" story section (label/title/video), and Specifications section (image + spec table).",
              "Auto-advancing swipeable image carousel.",
              "\"Staff Picks\" (featured products) rail.",
              "Floating cart bar revealed on scroll.",
            ],
          },
          {
            type: "subheading",
            text: "Craftsmanship Content",
          },
          {
            type: "list",
            items: [
              "Making Process page: tabbed step-by-step timelines (Artisan Soap / Sugar Scrub / Classic Pomade) with custom wheel-scroll handling.",
            ],
          },
        ],
      },
      {
        title: "2. Product Authenticity System",
        blocks: [
          {
            type: "paragraph",
            text: "Core differentiator — each physical item carries a batch-linked barcode identity.",
          },
          {
            type: "subheading",
            text: "Barcode System (lib/barcode.ts)",
          },
          {
            type: "list",
            items: [
              "8-char codes: XX (batch) + PP (product-type prefix) + NNNN (sequential), e.g. 01SR0001.",
              "Prefixes map to product types: SR (soap-on-a-rope), AS (artisan soap), DS (desert soap), HP/BB/SS (pomade/body butter/sugar scrub).",
              "Barcode ranges are generated globally-unique per product type at creation/restock.",
            ],
          },
          {
            type: "subheading",
            text: "Authenticity Hub (/authenticity)",
          },
          {
            type: "list",
            items: [
              "Marketing page describing the 3-part security protocol.",
              "\"Authentication Terminal\" with a live barcode scanner (react-barcode-scanner).",
            ],
          },
          {
            type: "subheading",
            text: "Verification (/verify/[code])",
          },
          {
            type: "list",
            items: [
              "Server-side lookup: product by barcode range + SoldBarcode ledger by exact code.",
              "Reports Verified Authentic vs. potential counterfeit.",
              "Shows batch number, manufacture date, product type, and sold/available status (with sale date).",
              "Guests can verify any product by scanning its label.",
            ],
          },
          {
            type: "subheading",
            text: "Lifecycle",
          },
          {
            type: "list",
            items: [
              "Product/restock generates a barcode range → checkout transaction decrements stock and allocates concrete barcodes → each sale recorded as a SoldBarcode → scan-and-verify works forever after.",
            ],
          },
        ],
      },
      {
        title: "3. Authentication & Accounts",
        blocks: [
          {
            type: "list",
            items: [
              "Sign up / Login: email + password (bcrypt), Google OAuth.",
              "Google first-login auto-provisions a customer account.",
              "Customer account (/account): profile editor (+880-prefixed phone validation, shipping address) + order history.",
              "Orders: /orders/[id] detail pages (public by order ID).",
              "Roles: ADMIN / CUSTOMER, enforced server-side in layouts and API handlers.",
            ],
          },
        ],
      },
      {
        title: "4. Checkout & Orders",
        blocks: [
          {
            type: "list",
            items: [
              "Guest-friendly checkout (cart via zustand celestial-cart persist).",
              "Session pre-fill of name/email/phone/address.",
              "zod-validated form (phone regex, server error flattening).",
              "POST /api/orders: stock validation → Prisma transaction (stock decrement + barcode allocation + order + items + SoldBarcode ledger).",
              "Order confirmation page (server-rendered) + order history.",
              "Admin order management: filterable order list, order detail with progressive status buttons (PENDING → CONFIRMED → SHIPPED → DELIVERED).",
            ],
          },
        ],
      },
      {
        title: "5. Admin Back Office (/admin, role-gated)",
        blocks: [
          {
            type: "list",
            items: [
              "Dashboard: product/order/user counts + recent orders.",
              "Products: category-filtered list (stock, returned stock, barcode range, manufacture date).",
              "Create/Edit products — rich form incl. slug, price, category/subcategory, batch number, featured toggle.",
              "Image manager with previews, uploads, and Blob deletion.",
              "Section 2 (story label/title/description/video) and Section 3 (image + spec rows) content.",
              "Delete with full Blob media cleanup.",
              "Restock: batch number + quantity → stock increment, new barcode range, audit Restock record.",
              "Users: read-only list.",
              "Audit trail: structured JSON audit events on every product/media mutation.",
              "Rate limiting: on media upload (15/60s) and delete (10/60s).",
            ],
          },
        ],
      },
      {
        title: "6. API Surface",
        blocks: [
          {
            type: "table",
            head: ["Route", "Methods", "Purpose"],
            rows: [
              ["/api/auth/[...nextauth]", "GET/POST", "NextAuth handlers"],
              ["/api/auth/signup", "POST", "Register customer"],
              ["/api/account", "GET/PATCH", "Profile read/update"],
              ["/api/orders", "GET/POST", "Order list / placement"],
              ["/api/orders/[id]", "GET/PUT", "Order detail / status update"],
              ["/api/users", "GET/POST", "User listing / creation"],
              ["/api/products", "GET/POST", "List / create (ADMIN)"],
              ["/api/products/[id]", "GET/PUT/DELETE", "Product CRUD (ADMIN)"],
              ["/api/products/[id]/restock", "POST", "Restock (ADMIN)"],
              ["/api/products/upload", "POST", "Media upload to Blob (ADMIN, sharp WebP)"],
              ["/api/products/delete-media", "POST", "Delete Blob media (ADMIN)"],
            ],
          },
        ],
      },
      {
        title: "7. Data Model Highlights (prisma/schema.prisma)",
        blocks: [
          {
            type: "list",
            items: [
              "User: role, phone, address, orders.",
              "Product: slug, price (Decimal), category/subcategory, images[], stock, returnedStock, barcodeStart/End, batchNumber, manufactureDate, featured, Section 2/3 content, restocks.",
              "Order / OrderItem: price snapshots, cascade delete.",
              "SoldBarcode: unique code ledger powering verification availability.",
              "Restock: batch-level restock audit trail.",
              "Enums: Role, Category (SOAP_ON_A_ROPE, ARTISAN_SOAP, DESERT_SOAP, OTHER, ACCESSORY), OrderStatus (PENDING → RETURNED).",
            ],
          },
        ],
      },
      {
        title: "8. SEO & Platform Assets",
        blocks: [
          {
            type: "list",
            items: [
              "Server-rendered sitemap (all product slugs + static pages), robots.txt.",
              "Rich Open Graph / Twitter metadata, PWA manifest, generated icons.",
              "Per-route loading skeletons and error boundaries.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "next-three-model",
    title: "3D Model Viewer",
    tagline: "Upload · Inspect · Test",
    hero:
      "An in-browser 3D model viewer for uploading, inspecting, and testing .glb, .gltf, .fbx, and .stl models — when nothing is loaded, it shows a configurable parametric placeholder shape.",
    meta: [
      { label: "Framework", value: "Next.js 16 (App Router, Turbopack)" },
      { label: "3D", value: "React Three Fiber v9 · drei v10 · three 0.185" },
      { label: "Settings GUI", value: "leva" },
      { label: "Loaders", value: "GLTF · FBX · STL (+ KTX2/Draco)" },
    ],
    sections: [
      {
        title: "1. Model Upload & Loading",
        blocks: [
          {
            type: "table",
            head: ["Aspect", "Details"],
            rows: [
              [
                "Formats",
                ".glb, .gltf, .fbx, .stl (validated by extension in getModelType, ModelUpload.tsx:247)",
              ],
              [
                "Input methods",
                "\"Add model\" button (file picker) or drag & drop anywhere on the canvas (global dragover/drop listeners, ModelUpload.tsx:436)",
              ],
              [
                "Loaders",
                "GLTFLoader, FBXLoader (via useFBX), STLLoader from three-stdlib",
              ],
              [
                "Compression support",
                "KTX2 textures + Draco geometries via useGltfWithKTX2 hook; transcoders/decoders served from /public/loader/basis and /public/loader/draco (worker limit 4)",
              ],
              [
                "Remove/replace",
                "\"Remove\" clears the model and returns to the placeholder shape; button toggles to \"Replace model\" when a model is loaded",
              ],
              [
                "File handling",
                "Files converted to object URLs (URL.createObjectURL); unsupported types rejected with an alert",
              ],
            ],
          },
        ],
      },
      {
        title: "2. Placeholder Shape Viewer",
        blocks: [
          {
            type: "paragraph",
            text: "Shown when no model is loaded; fully live-controllable from the leva panel:",
          },
          {
            type: "list",
            items: [
              "12 primitives: sphere, box, cylinder, cone, torus, torusKnot, dodecahedron, icosahedron, octahedron, tetrahedron, capsule, plane.",
              "Material: roughness + metalness sliders.",
              "Geometry: uniform scale plus independent width/height/length.",
              "Color: 7 presets switched via startTransition so the scene isn't dropped mid-environment-swap (page.tsx:371).",
            ],
          },
        ],
      },
      {
        title: "3. Studio Scene & Lighting",
        blocks: [
          {
            type: "list",
            items: [
              "Environment: drei Environment with 10 HDRI presets (sunset, dawn, night, warehouse, forest, apartment, studio, city, park, lobby) used as background, with blur control.",
              "Soft shadows: AccumulativeShadows (temporal, up to 400 frames) + RandomizedLight; opacity, blend color, and frame count configurable.",
            ],
          },
        ],
      },
      {
        title: "4. Camera & Navigation",
        blocks: [
          {
            type: "list",
            items: [
              "OrbitControls with toggles for auto-rotate (+speed), zoom, and pan.",
              "Camera panel: FOV (20–100) and camera distance live controls.",
              "Embedded camera switching: cameras baked into a model file are extracted, listed as selectable cameras, and the view snaps to their position/rotation/FOV — live-bound to the model node (via ModelCameraBinding) or reconstructed from eulers when unsupported.",
            ],
          },
        ],
      },
      {
        title: "5. Animation Playback",
        blocks: [
          {
            type: "list",
            items: [
              "Animations from GLB/GLTF/FBX are detected and exposed in an Animation leva group.",
              "Play/pause toggle and animation-track selector; only the active action runs, others are stopped (ModelUpload.tsx:255).",
            ],
          },
        ],
      },
      {
        title: "6. Settings Panel (leva)",
        blocks: [
          {
            type: "paragraph",
            text: "Floating live GUI grouped by Camera · Environment · OrbitControls · Shadows · Shape · Material · Animation, all reactive without a rebuild.",
          },
        ],
      },
      {
        title: "7. Model Diagnostics",
        blocks: [
          {
            type: "paragraph",
            text: "Run automatically after a model loads:",
          },
          {
            type: "list",
            items: [
              "Info panel — file name/size, format, mesh/vertex/triangle counts, materials, textures, animations, and bounding-box dimensions (width/height/depth).",
              "Hierarchy tree — collapsible scene graph showing node name, type, materials, animations, and active render layers.",
              "Compliance panel — checklist with pass/fail verdict: format (glTF recommended), file size (≤20 MB), triangle budget (≤250k), texture presence.",
            ],
          },
        ],
      },
      {
        title: "Architecture Notes",
        blocks: [
          {
            type: "list",
            items: [
              "page.tsx — single client page hosting the R3F <Canvas> and all overlay/control wiring.",
              "ModelUpload.tsx — upload UI, format-specific loaders, stats/hierarchy/camera extraction, and the three diagnostic panels.",
              "useGltfWithKTX2.ts — singleton KTX2/Draco loaders wired into GLTFLoader.",
              "RSC renders the static shell (layout.tsx); the 3D scene is fully client-side.",
            ],
          },
        ],
      },
      {
        title: "Scripts",
        blocks: [
          {
            type: "table",
            head: ["Command", "Purpose"],
            rows: [
              ["npm run dev", "Dev server (Turbopack)"],
              ["npm run build / start", "Production build / serve"],
              ["npm run lint", "ESLint (flat config)"],
            ],
          },
        ],
      },
    ],
  },
];