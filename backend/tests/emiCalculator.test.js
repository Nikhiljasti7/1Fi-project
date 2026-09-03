const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateEmi, buildEmiPlanSummary } = require('../utils/emiCalculator');

test('0% interest splits principal evenly across tenure', () => {
  const { monthlyPayment, totalPayable, totalInterest } = calculateEmi({
    principal: 120000,
    tenureMonths: 12,
    annualInterestRate: 0,
  });
  assert.equal(monthlyPayment, 10000);
  assert.equal(totalPayable, 120000);
  assert.equal(totalInterest, 0);
});

test('interest-bearing EMI matches reducing-balance formula', () => {
  // P=100000, annual rate=12% => monthly r=1%, n=12
  // Known reducing-balance EMI for these inputs ≈ 8884.88
  const { monthlyPayment } = calculateEmi({
    principal: 100000,
    tenureMonths: 12,
    annualInterestRate: 12,
  });
  assert.ok(Math.abs(monthlyPayment - 8884.88) < 0.5);
});

test('total interest is non-negative and total payable >= principal', () => {
  const { totalPayable, totalInterest } = calculateEmi({
    principal: 65000,
    tenureMonths: 36,
    annualInterestRate: 10.5,
  });
  assert.ok(totalInterest >= 0);
  assert.ok(totalPayable >= 65000);
});

test('rejects invalid inputs', () => {
  assert.throws(() => calculateEmi({ principal: 0, tenureMonths: 12, annualInterestRate: 0 }));
  assert.throws(() => calculateEmi({ principal: 1000, tenureMonths: 0, annualInterestRate: 0 }));
  assert.throws(() => calculateEmi({ principal: 1000, tenureMonths: 12, annualInterestRate: -5 }));
});

test('plan summary applies cashback correctly and never goes negative', () => {
  const summary = buildEmiPlanSummary({
    principal: 65000,
    tenureMonths: 3,
    annualInterestRate: 0,
    cashbackAmount: 100000, // deliberately larger than the total payable
  });
  assert.equal(summary.effectiveAmountAfterCashback, 0);
});
