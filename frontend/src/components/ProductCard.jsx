import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format.js';
import { ArrowRight, Box } from 'lucide-react';

export default function ProductCard({ product, onToggleCompare, isCompared }) {
  const { previewVariant } = product;
  const discountPct =
    previewVariant.mrp > previewVariant.sellingPrice
      ? Math.round(((previewVariant.mrp - previewVariant.sellingPrice) / previewVariant.mrp) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md">
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {product.brand}
        </span>
        {product.previewVariant?.maxCashback > 0 && (
          <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
            ₹{product.previewVariant.maxCashback.toLocaleString('en-IN')} Cashback
          </span>
        )}
      </div>

      {/* Image Showcase Container */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800 group-hover:scale-[1.01] transition-transform duration-200"
      >
        <img
          src={previewVariant.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90';
          }}
        />

        {/* 3D Badge indicator */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 shadow-sm backdrop-blur-sm">
          <Box className="h-2.5 w-2.5" />
          <span>3D 360°</span>
        </div>
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
                className="h-3 w-3 rounded-full border border-slate-300 dark:border-slate-600"
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

        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
          {product.tagline || previewVariant.label}
        </p>

        {/* Pricing & EMI Box */}
        <div className="mt-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/50 p-3">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Wealth-Backed EMI</span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">0% Interest</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
              {formatINR(previewVariant.startingMonthlyEmi)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">/month</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Price: {formatINR(previewVariant.sellingPrice)}</span>
            {discountPct > 0 && (
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Save {discountPct}%</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <Link
          to={`/products/${product.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span>Configure EMI</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        {onToggleCompare && (
          <button
            type="button"
            onClick={() => onToggleCompare(product)}
            className={[
              'rounded-lg border px-2.5 py-2 text-[11px] font-medium transition-colors',
              isCompared
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:border-indigo-500 dark:text-indigo-300 font-semibold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700',
            ].join(' ')}
          >
            {isCompared ? 'Compared' : 'Compare'}
          </button>
        )}
      </div>
    </div>
  );
}
