/**
 * EMI calculation utilities.
 *
 * Standard reducing-balance formula:
 *   EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where P = principal, r = monthly interest rate (annual/12/100), n = tenure in months.
 *
 * For 0% interest, the formula above divides by zero, so we fall back to a flat split:
 *   EMI = P / n
 */

function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateEmi({ principal, tenureMonths, annualInterestRate }) {
  const P = Number(principal);
  const n = Number(tenureMonths);
  const annualRate = Number(annualInterestRate);

  if (!Number.isFinite(P) || P <= 0) throw new Error('Invalid principal');
  if (!Number.isInteger(n) || n <= 0) throw new Error('Invalid tenure');
  if (!Number.isFinite(annualRate) || annualRate < 0) throw new Error('Invalid interest rate');

  let monthlyPayment;

  if (annualRate === 0) {
    monthlyPayment = P / n;
  } else {
    const r = annualRate / 12 / 100;
    const factor = Math.pow(1 + r, n);
    monthlyPayment = (P * r * factor) / (factor - 1);
  }

  monthlyPayment = round2(monthlyPayment);
  // For 0% interest, total payable is exactly the principal (avoids a floating-point
  // rounding artifact from monthlyPayment * n not summing back to P precisely).
  const totalPayable = annualRate === 0 ? round2(P) : round2(monthlyPayment * n);
  const totalInterest = round2(totalPayable - P);

  return {
    monthlyPayment,
    totalPayable,
    totalInterest: Math.max(totalInterest, 0),
  };
}

/**
 * Builds the full financial summary for a single EMI plan row, including
 * the effective cost after cashback.
 */
function buildEmiPlanSummary({ principal, tenureMonths, annualInterestRate, cashbackAmount }) {
  const { monthlyPayment, totalPayable, totalInterest } = calculateEmi({
    principal,
    tenureMonths,
    annualInterestRate,
  });

  const cashback = Number(cashbackAmount) || 0;
  const effectiveAmountAfterCashback = round2(Math.max(totalPayable - cashback, 0));

  return {
    tenureMonths,
    annualInterestRate: Number(annualInterestRate),
    monthlyPayment,
    totalPayable,
    totalInterest,
    cashbackAmount: cashback,
    effectiveAmountAfterCashback,
  };
}

module.exports = { calculateEmi, buildEmiPlanSummary, round2 };
