import { useMemo } from 'react';
import { formatINR } from '../utils/format.js';
import { Check, Sparkles } from 'lucide-react';

/**
 * VariantSelector
 * Provides separate, independent options for:
 * 1. Finish / Colour (with authentic swatches and names)
 * 2. Storage Capacity (with tier pricing and starting 0% EMI)
 */
export default function VariantSelector({ variants = [], selectedVariantId, onSelect }) {
  // Currently active variant
  const currentVariant = useMemo(() => {
    return variants.find((v) => v.id === selectedVariantId) || variants[0] || null;
  }, [variants, selectedVariantId]);

  const selectedColor = currentVariant?.color || '';
  const selectedStorage = currentVariant?.storage || '';

  // 1. Extract distinct Colors
  const uniqueColors = useMemo(() => {
    const map = new Map();
    variants.forEach((v) => {
      if (v.color && !map.has(v.color)) {
        map.set(v.color, {
          color: v.color,
          colorHex: v.colorHex || '#4B5563',
          imageUrl: v.imageUrl,
        });
      }
    });
    return Array.from(map.values());
  }, [variants]);

  // 2. Extract distinct Storages
  const uniqueStorages = useMemo(() => {
    const map = new Map();
    variants.forEach((v) => {
      if (v.storage && !map.has(v.storage)) {
        map.set(v.storage, {
          storage: v.storage,
          mrp: v.mrp,
          sellingPrice: v.sellingPrice,
          startingMonthlyEmi:
            v.emiPlans?.[0]?.monthlyPayment || Math.round(v.sellingPrice / 12),
        });
      }
    });
    return Array.from(map.values());
  }, [variants]);

  // Handle color change (keeps currently selected storage)
  function handleColorSelect(colorName) {
    const matching =
      variants.find((v) => v.color === colorName && v.storage === selectedStorage) ||
      variants.find((v) => v.color === colorName) ||
      currentVariant;
    if (matching) {
      onSelect(matching.id);
    }
  }

  // Handle storage change (keeps currently selected color)
  function handleStorageSelect(storageSize) {
    const matching =
      variants.find((v) => v.storage === storageSize && v.color === selectedColor) ||
      variants.find((v) => v.storage === storageSize) ||
      currentVariant;
    if (matching) {
      onSelect(matching.id);
    }
  }

  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* ================= OPTION 1: COLOUR / FINISH ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span>1. Finish / Colour:</span>
            <strong className="text-slate-900 dark:text-white font-bold">{selectedColor}</strong>
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-[#0070d5] font-medium">
            {uniqueColors.length} Finishes Available
          </span>
        </div>

        {/* Color Swatch Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
          {uniqueColors.map((c) => {
            const isSelected = c.color === selectedColor;
            return (
              <button
                key={c.color}
                type="button"
                onClick={() => handleColorSelect(c.color)}
                className={[
                  'relative flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-150',
                  isSelected
                    ? 'border-indigo-600 dark:border-[#0070d5] bg-indigo-50/70 dark:bg-[#0070d5]/15 ring-1 ring-indigo-500 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700',
                ].join(' ')}
              >
                {/* Round Color Swatch */}
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-black/20 dark:border-white/20 shadow-sm"
                  style={{ backgroundColor: c.colorHex }}
                />

                <span className="font-semibold text-xs text-slate-900 dark:text-white truncate flex-1">
                  {c.color}
                </span>

                {isSelected && (
                  <div className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-indigo-600 dark:bg-[#0070d5] text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= OPTION 2: STORAGE CAPACITY ================= */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span>2. Storage Capacity:</span>
            <strong className="text-slate-900 dark:text-white font-bold">{selectedStorage}</strong>
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            0% No-Cost EMI
          </span>
        </div>

        {/* Storage Tier Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {uniqueStorages.map((s) => {
            const isSelected = s.storage === selectedStorage;
            // Get price for this storage in current color
            const variantForTier =
              variants.find((v) => v.storage === s.storage && v.color === selectedColor) ||
              variants.find((v) => v.storage === s.storage) ||
              s;

            return (
              <button
                key={s.storage}
                type="button"
                onClick={() => handleStorageSelect(s.storage)}
                className={[
                  'relative flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-150',
                  isSelected
                    ? 'border-indigo-600 dark:border-[#0070d5] bg-indigo-50/70 dark:bg-[#0070d5]/15 ring-1 ring-indigo-500 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700',
                ].join(' ')}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 grid h-4 w-4 place-items-center rounded-full bg-indigo-600 dark:bg-[#0070d5] text-white">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                )}

                <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                  {s.storage}
                </span>

                <div className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                  {formatINR(variantForTier.sellingPrice)}
                </div>

                <div className="mt-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  0% EMI from {formatINR(variantForTier.startingMonthlyEmi || Math.round(variantForTier.sellingPrice / 12))}/mo
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Configuration Summary Pill */}
      <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span
            className="h-3 w-3 rounded-full border border-black/20"
            style={{ backgroundColor: currentVariant?.colorHex }}
          />
          <span>
            Configuration: <strong className="text-slate-900 dark:text-white font-bold">{selectedColor}</strong> • <strong className="text-slate-900 dark:text-white font-bold">{selectedStorage}</strong>
          </span>
        </div>
        <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400">
          {formatINR(currentVariant?.sellingPrice)}
        </span>
      </div>
    </div>
  );
}
