import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Smartphone,
  TrendingUp,
  ShieldCheck,
  ArrowLeftRight,
  PackageCheck,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Shop Flagships', icon: Smartphone },
    { to: '/wealth-backed-emi', label: 'Wealth EMI Simulator', icon: TrendingUp, highlight: true },
    { to: '/portfolio', label: 'Portfolio Vault', icon: ShieldCheck },
    { to: '/compare', label: 'Compare', icon: ArrowLeftRight },
    { to: '/orders', label: 'My Loans & Orders', icon: PackageCheck },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white font-bold shadow-glow-brand transition duration-300 group-hover:scale-105">
            <span className="font-display text-lg tracking-tight">1Fi</span>
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-dark-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">
                1Fi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">Wealth</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                LAMF Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Zero-Downpayment EMI Backed by Mutual Funds & Stocks
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition duration-200',
                  isActive
                    ? 'bg-white/10 text-white border border-white/15 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-white/5',
                  link.highlight && !isActive ? 'text-emerald-400' : '',
                ].join(' ')}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-brand-400' : link.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.highlight && (
                  <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Portfolio Credit Status Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/portfolio"
            className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-1.5 transition hover:border-emerald-500/60"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                Linked Demat & MF
              </span>
              <span className="block text-xs font-bold text-white">
                ₹3,40,000 Limit
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-dark-900/95 px-4 py-4 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition',
                    isActive
                      ? 'bg-brand-600/20 border border-brand-500/30 text-white'
                      : 'text-slate-300 hover:bg-white/5',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-brand-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.highlight && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      Popular
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Available Borrowing Limit:</span>
              <p className="text-sm font-bold text-emerald-400">₹3,40,000 (CAMS / Demat)</p>
            </div>
            <Link
              to="/portfolio"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300"
            >
              Vault →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
