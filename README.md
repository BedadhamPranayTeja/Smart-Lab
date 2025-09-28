
# Smart Lab

Smart Lab is a modern web application for managing lab attendance and desk status, built with Next.js and Neon Postgres. It provides real-time tracking, activity logs, and a dashboard for lab operations.

## Features

- **Attendance Management**: Check-in, check-out, and view attendance logs.
- **Desk Status**: Monitor and update desk availability in real time.
- **Dashboard**: Visualize lab stats and recent activity.
- **Scan Simulator**: Simulate attendance scans for testing/demo.
- **Serverless Database**: Neon Postgres integration with auto-migrations and demo data seeding.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Neon Postgres](https://neon.tech/) (serverless)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/Smart-Lab.git
cd Smart-Lab
npm install
```

### 2. Configure Environment

Create a `.env.local` file and add your Neon database connection string:

```
NEON_DATABASE_URL=postgres://user:password@host/db?sslmode=require
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Edit main page: `src/app/page.tsx`
- Global styles: `src/app/globals.css`
- API routes: `src/app/api/attendance/*`, `src/app/api/desk/status/route.ts`
- Database logic: `src/lib/db.ts`

## API Endpoints

- `POST /api/attendance/check-in` — Check in a user
- `POST /api/attendance/check-out` — Check out a user
- `GET /api/attendance/logs` — Get attendance logs
- `GET /api/desk/status` — Get desk status

## Project Structure

- `src/app/` — App pages, layout, API routes
- `src/components/` — UI components (dashboard, activity, scan simulator, etc.)
- `src/lib/` — Data, database, and utility functions
- `public/` — Static assets

## Deployment

Deploy easily on [Vercel](https://vercel.com/) for serverless hosting. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

MIT

