const pool = require('./pool');
const { PRODUCTS } = require('./embeddedCatalog');
const { buildEmiPlanSummary } = require('../utils/emiCalculator');

let isPostgresHealthy = false;
let checkDone = false;

async function checkPostgres() {
  if (checkDone) return isPostgresHealthy;
  if (!process.env.DATABASE_URL) {
    isPostgresHealthy = false;
    checkDone = true;
    return false;
  }
  try {
    const res = await pool.query('SELECT count(*) FROM products');
    if (Number(res.rows[0].count) > 0) {
      isPostgresHealthy = true;
    }
  } catch {
    isPostgresHealthy = false;
  }
  checkDone = true;
  return isPostgresHealthy;
}

// Ensure plans have server-calculated numbers
function formatVariantPlans(variant, sellingPrice) {
  return variant.emiLadder.map((plan, index) => {
    const summary = buildEmiPlanSummary({
      principal: sellingPrice,
      tenureMonths: plan.tenureMonths,
      annualInterestRate: plan.annualInterestRate,
      cashbackAmount: plan.cashbackAmount,
    });
    return {
      id: `${variant.id}-plan-${index + 1}`,
      isRecommended: Boolean(plan.isRecommended),
      fundBackingNote: plan.annualInterestRate === 0
        ? '100% Subsidized 0% EMI backed by Mutual Fund / Stock lien'
        : 'Low-cost 10.5% interest backed by Mutual Fund SIP',
      ...summary,
    };
  });
}

function getEmbeddedProducts({ brand, category, search, minPrice, maxPrice, sort } = {}) {
  let list = PRODUCTS.map((p) => {
    const defaultVariant = p.variants.find((v) => v.isDefault) || p.variants[0];
    const minEmiPlan = defaultVariant.emiLadder.find((l) => l.tenureMonths === 24) || defaultVariant.emiLadder[0];
    const emiSummary = buildEmiPlanSummary({
      principal: defaultVariant.sellingPrice,
      tenureMonths: minEmiPlan.tenureMonths,
      annualInterestRate: minEmiPlan.annualInterestRate,
      cashbackAmount: minEmiPlan.cashbackAmount,
    });

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      specs: p.specs,
      variantsCount: p.variants.length,
      availableColors: p.variants.map((v) => ({ name: v.color, hex: v.colorHex })),
      previewVariant: {
        id: defaultVariant.id,
        label: defaultVariant.label,
        storage: defaultVariant.storage,
        color: defaultVariant.color,
        colorHex: defaultVariant.colorHex,
        mrp: defaultVariant.mrp,
        sellingPrice: defaultVariant.sellingPrice,
        discountAmount: defaultVariant.mrp - defaultVariant.sellingPrice,
        imageUrl: defaultVariant.imageUrl,
        stockStatus: defaultVariant.stockStatus,
        startingMonthlyEmi: emiSummary.monthlyPayment,
        maxCashback: Math.max(...defaultVariant.emiLadder.map((l) => l.cashbackAmount || 0)),
      },
    };
  });

  if (brand && brand !== 'all') {
    list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (category && category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.processor.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    list = list.filter((p) => p.previewVariant.sellingPrice >= Number(minPrice));
  }

  if (maxPrice) {
    list = list.filter((p) => p.previewVariant.sellingPrice <= Number(maxPrice));
  }

  if (sort === 'price_asc') {
    list.sort((a, b) => a.previewVariant.sellingPrice - b.previewVariant.sellingPrice);
  } else if (sort === 'price_desc') {
    list.sort((a, b) => b.previewVariant.sellingPrice - a.previewVariant.sellingPrice);
  } else if (sort === 'cashback') {
    list.sort((a, b) => b.previewVariant.maxCashback - a.previewVariant.maxCashback);
  } else {
    // Default: recommended / popular
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function getEmbeddedProductBySlug(slug) {
  const found = PRODUCTS.find((p) => p.slug === slug);
  if (!found) return null;

  const formattedVariants = found.variants.map((v) => {
    const emiPlans = formatVariantPlans(v, v.sellingPrice);
    return {
      id: v.id,
      label: v.label,
      storage: v.storage,
      color: v.color,
      colorHex: v.colorHex,
      mrp: v.mrp,
      sellingPrice: v.sellingPrice,
      discountAmount: v.mrp - v.sellingPrice,
      imageUrl: v.imageUrl,
      isDefault: v.isDefault,
      stockStatus: v.stockStatus,
      emiPlans,
    };
  });

  return {
    id: found.id,
    slug: found.slug,
    name: found.name,
    brand: found.brand,
    tagline: found.tagline,
    description: found.description,
    category: found.category,
    rating: found.rating,
    reviewsCount: found.reviewsCount,
    specs: found.specs,
    variants: formattedVariants,
  };
}

module.exports = {
  checkPostgres,
  getEmbeddedProducts,
  getEmbeddedProductBySlug,
};
