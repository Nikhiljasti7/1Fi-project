import { Link } from 'react-router-dom';
import { Smartphone, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center bg-slate-50">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm">
        <Smartphone className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="text-xs text-slate-500 max-w-xs font-medium">
        The smartphone or page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Marketplace</span>
      </Link>
    </div>
  );
}
