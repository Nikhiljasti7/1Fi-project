# 1Fi — Wealth-Backed Smartphone EMI Experience

A modern full-stack web application for purchasing flagship smartphones on 0% and low-cost EMI plans backed by Mutual Funds and Demat Stocks (Loan Against Mutual Funds - LAMF) — built for the **1Fi SDE1 assignment**.

**GitHub Repository:** [https://github.com/Nikhiljasti7/1Fi-project](https://github.com/Nikhiljasti7/1Fi-project)

---

## Overview

Instead of blocking high-interest credit card limits or breaking mutual fund SIPs, users can pledge their existing investment portfolio units at 50%–80% LTV via CAMS, KFintech, and CDSL. Their investments remain in their own folio, continuing to earn 12%–18% annual CAGR, while enjoying **subsidized 0% No-Cost EMI** and manufacturer cashback on their new smartphone.

---

## Key Features

- **Expanded Flagship Catalog**: 10 flagship smartphones across **Apple**, **Samsung**, **Google Pixel**, **OnePlus**, **Nothing**, and **Xiaomi**, each with 2–4 color finishes, real hex swatches, storage tiers, live stock status, and comprehensive technical specifications.
- **Glassmorphic Fintech Aesthetics**: Dark luxury palette with frosted glass panels (`backdrop-blur-2xl`), radiant ambient glows, glowing badges, and Google Fonts (`Outfit` & `Inter`).
- **Server-Calculated Reducing-Balance EMI**: Standard reducing-balance mathematical formula computed strictly on the backend — never hardcoded in the frontend.
- **Mutual Fund Growth Offset Simulator**: Visualizer calculating how an untouched investment portfolio compounding at 14% CAGR offsets or completely discounts the phone cost during the EMI tenure.
- **Interactive 4-Step Pledge Checkout**:
  1. Review plan & device
  2. Select collateral units (Equity MF, Debt liquid funds, or Demat stocks)
  3. Complete PAN KYC & e-NACH auto-debit setup
  4. Instant Virtual Loan Account approval (`1FI-LAMF-XXXXXX`) with confetti celebration!
- **6 Dedicated Sub-Pages**:
  1. **Marketplace / Shop** (`/`): Multi-brand filtering, search, sorting, and floating compare drawer.
  2. **Product Page** (`/products/:slug`): Studio gallery with viewing angles, variant selector, dynamic EMI ladder, specs matrix, and checkout modal.
  3. **Wealth EMI Simulator** (`/wealth-backed-emi`): Interactive slider playground comparing **1Fi Wealth-Backed EMI** vs. **Credit Card EMI (16% + GST)** vs. **Selling Mutual Funds Upfront**.
  4. **Portfolio Vault** (`/portfolio`): Linked CAMS/Demat investor dashboard with borrowing power gauge, active loan tracker, and holdings breakdown.
  5. **Device Comparison** (`/compare`): Side-by-side comparison of 2–3 flagship phones across specs, camera, battery, and 12-month 0% EMI plans.
  6. **Active Loans & Orders** (`/orders`): Track approved loans, upcoming auto-debit dates, and simulate 1-month prepayment to release collateral liens with official NOC generation.
- **Resilient Dual-Mode Backend**: Automatically connects to PostgreSQL if `DATABASE_URL` is set; if no database is connected or reachable, seamlessly uses an embedded in-memory store so the app is immediately 100% usable locally and in production without setup friction.

---

## Tech Stack

- **Frontend:** React 18, React Router v6, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend:** Node.js, Express, CORS
- **Database:** PostgreSQL (via `pg`, plain SQL) + Resilient Embedded Store Fallback
- **Testing:** Node.js built-in test runner (`node --test tests/emiCalculator.test.js`)

---

## Architecture

```
Browser (React SPA)
   │  fetch() [REST API]
   ▼
Express REST API  ──►  EMI Calculator (pure reducing-balance math, unit-tested)
   │               ──►  Wealth Offset Engine (compounding growth vs EMI)
   │  dbService (dual-mode)
   ├──► PostgreSQL (production / Neon / Supabase via pg)
   └──► Embedded Relational Store (local / fallback)
```

---

## Local Development

### 1. Backend
```bash
cd backend
npm install
npm test          # runs unit tests (5/5 passing)
node server.js    # runs on http://localhost:4000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run build     # compiles production bundle to dist/
npm run dev       # runs on http://localhost:5173
```

---

## Vercel Deployment (100% Free)

Both frontend and backend deploy to Vercel's free Hobby tier as **two separate projects** from [https://github.com/Nikhiljasti7/1Fi-project](https://github.com/Nikhiljasti7/1Fi-project):

### Step 1: Deploy Backend
1. Go to [vercel.com/new](https://vercel.com/new) and import `Nikhiljasti7/1Fi-project`.
2. Under **Root Directory**, click *Edit* and select **`backend`**.
3. **Framework Preset**: select *Other*.
4. Click **Deploy**.
5. Copy your deployed backend URL: `https://<your-backend>.vercel.app`.

### Step 2: Deploy Frontend
1. Go to [vercel.com/new](https://vercel.com/new) and import `Nikhiljasti7/1Fi-project` again.
2. Under **Root Directory**, click *Edit* and select **`frontend`**.
3. **Framework Preset**: *Vite* (auto-detected).
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = `https://<your-backend>.vercel.app`
5. Click **Deploy**.

---

## Unit Testing
Backend business logic (the reducing-balance EMI calculator) is verified with 5 automated unit tests:
```bash
cd backend
npm test
```
- 0% interest flat split across tenure
- Interest-bearing reducing-balance formula accuracy
- Total interest is non-negative and total payable $\ge$ principal
- Input sanitization and invalid argument rejection
- Cashback clamp at ₹0 (never negative)
