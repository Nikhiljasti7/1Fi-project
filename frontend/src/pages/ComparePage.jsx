import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../api/client.js';
import { formatINR } from '../utils/format.js';
import {
  ArrowLeftRight,
  ShieldCheck,
  Smartphone,
  Cpu,
  Camera,
  Battery,
  ArrowRight,
  X,
} from 'lucide-react';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedSlugs, setSelectedSlugs] = useState(['iphone-16-pro-max', 'samsung-galaxy-s24-ultra']);

  useEffect(() => {
    getProducts().then((res) => {
      setAllProducts(res);
      // Initialize from query params if available
      const idsParam = searchParams.get('ids');
      if (idsParam) {
        const parsed = idsParam.split(',').filter(Boolean);
        if (parsed.length >= 2) {
          setSelectedSlugs(parsed.slice(0, 3));
          return;
        }
      }
      const p1 = searchParams.get('p1');
      const p2 = searchParams.get('p2');
      const p3 = searchParams.get('p3');
      const initial = [p1, p2, p3].filter(Boolean);
      if (initial.length >= 2) {
        setSelectedSlugs(initial);
      } else if (res.length >= 2) {
        setSelectedSlugs([res[0].slug, res[1].slug]);
      }
    });
  }, [searchParams]);

  const compared = selectedSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter(Boolean);

  function handleSelectSlot(index, newSlug) {
    setSelectedSlugs((prev) => {
      const copy = [...prev];
      copy[index] = newSlug;
      return copy;
    });
  }

  function handleAddSlot() {
    if (selectedSlugs.length >= 3) return;
    const remaining = allProducts.find((p) => !selectedSlugs.includes(p.slug));
    if (remaining) {
      setSelectedSlugs((prev) => [...prev, remaining.slug]);
    }
  }

  function handleRemoveSlot(index) {
    if (selectedSlugs.length <= 2) return;
    setSelectedSlugs((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10 bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-0.5 text-xs font-bold text-indigo-700 shadow-sm mb-2">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Head-to-Head Flagship Matchup</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare Flagships &amp; EMI Ladders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate specifications, camera systems, and required mutual fund collateral side-by-side.
          </p>
        </div>

        {selectedSlugs.length < 3 && allProducts.length > selectedSlugs.length && (
          <button
            type="button"
            onClick={handleAddSlot}
            className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition shadow-sm"
          >
            <span>+ Add 3rd Device</span>
          </button>
        )}
      </div>

      {/* Grid of Compared Columns */}
      <div className={`grid grid-cols-1 md:grid-cols-${compared.length} gap-6 items-start`}>
        {compared.map((product, idx) => {
          const defaultVar = product.variants?.[0] || product.previewVariant;
          const requiredCollateral = Math.round(defaultVar.sellingPrice / 0.50);
          const startingEmi = defaultVar.startingMonthlyEmi || Math.round(defaultVar.sellingPrice / 12);

          return (
            <div
              key={product.id || idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 relative group"
            >
              {compared.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(idx)}
                  className="absolute top-4 right-4 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-800"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Selector dropdown for slot */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Device Slot #{idx + 1}
                </label>
                <select
                  value={product.slug}
                  onChange={(e) => handleSelectSlot(idx, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.brand.toUpperCase()} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image & Price */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative aspect-square w-48 rounded-2xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-center">
                  <img
                    src={defaultVar.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {product.brand}
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {product.name}
                  </h3>
                  <div className="mt-1 font-display font-extrabold text-xl text-slate-900">
                    {formatINR(defaultVar.sellingPrice)}
                  </div>
                </div>
              </div>

              {/* Wealth Backed Callout */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">12-Mo 0% EMI:</span>
                  <span className="font-extrabold text-emerald-700">{formatINR(startingEmi)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Max Cashback:</span>
                  <span className="font-bold text-emerald-700">₹{defaultVar.maxCashback || 7500}</span>
                </div>
                <div className="pt-1.5 border-t border-emerald-200/80 flex justify-between">
                  <span className="text-slate-700 font-semibold">Mutual Fund Collateral:</span>
                  <span className="font-extrabold text-slate-900">{formatINR(requiredCollateral)}</span>
                </div>
              </div>

              {/* Specs Rows */}
              <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Smartphone className="h-3 w-3 text-indigo-600" />
                    Display
                  </span>
                  <p className="mt-0.5 text-slate-700 font-medium">{product.specs?.display || 'Super Retina XDR / AMOLED'}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Cpu className="h-3 w-3 text-emerald-600" />
                    Processor &amp; AI
                  </span>
                  <p className="mt-0.5 text-slate-700 font-medium">{product.specs?.processor || 'Flagship SoC'}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Camera className="h-3 w-3 text-cyan-600" />
                    Camera System
                  </span>
                  <p className="mt-0.5 text-slate-700 font-medium">{product.specs?.camera || 'Triple Pro Camera'}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Battery className="h-3 w-3 text-amber-600" />
                    Battery Life
                  </span>
                  <p className="mt-0.5 text-slate-700 font-medium">{product.specs?.battery || 'All-day battery'}</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/products/${product.slug}`}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition"
              >
                <span>View Variants &amp; EMI</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
