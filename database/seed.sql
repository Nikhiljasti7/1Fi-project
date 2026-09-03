-- 1Fi SDE1 Assignment — Expanded Seed Data (PostgreSQL)
-- Run AFTER schema.sql on a clean database.

-- ============ PRODUCTS ============
INSERT INTO products (slug, name, brand, description, category) VALUES
('iphone-17-pro', 'iPhone 17 Pro', 'Apple',
 'Apple''s flagship Pro smartphone with titanium frame, A19 Pro chip, 48MP triple camera system and ceramic shield.',
 'flagship'),
('iphone-16-pro-max', 'iPhone 16 Pro Max', 'Apple',
 'The ultimate iPhone with expansive 6.9-inch display, A18 Pro silicon, Camera Control button, and 4K 120 fps Dolby Vision.',
 'flagship'),
('iphone-16', 'iPhone 16', 'Apple',
 'Vibrant color-infused back glass, Action button, dual 48MP Fusion camera with macro photography, and blazing fast A18 chip.',
 'flagship'),
('samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra', 'Samsung',
 'Samsung''s crowning Galaxy flagship with titanium frame, built-in S Pen, Galaxy AI suite, and 200MP Quad Tele camera.',
 'flagship'),
('samsung-galaxy-z-fold-6', 'Samsung Galaxy Z Fold 6', 'Samsung',
 'Slimmer, lighter, and more durable dual-screen folding powerhouse with S Pen fold edition support and Snapdragon 8 Gen 3.',
 'foldable'),
('google-pixel-9-pro-xl', 'Google Pixel 9 Pro XL', 'Google',
 'Engineered by Google with Gemini Nano, Super Actua display, Google Tensor G4 chip, and 50MP triple computational cameras.',
 'flagship'),
('oneplus-13', 'OnePlus 13', 'OnePlus',
 'OnePlus flagship with Snapdragon 8 Elite, 2K Oriental display, Hasselblad-tuned cameras, and 6000mAh battery with 100W SUPERVOOC.',
 'flagship'),
('oneplus-open', 'OnePlus Open', 'OnePlus',
 'Lightweight folding flagship with Hasselblad cameras, dual ProXDR 120Hz displays, and Open Canvas multi-window multitasking.',
 'foldable'),
('nothing-phone-2', 'Nothing Phone (2)', 'Nothing',
 'Iconic transparent glass back with customizable LED Glyph lighting, Snapdragon 8+ Gen 1, and clean bloatware-free Nothing OS.',
 'flagship'),
('xiaomi-14-ultra', 'Xiaomi 14 Ultra', 'Xiaomi',
 'Leica Summilux all-focal length quad camera setup with custom 1-inch sensor, stepless variable aperture, and Snapdragon 8 Gen 3.',
 'flagship');

-- ============ VARIANTS ============
-- Product 1: iPhone 17 Pro
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(1, '256GB / Deep Blue', '256GB', 'Deep Blue', '#1E293B', 134900, 127400, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(1, '256GB / Cosmic Orange', '256GB', 'Cosmic Orange', '#C96A3C', 134900, 129900, 'https://images.unsplash.com/photo-1695048132966-4b6c30f0e02b?auto=format&fit=crop&w=1000&q=85', false, 'in_stock'),
(1, '512GB / Natural Titanium', '512GB', 'Natural Titanium', '#9E978E', 154900, 147400, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 2: iPhone 16 Pro Max
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(2, '256GB / Desert Titanium', '256GB', 'Desert Titanium', '#C5A992', 144900, 139900, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(2, '512GB / Black Titanium', '512GB', 'Black Titanium', '#1F2428', 164900, 159900, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 3: iPhone 16
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(3, '128GB / Ultramarine', '128GB', 'Ultramarine', '#3B60E4', 79900, 74900, 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(3, '256GB / Teal', '256GB', 'Teal', '#4E938A', 89900, 84900, 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 4: Samsung Galaxy S24 Ultra
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(4, '256GB / Titanium Black', '256GB', 'Titanium Black', '#1B1B1D', 129999, 114999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(4, '256GB / Titanium Gray', '256GB', 'Titanium Gray', '#8A8D8F', 129999, 116999, 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=85', false, 'in_stock'),
(4, '512GB / Titanium Violet', '512GB', 'Titanium Violet', '#4E445B', 144999, 129999, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 5: Samsung Galaxy Z Fold 6
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(5, '256GB / Silver Shadow', '256GB', 'Silver Shadow', '#A3A8AF', 164999, 154999, 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d963?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(5, '512GB / Navy', '512GB', 'Navy', '#1E2C3E', 176999, 166999, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 6: Google Pixel 9 Pro XL
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(6, '256GB / Obsidian', '256GB', 'Obsidian', '#202124', 124999, 114999, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(6, '256GB / Porcelain', '256GB', 'Porcelain', '#F1EFE9', 124999, 114999, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1000&q=85', false, 'in_stock'),
(6, '512GB / Hazel', '512GB', 'Hazel', '#58615A', 139999, 129999, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 7: OnePlus 13
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(7, '256GB / Midnight Ocean', '256GB', 'Midnight Ocean', '#1E2A38', 69999, 64999, 'https://images.unsplash.com/photo-1592286927505-1def25115df3?auto=format&fit=crop&w=1000&q=85', true, 'in_stock'),
(7, '256GB / Arctic Dawn', '256GB', 'Arctic Dawn', '#E7E4DD', 69999, 65999, 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=85', false, 'in_stock');

-- Product 8: OnePlus Open
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(8, '512GB / Emerald Dusk', '512GB', 'Emerald Dusk', '#254E41', 149999, 139999, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85', true, 'in_stock');

-- Product 9: Nothing Phone (2)
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(9, '256GB / Dark Gray', '256GB', 'Dark Gray', '#2D3139', 49999, 37999, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=85', true, 'in_stock');

-- Product 10: Xiaomi 14 Ultra
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(10, '512GB / Black Leather', '512GB', 'Black Leather', '#18181B', 119999, 99999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85', true, 'in_stock');

-- ============ EMI PLANS ============
-- Comprehensive plans for variants: 3, 6, 12, 24, 36 months
INSERT INTO emi_plans (variant_id, tenure_months, annual_interest_rate, cashback_amount, is_recommended, fund_backing_note) VALUES
-- Variant 1 (iPhone 17 Pro 256GB)
(1, 3,  0.00, 7500, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(1, 6,  0.00, 7500, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(1, 12, 0.00, 7500, true,  'Backed by Mutual Fund SIP / Stock Pledge'),
(1, 24, 0.00, 7500, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(1, 36, 10.50, 7500, false, 'Backed by Mutual Fund SIP / Stock Pledge'),

-- Variant 4 (iPhone 16 Pro Max 256GB)
(4, 3,  0.00, 8000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(4, 6,  0.00, 8000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(4, 12, 0.00, 8000, true,  'Backed by Mutual Fund SIP / Stock Pledge'),
(4, 24, 0.00, 8000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(4, 36, 10.50, 8000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),

-- Variant 8 (Galaxy S24 Ultra 256GB)
(8, 3,  0.00, 6000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(8, 6,  0.00, 6000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(8, 12, 0.00, 6000, true,  'Backed by Mutual Fund SIP / Stock Pledge'),
(8, 24, 0.00, 6000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),

-- Variant 13 (Google Pixel 9 Pro XL)
(13, 6,  0.00, 6000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(13, 12, 0.00, 6000, true,  'Backed by Mutual Fund SIP / Stock Pledge'),
(13, 24, 0.00, 6000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),

-- Variant 16 (OnePlus 13)
(16, 6,  0.00, 3000, false, 'Backed by Mutual Fund SIP / Stock Pledge'),
(16, 12, 0.00, 3000, true,  'Backed by Mutual Fund SIP / Stock Pledge'),
(16, 24, 0.00, 3000, false, 'Backed by Mutual Fund SIP / Stock Pledge');
