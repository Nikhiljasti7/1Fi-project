const {
  getApprovedCollateral,
  getActiveOrders,
  addOrder,
  prepayOrderEmi,
} = require('../db/wealthCatalog');
const { calculateEmi } = require('../utils/emiCalculator');

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
 * Calculates wealth compounding vs EMI cost.
 * Body: { portfolioValue, expectedCagr, tenureMonths, phonePrice, annualInterestRate, cashbackAmount }
 */
function calculateOffset(req, res) {
  const {
    portfolioValue = 150000,
    expectedCagr = 14,
    tenureMonths = 12,
    phonePrice = 127400,
    annualInterestRate = 0,
    cashbackAmount = 7500,
  } = req.body;

  const P = Number(phonePrice);
  const n = Number(tenureMonths);
  const r = Number(expectedCagr) / 100;
  const portfolio = Number(portfolioValue);

  // Future value of the portfolio if kept untouched: FV = P * (1 + r)^(n/12)
  const years = n / 12;
  const portfolioFutureValue = Math.round(portfolio * Math.pow(1 + r, years));
  const portfolioGain = portfolioFutureValue - portfolio;

  // Opportunity cost if user had sold mutual funds to buy phone upfront:
  // (Lost compounding on the phone amount)
  const lostGainIfSold = Math.round(P * (Math.pow(1 + r, years) - 1));
  const capitalGainsTaxSaved = Math.round(lostGainIfSold * 0.125); // 12.5% LTCG tax saved

  // 1Fi EMI calculation
  const emiSummary = calculateEmi({
    principal: P,
    tenureMonths: n,
    annualInterestRate: Number(annualInterestRate),
  });

  const totalPayableWithCashback = Math.max(0, emiSummary.totalPayable - Number(cashbackAmount || 0));

  // Comparison: Traditional Credit Card EMI (typically 16% APR + 18% GST on interest)
  const ccEmiSummary = calculateEmi({
    principal: P,
    tenureMonths: n,
    annualInterestRate: 16,
  });
  const ccTotalInterest = ccEmiSummary.totalInterest * 1.18; // with GST
  const ccTotalCost = P + ccTotalInterest;

  // Net effective phone cost with 1Fi Wealth-Backed EMI:
  // Phone Cost - Cashback - Portfolio Gain during this period
  // If your portfolio earned ₹24,000, that offset means you effectively paid far less!
  const netEffectiveCost = Math.round(totalPayableWithCashback - portfolioGain);
  const totalSavingsVsCreditCard = Math.round(ccTotalCost - totalPayableWithCashback + portfolioGain);

  res.json({
    success: true,
    data: {
      input: {
        portfolioValue: portfolio,
        expectedCagr: Number(expectedCagr),
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
          cashback: Number(cashbackAmount || 0),
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
}

/**
 * POST /api/orders
 * Places a wealth-backed order, creates virtual loan account, confirms pledge lien.
 */
function createOrder(req, res) {
  const { product, plan, pledgedAsset, customer, bankDetails } = req.body;

  if (!product || !plan || !pledgedAsset || !plan.tenureMonths || !plan.monthlyPayment) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_ORDER_PAYLOAD', message: 'Missing or malformed product, plan, or pledged asset details.' },
    });
  }

  // Security: Mask PAN and bank account (Rule 5)
  const rawPan = customer?.pan || 'ABCPS8912K';
  const safePan = rawPan.length >= 4 ? `•••••${rawPan.slice(-4)}` : '•••••8912K';

  const order = addOrder({
    product,
    plan,
    pledgedAsset,
    customer: {
      name: customer?.name || 'Nikhil Jasti',
      pan: safePan,
      phone: customer?.phone || '+91 98765 43210',
      email: customer?.email || 'nikhil.jasti@example.com',
    },
    bankDetails: {
      bankName: bankDetails?.bankName || 'HDFC Bank Ltd',
      accountMasked: bankDetails?.accountMasked || '•••• 4128',
      ifsc: bankDetails?.ifsc || 'HDFC0001234',
    },
  });

  res.status(201).json({
    success: true,
    data: order,
    message: 'Wealth-backed EMI loan approved and order confirmed successfully!',
  });
}

/**
 * GET /api/orders
 * Returns all active orders and loan accounts.
 */
function listOrders(req, res) {
  const orders = getActiveOrders();
  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
}

/**
 * POST /api/orders/:orderId/prepay
 * Simulates a prepayment of 1 month EMI.
 */
function prepayOrder(req, res) {
  const { orderId } = req.params;
  const updated = prepayOrderEmi(orderId);
  if (!updated) {
    return res.status(404).json({
      success: false,
      error: { code: 'ORDER_NOT_FOUND', message: `Order ${orderId} not found` },
    });
  }
  res.json({
    success: true,
    data: updated,
    message: updated.lienStatus === 'LIEN_RELEASED'
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
