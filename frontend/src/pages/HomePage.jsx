import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, ApiError } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import BackgroundPhoneTransitions from '../components/BackgroundPhoneTransitions.jsx';
import ThreeDPhoneViewer from '../components/ThreeDPhoneViewer.jsx';
import {
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowLeftRight,
  Box,
  X,
  TrendingUp,
  Award,
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
    { id: 'all', label: 'All Flagships' },
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'google', label: 'Google Pixel' },
    { id: 'oneplus', label: 'OnePlus' },
  ];

  const quickPills = [
    { label: 'iPhone 17 Pro Max', query: 'iPhone 17 Pro Max' },
    { label: 'iPhone 17 Air', query: 'iPhone 17 Air' },
    { label: 'iPhone 16 Pro', query: 'iPhone 16 Pro' },
    { label: 'Galaxy S24 Ultra', query: 'S24 Ultra' },
    { label: 'Pixel 9 Pro XL', query: 'Pixel 9' },
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#ededed] dark:bg-[#000000] text-[#000000] dark:text-[#ffffff] transition-colors">
      {/* ================= HERO PRODUCT STAGE (DJI HERO VOID: #000000) ================= */}
      <section className="relative overflow-hidden pt-16 pb-24 bg-[#000000] text-white">
        {/* Floating 3D Device transitions in background void */}
        <BackgroundPhoneTransitions />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Top Minimalist Tag */}
            <div className="inline-flex items-center gap-2 rounded-[64px] border border-white/20 bg-white/5 px-4 py-1 text-xs text-[#ededed] mb-6 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0070d5]" />
              <span className="font-light">SEBI Regulated Wealth-Backed Flagship Financing (LAMF)</span>
            </div>

            {/* Display Headline (Open Sans 300 weight, -0.03em tracking) */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-light tracking-[-0.03em] text-white max-w-4xl leading-[1.15]">
              Buy Your Dream Flagship.{' '}
              <span className="block text-[#0070d5] font-light">
                Backed By Your Wealth.
              </span>
            </h1>

            {/* Subhead at 16px in #ededed */}
            <p className="mt-5 text-base text-[#ededed] max-w-2xl font-light leading-relaxed">
              Pledge your mutual funds or demat portfolio at 50% LTV to unlock{' '}
              <strong className="text-white font-medium">0% No-Cost EMI</strong> without liquidating your investments or blocking credit card limits.
            </p>

            {/* Value Props Row (DJI Minimalist Clean Badges) */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 rounded-[64px] border border-white/15 bg-white/5 px-4 py-2 text-[#ededed]">
                <CheckCircle2 className="h-4 w-4 text-[#0070d5]" />
                <span>Zero Card Limit Blocked</span>
              </div>
              <div className="flex items-center gap-2 rounded-[64px] border border-white/15 bg-white/5 px-4 py-2 text-[#ededed]">
                <TrendingUp className="h-4 w-4 text-[#0070d5]" />
                <span>Portfolio Compounding Intact (~14% CAGR)</span>
              </div>
              <div className="flex items-center gap-2 rounded-[64px] border border-white/15 bg-white/5 px-4 py-2 text-[#ededed]">
                <Lock className="h-4 w-4 text-[#0070d5]" />
                <span>Automated Depository Lien Release</span>
              </div>
              <div className="flex items-center gap-2 rounded-[64px] border border-white/15 bg-white/5 px-4 py-2 text-[#ededed]">
                <Award className="h-4 w-4 text-[#0070d5]" />
                <span>Up to ₹11,000 Direct Cashback</span>
              </div>
            </div>

            {/* Hero CTAs (DJI 64px Pill & Ghost Outlined Buttons) */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center bg-[#0070d5] text-white rounded-[64px] px-8 py-3 text-sm font-medium hover:bg-[#005fb8] transition"
              >
                <span>Explore Flagships</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>

              <button
                type="button"
                onClick={() => setShow3DStudio((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-[64px] border border-white/80 text-white px-7 py-3 text-sm font-normal hover:bg-white hover:text-black transition"
              >
                <Box className="h-4 w-4 text-[#0070d5]" />
                <span>{show3DStudio ? 'Close 3D Studio' : 'Launch 3D Studio (360°)'}</span>
              </button>

              <Link
                to="/wealth-backed-emi"
                className="inline-flex items-center gap-2 rounded-[64px] border border-white/30 text-[#ededed] px-6 py-3 text-sm font-light hover:border-white hover:text-white transition"
              >
                <span>Simulate Compounding</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3D INTERACTIVE SMARTPHONE STUDIO MODAL / EXPANSION ================= */}
      {show3DStudio && (
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 animate-in fade-in duration-200">
          <ThreeDPhoneViewer
            productName="iPhone 17 Pro Max (2nm A19 Pro)"
            colorName="Cosmic Orange"
            initialColor="#C96A3C"
            onClose={() => setShow3DStudio(false)}
          />
        </section>
      )}

      {/* ================= STORE CATALOG SECTION (FOG #ededed CANVAS) ================= */}
      <section id="catalog" className="mx-auto max-w-[1200px] px-4 sm:px-6 scroll-mt-24">
        {/* Controls Header */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#dedede] dark:border-[#272727]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6c7073] dark:text-[#8c8c8c] block mb-1">
                Hardware Portfolio
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-[#000000] dark:text-white">
                Flagship Lineup on 0% EMI
              </h2>
            </div>

            {/* DJI Minimal Input Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6c7073]" />
              <input
                type="text"
                placeholder="Search iPhone 17, Galaxy..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-[#ffffff] dark:bg-[#141414] border border-[#6c7073] dark:border-[#404040] rounded-[4px] pl-10 pr-9 py-2 text-sm text-[#000000] dark:text-white placeholder-[#6c7073] focus:border-[#0070d5] focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6c7073] hover:text-[#000000] dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs (DJI Inline Text Links with 24px Gap & Signal Blue Indicator) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {brands.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBrand(b.id)}
                  className={[
                    'text-sm transition duration-150 py-1 relative whitespace-nowrap',
                    selectedBrand === b.id
                      ? 'text-[#0070d5] font-semibold'
                      : 'text-[#303233] dark:text-[#ededed] font-medium hover:text-[#0070d5]',
                  ].join(' ')}
                >
                  <span>{b.label}</span>
                  {selectedBrand === b.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#0070d5] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#6c7073]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-[4px] border border-[#dedede] dark:border-[#272727] bg-[#ffffff] dark:bg-[#141414] px-3 py-1.5 text-xs text-[#303233] dark:text-[#ededed] focus:outline-none focus:border-[#0070d5]"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="cashback">Highest Cashback</option>
              </select>
            </div>
          </div>

          {/* Quick Search Suggestion Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[12px] text-[#6c7073] dark:text-[#8c8c8c] shrink-0 mr-1">
              Popular:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => handleSearchChange(pill.query)}
                className={[
                  'rounded-[64px] px-3 py-1 text-xs transition whitespace-nowrap',
                  searchQuery.toLowerCase() === pill.query.toLowerCase()
                    ? 'bg-[#0070d5] text-white font-medium'
                    : 'border border-[#dedede] dark:border-[#272727] bg-[#ffffff] dark:bg-[#141414] text-[#595959] dark:text-[#8c8c8c] hover:border-[#6c7073]',
                ].join(' ')}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search status chip */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between rounded-[4px] bg-[#ffffff] dark:bg-[#141414] px-4 py-3 text-xs border border-[#dedede] dark:border-[#272727]">
            <span className="text-[#303233] dark:text-[#ededed]">
              Showing <strong>{filteredProducts.length}</strong> flagship{filteredProducts.length === 1 ? '' : 's'} matching &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-[#0070d5] hover:underline font-medium"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Product Grid / States (DJI 4px Radius, No Border, Generous Gap) */}
        {state.status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <ErrorState message={state.error} onRetry={load} />
        )}

        {state.status === 'success' && filteredProducts.length === 0 && (
          <div className="rounded-[4px] bg-[#ffffff] dark:bg-[#141414] p-12 text-center">
            <p className="text-sm font-medium text-[#303233] dark:text-[#ededed]">
              No smartphones match your search &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrand('all');
                handleClearSearch();
              }}
              className="mt-4 rounded-[64px] bg-[#0070d5] text-white px-5 py-2 text-xs font-medium hover:bg-[#005fb8]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {state.status === 'success' && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="rounded-[4px] bg-[#ffffff] dark:bg-[#141414] p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#0070d5] uppercase tracking-wider block mb-1">
              Engineered Financing
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-[#000000] dark:text-white">
              Why Wealth-Backed EMI Beats Credit Cards
            </h3>
            <p className="text-sm text-[#595959] dark:text-[#8c8c8c] mt-2 font-light">
              Credit cards charge 14–18% interest and lock your credit limits. 1Fi leverages your existing portfolio to provide subsidized 0% EMI while your capital keeps compounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-[4px] bg-[#ededed]/60 dark:bg-[#1e1e1e] space-y-3">
              <span className="text-xs font-mono font-bold text-[#0070d5] block">
                STEP 01
              </span>
              <h4 className="font-semibold text-[#000000] dark:text-white text-base">
                Pledge Units Digitally
              </h4>
              <p className="text-xs text-[#595959] dark:text-[#8c8c8c] leading-relaxed font-light">
                Connect your CAMS, KFintech, or Demat account via OTP. Pledge required units at 50% LTV without selling any holdings.
              </p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#ededed]/60 dark:bg-[#1e1e1e] space-y-3">
              <span className="text-xs font-mono font-bold text-[#0070d5] block">
                STEP 02
              </span>
              <h4 className="font-semibold text-[#000000] dark:text-white text-base">
                0% No-Cost EMI
              </h4>
              <p className="text-xs text-[#595959] dark:text-[#8c8c8c] leading-relaxed font-light">
                Enjoy 0% interest on short tenures and instant cashback on longer tenures. No processing fees, zero card limit blocked.
              </p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#ededed]/60 dark:bg-[#1e1e1e] space-y-3">
              <span className="text-xs font-mono font-bold text-[#0070d5] block">
                STEP 03
              </span>
              <h4 className="font-semibold text-[#000000] dark:text-white text-base">
                Automated Lien Release
              </h4>
              <p className="text-xs text-[#595959] dark:text-[#8c8c8c] leading-relaxed font-light">
                As your monthly auto-debit completes, the lien is progressively released. Your mutual funds kept compounding at ~14% throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING COMPARE TRAY ================= */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in fade-in">
          <div className="flex items-center justify-between gap-4 rounded-[4px] bg-[#000000] text-white p-3 shadow-2xl text-xs border border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {comparedProducts.map((p) => (
                  <img
                    key={p.id}
                    src={p.previewVariant.imageUrl}
                    alt={p.name}
                    className="h-9 w-9 rounded-full border border-white/20 object-contain bg-white"
                  />
                ))}
              </div>
              <div>
                <span className="font-medium text-white block">
                  {comparedProducts.length} Smartphone{comparedProducts.length > 1 ? 's' : ''} Selected
                </span>
                <span className="text-[11px] text-[#8c8c8c]">Compare specs &amp; EMI plans</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setComparedProducts([])}
                className="rounded-[64px] px-3 py-1 text-[#8c8c8c] hover:text-white"
              >
                Clear
              </button>
              <Link
                to={`/compare?ids=${comparedProducts.map((p) => p.slug).join(',')}`}
                className="inline-flex items-center gap-1.5 rounded-[64px] bg-[#0070d5] px-4 py-2 font-medium text-white hover:bg-[#005fb8] transition"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                <span>Compare</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
