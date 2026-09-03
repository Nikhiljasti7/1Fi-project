import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../api/client.js';
import { formatINR } from '../utils/format.js';
import {
  ArrowLeftRight,
  ShieldCheck,
  Sparkles,
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-500/20 border border-brand-500/30 px-2.5 py-0.5 text-[10px] font-bold text-brand-300 flex items-center gap-1">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Side-by-Side Flagship Comparison
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Compare Flagship Phones &amp; Wealth EMIs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate specifications, camera setups, pricing, and required mutual fund collateral before you pledge.
          </p>
        </div>

        {selectedSlugs.length < 3 && allProducts.length > selectedSlugs.length && (
          <button
            type="button"
            onClick={handleAddSlot}
            className="self-start md:self-auto rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-white transition"
          >
            + Add 3rd Phone
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[650px] space-y-6">
          {/* Top Device Selectors & Images */}
          <div className="grid grid-cols-3 gap-6">
            {compared.map((product, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl relative space-y-4"
              >
                {selectedSlugs.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(idx)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-white p-1"
                    title="Remove phone"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Dropdown to switch phone */}
                <select
                  value={product.slug}
                  onChange={(e) => handleSelectSlot(idx, e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white font-semibold cursor-pointer"
                >
                  {allProducts.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({formatINR(p.previewVariant.sellingPrice)})
                    </option>
                  ))}
                </select>

                <div className="aspect-square w-full rounded-2xl bg-dark-950/60 p-4 flex items-center justify-center">
                  <img
                    src={product.previewVariant.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-display font-bold text-base text-white">{product.name}</h3>
                  <div className="font-display font-extrabold text-lg text-emerald-400">
                    {formatINR(product.previewVariant.sellingPrice)}
                  </div>
                  {product.previewVariant.mrp > product.previewVariant.sellingPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatINR(product.previewVariant.mrp)}
                    </span>
                  )}
                </div>

                <Link
                  to={`/products/${product.slug}`}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 py-2.5 text-xs font-bold text-white shadow-glow-brand hover:from-brand-500 hover:to-emerald-400"
                >
                  <span>Select &amp; Pledge</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Detailed Matrix Rows */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl space-y-6 text-xs">
            {/* 1. Wealth Backed EMI Section */}
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Wealth-Backed EMI &amp; Collateral Requirement
              </h4>
              <div className="grid grid-cols-3 gap-6 divide-x divide-white/5">
                {compared.map((p, i) => (
                  <div key={i} className={i > 0 ? 'pl-6 space-y-2' : 'space-y-2'}>
                    <div className="flex justify-between">
                      <span className="text-slate-400">12-Month 0% EMI:</span>
                      <span className="font-bold text-white">
                        {p.previewVariant.startingMonthlyEmi ? `${formatINR(p.previewVariant.startingMonthlyEmi)}/mo` : '0% EMI'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cashback Reward:</span>
                      <span className="font-bold text-emerald-400">
                        Up to {formatINR(p.previewVariant.maxCashback || 5000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Required MF Lien (50% LTV):</span>
                      <span className="font-semibold text-slate-200">
                        {formatINR(p.previewVariant.sellingPrice * 2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Specifications Comparison */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="font-bold text-brand-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Smartphone className="h-4 w-4" />
                Hardware Specifications
              </h4>

              {/* Display Row */}
              <div className="space-y-1">
                <span className="font-semibold text-slate-400 block">Display</span>
                <div className="grid grid-cols-3 gap-6 divide-x divide-white/5">
                  {compared.map((p, i) => (
                    <div key={i} className={i > 0 ? 'pl-6 text-slate-200' : 'text-slate-200'}>
                      {p.specs?.display || '120Hz ProMotion AMOLED'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Processor Row */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="font-semibold text-slate-400 block">Processor &amp; AI</span>
                <div className="grid grid-cols-3 gap-6 divide-x divide-white/5">
                  {compared.map((p, i) => (
                    <div key={i} className={i > 0 ? 'pl-6 font-bold text-white' : 'font-bold text-white'}>
                      {p.specs?.processor || 'Flagship SoC'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Camera Row */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="font-semibold text-slate-400 block">Camera Setup</span>
                <div className="grid grid-cols-3 gap-6 divide-x divide-white/5">
                  {compared.map((p, i) => (
                    <div key={i} className={i > 0 ? 'pl-6 text-slate-200' : 'text-slate-200'}>
                      {p.specs?.camera || 'Pro Triple Lens OIS'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Battery Row */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <span className="font-semibold text-slate-400 block">Battery &amp; Charging</span>
                <div className="grid grid-cols-3 gap-6 divide-x divide-white/5">
                  {compared.map((p, i) => (
                    <div key={i} className={i > 0 ? 'pl-6 text-slate-200' : 'text-slate-200'}>
                      {p.specs?.battery || 'Fast Charge Supported'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
