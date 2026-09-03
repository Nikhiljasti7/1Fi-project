import { formatINR } from '../utils/format.js';
import { Check } from 'lucide-react';

export default function VariantSelector({ variants, selectedVariantId, onSelect }) {
  const colorGroups = groupByColor(variants);

  return (
    <div className="space-y-4">
      {colorGroups.map((group) => {
        const hasSelected = group.variants.some((v) => v.id === selectedVariantId);
        return (
          <div key={group.color || group.variants[0].id} className="space-y-2">
            {group.color && (
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-2">
                  <span
                    className="inline-block h-3.5 w-3.5 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: group.variants[0].colorHex || '#4B5563' }}
                  />
                  <span>Finish: <strong className="text-white">{group.color}</strong></span>
                </span>
                {hasSelected && (
                  <span className="text-brand-400 font-medium text-[11px]">Selected color</span>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {group.variants.map((variant) => {
                const isSelected = variant.id === selectedVariantId;
                const isOutOfStock = variant.stockStatus === 'out_of_stock';
                const isLowStock = variant.stockStatus === 'low_stock';

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => onSelect(variant.id)}
                    aria-pressed={isSelected}
                    className={[
                      'relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 backdrop-blur-md',
                      isSelected
                        ? 'border-brand-500 bg-brand-500/15 shadow-glow-brand ring-1 ring-brand-500/50'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
                      isOutOfStock ? 'cursor-not-allowed opacity-35' : 'cursor-pointer',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 grid h-4 w-4 place-items-center rounded-full bg-brand-500 text-white">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {variant.colorHex && (
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/30"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                      )}
                      <span className="font-bold text-xs text-white">
                        {variant.storage || variant.label}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-semibold text-slate-300">
                      {formatINR(variant.sellingPrice)}
                    </div>

                    {isLowStock && !isOutOfStock && (
                      <span className="mt-1 text-[10px] font-semibold text-amber-400">
                        Low stock
                      </span>
                    )}

                    {isOutOfStock && (
                      <span className="mt-1 text-[10px] font-semibold text-rose-400">
                        Out of stock
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function groupByColor(variants) {
  const map = new Map();
  for (const v of variants) {
    const key = v.color || 'default';
    if (!map.has(key)) map.set(key, { color: v.color, variants: [] });
    map.get(key).variants.push(v);
  }
  return Array.from(map.values());
}
