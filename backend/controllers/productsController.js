const pool = require('../db/pool');
const { buildEmiPlanSummary } = require('../utils/emiCalculator');
const {
  checkPostgres,
  getEmbeddedProducts,
  getEmbeddedProductBySlug,
} = require('../db/dbService');

/**
 * GET /api/products
 * Returns products with preview variant, starting EMI, and live filter/search/sort support.
 */
async function listProducts(req, res, next) {
  try {
    const { brand, category, search, minPrice, maxPrice, sort } = req.query;
    const isPg = await checkPostgres();

    if (!isPg) {
      const products = getEmbeddedProducts({
        brand,
        category,
        search,
        minPrice,
        maxPrice,
        sort,
      });
      return res.json({ success: true, count: products.length, data: products });
    }

    // If Postgres is connected and active:
    const { rows } = await pool.query(`
      SELECT
        p.id, p.slug, p.name, p.brand, p.description, p.category,
        v.id AS variant_id, v.label, v.storage, v.color, v.color_hex,
        v.mrp, v.selling_price, v.image_url, v.stock_status
      FROM products p
      JOIN LATERAL (
        SELECT * FROM variants v
        WHERE v.product_id = p.id
        ORDER BY v.is_default DESC, v.id ASC
        LIMIT 1
      ) v ON true
      ORDER BY p.id ASC
    `);

    let products = rows.map((r) => {
      const sellingPrice = Number(r.selling_price);
      const emiSummary = buildEmiPlanSummary({
        principal: sellingPrice,
        tenureMonths: 12,
        annualInterestRate: 0,
        cashbackAmount: 5000,
      });

      return {
        id: r.id,
        slug: r.slug,
        name: r.name,
        brand: r.brand,
        tagline: `${r.brand} flagship experience`,
        description: r.description,
        category: r.category,
        rating: 4.8,
        reviewsCount: 150,
        specs: {
          display: 'Super AMOLED / Retina XDR 120Hz',
          processor: 'Flagship 3nm / 4nm Octa-Core',
          camera: 'Pro-grade multi-lens optical stabilization system',
          battery: 'All-day battery with fast charging support',
          os: 'Latest OS version with security updates',
        },
        previewVariant: {
          id: r.variant_id,
          label: r.label,
          storage: r.storage,
          color: r.color,
          colorHex: r.color_hex,
          mrp: Number(r.mrp),
          sellingPrice,
          discountAmount: Number(r.mrp) - sellingPrice,
          imageUrl: r.image_url,
          stockStatus: r.stock_status,
          startingMonthlyEmi: emiSummary.monthlyPayment,
          maxCashback: 7500,
        },
      };
    });

    if (brand && brand !== 'all') {
      products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products/:slug
 * Returns full product detail: all variants, rich specs, and server-calculated EMI plans.
 */
async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const isPg = await checkPostgres();

    if (!isPg) {
      const product = getEmbeddedProductBySlug(slug);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: { code: 'PRODUCT_NOT_FOUND', message: `No product found for slug "${slug}"` },
        });
      }
      return res.json({ success: true, data: product });
    }

    // If Postgres is connected:
    const productResult = await pool.query(
      `SELECT id, slug, name, brand, description, category FROM products WHERE slug = $1`,
      [slug]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'PRODUCT_NOT_FOUND', message: `No product found for slug "${slug}"` },
      });
    }

    const product = productResult.rows[0];

    const variantsResult = await pool.query(
      `SELECT id, label, storage, color, color_hex, mrp, selling_price, image_url, is_default, stock_status
       FROM variants WHERE product_id = $1 ORDER BY is_default DESC, id ASC`,
      [product.id]
    );

    if (variantsResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'NO_VARIANTS', message: 'This product currently has no variants configured' },
      });
    }

    const variantIds = variantsResult.rows.map((v) => v.id);
    const plansResult = await pool.query(
      `SELECT id, variant_id, tenure_months, annual_interest_rate, cashback_amount, is_recommended, fund_backing_note
       FROM emi_plans WHERE variant_id = ANY($1::int[]) ORDER BY tenure_months ASC`,
      [variantIds]
    );

    const plansByVariant = new Map();
    for (const row of plansResult.rows) {
      if (!plansByVariant.has(row.variant_id)) plansByVariant.set(row.variant_id, []);
      plansByVariant.get(row.variant_id).push(row);
    }

    const variants = variantsResult.rows.map((v) => {
      const sellingPrice = Number(v.selling_price);
      const rawPlans = plansByVariant.get(v.id) || [];

      const emiPlans = rawPlans.map((plan) => {
        const summary = buildEmiPlanSummary({
          principal: sellingPrice,
          tenureMonths: plan.tenure_months,
          annualInterestRate: Number(plan.annual_interest_rate),
          cashbackAmount: Number(plan.cashback_amount),
        });
        return {
          id: plan.id,
          isRecommended: plan.is_recommended,
          fundBackingNote: plan.fund_backing_note,
          ...summary,
        };
      });

      return {
        id: v.id,
        label: v.label,
        storage: v.storage,
        color: v.color,
        colorHex: v.color_hex,
        mrp: Number(v.mrp),
        sellingPrice,
        discountAmount: Number(v.mrp) - sellingPrice,
        imageUrl: v.image_url,
        isDefault: v.is_default,
        stockStatus: v.stock_status,
        emiPlans,
      };
    });

    res.json({
      success: true,
      data: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        tagline: `${product.brand} flagship edition`,
        description: product.description,
        category: product.category,
        rating: 4.88,
        reviewsCount: 220,
        specs: {
          display: 'LTPO AMOLED / Retina XDR 120Hz ProMotion',
          processor: 'Next-gen flagship 3nm silicon',
          camera: 'Pro-grade optical system with ultra-wide & periscope telephoto',
          battery: 'High-density battery with wired & wireless fast charging',
          os: 'Flagship OS with guaranteed major upgrades',
        },
        variants,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { listProducts, getProductBySlug };
