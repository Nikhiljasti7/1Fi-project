import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format.js';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

export default function WealthEmiSimulatorPage() {
  // Simulator state
  const [phonePrice, setPhonePrice] = useState(127400);
  const [portfolioValue, setPortfolioValue] = useState(250000);
  const [expectedCagr, setExpectedCagr] = useState(14);
  const [tenureMonths, setTenureMonths] = useState(12);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Mathematical calculations
  const calculations = useMemo(() => {
    const P = Number(phonePrice);
    const n = Number(tenureMonths);
    const r = Number(expectedCagr) / 100;
    const portfolio = Number(portfolioValue);
    const years = n / 12;

    // 1. Portfolio growth if left untouched:
    const portfolioGrowth = Math.round(portfolio * (Math.pow(1 + r, years) - 1));

    // 2. 1Fi Wealth-Backed EMI (0% for <=12m, 10.5% for >12m)
    const annualRate = n <= 12 ? 0 : 10.5;
    let monthlyEmi;
    if (annualRate === 0) {
      monthlyEmi = P / n;
    } else {
      const monthlyRate = annualRate / 12 / 100;
      const factor = Math.pow(1 + monthlyRate, n);
      monthlyEmi = (P * monthlyRate * factor) / (factor - 1);
    }
    const oneFiTotalPayable = annualRate === 0 ? P : monthlyEmi * n;
    const cashback = n === 12 ? 7500 : n === 6 ? 6000 : 3000;
    const oneFiNetPayable = Math.max(0, oneFiTotalPayable - cashback);

    // 3. Credit Card EMI (typical 16% APR + 18% GST on interest)
    const ccMonthlyRate = 0.16 / 12;
    const ccFactor = Math.pow(1 + ccMonthlyRate, n);
    const ccMonthlyEmi = (P * ccMonthlyRate * ccFactor) / (ccFactor - 1);
    const ccTotalPayable = ccMonthlyEmi * n;
    const ccInterest = (ccTotalPayable - P) * 1.18; // with GST
    const ccTotalCost = P + ccInterest;

    // 4. Selling Mutual Funds upfront:
    // Loss of future compounding on the amount withdrawn + 12.5% LTCG tax
    const lostCompounding = Math.round(P * (Math.pow(1 + r, years) - 1));
    const taxImpact = Math.round(lostCompounding * 0.125);
    const sellingTotalDamage = P + lostCompounding + taxImpact;

    // Savings comparing 1Fi vs CC
    const savingsVsCC = Math.round(ccTotalCost - oneFiNetPayable);

    return {
      portfolioGrowth,
      monthlyEmi,
      oneFiNetPayable,
      cashback,
      annualRate,
      ccTotalCost,
      ccInterest,
      sellingTotalDamage,
      lostCompounding,
      savingsVsCC,
    };
  }, [phonePrice, portfolioValue, expectedCagr, tenureMonths]);

  const faqs = [
    {
      q: 'Do I lose ownership of my Mutual Funds or Demat Stocks?',
      a: 'Never! Your units stay in your existing folio with CAMS, KFintech, or your broker (Zerodha, Groww, AngelOne). You continue earning all NAV capital gains, stock market growth, and dividends.',
    },
    {
      q: 'How does 1Fi offer 0% No-Cost EMI on pledged collateral?',
      a: 'Because the loan is fully secured against top-tier liquid mutual funds and bluechip stocks, lenders face near-zero default risk. 1Fi partners directly with smartphone manufacturers to subsidize interest, passing full subvention and cashbacks to you.',
    },
    {
      q: 'When is the pledge lien released?',
      a: 'The moment your final e-NACH EMI debit clears, 1Fi automatically triggers an API release instruction to CAMS / CDSL. Your units are marked unpledged within 2 hours.',
    },
    {
      q: 'Can I prepay my loan before tenure ends?',
      a: 'Yes! 1Fi charges 0% pre-closure fees. You can prepay partially or fully at any time from your Orders Dashboard, and the collateral lien is immediately released.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-12 bg-slate-50">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-sm">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
          <span>Interactive Compounding Offset Calculator</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          See How Your Portfolio Pays For Your Phone
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Compare the true mathematical cost of <strong className="text-emerald-700">1Fi Wealth-Backed EMI</strong> against traditional high-interest Credit Card EMIs and the hidden cost of selling mutual funds.
        </p>
      </div>

      {/* Main Interactive Calculator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Control Sliders (Cols 1-5) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-base text-slate-900 flex items-center justify-between pb-3 border-b border-slate-100">
            <span>Adjust Your Parameters</span>
            <span className="text-[11px] font-semibold text-emerald-700">Live Updating</span>
          </h2>

          {/* Slider 1: Phone Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="sim-phone-price" className="text-slate-600 font-medium">Smartphone Cost</label>
              <span className="font-display font-extrabold text-slate-900">{formatINR(phonePrice)}</span>
            </div>
            <input
              id="sim-phone-price"
              type="range"
              min="40000"
              max="250000"
              step="5000"
              value={phonePrice}
              onChange={(e) => setPhonePrice(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹40,000</span>
              <span>₹1,50,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          {/* Slider 2: Portfolio Size */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="sim-portfolio-value" className="text-slate-600 font-medium">Total Mutual Fund Portfolio Size</label>
              <span className="font-display font-extrabold text-emerald-700">{formatINR(portfolioValue)}</span>
            </div>
            <input
              id="sim-portfolio-value"
              type="range"
              min="100000"
              max="2000000"
              step="25000"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹1 Lakh</span>
              <span>₹10 Lakhs</span>
              <span>₹20 Lakhs</span>
            </div>
          </div>

          {/* Slider 3: Expected CAGR */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="sim-expected-cagr" className="text-slate-600 font-medium">Expected Annual Portfolio CAGR</label>
              <span className="font-extrabold text-indigo-700">{expectedCagr}% p.a.</span>
            </div>
            <input
              id="sim-expected-cagr"
              type="range"
              min="8"
              max="22"
              step="1"
              value={expectedCagr}
              onChange={(e) => setExpectedCagr(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>8% (Conservative)</span>
              <span>14% (Nifty 50)</span>
              <span>22% (Smallcap/Alpha)</span>
            </div>
          </div>

          {/* Slider 4: Tenure in Months */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-slate-600 font-medium">Financing Tenure</label>
              <span className="font-bold text-slate-900">{tenureMonths} Months</span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[6, 12, 24, 36].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTenureMonths(m)}
                  className={[
                    'py-2 rounded-xl text-xs font-bold transition',
                    tenureMonths === m
                      ? 'border border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {m}M {m <= 12 ? ' (0%)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Growth Result Box */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Portfolio Return in {tenureMonths} Months:
              </span>
              <span className="font-display font-extrabold text-emerald-700 text-sm">
                + {formatINR(calculations.portfolioGrowth)}
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              By keeping your {formatINR(portfolioValue)} invested at {expectedCagr}% CAGR instead of withdrawing it, your gains exceed the cost of the phone!
            </p>
          </div>
        </div>

        {/* Right: 3-Way Comparative Cards (Cols 6-12) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: 1Fi Wealth-Backed EMI (Winner) */}
            <div className="relative rounded-3xl border-2 border-emerald-500 bg-emerald-50/80 p-5 shadow-lg shadow-emerald-500/10 flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm">
                Recommended
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 pt-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-emerald-800">
                    1Fi Wealth-Backed
                  </span>
                </div>
                <div className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                  {formatINR(calculations.oneFiNetPayable)}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  Monthly: {formatINR(calculations.monthlyEmi)}/mo
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>0% Card limit blocked</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>₹{calculations.cashback.toLocaleString('en-IN')} Instant cashback</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Investments keep earning {expectedCagr}%</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-200">
                <span className="block text-[10px] uppercase font-bold text-emerald-700">
                  Net Financial Advantage
                </span>
                <span className="font-display text-sm font-extrabold text-emerald-800">
                  Save {formatINR(calculations.savingsVsCC)} vs Credit Card
                </span>
              </div>
            </div>

            {/* Card 2: Credit Card EMI */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
                    Credit Card EMI
                  </span>
                </div>
                <div className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                  {formatINR(calculations.ccTotalCost)}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  16% APR + 18% GST on interest
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Blocks {formatINR(phonePrice)} card limit</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>+{formatINR(calculations.ccInterest)} Interest &amp; GST</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Hurts credit score utilization</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Higher monthly outflow with strict penalties for late fees.
              </div>
            </div>

            {/* Card 3: Selling Mutual Funds Upfront */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
                    Selling MF Units
                  </span>
                </div>
                <div className="font-display text-2xl font-extrabold text-rose-600 mt-1">
                  {formatINR(calculations.sellingTotalDamage)}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  True opportunity cost
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Loses {formatINR(calculations.lostCompounding)} growth</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Triggers 12.5% LTCG capital tax</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Breaks long-term compounding</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-rose-600 font-medium">
                Selling investments to buy gadgets is mathematically the worst route!
              </div>
            </div>
          </div>

          {/* Action Call to Action */}
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Ready to Upgrade Without Breaking Your Investments?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Browse our flagship catalog and select your 0% No-Cost EMI ladder.
              </p>
            </div>
            <Link
              to="/"
              className="shrink-0 flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition"
            >
              <span>Browse Smartphones</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-slate-900 pb-2 border-b border-slate-100">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <h3 className="font-display font-bold text-lg">
            Frequently Asked Questions on Wealth-Backed EMI
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    expandedFaq === i ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
