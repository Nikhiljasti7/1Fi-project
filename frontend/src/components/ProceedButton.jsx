import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function ProceedButton({ disabled, onProceed }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onProceed}
      className={[
        'group relative flex w-full items-center justify-center gap-2 rounded-[64px] py-3.5 px-6 text-sm font-medium text-white transition-all duration-150',
        disabled
          ? 'cursor-not-allowed bg-[#ededed] text-[#8c8c8c] dark:bg-[#272727]'
          : 'bg-[#0070d5] hover:bg-[#005fb8] shadow-none',
      ].join(' ')}
    >
      <ShieldCheck className="h-4 w-4" />
      <span>Proceed to Digital Pledge &amp; EMI</span>
      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  );
}
