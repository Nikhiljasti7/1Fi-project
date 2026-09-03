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
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-slate-300 shadow-sm"
                    style={{ backgroundColor: group.variants[0].colorHex || '#4B5563' }}
                  />
                  <span>Finish: <strong className="text-slate-900">{group.color}</strong></span>
                </span>
                {hasSelected && (
                  <span className="text-indigo-600 font-bold text-[11px]">Selected color</span>
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
                      'relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200',
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60',
                      isOutOfStock ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 grid h-4 w-4 place-items-center rounded-full bg-indigo-600 text-white">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {variant.colorHex && (
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded-full border border-slate-300"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                      )}
                      <span className="font-bold text-xs text-slate-900">
                        {variant.storage || variant.label}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-extrabold text-slate-800">
                      {formatINR(variant.sellingPrice)}
                    </div>

                    {isLowStock && !isOutOfStock && (
                      <span className="mt-1 text-[10px] font-bold text-amber-700">
                        Low stock
                      </span>
                    )}

                    {isOutOfStock && (
                      <span className="mt-1 text-[10px] font-bold text-rose-600">
                        Sold out
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
  if (!Array.isArray(variants)) return [];
  for (const v of variants) {
    const key = v.color || 'default';
    if (!map.has(key)) map.set(key, { color: v.color, variants: [] });
    map.get(key).variants.push(v);
  }
  return Array.from(map.values());
}
