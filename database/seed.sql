-- 1Fi SDE1 Assignment — Expanded Seed Data (PostgreSQL)
-- Run AFTER schema.sql on a clean database.

-- ============ PRODUCTS ============
INSERT INTO products (id, slug, name, brand, description, category) VALUES
(1, 'iphone-16-pro-max', 'iPhone 16 Pro Max', 'Apple',
 'Apple''s supreme flagship in Grade 5 Titanium with 6.9-inch display, A18 Pro chip, Camera Control button, and 4K 120 fps Dolby Vision.',
 'flagship'),
(2, 'iphone-16-pro', 'iPhone 16 Pro', 'Apple',
 'Pro performance in a versatile 6.3-inch titanium design with A18 Pro, 48MP triple camera system, and 5x Telephoto optical zoom.',
 'flagship'),
(3, 'iphone-16-plus', 'iPhone 16 Plus', 'Apple',
 'Expansive 6.7-inch Super Retina XDR screen, A18 chip, Camera Control, and up to 27 hours video battery life.',
 'flagship'),
(4, 'iphone-16', 'iPhone 16', 'Apple',
 'Colour-infused glass back with A18 chip, Camera Control button, and 48MP Fusion camera with 2x Telephoto optical quality.',
 'flagship'),
(5, 'iphone-16e', 'iPhone 16e', 'Apple',
 'The newest Apple Intelligence powerhouse built for everyone with 6.1-inch OLED, A18 processor, and 48MP 2-in-1 camera.',
 'flagship'),
(6, 'iphone-15-pro-max', 'iPhone 15 Pro Max', 'Apple',
 'Titanium powerhouse with 3nm A17 Pro silicon, customizable Action button, and 5x tetraprism optical telephoto zoom.',
 'flagship'),
(7, 'iphone-15-pro', 'iPhone 15 Pro', 'Apple',
 'Grade 5 Titanium design with 6.1-inch 120Hz ProMotion screen, A17 Pro processor, and versatile 48MP camera.',
 'flagship'),
(8, 'iphone-15-plus', 'iPhone 15 Plus', 'Apple',
 'Large 6.7-inch screen with all-day battery life, Dynamic Island, 48MP Main camera, and USB-C connectivity.',
 'flagship'),
(9, 'iphone-15', 'iPhone 15', 'Apple',
 'Dynamic Island, 48MP Main camera with 2x zoom, durable colour-infused back glass, and universal USB-C charging.',
 'flagship'),
(10, 'iphone-se-3rd-gen', 'iPhone SE (3rd Gen)', 'Apple',
 'Iconic compact pocket design with 4.7-inch display, fast A15 Bionic chip, 5G speeds, and Home button with Touch ID.',
 'flagship'),
(11, 'samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra', 'Samsung',
 'Samsung''s crowning Galaxy flagship with titanium frame, built-in S Pen, Galaxy AI suite, and 200MP Quad Tele camera.',
 'flagship'),
(12, 'google-pixel-9-pro-xl', 'Google Pixel 9 Pro XL', 'Google',
 'Engineered by Google with Gemini Nano, Super Actua display, Google Tensor G4 chip, and 50MP triple computational cameras.',
 'flagship'),
(13, 'oneplus-13', 'OnePlus 13', 'OnePlus',
 'OnePlus flagship with Snapdragon 8 Elite, 2K Oriental display, Hasselblad-tuned cameras, and 6000mAh battery with 100W SUPERVOOC.',
 'flagship')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  description = EXCLUDED.description,
  category = EXCLUDED.category;

-- ============ VARIANTS ============
-- Product 1: iPhone 16 Pro Max
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(1, '256GB / Desert Titanium', '256GB', 'Desert Titanium', '#C5A880', 144900, 144900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(1, '512GB / Natural Titanium', '512GB', 'Natural Titanium', '#9E978E', 164900, 164900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock'),
(1, '512GB / White Titanium', '512GB', 'White Titanium', '#F2F2F0', 164900, 164900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock'),
(1, '1TB / Black Titanium', '1TB', 'Black Titanium', '#3B3A36', 184900, 184900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 2: iPhone 16 Pro
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(2, '128GB / Desert Titanium', '128GB', 'Desert Titanium', '#C5A880', 119900, 119900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(2, '256GB / Natural Titanium', '256GB', 'Natural Titanium', '#9E978E', 129900, 129900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock'),
(2, '512GB / White Titanium', '512GB', 'White Titanium', '#F2F2F0', 149900, 149900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock'),
(2, '1TB / Black Titanium', '1TB', 'Black Titanium', '#3B3A36', 169900, 169900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 3: iPhone 16 Plus
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(3, '128GB / Ultramarine', '128GB', 'Ultramarine', '#44658A', 89900, 89900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(3, '256GB / Teal', '256GB', 'Teal', '#7AA39E', 99900, 99900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock'),
(3, '256GB / Pink', '256GB', 'Pink', '#E297A7', 99900, 99900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 4: iPhone 16
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(4, '128GB / Ultramarine', '128GB', 'Ultramarine', '#44658A', 79900, 79900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(4, '128GB / Teal', '128GB', 'Teal', '#7AA39E', 79900, 79900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock'),
(4, '256GB / Pink', '256GB', 'Pink', '#E297A7', 89900, 89900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 5: iPhone 16e
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(5, '128GB / White', '128GB', 'White', '#F2F4F5', 59900, 59900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-white?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(5, '256GB / Black', '256GB', 'Black', '#252627', 69900, 69900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-black?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 6: iPhone 15 Pro Max
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(6, '256GB / Natural Titanium', '256GB', 'Natural Titanium', '#9E978E', 149900, 134900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(6, '256GB / Blue Titanium', '256GB', 'Blue Titanium', '#3A4450', 149900, 134900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 7: iPhone 15 Pro
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(7, '128GB / Natural Titanium', '128GB', 'Natural Titanium', '#9E978E', 129900, 109900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(7, '256GB / Blue Titanium', '256GB', 'Blue Titanium', '#3A4450', 139900, 119900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 8: iPhone 15 Plus
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(8, '128GB / Blue', '128GB', 'Blue', '#D4E0E8', 79900, 69900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(8, '128GB / Pink', '128GB', 'Pink', '#F6D2D6', 79900, 69900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 9: iPhone 15
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(9, '128GB / Blue', '128GB', 'Blue', '#D4E0E8', 69900, 59900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(9, '128GB / Pink', '128GB', 'Pink', '#F6D2D6', 69900, 59900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 10: iPhone SE (3rd Gen)
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(10, '64GB / Midnight', '64GB', 'Midnight', '#1B242F', 47900, 43900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-midnight?wid=1000&hei=1000&fmt=jpeg&qlt=90', true, 'in_stock'),
(10, '128GB / Starlight', '128GB', 'Starlight', '#F9F6EF', 52900, 48900, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-starlight?wid=1000&hei=1000&fmt=jpeg&qlt=90', false, 'in_stock');

-- Product 11: Samsung Galaxy S24 Ultra
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(11, '256GB / Titanium Gray', '256GB', 'Titanium Gray', '#6B7280', 134999, 129999, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=85', true, 'in_stock');

-- Product 12: Google Pixel 9 Pro XL
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(12, '256GB / Porcelain', '256GB', 'Porcelain', '#ECE7E1', 124999, 124999, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=85', true, 'in_stock');

-- Product 13: OnePlus 13
INSERT INTO variants (product_id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status) VALUES
(13, '256GB / Midnight Black', '256GB', 'Midnight Black', '#181A1B', 69999, 69999, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=85', true, 'in_stock');

-- ============ EMI PLANS ============
-- Example default plans for variants: 3, 6, 12, 24 months
INSERT INTO emi_plans (variant_id, tenure_months, annual_interest_rate, cashback_amount, is_recommended, fund_backing_note) VALUES
(1, 3,  0.00, 8000, false, 'Backed by Mutual Fund SIP / Stock Lien'),
(1, 6,  0.00, 8000, false, 'Backed by Mutual Fund SIP / Stock Lien'),
(1, 12, 0.00, 8000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(1, 24, 0.00, 8000, false, 'Backed by Mutual Fund SIP / Stock Lien'),
(2, 6,  0.00, 7000, false, 'Backed by Mutual Fund SIP / Stock Lien'),
(2, 12, 0.00, 7000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(2, 24, 0.00, 7000, false, 'Backed by Mutual Fund SIP / Stock Lien'),
(3, 12, 0.00, 6000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(4, 12, 0.00, 5000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(5, 12, 0.00, 4000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(6, 12, 0.00, 7000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(7, 12, 0.00, 6000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(8, 12, 0.00, 5000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(9, 12, 0.00, 4000, true,  'Backed by Mutual Fund SIP / Stock Lien'),
(10, 12, 0.00, 3000, true, 'Backed by Mutual Fund SIP / Stock Lien'),
(11, 12, 0.00, 7500, true, 'Backed by Mutual Fund SIP / Stock Lien'),
(12, 12, 0.00, 7000, true, 'Backed by Mutual Fund SIP / Stock Lien'),
(13, 12, 0.00, 4000, true, 'Backed by Mutual Fund SIP / Stock Lien');
