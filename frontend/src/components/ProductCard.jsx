import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format.js';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onToggleCompare, isCompared }) {
  const { previewVariant } = product;
  const discountPct =
    previewVariant.mrp > previewVariant.sellingPrice
      ? Math.round(((previewVariant.mrp - previewVariant.sellingPrice) / previewVariant.mrp) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-150 hover:border-slate-300">
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
          {product.brand}
        </span>
        {product.previewVariant?.maxCashback > 0 && (
          <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
            ₹{product.previewVariant.maxCashback.toLocaleString('en-IN')} Cashback
          </span>
        )}
      </div>

      {/* Image Showcase Container */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 p-4 border border-slate-100"
      >
        <img
          src={previewVariant.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-sm"
          onError={(e) => {
            e.currentTarget.src =
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90';
          }}
        />
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
                className="h-3 w-3 rounded-full border border-slate-300"
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
          <h3 className="font-display text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
          {product.tagline || previewVariant.label}
        </p>

        {/* Pricing & EMI Box */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[11px] font-semibold text-slate-500">Wealth-Backed EMI</span>
            <span className="text-xs font-semibold text-emerald-700">0% Interest</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-lg font-extrabold text-slate-900">
              {formatINR(previewVariant.startingMonthlyEmi)}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">/month</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px] text-slate-500">
            <span>Price: {formatINR(previewVariant.sellingPrice)}</span>
            {discountPct > 0 && (
              <span className="font-bold text-emerald-700">Save {discountPct}%</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-2 border-t border-slate-100">
        <Link
          to={`/products/${product.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
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
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50',
            ].join(' ')}
          >
            {isCompared ? 'Compared' : 'Compare'}
          </button>
        )}
      </div>
    </div>
  );
}
