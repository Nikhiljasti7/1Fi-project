import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, ApiError } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import ThreeDPhoneViewer from '../components/ThreeDPhoneViewer.jsx';
import {
  TrendingUp,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2,
  Lock,
  ArrowLeftRight,
  Zap,
  Box,
  X,
} from 'lucide-react';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({ status: 'loading', products: [], error: null });
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('recommended');
  const [comparedProducts, setComparedProducts] = useState([]);
  const [show3DStudio, setShow3DStudio] = useState(false);

  // Sync from URL search params
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
    const b = searchParams.get('brand');
    if (b && b !== selectedBrand) {
      setSelectedBrand(b);
    }
  }, [searchParams]);

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
        p.slug.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.specs?.processor && p.specs.processor.toLowerCase().includes(q))
    );
  }, [state.products, searchQuery]);

  function handleSearchChange(val) {
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() }, { replace: true });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('search');
      setSearchParams(newParams, { replace: true });
    }
  }

  function handleClearSearch() {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams, { replace: true });
  }

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
  ];

  const quickPills = [
    { label: 'iPhone 17 Pro Max', query: 'iPhone 17 Pro Max' },
    { label: 'iPhone 17 Air', query: 'iPhone 17 Air' },
    { label: 'iPhone 17', query: 'iPhone 17' },
    { label: 'iPhone 16 Pro', query: 'iPhone 16 Pro' },
    { label: 'Galaxy S24 Ultra', query: 'S24 Ultra' },
    { label: 'Pixel 9 Pro XL', query: 'Pixel 9' },
  ];

  return (
    <div className="space-y-12 pb-16 bg-slate-50 dark:bg-[#0B0F19] transition-colors">
      {/* ================= HERO SECTION WITH CINEMATIC WALLPAPER BACKGROUND ================= */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-black transition-colors">
        {/* Cinematic Atmospheric Wallpaper Background */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {/* Subtle Dark Luxury Wallpaper */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-40 mix-blend-luminosity transform scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=85')`,
            }}
          />

          {/* Radial Light & Dark Vignette Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white dark:from-black/75 dark:via-black/85 dark:to-[#0B0F19]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 dark:from-[#0070d5]/15 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm mb-6 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-[#0070d5]" />
              <span>India&apos;s Regulated Wealth-Backed Smartphone Marketplace (LAMF)</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-tight">
              Buy Your Dream Flagship.{' '}
              <span className="block text-indigo-600 dark:text-[#0070d5]">
                Backed By Your Wealth.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Pledge your mutual fund folios or demat holdings at 50% LTV to unlock{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">0% No-Cost EMI</strong>{' '}
              without liquidating your investments or blocking high credit card limits.
            </p>

            {/* Core Value Props */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/90 px-4 py-2.5 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Credit Card Limit Blocked</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/90 px-4 py-2.5 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md">
                <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-[#0070d5]" />
                <span>Portfolio Compounding Intact (14% CAGR)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/90 px-4 py-2.5 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md">
                <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Automated Depository Lien Release</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/90 px-4 py-2.5 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Up to ₹11,000 Direct Cashback</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-[#0070d5] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 dark:hover:bg-[#005fb8] transition-colors"
              >
                <span>Browse Verified Flagships</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setShow3DStudio((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <Box className="h-4 w-4 text-indigo-600 dark:text-[#0070d5]" />
                <span>{show3DStudio ? 'Close 3D Studio' : 'Launch 3D Studio (360°)'}</span>
              </button>

              <Link
                to="/wealth-backed-emi"
                className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span>Simulate Wealth Compounding</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3D INTERACTIVE SMARTPHONE STUDIO MODAL / EXPANSION ================= */}
      {show3DStudio && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 animate-in fade-in duration-200">
          <ThreeDPhoneViewer
            productName="iPhone 17 Pro Max (2nm A19 Pro)"
            colorName="Cosmic Orange"
            initialColor="#C96A3C"
            onClose={() => setShow3DStudio(false)}
          />
        </section>
      )}

      {/* ================= STORE CATALOG SECTION ================= */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-24">
        {/* Controls Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  Explore Flagship Smartphones
                </h2>
                <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  iPhone 17 Added
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Choose a device, select your variant, and choose a laddered EMI plan backed by your investments.
              </p>
            </div>

            {/* Search Input with Clear Button */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search iPhone 17, Galaxy, Pixel..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Search Suggestion Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0 mr-1">
              Popular:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => handleSearchChange(pill.query)}
                className={[
                  'rounded-lg px-2.5 py-1 text-xs font-medium transition whitespace-nowrap',
                  searchQuery.toLowerCase() === pill.query.toLowerCase()
                    ? 'bg-indigo-600 dark:bg-[#0070d5] text-white font-bold shadow-sm'
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700',
                ].join(' ')}
              >
                {pill.label}
              </button>
            ))}
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
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-sm',
                    selectedBrand === b.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-300 dark:bg-indigo-950/70 dark:border-indigo-600 dark:text-indigo-300'
                      : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800',
                  ].join(' ')}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="cashback">Highest Cashback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search status notification banner */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/40 px-4 py-2.5 text-xs">
            <span className="text-slate-700 dark:text-slate-300">
              Showing <strong className="text-indigo-700 dark:text-indigo-400 font-bold">{filteredProducts.length}</strong> smartphone{filteredProducts.length === 1 ? '' : 's'} matching &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              type="button"
              onClick={handleClearSearch}
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear Filter
            </button>
          </div>
        )}

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
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No smartphones match your search &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrand('all');
                handleClearSearch();
              }}
              className="mt-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-4 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
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
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm transition-colors">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Smart Financing
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Why Wealth-Backed EMI Beats Credit Cards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Traditional credit cards charge 14–18% p.a. and block your credit card limit. 1Fi leverages your existing investment portfolio to grant subsidized 0% EMI while your capital keeps compounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-6 space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pledge Units Digitally</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect your CAMS, KFintech, or Demat account via instant OTP. Pledge required units at 50% LTV without selling any holdings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-6 space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Subsidized 0% No-Cost EMI</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enjoy 0% interest on short tenures and heavy cashback on longer tenures. No processing fees, zero card limit blocked.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-6 space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Automated Lien Release</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                As your e-NACH auto-debit completes each month, the lien is progressively freed. Your mutual funds kept compounding at ~14% throughout!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING COMPARE TRAY ================= */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-3 shadow-2xl backdrop-blur-2xl text-xs">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {comparedProducts.map((p) => (
                  <img
                    key={p.id}
                    src={p.previewVariant.imageUrl}
                    alt={p.name}
                    className="h-9 w-9 rounded-full border-2 border-white dark:border-slate-800 object-contain bg-slate-50 dark:bg-slate-800 shadow-sm"
                  />
                ))}
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {comparedProducts.length} Smartphone{comparedProducts.length > 1 ? 's' : ''} Selected
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Compare specs &amp; EMI plans</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setComparedProducts([])}
                className="rounded-lg px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
