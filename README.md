# 1Fi — Wealth-Backed Smartphone EMI Experience

A modern full-stack web application for purchasing flagship smartphones on 0% and low-cost EMI plans backed by Mutual Funds and Demat Stocks (**Loan Against Mutual Funds - LAMF**) — built for the **1Fi SDE1 assignment**.

- **GitHub Repository:** [https://github.com/Nikhiljasti7/1Fi-project](https://github.com/Nikhiljasti7/1Fi-project)
- **Live Frontend Website:** [https://1-fi-project-frontend.vercel.app](https://1-fi-project-frontend.vercel.app)
- **Live Backend API:** [https://1-fi-project-backend.vercel.app/api/health](https://1-fi-project-backend.vercel.app/api/health)

---

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Database Schema & Architecture](#database-schema--architecture)
4. [Setup and Run Instructions](#setup-and-run-instructions)
5. [API Endpoints & Example Responses](#api-endpoints--example-responses)
6. [Security & Automated Testing](#security--automated-testing)
7. [Vercel Deployment Guide](#vercel-deployment-guide)

---

## Overview

Traditional smartphone purchases force consumers to either block high-interest credit card limits (charging 16% APR + 18% GST on interest) or break long-term mutual fund SIPs (incurring capital gains taxes and losing future wealth compounding).

**1Fi Wealth-Backed EMI** enables users to pledge their existing investment portfolio units at 50%–80% LTV under RBI / SEBI guidelines. Investments remain in the user's folio, continuing to earn 12%–18% CAGR, while unlocking **subsidized 0% No-Cost EMI** and manufacturer cashback on their new smartphone.

---

## Tech Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 18, React Router v6, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express, CORS, PBKDF2 Password Hashing, HMAC-SHA256 Token Auth |
| **Database** | PostgreSQL (`pg` driver, raw SQL schema & migrations) + Standalone Resilient Fallback |
| **Security** | Content Security Policy (CSP), OWASP Security Headers, Sliding-window Rate Limiter, Anti-Tampering Math Engine |
| **Testing** | Node.js built-in test runner (`node --test`), 12 automated unit and penetration tests |

---

## Database Schema & Architecture

The database is designed around a normalized relational model supporting products, multi-attribute variants (color, storage, hex swatches, pricing), and flexible tenure EMI plans.

### Entity Relationship Diagram

```mermaid
erDiagram
    PRODUCTS ||--o{ VARIANTS : "has many (1:N)"
    VARIANTS ||--o{ EMI_PLANS : "has many (1:N)"

    PRODUCTS {
        serial id PK
        varchar slug UK "used in /products/:slug"
        varchar name "e.g. iPhone 17 Pro Max"
        varchar brand "e.g. Apple, Samsung"
        text description
        varchar category "smartphone / flagship"
        timestamptz created_at
    }

    VARIANTS {
        serial id PK
        int product_id FK "REFERENCES products(id)"
        varchar label "e.g. 256GB / Cosmic Orange"
        varchar storage "e.g. 256GB"
        varchar color "e.g. Cosmic Orange"
        varchar color_hex "e.g. #C96A3C"
        numeric mrp "Maximum Retail Price in INR"
        numeric selling_price "Effective Selling Price in INR"
        text image_url
        boolean is_default
        varchar stock_status "in_stock / low_stock / out_of_stock"
        timestamptz created_at
    }

    EMI_PLANS {
        serial id PK
        int variant_id FK "REFERENCES variants(id)"
        int tenure_months "3, 6, 9, 12, 18, 24"
        numeric annual_interest_rate "0.00 for No-Cost, 10.50 for standard"
        numeric cashback_amount "Manufacturer instant discount"
        boolean is_recommended "Flag for Best Value badge"
        varchar fund_backing_note "Mutual fund lien description"
        timestamptz created_at
    }
```

### Schema Files
- **Schema Definition**: [`database/schema.sql`](database/schema.sql)
- **Catalog Seed Data**: [`database/seed.sql`](database/seed.sql) (14 flagship devices with 2–4 variants each and complete EMI ladders).

> **Architectural Note on `monthly_payment`**:  
> `monthly_payment` is intentionally **not stored statically** in the database. Instead, it is computed dynamically by the backend using the standard reducing-balance EMI formula:
> $$\text{EMI} = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$
> For 0% interest loans, it computes a clean flat split ($\text{EMI} = \frac{P}{n}$). This guarantees financial consistency and eliminates stale pricing anomalies.

---

## Setup and Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **PostgreSQL** *(optional)*: Local instance or hosted provider (Neon, Supabase, Render). If omitted, the app automatically runs in resilient standalone mode.

---

### 1. Backend Setup

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. *(Optional)* Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if using PostgreSQL:
   ```ini
   DATABASE_URL=postgresql://user:password@localhost:5432/onefi_db
   PORT=4000
   CORS_ORIGIN=http://localhost:5173
   JWT_SECRET=your-secure-secret-key
   ```
4. *(Optional)* Initialize database schema and seed data:
   ```bash
   npm run db:setup
   ```
5. Run the test suite:
   ```bash
   npm test
   ```
6. Start the backend API server:
   ```bash
   npm run dev    # with nodemon auto-restart
   # OR
   npm start      # standard node server
   ```
   The backend will be live at `http://localhost:4000`.

---

### 2. Frontend Setup

1. Open a second terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. *(Optional)* Configure `.env`:
   ```ini
   VITE_API_BASE_URL=http://localhost:4000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be live at `http://localhost:5173`.

5. Build for production:
   ```bash
   npm run build
   ```

---

## API Endpoints & Example Responses

### 1. `GET /api/health`
Health check and database connection status.

* **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "status": "ok",
    "db": "connected_postgres",
    "message": "Running in resilient mode with expanded brand catalog and wealth engine."
  }
  ```

---

### 2. `GET /api/products`
Retrieves all catalog products with preview variants, search, brand filtering, and starting EMI.

* **Query Parameters**:
  - `brand` (optional): `Apple`, `Samsung`, `Google`, `OnePlus`, etc.
  - `category` (optional): `flagship`
  - `search` (optional): Keyword search across title, brand, and processor
  - `sort` (optional): `price_asc`, `price_desc`, `cashback`, `recommended`

* **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "count": 14,
    "data": [
      {
        "id": 100,
        "slug": "iphone-17-pro-max",
        "name": "iPhone 17 Pro Max",
        "brand": "Apple",
        "tagline": "The ultimate 2nm titanium powerhouse with triple 48MP cameras.",
        "category": "flagship",
        "rating": 4.98,
        "reviewsCount": 142,
        "variantsCount": 3,
        "availableColors": [
          { "name": "Cosmic Orange", "hex": "#C96A3C" },
          { "name": "Desert Titanium", "hex": "#C4B29E" },
          { "name": "Natural Titanium", "hex": "#9A9590" }
        ],
        "previewVariant": {
          "id": 1701,
          "label": "256GB / Cosmic Orange",
          "storage": "256GB",
          "color": "Cosmic Orange",
          "colorHex": "#C96A3C",
          "mrp": 154900,
          "sellingPrice": 154900,
          "discountAmount": 0,
          "imageUrl": "/images/iphone-17-orange/front_back.jpg",
          "stockStatus": "in_stock",
          "startingMonthlyEmi": 6454.17,
          "maxCashback": 8000
        }
      }
    ]
  }
  ```

---

### 3. `GET /api/products/:slug`
Fetches complete product specs, all color/storage variants, and server-calculated EMI plan ladders.

* **Example Request**: `GET /api/products/iphone-16-pro-max`
* **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "slug": "iphone-16-pro-max",
      "name": "iPhone 16 Pro Max",
      "brand": "Apple",
      "rating": 4.88,
      "specs": {
        "display": "6.9-inch Super Retina XDR OLED 120Hz ProMotion",
        "processor": "Apple A18 Pro (3nm)",
        "camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
        "battery": "Up to 33 hours video playback",
        "os": "iOS 18 with Apple Intelligence"
      },
      "variants": [
        {
          "id": 101,
          "label": "256GB / Desert Titanium",
          "storage": "256GB",
          "color": "Desert Titanium",
          "colorHex": "#C4B29E",
          "mrp": 144900,
          "sellingPrice": 144900,
          "stockStatus": "in_stock",
          "emiPlans": [
            {
              "id": "101-plan-1",
              "tenureMonths": 12,
              "annualInterestRate": 0,
              "monthlyPayment": 12075,
              "totalPayable": 144900,
              "totalInterest": 0,
              "cashbackAmount": 8000,
              "effectiveAmountAfterCashback": 136900,
              "isRecommended": true,
              "fundBackingNote": "100% Subsidized 0% EMI backed by Mutual Fund / Stock lien"
            }
          ]
        }
      ]
    }
  }
  ```

---

### 4. `POST /api/wealth/calculate-offset`
Calculates investment compounding returns vs. EMI costs to determine the net effective device price.

* **Request Body**:
  ```json
  {
    "portfolioValue": 250000,
    "expectedCagr": 14,
    "tenureMonths": 12,
    "phonePrice": 144900,
    "annualInterestRate": 0,
    "cashbackAmount": 8000
  }
  ```

* **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "wealthGrowth": {
        "currentPortfolioValue": 250000,
        "projectedPortfolioValue": 285000,
        "estimatedWealthGain": 35000,
        "lostGainIfSold": 20286,
        "capitalGainsTaxSaved": 2536
      },
      "emiAnalysis": {
        "oneFi": {
          "monthlyPayment": 12075,
          "totalPayable": 144900,
          "cashback": 8000,
          "netPayableAfterCashback": 136900,
          "effectiveNetCostWithWealthGain": 101900
        },
        "creditCard": {
          "annualRate": 16,
          "monthlyPayment": 13145.41,
          "totalCost": 157745
        },
        "savings": {
          "directCashSavings": 20845,
          "totalWealthAdvantage": 55845
        }
      }
    }
  }
  ```

---

### 5. `POST /api/auth/login`
Authenticates investor credentials and returns an HMAC-SHA256 Bearer token.

* **Request Body**:
  ```json
  {
    "usernameOrEmail": "nikhil",
    "password": "password123"
  }
  ```

* **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
      "user": {
        "id": "user-1",
        "username": "nikhil",
        "email": "nikhil.jasti@example.com",
        "name": "Nikhil Jasti",
        "panMasked": "•••••8912K",
        "kycStatus": "VERIFIED"
      }
    },
    "message": "Logged in securely."
  }
  ```

---

### 6. `POST /api/orders` *(Protected)*
Places a wealth-backed order with server-side price anti-tampering validation.

* **Headers**: `Authorization: Bearer <token>`
* **Request Body**:
  ```json
  {
    "product": { "slug": "iphone-16-pro-max", "sellingPrice": 144900 },
    "plan": { "tenureMonths": 12, "monthlyPayment": 12075 },
    "pledgedAsset": { "type": "MUTUAL_FUND", "name": "Parag Parikh Flexi Cap Fund" }
  }
  ```
* **Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "data": {
      "orderId": "1FI-ORD-74291",
      "loanAccountNumber": "1FI-LAMF-583921",
      "status": "ACTIVE",
      "lienStatus": "ACTIVE_LIEN"
    },
    "message": "Wealth-backed EMI loan approved and order confirmed successfully!"
  }
  ```

---

## Security & Automated Testing

The application implements a defense-in-depth security layer compliant with OWASP Top 10 and RBI/SEBI fintech norms:

1. **HMAC-SHA256 Bearer Token Verification**: Cryptographic token signing with constant-time verification (`crypto.timingSafeEqual`).
2. **Broken Object Level Authorization (BOLA) Defense**: Orders and repayments are strictly bound to the authenticated user ID.
3. **Financial Parameter Anti-Tampering**: Client-submitted monthly payments and totals are recalculated server-side against catalog data; tampered requests are rejected with `400 PRICE_TAMPERING_DETECTED`.
4. **Anti-Spoofing Rate Limiting**: Express proxy-aware rate limiting with dual IP and account-keyed brute-force limits.
5. **Prototype Pollution Protection**: Deep JSON sanitization stripping `__proto__`, `constructor`, and `prototype` keys.
6. **Hardened Headers**: Full Content Security Policy (CSP), COOP, CORP, HSTS, and `Cache-Control: no-store` on financial endpoints.

### Running Tests
```bash
cd backend
npm test
```
All **12 automated tests** pass:
- Salting & PBKDF2 verification
- XSS and malicious protocol stripping
- Prototype pollution immunity
- Cryptographic token signing and expiry verification
- Reducing-balance math and 0% flat split formulas
- Master OTP backdoor elimination check
- BOLA / IDOR unauthorized order access rejection (401 & 403)
- Financial price tampering rejection
- Math input boundary DoS resilience
- Security headers presence validation

---

## Vercel Deployment Guide

Deploy both frontend and backend to Vercel's free Hobby tier as **two separate projects**:

### 1. Deploy Backend
1. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
2. Under **Root Directory**, select **`backend`**.
3. **Framework Preset**: select *Other*.
4. Under **Environment Variables**, optionally add `DATABASE_URL` and `JWT_SECRET`.
5. Click **Deploy** and copy your backend URL: `https://<your-backend>.vercel.app`.

### 2. Deploy Frontend
1. Import the repository again on [vercel.com/new](https://vercel.com/new).
2. Under **Root Directory**, select **`frontend`**.
3. **Framework Preset**: *Vite* (auto-detected).
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = `https://<your-backend>.vercel.app`
5. Click **Deploy**.
