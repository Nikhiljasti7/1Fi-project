import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format.js';
import { ChevronRight, Box } from 'lucide-react';

export default function ProductCard({ product, onToggleCompare, isCompared }) {
  const { previewVariant } = product;
  const discountPct =
    previewVariant.mrp > previewVariant.sellingPrice
      ? Math.round(((previewVariant.mrp - previewVariant.sellingPrice) / previewVariant.mrp) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-[4px] bg-[#ffffff] dark:bg-[#141414] p-6 transition-transform duration-150 border-0 shadow-none">
      {/* Top Header: Category Label & Cashback */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[12px] font-medium uppercase tracking-wider text-[#6c7073] dark:text-[#8c8c8c]">
          {product.brand}
        </span>
        {product.previewVariant?.maxCashback > 0 && (
          <span className="text-[11px] font-medium text-[#0070d5]">
            ₹{product.previewVariant.maxCashback.toLocaleString('en-IN')} Cashback
          </span>
        )}
      </div>

      {/* Product Title & Short Descriptor (DJI Type Hierarchy) */}
      <div className="mb-4">
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-[#303233] dark:text-[#ffffff] leading-tight tracking-[-0.02em] hover:text-[#0070d5] dark:hover:text-[#0070d5] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[14px] text-[#595959] dark:text-[#8c8c8c] line-clamp-1 mt-1 font-normal">
          {product.tagline || previewVariant.label}
        </p>
      </div>

      {/* Centered High-Res Product Image */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden p-4 flex items-center justify-center my-2 group-hover:scale-[1.02] transition-transform duration-300"
      >
        <img
          src={previewVariant.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.src =
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90';
          }}
        />

        {/* Minimal 3D Interactive Indicator */}
        <div className="absolute bottom-1 right-1 flex items-center gap-1 text-[11px] text-[#6c7073] dark:text-[#8c8c8c]">
          <Box className="h-3 w-3 text-[#0070d5]" />
          <span>3D 360°</span>
        </div>
      </Link>

      {/* Available Color Dots */}
      {product.availableColors && product.availableColors.length > 0 && (
        <div className="flex items-center justify-center gap-1.5 my-2">
          {product.availableColors.slice(0, 5).map((c, i) => (
            <span
              key={i}
              title={c.name}
              className="h-2.5 w-2.5 rounded-full border border-black/10 dark:border-white/20"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.availableColors.length > 5 && (
            <span className="text-[10px] text-[#8c8c8c]">
              +{product.availableColors.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Pricing & Wealth-Backed EMI Callout */}
      <div className="mt-4 pt-3 border-t border-[#ededed] dark:border-[#272727] flex items-baseline justify-between">
        <div>
          <span className="text-[12px] text-[#6c7073] dark:text-[#8c8c8c] block font-normal">
            From {formatINR(previewVariant.startingMonthlyEmi)}/mo
          </span>
          <span className="text-[11px] text-[#0070d5] font-medium">
            0% No-Cost EMI
          </span>
        </div>
        <div className="text-right">
          <span className="text-[12px] text-[#595959] dark:text-[#8c8c8c] block">
            {formatINR(previewVariant.sellingPrice)}
          </span>
          {discountPct > 0 && (
            <span className="text-[11px] text-[#6c7073] dark:text-[#8c8c8c]">
              Save {discountPct}%
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons (DJI Pill 64px radius & Ghost Links) */}
      <div className="mt-5 flex items-center gap-2">
        <Link
          to={`/products/${product.slug}`}
          className="flex-1 inline-flex items-center justify-center bg-[#0070d5] text-white rounded-[64px] py-2 text-sm font-medium hover:bg-[#005fb8] transition"
        >
          <span>Configure EMI</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>

        {onToggleCompare && (
          <button
            type="button"
            onClick={() => onToggleCompare(product)}
            className={[
              'rounded-[64px] border px-3.5 py-2 text-xs transition',
              isCompared
                ? 'border-[#0070d5] text-[#0070d5] font-medium bg-[#0070d5]/10'
                : 'border-[#6c7073] text-[#303233] dark:text-[#ededed] hover:border-[#303233] dark:hover:border-white',
            ].join(' ')}
          >
            {isCompared ? 'Added' : 'Compare'}
          </button>
        )}
      </div>
    </div>
  );
}
