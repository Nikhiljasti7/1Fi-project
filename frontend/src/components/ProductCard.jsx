import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format.js';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onToggleCompare, isCompared }) {
  const { previewVariant } = product;
  const discountPct =
    previewVariant.mrp > previewVariant.sellingPrice
      ? Math.round(((previewVariant.mrp - previewVariant.sellingPrice) / previewVariant.mrp) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/50 hover:shadow-card-hover">
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
          {product.brand}
        </span>
        {product.previewVariant?.maxCashback > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            ₹{product.previewVariant.maxCashback.toLocaleString('en-IN')} Cashback
          </span>
        )}
      </div>

      {/* Image Showcase Container */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50/90 to-slate-100/70 p-4 border border-slate-100"
      >
        <img
          src={previewVariant.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105 drop-shadow-md"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Soft light glow behind phone */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none group-hover:opacity-100 transition duration-500" />
      </Link>

      {/* Info Section */}
      <div className="mt-4 flex-1 flex flex-col">
        {/* Color Dots */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.availableColors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="h-3.5 w-3.5 rounded-full border border-slate-300 shadow-sm"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.availableColors.length > 4 && (
              <span className="text-[10px] text-slate-400 font-medium">
                +{product.availableColors.length - 4}
              </span>
            )}
          </div>
        )}

        <Link to={`/products/${product.slug}`} className="block group-hover:text-indigo-600 transition">
          <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
          {product.tagline || previewVariant.label}
        </p>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold text-slate-900">
            {formatINR(previewVariant.sellingPrice)}
          </span>
          {previewVariant.mrp > previewVariant.sellingPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatINR(previewVariant.mrp)}
            </span>
          )}
          {discountPct > 0 && (
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              {discountPct}% off
            </span>
          )}
        </div>

        {/* Wealth Backed EMI Callout */}
        <div className="mt-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Wealth-Backed EMI:
            </span>
            <span className="text-xs font-extrabold text-emerald-700">
              {previewVariant.startingMonthlyEmi ? `From ${formatINR(previewVariant.startingMonthlyEmi)}/mo` : '0% EMI'}
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-slate-500 font-medium">
            Pledge Mutual Fund units • 0% card limit blocked
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleCompare(product);
            }}
            className={[
              'text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border transition',
              isCompared
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700 font-bold'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100',
            ].join(' ')}
          >
            {isCompared ? '✓ Added' : '+ Compare'}
          </button>
        )}

        <Link
          to={`/products/${product.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-2.5 px-3 text-xs font-bold text-white shadow-md shadow-indigo-600/15 transition hover:from-indigo-700 hover:to-indigo-800"
        >
          <span>View Plans</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
