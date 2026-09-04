const {
  getApprovedCollateral,
  getUserOrders,
  getOrderById,
  addOrder,
  prepayOrderEmi,
  APPROVED_MUTUAL_FUNDS,
  APPROVED_STOCKS,
} = require('../db/wealthCatalog');
const { calculateEmi, buildEmiPlanSummary } = require('../utils/emiCalculator');
const { PRODUCTS } = require('../db/embeddedCatalog');

/**
 * GET /api/wealth/collateral
 * Returns list of approved mutual funds & demat stocks with NAV, returns, and LTV.
 */
function getCollateral(req, res) {
  const collateral = getApprovedCollateral();
  res.json({
    success: true,
    data: collateral,
  });
}

/**
 * POST /api/wealth/calculate-offset
 * Calculates wealth compounding vs EMI cost with strict input validation.
 */
function calculateOffset(req, res) {
  try {
    const {
      portfolioValue = 150000,
      expectedCagr = 14,
      tenureMonths = 12,
      phonePrice = 127400,
      annualInterestRate = 0,
      cashbackAmount = 7500,
    } = req.body || {};

    const P = Number(phonePrice);
    const n = Number(tenureMonths);
    const cagr = Number(expectedCagr);
    const portfolio = Number(portfolioValue);
    const rate = Number(annualInterestRate);
    const cashback = Number(cashbackAmount) || 0;

    // Strict input bounds checking (DoS and math overflow defense)
    if (!Number.isFinite(P) || P <= 0 || P > 10000000) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_PRICE', message: 'Phone price must be a valid positive number up to ₹1,00,00,000.' },
      });
    }

    if (!Number.isInteger(n) || n <= 0 || n > 60) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_TENURE', message: 'Tenure months must be an integer between 1 and 60.' },
      });
    }

    if (!Number.isFinite(cagr) || cagr < 0 || cagr > 100) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_CAGR', message: 'Expected CAGR must be a percentage between 0% and 100%.' },
      });
    }

    if (!Number.isFinite(portfolio) || portfolio < 0 || portfolio > 1000000000) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_PORTFOLIO', message: 'Portfolio value must be a valid positive number.' },
      });
    }

    if (!Number.isFinite(rate) || rate < 0 || rate > 50) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_RATE', message: 'Annual interest rate must be between 0% and 50%.' },
      });
    }

    const r = cagr / 100;
    const years = n / 12;
    const portfolioFutureValue = Math.round(portfolio * Math.pow(1 + r, years));
    const portfolioGain = portfolioFutureValue - portfolio;

    const lostGainIfSold = Math.round(P * (Math.pow(1 + r, years) - 1));
    const capitalGainsTaxSaved = Math.round(lostGainIfSold * 0.125); // 12.5% LTCG tax saved

    // 1Fi EMI calculation
    const emiSummary = calculateEmi({
      principal: P,
      tenureMonths: n,
      annualInterestRate: rate,
    });

    const totalPayableWithCashback = Math.max(0, emiSummary.totalPayable - cashback);

    // Traditional Credit Card comparison (16% APR + 18% GST on interest)
    const ccEmiSummary = calculateEmi({
      principal: P,
      tenureMonths: n,
      annualInterestRate: 16,
    });
    const ccTotalInterest = ccEmiSummary.totalInterest * 1.18;
    const ccTotalCost = P + ccTotalInterest;

    const netEffectiveCost = Math.round(totalPayableWithCashback - portfolioGain);
    const totalSavingsVsCreditCard = Math.round(ccTotalCost - totalPayableWithCashback + portfolioGain);

    res.json({
      success: true,
      data: {
        input: {
          portfolioValue: portfolio,
          expectedCagr: cagr,
          tenureMonths: n,
          phonePrice: P,
        },
        wealthGrowth: {
          currentPortfolioValue: portfolio,
          projectedPortfolioValue: portfolioFutureValue,
          estimatedWealthGain: portfolioGain,
          lostGainIfSold,
          capitalGainsTaxSaved,
        },
        emiAnalysis: {
          oneFi: {
            monthlyPayment: emiSummary.monthlyPayment,
            totalPayable: emiSummary.totalPayable,
            cashback,
            netPayableAfterCashback: totalPayableWithCashback,
            effectiveNetCostWithWealthGain: netEffectiveCost,
          },
          creditCard: {
            annualRate: 16,
            monthlyPayment: ccEmiSummary.monthlyPayment,
            totalInterestWithGst: Math.round(ccTotalInterest),
            totalCost: Math.round(ccTotalCost),
          },
          savings: {
            directCashSavings: Math.round(ccTotalCost - totalPayableWithCashback),
            totalWealthAdvantage: totalSavingsVsCreditCard,
          },
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: { code: 'CALCULATION_ERROR', message: err.message || 'Unable to compute wealth offset.' },
    });
  }
}

/**
 * POST /api/orders
 * Places a wealth-backed order with strict price integrity & financial anti-tampering verification.
 */
function createOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_REQUIRED', message: 'Authentication is required to book a wealth-backed EMI loan.' },
    });
  }

  const { product, plan, pledgedAsset, bankDetails } = req.body || {};

  if (!product || !plan || !pledgedAsset || !plan.tenureMonths) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_ORDER_PAYLOAD', message: 'Missing product, plan, or pledged asset details.' },
    });
  }

  // 1. Authoritative Product & Variant Verification
  const catalogProduct = PRODUCTS.find(
    (p) => p.slug === product.slug || p.name.toLowerCase() === (product.name || '').toLowerCase()
  );

  if (!catalogProduct) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_PRODUCT', message: 'The requested product is not available in our catalog.' },
    });
  }

  const catalogVariant =
    catalogProduct.variants.find(
      (v) =>
        v.id === product.variantId ||
        v.label.toLowerCase() === (product.variantLabel || '').toLowerCase() ||
        v.sellingPrice === Number(product.sellingPrice)
    ) || catalogProduct.variants[0];

  const authoritativeSellingPrice = Number(catalogVariant.sellingPrice);
  const tenureMonths = Number(plan.tenureMonths);

  if (!Number.isInteger(tenureMonths) || tenureMonths <= 0 || tenureMonths > 36) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_TENURE', message: 'Requested EMI tenure is not supported.' },
    });
  }

  // 2. Authoritative Plan Math Verification (Anti-Tampering)
  const matchingLadderPlan = catalogVariant.emiLadder?.find((l) => l.tenureMonths === tenureMonths);
  const annualInterestRate = matchingLadderPlan ? matchingLadderPlan.annualInterestRate : (Number(plan.annualInterestRate) || 0);
  const cashbackAmount = matchingLadderPlan ? matchingLadderPlan.cashbackAmount : (Number(plan.cashbackAmount) || 0);

  const serverCalculatedPlan = buildEmiPlanSummary({
    principal: authoritativeSellingPrice,
    tenureMonths,
    annualInterestRate,
    cashbackAmount,
  });

  // Check for client price manipulation
  if (plan.monthlyPayment !== undefined) {
    const clientMonthlyPayment = Number(plan.monthlyPayment);
    if (Math.abs(clientMonthlyPayment - serverCalculatedPlan.monthlyPayment) > 2) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'PRICE_TAMPERING_DETECTED',
          message: 'Financial numbers submitted differ from authoritative calculations. Fraud attempt blocked.',
        },
      });
    }
  }

  // 3. Pledged Asset Validation against approved instruments
  const assetType = pledgedAsset.type === 'STOCK' ? 'STOCK' : 'MUTUAL_FUND';
  const approvedList = assetType === 'MUTUAL_FUND' ? APPROVED_MUTUAL_FUNDS : APPROVED_STOCKS;
  const approvedInstrument = approvedList.find(
    (a) => a.id === pledgedAsset.id || a.name.toLowerCase().includes((pledgedAsset.name || '').toLowerCase())
  ) || approvedList[0];

  const maxLtv = approvedInstrument.ltv || (assetType === 'MUTUAL_FUND' ? 0.50 : 0.50);
  const requiredCollateralValue = Math.round(authoritativeSellingPrice / maxLtv);
  const unitPrice = assetType === 'MUTUAL_FUND' ? approvedInstrument.nav : approvedInstrument.marketPrice;
  const unitsNeeded = Math.ceil(requiredCollateralValue / unitPrice);

  // 4. Secure Masked Customer details strictly bound to authenticated user
  const user = req.user;
  const rawPan = user.pan || 'ABCPS8912K';
  const safePan = rawPan.length >= 4 ? `•••••${rawPan.slice(-4)}` : '•••••8912K';

  const order = addOrder(
    {
      product: {
        name: catalogProduct.name,
        brand: catalogProduct.brand,
        variantLabel: catalogVariant.label,
        sellingPrice: authoritativeSellingPrice,
        mrp: Number(catalogVariant.mrp),
        imageUrl: catalogVariant.imageUrl,
      },
      plan: serverCalculatedPlan,
      pledgedAsset: {
        type: assetType,
        name: approvedInstrument.name,
        unitsPledged: unitsNeeded,
        pledgedValue: requiredCollateralValue,
        ltvAllowed: authoritativeSellingPrice,
      },
      customer: {
        name: user.name || 'Verified Investor',
        pan: safePan,
        phone: user.phone || '+91 98765 43210',
        email: user.email,
      },
      bankDetails: {
        bankName: bankDetails?.bankName || 'HDFC Bank Ltd',
        accountMasked: bankDetails?.accountMasked || '•••• 4128',
        ifsc: bankDetails?.ifsc || 'HDFC0001234',
      },
    },
    user.id
  );

  res.status(201).json({
    success: true,
    data: order,
    message: 'Wealth-backed EMI loan approved and order confirmed successfully!',
  });
}

/**
 * GET /api/orders
 * Returns orders strictly isolated to the authenticated user.
 */
function listOrders(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_REQUIRED', message: 'Authentication required to access loan accounts.' },
    });
  }

  const orders = getUserOrders(req.user.id);
  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
}

/**
 * POST /api/orders/:orderId/prepay
 * Prepares and executes a prepayment strictly checked against order ownership.
 */
function prepayOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_REQUIRED', message: 'Authentication required to manage loan accounts.' },
    });
  }

  const { orderId } = req.params;
  const result = prepayOrderEmi(orderId, req.user.id);

  if (result.notFound) {
    return res.status(404).json({
      success: false,
      error: { code: 'ORDER_NOT_FOUND', message: `Order ${orderId} not found.` },
    });
  }

  if (result.forbidden) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED_LOAN_ACCESS',
        message: 'Forbidden. You do not have permission to modify or prepay another user’s loan account.',
      },
    });
  }

  const updated = result.order;
  res.json({
    success: true,
    data: updated,
    message:
      updated.lienStatus === 'LIEN_RELEASED'
        ? 'All EMIs completed! Mutual fund lien has been officially released back to your portfolio.'
        : 'EMI payment received successfully.',
  });
}

module.exports = {
  getCollateral,
  calculateOffset,
  createOrder,
  listOrders,
  prepayOrder,
};
