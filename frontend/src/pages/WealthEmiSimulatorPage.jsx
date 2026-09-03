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
    const sellMutualFundsCost = P + lostCompounding + taxImpact;

    // Net wealth advantage of 1Fi:
    // Portfolio earned money + saved credit card interest + received cashback!
    const netSavingsVsCreditCard = Math.round(ccTotalCost - oneFiNetPayable + portfolioGrowth);

    return {
      portfolioGrowth,
      oneFi: {
        annualRate,
        monthlyEmi: Math.round(monthlyEmi),
        totalPayable: Math.round(oneFiTotalPayable),
        cashback,
        netPayable: Math.round(oneFiNetPayable),
      },
      creditCard: {
        monthlyEmi: Math.round(ccMonthlyEmi),
        totalInterest: Math.round(ccInterest),
        totalCost: Math.round(ccTotalCost),
      },
      sellFunds: {
        lostCompounding,
        taxImpact,
        totalEffectiveLoss: Math.round(lostCompounding + taxImpact),
      },
      netSavingsVsCreditCard,
    };
  }, [phonePrice, portfolioValue, expectedCagr, tenureMonths]);

  const faqs = [
    {
      q: 'Do I have to sell my mutual funds or transfer them to 1Fi?',
      a: 'No! You never sell your mutual fund units or stocks. You simply create a digital lien (pledge) on your existing units via CAMS, KFintech, CDSL, or NSDL. The units remain registered in your own folio and Demat account, continuing to earn all dividends, NAV growth, and market gains.',
    },
    {
      q: 'How does 1Fi offer 0% No-Cost EMI on flagship phones?',
      a: 'Through our tie-ups with leading smartphone manufacturers (Apple, Samsung, OnePlus) and our partnering NBFCs, the interest cost is subsidized by brand subventions and manufacturer cashback, while your collateral guarantees 100% security.',
    },
    {
      q: 'What happens when I pay off the final EMI?',
      a: 'The moment your last monthly EMI is settled, our automated e-NACH system issues an instant No Objection Certificate (NOC) and unpledges your units automatically within 24 hours.',
    },
    {
      q: 'Can the market falling cause a margin call on a smartphone loan?',
      a: 'Because smartphone loans are small relative to your portfolio (typically <15% of your total wealth) and we maintain conservative LTV ratios (50% on equity funds, 80% on debt funds), market fluctuations almost never trigger margin calls for retail consumer devices.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-xl mb-4">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span>Wealth Compounding Offset Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Don't Sell Your Investments.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Let Them Pay Your EMI.
          </span>
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          See the mathematical magic of 1Fi Wealth-Backed EMI. Compare what happens when you break an investment vs. swipe a high-interest credit card vs. pledge units.
        </p>
      </div>

      {/* Main Interactive Calculator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Controls & Sliders (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-glass">
          <h2 className="font-display font-bold text-lg text-white border-b border-white/10 pb-3">
            Interactive Financial Parameters
          </h2>

          {/* Slider 1: Phone Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Smartphone Price:</span>
              <span className="font-display font-bold text-white">{formatINR(phonePrice)}</span>
            </div>
            <input
              type="range"
              min="40000"
              max="180000"
              step="5000"
              value={phonePrice}
              onChange={(e) => setPhonePrice(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹40,000 (OnePlus)</span>
              <span>₹1,80,000 (Fold 6 / Pro Max)</span>
            </div>
          </div>

          {/* Slider 2: Portfolio Value */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Existing MF &amp; Stock Holdings:</span>
              <span className="font-display font-bold text-emerald-400">{formatINR(portfolioValue)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="1500000"
              step="25000"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹1,00,000</span>
              <span>₹15,00,000</span>
            </div>
          </div>

          {/* Slider 3: Expected CAGR */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Expected Annual Portfolio CAGR:</span>
              <span className="font-display font-bold text-cyan-400">{expectedCagr}% per year</span>
            </div>
            <input
              type="range"
              min="8"
              max="22"
              step="1"
              value={expectedCagr}
              onChange={(e) => setExpectedCagr(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>8% (Debt/Hybrid)</span>
              <span>14% (Index/Large Cap)</span>
              <span>22% (Flexi/Mid Cap)</span>
            </div>
          </div>

          {/* Tenure Buttons */}
          <div className="space-y-2">
            <span className="block text-xs text-slate-300 font-medium">EMI Tenure Duration:</span>
            <div className="grid grid-cols-4 gap-2">
              {[6, 12, 18, 24].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenureMonths(t)}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    tenureMonths === t
                      ? 'bg-brand-600 text-white shadow-glow-brand'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {t} Mos
                </button>
              ))}
            </div>
          </div>

          {/* Quick CTA */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-500 py-3 text-xs font-bold text-white shadow-glow-brand hover:from-brand-500 hover:to-emerald-400"
          >
            <span>Apply This to Any Phone</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right: 3-Way Comparative Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Net Wealth Card */}
          <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-dark-900/90 to-dark-950 p-6 sm:p-8 backdrop-blur-2xl shadow-glass space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                1Fi Total Wealth Advantage
              </span>
              <span className="text-xs text-slate-400 font-medium">Over {tenureMonths} Months</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
              <div>
                <span className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-400">
                  + {formatINR(calculations.netSavingsVsCreditCard)}
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Net wealth retained compared to high-interest credit card financing
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Portfolio Compounded Gains:</span>
                <span className="font-display font-bold text-white text-lg">
                  + {formatINR(calculations.portfolioGrowth)}
                </span>
              </div>
            </div>
          </div>

          {/* 3-Way Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. 1Fi Wealth-Backed EMI */}
            <div className="rounded-2xl border-2 border-emerald-500/60 bg-emerald-950/20 p-4 space-y-3 relative shadow-glow-emerald">
              <div className="absolute -top-3 left-4 bg-emerald-500 text-dark-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                Best Choice
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-white text-sm">1Fi Wealth-Backed</h3>
                <p className="text-[11px] text-slate-400">Pledge units at 0%</p>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly EMI:</span>
                  <span className="font-bold text-emerald-300">{formatINR(calculations.oneFi.monthlyEmi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest Rate:</span>
                  <span className="font-semibold text-emerald-400">{calculations.oneFi.annualRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cashback:</span>
                  <span className="font-bold text-emerald-400">− {formatINR(calculations.oneFi.cashback)}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="font-semibold text-slate-300">Net Cost:</span>
                  <span className="font-bold text-white">{formatINR(calculations.oneFi.netPayable)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 pt-1">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                <span>Portfolio gains ₹{calculations.portfolioGrowth.toLocaleString('en-IN')}!</span>
              </div>
            </div>

            {/* 2. Traditional Credit Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
              <div className="pt-2">
                <h3 className="font-bold text-white text-sm">Credit Card EMI</h3>
                <p className="text-[11px] text-slate-400">16% APR + 18% GST</p>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly EMI:</span>
                  <span className="font-bold text-slate-300">{formatINR(calculations.creditCard.monthlyEmi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest + GST:</span>
                  <span className="font-semibold text-rose-400">+ {formatINR(calculations.creditCard.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cashback:</span>
                  <span className="font-semibold text-slate-500">₹0</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="font-semibold text-slate-300">Total Outlay:</span>
                  <span className="font-bold text-rose-300">{formatINR(calculations.creditCard.totalCost)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-rose-400 pt-1">
                <XCircle className="h-3 w-3 shrink-0" />
                <span>Blocks {formatINR(phonePrice)} card limit</span>
              </div>
            </div>

            {/* 3. Breaking / Selling SIP */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
              <div className="pt-2">
                <h3 className="font-bold text-white text-sm">Selling MF Units</h3>
                <p className="text-[11px] text-slate-400">Withdraw upfront cash</p>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Upfront Debit:</span>
                  <span className="font-bold text-slate-300">{formatINR(phonePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lost Growth:</span>
                  <span className="font-semibold text-amber-400">− {formatINR(calculations.sellFunds.lostCompounding)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">12.5% LTCG Tax:</span>
                  <span className="font-semibold text-rose-400">− {formatINR(calculations.sellFunds.taxImpact)}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="font-semibold text-slate-300">Real Wealth Loss:</span>
                  <span className="font-bold text-rose-300">{formatINR(calculations.sellFunds.totalEffectiveLoss)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-amber-400 pt-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>Destroys future compounding</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-xl max-w-4xl mx-auto space-y-4">
        <h3 className="font-display font-bold text-xl text-white text-center mb-6">
          Frequently Asked Questions on Wealth-Backed EMI
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs cursor-pointer transition hover:border-white/20"
              onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
            >
              <div className="flex items-center justify-between font-bold text-white text-sm">
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
              </div>
              {expandedFaq === idx && (
                <p className="mt-3 text-slate-400 leading-relaxed text-xs pt-2 border-t border-white/5">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
