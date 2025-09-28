Here’s the **stack reference sheet** for your MVP setup — structured, concise, and end-to-end.

---

# 📘 **MVP Tech Stack Reference Sheet**

| **Layer**         | **Tool**                 | **What It Does**          | **Prototype Use**           | **Production Use**                       | **Risks/Notes**             |
| ----------------- | ------------------------ | ------------------------- | --------------------------- | ---------------------------------------- | --------------------------- |
| **Language**      | **TypeScript**           | Typed superset of JS      | Light typing                | Strict types + CI checks                 | Avoid `any` sprawl          |
| **Framework**     | **Next.js (App Router)** | SSR/SSG/ISR + API routes  | Client-heavy, quick routing | Server Components, caching, streaming    | Learning curve              |
| **UI Primitives** | **Radix UI**             | Accessible components     | Direct usage                | Wrapped in design system                 | Styling overhead            |
| **UI Kit**        | **shadcn/ui**            | Styled Radix + Tailwind   | Use out-of-box              | Extend with variants & theming           | Must “own” codebase         |
| **Styling Logic** | **Tailwind Variants**    | Class handling utility    | Simple variant props        | Systematic design tokens                 | Maintain consistency        |
| **Animations**    | **Framer Motion**        | Declarative animations    | Small micro-interactions    | Page transitions, UX polish              | Perf hit if overused        |
| **UI State**      | **Zustand**              | Lightweight store         | Modals, theme, toggles      | Complex UI state separation              | Don’t overstore             |
| **Server State**  | **TanStack Query**       | Fetching, caching, sync   | Basic queries/mutations     | Cache policies, invalidation             | Query key discipline        |
| **Validation**    | **Zod**                  | Runtime + type validation | Form validation             | API & DB schema contracts                | Perf overhead if overused   |
| **RPC**           | **tRPC**                 | Type-safe API layer       | Single endpoint comms       | Add REST/GraphQL for external devs       | Closed ecosystem            |
| **ORM**           | **Drizzle**              | Type-safe SQL ORM         | Define schema & migrations  | Versioned migrations + optimizations     | Smaller ecosystem vs Prisma |
| **Database**      | **NeonDB**               | Serverless Postgres       | Free tier + branching       | Pooling, prod scaling                    | Cold starts, vendor lock-in |
| **Hosting**       | **Vercel**               | Deploy Next.js            | Zero-config MVP deploy      | Edge functions, scaling, preview envs    | Costly at scale             |
| **CI/CD**         | **GitHub Actions**       | Workflow automation       | Lint + test                 | Full pipeline: lint, test, build, deploy | Watch billable minutes      |
| **Auth**          | Clerk/Auth.js            | Authentication            | Clerk free tier             | SSO, JWT rotation                        | Pricing & compliance        |
| **Payments**      | Stripe/Razorpay          | Payment processing        | Sandbox API                 | Live mode, PCI DSS compliance            | High fees if scaling        |
| **Storage**       | UploadThing/Cloudinary   | File storage & uploads    | Direct uploads              | CDN, caching layers                      | Egress cost                 |
| **Email/SMS**     | Resend/Postmark/Twilio   | Comms layer               | Free trial tier             | Transactional + marketing                | Spam compliance             |
| **AI APIs**       | OpenAI/Hugging Face      | AI inference              | Rapid prototyping           | Fine-tuned, caching                      | Rate limits, cost           |
| **Analytics**     | PostHog/LogRocket        | Product metrics           | Basic usage analytics       | Full funnels, error tracking             | GDPR/consent required       |

---

# ⚡ **System Prompt Style Recap**

- **Prototype Path** → prioritize speed, SaaS free tiers, minimal config.
- **Production Path** → enforce type safety, CI/CD gates, compliance/security, scaling decisions.
- **Risks/Notes** → watch out for vendor lock-in, performance bottlenecks, compliance issues.
