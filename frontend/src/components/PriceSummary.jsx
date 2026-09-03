import { formatINR } from '../utils/format.js';
import { Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function PriceSummary({ variant, selectedPlan }) {
  const discountPct =
    variant.mrp > 0 ? Math.round(((variant.mrp - variant.sellingPrice) / variant.mrp) * 100) : 0;

  const tenureYears = selectedPlan ? selectedPlan.tenureMonths / 12 : 1;
  const estimatedWealthGrowth = Math.round(150000 * (Math.pow(1 + 0.14, tenureYears) - 1));

  return (
    <div className="space-y-4">
      {/* Price Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-extrabold text-slate-900">
            {formatINR(variant.sellingPrice)}
          </span>
          {variant.mrp > variant.sellingPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatINR(variant.mrp)}
            </span>
          )}
          {discountPct > 0 && (
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              {discountPct}% OFF
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Inclusive of all GST &amp; import taxes • Free nationwide express insured delivery
        </p>
      </div>

      {/* Selected Plan Financial Details */}
      {selectedPlan && (
        <div className="rounded-3xl border border-indigo-200/80 bg-white/90 p-6 text-sm shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              Financial Plan Breakdown
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {selectedPlan.tenureMonths} Months Ladder
            </span>
          </div>

          <dl className="space-y-2 text-xs">
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

            <div className="my-2 border-t border-slate-100" />

            <Row
              label="Net Effective Phone Cost"
              value={formatINR(selectedPlan.effectiveAmountAfterCashback)}
              strong
              highlight
            />
          </dl>

          {/* Wealth Compounding Offset Highlight */}
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Portfolio Compounding Offset:
              </span>
              <span className="font-extrabold text-emerald-700">
                + {formatINR(estimatedWealthGrowth)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 leading-snug">
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
      <dt className="text-slate-500">{label}</dt>
      <dd
        className={[
          strong ? 'font-bold text-slate-900 text-sm' : 'text-slate-700 font-medium',
          accent ? 'text-emerald-700 font-semibold' : '',
          highlight ? 'text-emerald-700 font-bold' : '',
        ].join(' ')}
      >
        {value}
      </dd>
    </div>
  );
}
