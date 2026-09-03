import { formatINR } from '../utils/format.js';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';

export default function EmiPlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={[
        'group relative flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 backdrop-blur-xl',
        isSelected
          ? 'border-emerald-500 bg-emerald-950/30 shadow-glow-emerald ring-1 ring-emerald-500/60'
          : 'border-white/10 bg-slate-900/50 hover:border-white/20 hover:bg-slate-900/80',
      ].join(' ')}
    >
      <div className="flex-1">
        {/* Top badges */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="font-display text-lg font-extrabold text-white">
            {formatINR(plan.monthlyPayment)}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            × {plan.tenureMonths} mos
          </span>

          {plan.isRecommended && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              <Sparkles className="h-3 w-3" />
              Best Value
            </span>
          )}

          {plan.annualInterestRate === 0 ? (
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              0% No-Cost EMI
            </span>
          ) : (
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-300">
              {plan.annualInterestRate}% p.a.
            </span>
          )}
        </div>

        {/* Cashback & Net Effective Callout */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          {plan.cashbackAmount > 0 && (
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <span>+ {formatINR(plan.cashbackAmount)} Cashback</span>
            </span>
          )}

          <span className="text-slate-500">•</span>

          <span>
            Net Total: <strong className="text-slate-200">{formatINR(plan.effectiveAmountAfterCashback)}</strong>
          </span>
        </div>

        {/* Mutual fund backing footnote */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{plan.fundBackingNote || 'Backed by Mutual Fund / Stock Pledge'}</span>
        </div>
      </div>

      {/* Radio Check Indicator */}
      <div
        className={[
          'grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition',
          isSelected
            ? 'border-emerald-400 bg-emerald-500 text-dark-950 shadow-sm'
            : 'border-slate-600 bg-slate-800/60 group-hover:border-slate-500',
        ].join(' ')}
      >
        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
      </div>
    </button>
  );
}
