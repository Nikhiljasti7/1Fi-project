import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, ApiError } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2,
  Lock,
  ArrowLeftRight,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [state, setState] = useState({ status: 'loading', products: [], error: null });
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [comparedProducts, setComparedProducts] = useState([]);

  const load = () => {
    setState({ status: 'loading', products: [], error: null });
    getProducts({
      brand: selectedBrand !== 'all' ? selectedBrand : undefined,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      search: searchQuery.trim() || undefined,
      sort: sortBy,
    })
      .then((products) => setState({ status: 'success', products, error: null }))
      .catch((err) => {
        const message = err instanceof ApiError ? err.message : 'Failed to load products.';
        setState({ status: 'error', products: [], error: message });
      });
  };

  useEffect(() => {
    load();
  }, [selectedBrand, selectedCategory, sortBy]);

  // Client-side quick filter on search
  const filteredProducts = useMemo(() => {
    if (!state.products) return [];
    if (!searchQuery.trim()) return state.products;
    const q = searchQuery.toLowerCase().trim();
    return state.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.specs?.processor && p.specs.processor.toLowerCase().includes(q))
    );
  }, [state.products, searchQuery]);

  function handleToggleCompare(product) {
    setComparedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 smartphones at a time.');
        return prev;
      }
      return [...prev, product];
    });
  }

  const brands = [
    { id: 'all', label: 'All Brands' },
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'google', label: 'Google Pixel' },
    { id: 'oneplus', label: 'OnePlus' },
    { id: 'nothing', label: 'Nothing' },
    { id: 'xiaomi', label: 'Xiaomi' },
  ];

  return (
    <div className="space-y-12 pb-16 bg-slate-50">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 bg-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-sm mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
              <span>India&apos;s Regulated Wealth-Backed Smartphone Marketplace (LAMF)</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight">
              Buy Your Dream Flagship.{' '}
              <span className="block text-indigo-600">
                Backed By Your Wealth.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Pledge your mutual fund folios or demat holdings at 50% LTV to unlock <strong className="text-slate-900 font-semibold">0% No-Cost EMI</strong> without liquidating your investments or blocking high credit card limits.
            </p>

            {/* Core Value Props */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Zero Credit Card Limit Blocked</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                <span>Portfolio Compounding Intact (14% CAGR)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span>Automated Depository Lien Release</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm">
                <Zap className="h-4 w-4 text-indigo-600" />
                <span>Up to ₹11,000 Direct Cashback</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                <span>Browse Verified Flagships</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                to="/wealth-backed-emi"
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <TrendingUp className="h-4 w-4 text-slate-500" />
                <span>Simulate Wealth Compounding</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORE CATALOG SECTION ================= */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-24">
        {/* Controls Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Explore Flagship Smartphones
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                Choose a device, select your variant, and choose a laddered EMI plan backed by your investments.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search iPhone, Galaxy, Pixel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition"
              />
            </div>
          </div>

          {/* Brand Filter Tabs & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {brands.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBrand(b.id)}
                  className={[
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap',
                    selectedBrand === b.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-300 shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="cashback">Highest Cashback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid / States */}
        {state.status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <ErrorState message={state.error} onRetry={load} />
        )}

        {state.status === 'success' && filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              No smartphones match your search filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
            >
              Reset Filters
            </button>
          </div>
        )}

        {state.status === 'success' && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedProducts.some((p) => p.id === product.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= WEALTH COMPOUNDING HOW-IT-WORKS ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Smart Financing
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Wealth-Backed EMI Beats Credit Cards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Traditional credit cards charge 14–18% p.a. and block your credit card limit. 1Fi leverages your existing investment portfolio to grant subsidized 0% EMI while your capital keeps compounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Pledge Units Digitally</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your CAMS, KFintech, or Demat account via instant OTP. Pledge required units at 50% LTV without selling any holdings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Subsidized 0% No-Cost EMI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy 0% interest on short tenures and heavy cashback on longer tenures. No processing fees, zero card limit blocked.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Automated Lien Release</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                As your e-NACH auto-debit completes each month, the lien is progressively freed. Your mutual funds kept compounding at ~14% throughout!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING COMPARE TRAY ================= */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-2xl text-xs">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {comparedProducts.map((p) => (
                  <img
                    key={p.id}
                    src={p.previewVariant.imageUrl}
                    alt={p.name}
                    className="h-9 w-9 rounded-full border-2 border-white object-contain bg-slate-50 shadow-sm"
                  />
                ))}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">
                  {comparedProducts.length} Smartphone{comparedProducts.length > 1 ? 's' : ''} Selected
                </span>
                <span className="text-[10px] text-slate-500">Compare specs &amp; EMI plans</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setComparedProducts([])}
                className="rounded-lg px-2.5 py-1 text-slate-500 hover:text-slate-900"
              >
                Clear
              </button>
              <Link
                to={`/compare?ids=${comparedProducts.map((p) => p.slug).join(',')}`}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-3.5 py-2 font-bold text-white shadow-md shadow-indigo-600/20"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                <span>Compare Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
