import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ title, message, onRetry }) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50/90 p-8 sm:p-12 text-center shadow-sm my-6 max-w-xl mx-auto">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="font-display font-bold text-lg text-slate-900">{title || 'Something went wrong'}</h3>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
        {message || 'Unable to connect to the 1Fi backend service.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
