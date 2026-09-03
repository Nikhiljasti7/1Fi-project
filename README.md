# 1Fi — EMI Shopping Experience

A full-stack web app for buying smartphones on EMI plans backed by mutual funds — built for the **1Fi SDE1 take-home assignment**.

## Overview

Users browse a small catalog of phones, pick a variant (storage/color), see MRP vs. selling price, choose from a ladder of EMI plans (0% and interest-bearing, each with cashback), and proceed with the plan they pick. All product, pricing, variant, and EMI data lives in PostgreSQL and is served by an Express API — nothing is hardcoded in the React components.

## Features

- Dynamic product catalog: 3 products × 2–3 variants each (color/storage), each with its own MRP, selling price, image, and stock status
- Variant selector that updates price, image, and EMI plans instantly
- EMI plan ladder per variant (0% short-tenure plans, interest-bearing long-tenure plans, cashback on every plan)
- **Server-calculated** EMI figures (monthly payment, total payable, total interest, effective cost after cashback) using the standard reducing-balance formula — never hardcoded in the frontend
- "Best value" recommended-plan badge
- Selected-plan financial summary, sticky on desktop
- Proceed button, disabled until a plan is chosen
- Loading skeletons, empty states, and graceful error handling (network failure, 404 product, image load failure)
- Fully responsive (mobile/tablet/desktop), no layout overflow
- Unique per-product URLs (`/products/:slug`)

## Tech Stack

- **Frontend:** React 18, React Router, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (via `pg`, no ORM — plain SQL for transparency)

## Architecture

```
Browser (React SPA)
   │  fetch()
   ▼
Express REST API  ──►  EMI calculator (pure functions, unit tested)
   │  pg (node-postgres)
   ▼
PostgreSQL  (products → variants → emi_plans)
```

The frontend never computes EMI numbers itself — it only renders whatever the API returns. That keeps the numbers correct even if prices or interest rates change in the database.

## Project Structure

```
1fi-assignment/
├── backend/
│   ├── server.js                  # Express app entry point (only listens locally)
│   ├── api/index.js               # Vercel serverless entry — re-exports the Express app
│   ├── vercel.json                # routes all paths to api/index.js
│   ├── routes/products.js
│   ├── controllers/productsController.js
│   ├── utils/emiCalculator.js     # reducing-balance EMI math (unit tested)
│   ├── db/pool.js                 # pg Pool
│   ├── db/setup.js                # applies database/schema.sql + seed.sql
│   ├── tests/emiCalculator.test.js
│   └── .env.example
├── frontend/
│   └── src/
│       ├── api/client.js
│       ├── components/            # Navbar, Footer, ProductGallery, VariantSelector,
│       │                          # EmiPlanList/Card, PriceSummary, ProceedButton,
│       │                          # LoadingSkeleton, ErrorState, ProductCard
│       └── pages/                 # HomePage, ProductPage, NotFoundPage
├── database/
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## Database Schema

```
products
  id, slug (unique), name, brand, description, category, created_at

variants
  id, product_id → products.id, label, storage, color, color_hex,
  mrp, selling_price, image_url, is_default, stock_status, created_at

emi_plans
  id, variant_id → variants.id, tenure_months, annual_interest_rate,
  cashback_amount, is_recommended, fund_backing_note, created_at
```

One product has many variants; one variant has many EMI plans. `monthly_payment` is **not** stored — it's derived at request time from `selling_price`, `tenure_months`, and `annual_interest_rate`, so it's always consistent with the current price.

Full DDL: [`database/schema.sql`](./database/schema.sql). Seed data (3 products, 9 variants total, ~5 EMI plans per variant): [`database/seed.sql`](./database/seed.sql).

## Data Flow

`PostgreSQL → Express API (/api/products, /api/products/:slug) → React (fetch in api/client.js) → components`

## API Endpoints

### `GET /api/health`
Checks the DB connection.
```json
{ "success": true, "status": "ok", "db": "connected" }
```

### `GET /api/products`
List view — each product with its default variant, for card grids.
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "description": "Apple's flagship Pro smartphone...",
      "category": "smartphone",
      "previewVariant": {
        "id": 1,
        "label": "256GB / Deep Blue",
        "storage": "256GB",
        "color": "Deep Blue",
        "colorHex": "#33475B",
        "mrp": 134900,
        "sellingPrice": 127400,
        "imageUrl": "https://...",
        "stockStatus": "in_stock"
      }
    }
  ]
}
```

### `GET /api/products/:slug`
Full detail — all variants, each with its EMI plans (server-calculated).
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "description": "...",
    "variants": [
      {
        "id": 1,
        "label": "256GB / Deep Blue",
        "storage": "256GB",
        "color": "Deep Blue",
        "mrp": 134900,
        "sellingPrice": 127400,
        "discountAmount": 7500,
        "imageUrl": "https://...",
        "isDefault": true,
        "stockStatus": "in_stock",
        "emiPlans": [
          {
            "id": 1,
            "tenureMonths": 3,
            "annualInterestRate": 0,
            "monthlyPayment": 42466.67,
            "totalPayable": 127400,
            "totalInterest": 0,
            "cashbackAmount": 7500,
            "effectiveAmountAfterCashback": 119900,
            "isRecommended": false,
            "fundBackingNote": "Backed by mutual fund SIP"
          }
        ]
      }
    ]
  }
}
```

**Error responses** (product not found, invalid slug, DB down) use the same shape:
```json
{ "success": false, "error": { "code": "PRODUCT_NOT_FOUND", "message": "No product found for slug \"foo\"" } }
```

> Note: the reference screenshot's EMI numbers don't match a plain reducing-balance calculation on the listed price (e.g. 3-month 0% EMI on ₹1,27,400 would be ₹42,467, not ₹44,967) — they likely bake in an undisclosed fee. This implementation uses the textbook-correct formula from the assignment brief instead of reverse-engineering the screenshot's numbers.

## Local Setup

### Prerequisites
- Node.js ≥ 18
- A PostgreSQL database (local, or a free instance on [Neon](https://neon.tech) / [Supabase](https://supabase.com))

### 1. Database
```bash
# create a database, then set DATABASE_URL to point at it (see backend/.env.example)
cd backend
cp .env.example .env    # fill in DATABASE_URL
npm install
npm run db:setup        # applies database/schema.sql + database/seed.sql
```

### 2. Backend
```bash
cd backend
npm run dev              # http://localhost:4000
```

### 3. Frontend
```bash
cd frontend
cp .env.example .env     # VITE_API_BASE_URL=http://localhost:4000
npm install
npm run dev               # http://localhost:5173
```

## Environment Variables

**backend/.env**
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PGSSL` | `false` for local Postgres without SSL; omit/`true` for hosted DBs |
| `PORT` | API port (default `4000`) |
| `CORS_ORIGIN` | Allowed frontend origin |

**frontend/.env**
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API |

## Database Setup
See [Local Setup](#local-setup) → step 1. `backend/db/setup.js` reads and executes `database/schema.sql` then `database/seed.sql` against `DATABASE_URL`. Re-running it recreates the tables from scratch (the schema drops tables first), so it's safe to re-run during development.

## Seed Data
3 products (iPhone 17 Pro, Samsung Galaxy S24 Ultra, OnePlus 13), 9 variants (color/storage combinations), and a realistic EMI ladder per variant (0% interest for 3/6/12/24-month tenures, 10.5% for 36/48/60-month tenures, with cashback on every plan). See [`database/seed.sql`](./database/seed.sql).

## Running the Frontend
`cd frontend && npm install && npm run dev` → `http://localhost:5173`. Production build: `npm run build` (outputs to `frontend/dist`).

## Running the Backend
`cd backend && npm install && npm run dev` (nodemon) or `npm start` → `http://localhost:4000`.

## Testing
Backend business logic (the EMI calculator) has unit tests using Node's built-in test runner — no extra dependency required:
```bash
cd backend
npm test
```
Covers: 0%-interest flat split, interest-bearing reducing-balance math (verified against a known EMI value), non-negative totals, invalid-input rejection, and cashback never pushing the effective cost below zero. All 5 tests pass (verified in this environment — see manual verification note below).

Manual verification performed before submission: product list/detail endpoints reviewed against the schema, variant switching and plan switching logic traced by hand, and error paths (missing slug, missing variant, no EMI plans) reviewed in `productsController.js`.

## Deployment — 100% free on Vercel

Both frontend and backend deploy to Vercel's free Hobby tier as **two separate projects** from this one repo (Vercel lets you pick a subdirectory as the project root). Database is a free [Neon](https://neon.tech) Postgres instance — Neon is built for serverless, which matters because Vercel functions are short-lived.

The backend is already set up for this: `backend/api/index.js` re-exports the Express app as a Vercel serverless function, and `backend/vercel.json` routes every request to it. `server.js` only calls `app.listen()` when run directly (local dev), never on Vercel.

### 1. Database (Neon, free)
1. Create a project at [neon.tech](https://neon.tech), copy the pooled connection string (it includes `-pooler` in the hostname — use that one, not the direct one, for serverless).
2. From your machine: `cd backend && npm install`, put the connection string in `.env` as `DATABASE_URL`, then `npm run db:setup` to create + seed the tables.

### 2. Push to GitHub
```bash
git remote add origin <your-empty-github-repo-url>
git push -u origin master
```

### 3. Backend → Vercel
1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. **Root Directory**: `backend`.
3. Framework preset: "Other" (Vercel will detect `api/index.js` as a serverless function automatically).
4. Environment variables: `DATABASE_URL` (the Neon pooled string), `PGSSL=true`, `CORS_ORIGIN` (fill in after step 4, once you have the frontend URL — you can redeploy to update it).
5. Deploy. Test `https://<your-backend>.vercel.app/api/health` — should return `{"success":true,"status":"ok","db":"connected"}`.

### 4. Frontend → Vercel
1. [vercel.com/new](https://vercel.com/new) → import the **same repo again** as a second project.
2. **Root Directory**: `frontend`.
3. Framework preset: Vite (auto-detected).
4. Environment variable: `VITE_API_BASE_URL=https://<your-backend>.vercel.app`.
5. Deploy.
6. Go back to the backend project's env vars and set `CORS_ORIGIN=https://<your-frontend>.vercel.app`, then redeploy the backend so CORS allows it.

Both projects are free — Vercel's Hobby tier has no cost for this traffic level. Total: 2 Vercel projects + 1 Neon database, no credit card needed for Neon's free tier.

> **Deployment status: not yet deployed from this environment** — the sandbox this was built in has no network access, so nothing has actually been pushed to GitHub, Neon, or Vercel yet. The steps above are accurate and sufficient to deploy it; do this manually before submitting.
>
> Deployed frontend URL: _add here after deploying_
> Deployed backend URL: _add here after deploying_
> Demo video URL: _add here after recording_

## Design Decisions
- **No ORM.** Plain SQL (`pg`) keeps the schema and queries fully transparent for a take-home review — easy to read `schema.sql` top to bottom.
- **EMI computed server-side, not stored.** Storing `monthly_payment` risks it going stale if `selling_price` or `annual_interest_rate` changes; deriving it per-request guarantees consistency.
- **`previewVariant` on the list endpoint** avoids the frontend needing N+1 requests to render product cards.
- **Cashback never produces a negative "effective cost"** — clamped at ₹0 in `emiCalculator.js`.
- **No auth, no real payments** — out of scope per the assignment; the "Proceed" button confirms the selected plan locally and is clearly labeled as a demo.

## Future Improvements
- Persist "proceeded" checkout intent server-side (an `orders` table) instead of just a client-side confirmation message
- Product image upload/management instead of static URLs
- Pagination/filtering on `/api/products` as the catalog grows
- Integration tests against a test database (e.g. via `pg-mem` or a Dockerized Postgres) in CI

## Demo
- **Deployed URL:** _TODO — add after deploying (see Deployment section)_
- **Demo video:** _TODO — add Google Drive/YouTube link (2–5 min, anyone-with-link)_
