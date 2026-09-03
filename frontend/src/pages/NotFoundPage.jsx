import { Link } from 'react-router-dom';
import { Smartphone, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
        <Smartphone className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-bold text-white">Page not found</h1>
      <p className="text-xs text-slate-400 max-w-xs">
        The smartphone or page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-glow-brand hover:from-brand-500 hover:to-emerald-400 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Marketplace</span>
      </Link>
    </div>
  );
}
