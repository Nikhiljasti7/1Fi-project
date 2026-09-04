import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Smartphone, ArrowRight, TrendingUp } from 'lucide-react';
import { getProducts } from '../api/client';
import { formatINR } from '../utils/format';

export default function SearchBar({ placeholder = 'Search iPhone 17, Galaxy, 0% EMI...', onSearchSubmit, isCompact = false }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Lazy load products on first focus or typing
  const ensureProducts = async () => {
    if (hasFetched || isLoading) return;
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
      setHasFetched(true);
    } catch {
      // Ignore network errors in search bar
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard shortcut (Ctrl+K or / to focus)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement !== inputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !inputRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered matching products
  const matches = query.trim().length > 0
    ? products.filter((p) => {
        const q = query.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          (p.specs?.processor && p.specs.processor.toLowerCase().includes(q)) ||
          (p.previewVariant?.storage && p.previewVariant.storage.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  function handleSubmit(e) {
    e?.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit(query.trim());
    } else {
      navigate(`/?search=${encodeURIComponent(query.trim())}#catalog`);
      // Scroll smoothly to catalog if already on homepage
      setTimeout(() => {
        const el = document.getElementById('catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  function handleSelectProduct(slug) {
    setIsOpen(false);
    setQuery('');
    navigate(`/products/${encodeURIComponent(slug)}`);
  }

  function handleClear() {
    setQuery('');
    inputRef.current?.focus();
  }

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => {
            ensureProducts();
            setIsOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            ensureProducts();
          }}
          placeholder={placeholder}
          className={[
            'w-full rounded-xl border border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-900 placeholder-slate-400 shadow-sm transition',
            'pl-9 pr-14 py-2 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100',
            isCompact ? 'text-[11px] py-1.5' : 'text-xs py-2',
          ].join(' ')}
        />

        {/* Clear or Keyboard hint */}
        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="hidden sm:inline-block rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-2xs">
              Ctrl K
            </span>
          )}
        </div>
      </form>

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Matching Smartphones ({matches.length})
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold">Press Enter to browse all</span>
          </div>

          {matches.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {matches.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectProduct(item.slug)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-11 w-11 rounded-lg bg-slate-100 p-1 flex items-center justify-center shrink-0 border border-slate-200/60 overflow-hidden">
                    <img
                      src={item.previewVariant?.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-contain group-hover:scale-110 transition duration-200"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-xs text-slate-900 truncate group-hover:text-indigo-600 transition">
                        {item.name}
                      </h4>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 shrink-0">
                        {item.brand}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.tagline || item.specs?.processor}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block text-xs font-extrabold text-slate-900">
                      {formatINR(item.previewVariant?.sellingPrice || 0)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <TrendingUp className="h-2.5 w-2.5" />
                      0% EMI {formatINR(item.previewVariant?.startingMonthlyEmi || 0)}/mo
                    </span>
                  </div>
                </button>
              ))}

              <div className="pt-2 px-2 pb-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 py-2 text-xs font-bold text-indigo-700 transition"
                >
                  <span>See all results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center px-4">
              <Smartphone className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No smartphones found for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Try searching for &quot;iPhone 17&quot;, &quot;Titanium&quot;, &quot;Galaxy&quot;, or &quot;Pro&quot;.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
