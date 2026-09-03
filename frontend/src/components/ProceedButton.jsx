import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProceedButton({ disabled, onProceed }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onProceed}
      className={[
        'group relative flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 px-6 text-sm font-bold text-white shadow-xl transition-all duration-300',
        disabled
          ? 'cursor-not-allowed bg-slate-200 text-slate-400 border border-slate-200'
          : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99] border border-transparent',
      ].join(' ')}
    >
      <ShieldCheck className="h-4 w-4 text-emerald-300" />
      <span>Proceed with Wealth-Backed EMI</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  );
}
