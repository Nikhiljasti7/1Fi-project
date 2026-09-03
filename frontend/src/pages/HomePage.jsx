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
      if (exists) return prev.filter((p) => p.id !== product.id);
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
    <div className="space-y-12 pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-white/10 bg-gradient-to-b from-slate-950 via-dark-900 to-dark-950">
        {/* Ambient background glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-radial-glow opacity-70 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-radial-wealth opacity-50 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-xl shadow-glass mb-6">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>India's First Wealth-Backed Smartphone Marketplace (LAMF)</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
              Buy Your Dream Flagship.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-400 to-emerald-400">
                Backed By Your Wealth.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Don't block credit card limits or break your Mutual Fund SIPs. Pledge units via CAMS &amp; Demat, get <strong className="text-white">0% No-Cost EMI</strong>, and let your portfolio compound at 12–18% while you upgrade.
            </p>

            {/* Core Value Props */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-slate-200 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>₹0 Card Limit Blocked</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-slate-200 backdrop-blur-md">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span>Keep Earning 14% CAGR</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-slate-200 backdrop-blur-md">
                <Lock className="h-4 w-4 text-brand-400" />
                <span>Instant Lien Release</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-slate-200 backdrop-blur-md">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Up to ₹11,000 Cashback</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-glow-brand transition hover:from-brand-500 hover:to-brand-400"
              >
                <span>Browse Famous Flagships</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                to="/wealth-backed-emi"
                className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 px-6 py-3.5 text-sm font-bold text-emerald-300 backdrop-blur-xl transition hover:border-emerald-500/80 hover:bg-emerald-950/50"
              >
                <TrendingUp className="h-4 w-4 text-emerald-400" />
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
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Explore Flagship Smartphones
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
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
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Brand Filter Tabs & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* Brand Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {brands.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBrand(b.id)}
                  className={[
                    'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition backdrop-blur-md',
                    selectedBrand === b.id
                      ? 'bg-brand-600 text-white shadow-glow-brand border border-brand-500'
                      : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/10',
                  ].join(' ')}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-input rounded-xl px-3 py-1.5 text-xs text-white cursor-pointer"
              >
                <option value="recommended">Featured / Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="cashback">Highest Cashback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid States */}
        {state.status === 'loading' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <ErrorState
            title="Couldn't load smartphones"
            message={state.error}
            onRetry={load}
          />
        )}

        {state.status === 'success' && filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center text-slate-400 max-w-md mx-auto">
            <p className="text-sm font-medium">No smartphones match your filter criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}

        {state.status === 'success' && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* ================= FLOATING COMPARE DRAWER ================= */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl rounded-2xl border border-brand-500/40 bg-dark-900/90 p-4 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/20 text-brand-400">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {comparedProducts.length} Device{comparedProducts.length > 1 ? 's' : ''} in Compare Tray
              </span>
              <span className="text-[11px] text-slate-400">
                {comparedProducts.map((p) => p.name).join(' vs ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setComparedProducts([])}
              className="text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
            <Link
              to={`/compare?p1=${comparedProducts[0]?.slug || ''}&p2=${comparedProducts[1]?.slug || ''}&p3=${comparedProducts[2]?.slug || ''}`}
              className="rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-glow-brand"
            >
              Compare Now →
            </Link>
          </div>
        </div>
      )}

      {/* ================= HOW WEALTH-BACKED EMI WORKS ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-dark-950/80 p-8 sm:p-12 backdrop-blur-2xl shadow-glass">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The 1Fi Financial Advantage
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              How Wealth-Backed EMI Works in 3 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Regulated Loan Against Mutual Funds &amp; Securities (LAMF) under RBI guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-white text-base">Select Phone &amp; 0% Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse our catalog of Apple, Samsung, Google Pixel, and OnePlus flagships. Pick your favorite color, storage, and 3 to 24-month EMI plan with cashback.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-white text-base">Pledge Collateral (No Sale!)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Link your CAMS or Demat portfolio. Pledge units at 50% LTV. <strong className="text-slate-200">Your investments never leave your account</strong> — they continue to compound and earn returns.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-white text-base">Instant Dispatch &amp; Auto-Debit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your phone ships immediately with insured express delivery. Low-cost or 0% EMI is deducted monthly via e-NACH mandate. The lien is automatically unlocked upon completion.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                Partnered with Top AMCs: HDFC, ICICI Prudential, SBI, Nippon India, Parag Parikh &amp; UTI.
              </span>
            </div>
            <Link
              to="/wealth-backed-emi"
              className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1"
            >
              <span>See the detailed math calculator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
