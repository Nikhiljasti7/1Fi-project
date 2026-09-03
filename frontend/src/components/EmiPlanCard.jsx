import { formatINR } from '../utils/format.js';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';

export default function EmiPlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={[
        'group relative flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200',
        isSelected
          ? 'border-emerald-500 bg-emerald-50/80 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80',
      ].join(' ')}
    >
      <div className="flex-1">
        {/* Top badges */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="font-display text-lg font-extrabold text-slate-900">
            {formatINR(plan.monthlyPayment)}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            × {plan.tenureMonths} mos
          </span>

          {plan.isRecommended && (
            <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">
              <Sparkles className="h-3 w-3 text-amber-600" />
              Best Value
            </span>
          )}

          {plan.annualInterestRate === 0 ? (
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
              0% No-Cost EMI
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
              {plan.annualInterestRate}% p.a.
            </span>
          )}
        </div>

        {/* Cashback & Net Effective Callout */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          {plan.cashbackAmount > 0 && (
            <span className="font-bold text-emerald-700">
              + {formatINR(plan.cashbackAmount)} Cashback
            </span>
          )}

          <span className="text-slate-300">•</span>

          <span>
            Net Total: <strong className="text-slate-900 font-bold">{formatINR(plan.effectiveAmountAfterCashback)}</strong>
          </span>
        </div>

        {/* Mutual fund backing footnote */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">{plan.fundBackingNote || 'Backed by Mutual Fund / Stock Pledge'}</span>
        </div>
      </div>

      {/* Radio Check Indicator */}
      <div
        className={[
          'grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition',
          isSelected
            ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
            : 'border-slate-300 bg-slate-50 group-hover:border-slate-400',
        ].join(' ')}
      >
        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
      </div>
    </button>
  );
}
