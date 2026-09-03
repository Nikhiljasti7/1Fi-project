import { formatINR } from '../utils/format.js';
import { Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function PriceSummary({ variant, selectedPlan }) {
  const discountPct =
    variant.mrp > 0 ? Math.round(((variant.mrp - variant.sellingPrice) / variant.mrp) * 100) : 0;

  // Approximate 14% annual portfolio compounding offset on average ₹1.5L portfolio
  const tenureYears = selectedPlan ? selectedPlan.tenureMonths / 12 : 1;
  const estimatedWealthGrowth = Math.round(150000 * (Math.pow(1 + 0.14, tenureYears) - 1));

  return (
    <div className="space-y-4">
      {/* Price Header */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-extrabold text-white">
            {formatINR(variant.sellingPrice)}
          </span>
          {variant.mrp > variant.sellingPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatINR(variant.mrp)}
            </span>
          )}
          {discountPct > 0 && (
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              {discountPct}% OFF
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Inclusive of all GST &amp; import taxes • Free nationwide express insured delivery
        </p>
      </div>

      {/* Selected Plan Financial Details */}
      {selectedPlan && (
        <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-b from-slate-900/90 to-dark-950/90 p-5 text-sm backdrop-blur-xl shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-400" />
              Financial Plan Breakdown
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {selectedPlan.tenureMonths} Months Ladder
            </span>
          </div>

          <dl className="mt-3 space-y-2 text-xs">
            <Row label="Monthly Payment (EMI)" value={formatINR(selectedPlan.monthlyPayment)} strong />
            <Row label="Tenure Duration" value={`${selectedPlan.tenureMonths} Months`} />
            <Row
              label="Annual Interest Rate"
              value={
                selectedPlan.annualInterestRate === 0
                  ? '0% (Subsidized No-Cost)'
                  : `${selectedPlan.annualInterestRate}% p.a.`
              }
              accent={selectedPlan.annualInterestRate === 0}
            />
            <Row label="Total Amount Payable" value={formatINR(selectedPlan.totalPayable)} />
            <Row label="Total Interest Charge" value={formatINR(selectedPlan.totalInterest)} />

            {selectedPlan.cashbackAmount > 0 && (
              <Row
                label="Direct Instant Cashback"
                value={`− ${formatINR(selectedPlan.cashbackAmount)}`}
                highlight
              />
            )}

            <div className="my-2 border-t border-white/10" />

            <Row
              label="Net Effective Phone Cost"
              value={formatINR(selectedPlan.effectiveAmountAfterCashback)}
              strong
              highlight
            />
          </dl>

          {/* Wealth Compounding Offset Highlight */}
          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Portfolio Compounding Offset:
              </span>
              <span className="font-bold text-emerald-400">
                + {formatINR(estimatedWealthGrowth)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-snug">
              While you pay {formatINR(selectedPlan.monthlyPayment)}/mo, your pledged ₹1.5L mutual fund portfolio continues compounding returns, effectively offsetting your device cost!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, strong, accent, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-400">{label}</dt>
      <dd
        className={[
          strong ? 'font-bold text-white text-sm' : 'text-slate-200',
          accent ? 'text-emerald-400 font-semibold' : '',
          highlight ? 'text-emerald-400 font-bold' : '',
        ].join(' ')}
      >
        {value}
      </dd>
    </div>
  );
}
