-- 1Fi SDE1 Assignment — Database Schema (PostgreSQL)
-- Products -> Variants -> EMI Plans (one-to-many, one-to-many)

DROP TABLE IF EXISTS emi_plans CASCADE;
DROP TABLE IF EXISTS variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    slug        VARCHAR(120) UNIQUE NOT NULL,     -- used in /products/:slug URLs
    name        VARCHAR(160) NOT NULL,             -- e.g. "iPhone 17 Pro"
    brand       VARCHAR(80)  NOT NULL,
    description TEXT,
    category    VARCHAR(60)  NOT NULL DEFAULT 'smartphone',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE variants (
    id              SERIAL PRIMARY KEY,
    product_id      INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    label           VARCHAR(120) NOT NULL,   -- e.g. "256GB / Orange"
    storage         VARCHAR(40),             -- e.g. "256GB"
    color           VARCHAR(40),             -- e.g. "Orange"
    color_hex       VARCHAR(7),              -- swatch color, e.g. "#D97B3F"
    mrp             NUMERIC(10,2) NOT NULL,      -- MRP in INR
    selling_price   NUMERIC(10,2) NOT NULL,      -- current selling price in INR
    image_url       TEXT NOT NULL,
    is_default      BOOLEAN NOT NULL DEFAULT false,
    stock_status    VARCHAR(20) NOT NULL DEFAULT 'in_stock', -- in_stock | low_stock | out_of_stock
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (product_id, label)
);

CREATE TABLE emi_plans (
    id                SERIAL PRIMARY KEY,
    variant_id        INTEGER NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
    tenure_months      INTEGER NOT NULL,             -- e.g. 3, 6, 12, 24, 36, 48, 60
    annual_interest_rate NUMERIC(5,2) NOT NULL DEFAULT 0, -- e.g. 0.00 or 10.50
    cashback_amount   NUMERIC(10,2) NOT NULL DEFAULT 0,
    is_recommended    BOOLEAN NOT NULL DEFAULT false,   -- "best value" flag
    fund_backing_note VARCHAR(160) DEFAULT 'Backed by mutual fund SIP',
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (variant_id, tenure_months)
);

CREATE INDEX idx_variants_product_id ON variants(product_id);
CREATE INDEX idx_emi_plans_variant_id ON emi_plans(variant_id);
CREATE INDEX idx_products_slug ON products(slug);

-- Note: monthly_payment is intentionally NOT stored — it is derived at request time
-- by the backend from (selling_price, tenure_months, annual_interest_rate) using the
-- standard reducing-balance EMI formula. This keeps the numbers always consistent
-- with price changes instead of risking stale, out-of-sync stored values.
