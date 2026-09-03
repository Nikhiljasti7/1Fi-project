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
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow-brand">
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-2 z-10">
        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
          {product.brand}
        </span>
        {product.previewVariant?.maxCashback > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            <Sparkles className="h-3 w-3" />
            ₹{product.previewVariant.maxCashback.toLocaleString('en-IN')} Cashback
          </span>
        )}
      </div>

      {/* Image Container with Fallback */}
      <Link to={`/products/${product.slug}`} className="block relative aspect-square w-full overflow-hidden rounded-xl bg-slate-950/60 p-4">
        <img
          src={previewVariant.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Subtle glow behind phone */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40 group-hover:opacity-80 transition duration-500" />
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
                className="h-3 w-3 rounded-full border border-white/20 shadow-sm"
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

        <Link to={`/products/${product.slug}`} className="block group-hover:text-brand-400 transition">
          <h3 className="font-display text-base font-bold text-white group-hover:text-brand-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
          {product.tagline || previewVariant.label}
        </p>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold text-white">
            {formatINR(previewVariant.sellingPrice)}
          </span>
          {previewVariant.mrp > previewVariant.sellingPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatINR(previewVariant.mrp)}
            </span>
          )}
          {discountPct > 0 && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              {discountPct}% off
            </span>
          )}
        </div>

        {/* Wealth Backed EMI Callout */}
        <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Wealth-Backed EMI:
            </span>
            <span className="text-xs font-bold text-emerald-400">
              {previewVariant.startingMonthlyEmi ? `From ${formatINR(previewVariant.startingMonthlyEmi)}/mo` : '0% EMI'}
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Pledge Mutual Fund units • 0% card limit blocked
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleCompare(product);
            }}
            className={[
              'text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition',
              isCompared
                ? 'border-brand-500 bg-brand-500/20 text-brand-300'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20',
            ].join(' ')}
          >
            {isCompared ? '✓ Added' : '+ Compare'}
          </button>
        )}

        <Link
          to={`/products/${product.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-2 px-3 text-xs font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:from-brand-500 hover:to-brand-400"
        >
          <span>View Plans</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
