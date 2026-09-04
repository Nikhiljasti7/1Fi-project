import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Smartphone,
  TrendingUp,
  ShieldCheck,
  ArrowLeftRight,
  PackageCheck,
  Menu,
  X,
  Sparkles,
  LogOut,
  User,
  ChevronDown,
  Search,
} from 'lucide-react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { to: '/', label: 'Shop Flagships', icon: Smartphone },
    { to: '/wealth-backed-emi', label: 'Wealth EMI Simulator', icon: TrendingUp, highlight: true },
    { to: '/portfolio', label: 'Portfolio Vault', icon: ShieldCheck },
    { to: '/compare', label: 'Compare', icon: ArrowLeftRight },
    { to: '/orders', label: 'My Loans & Orders', icon: PackageCheck },
  ];

  function handleLogout() {
    logout();
    setUserDropdown(false);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl shadow-subtle transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                1Fi <span className="text-indigo-600 dark:text-indigo-400">Wealth</span>
              </span>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                LAMF Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Zero-Downpayment EMI Backed by Mutual Funds &amp; Stocks
            </p>
          </div>
        </Link>

        {/* Desktop Live Search Bar */}
        <div className="hidden md:block w-44 lg:w-60 xl:w-72 mx-2">
          <SearchBar isCompact placeholder="Search iPhone 17, Pro, 0% EMI..." />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition duration-200 whitespace-nowrap',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60',
                  link.highlight && !isActive ? 'text-emerald-700 dark:text-emerald-400' : '',
                ].join(' ')}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : link.highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{link.label}</span>
                {link.highlight && (
                  <Sparkles className="h-3 w-3 text-emerald-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Auth, Limit & Theme Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          <Link
            to="/portfolio"
            className="flex items-center gap-2 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/40 px-2.5 py-1.5 transition hover:bg-emerald-100/70 dark:hover:bg-emerald-900/50 shrink-0"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <span className="block text-[9px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                Limit
              </span>
              <span className="block text-xs font-extrabold text-slate-900 dark:text-white">
                ₹3.4L
              </span>
            </div>
          </Link>

          {/* User Profile / Login Button */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-7 w-7 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="text-left hidden xl:block">
                  <span className="block text-xs font-bold text-slate-900 dark:text-white">{user.name}</span>
                  <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">KYC Verified</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl backdrop-blur-2xl z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block">{user.name}</span>
                    <span className="text-slate-400 text-[11px] truncate block">{user.email}</span>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/portfolio"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                    >
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>My Portfolio Vault</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                    >
                      <PackageCheck className="h-4 w-4 text-indigo-600" />
                      <span>Active Device Loans</span>
                    </Link>
                  </div>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition shrink-0"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Action Buttons (Theme + Search + Menu Toggle) */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle className="p-2" />
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 shadow-sm"
            aria-label="Search smartphones"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 shadow-sm"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Inline Search Bar Drawer */}
      {mobileSearchOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-md animate-in fade-in slide-in-from-top-1">
          <SearchBar
            placeholder="Search iPhone 17, Galaxy, 0% EMI..."
            onSearchSubmit={() => setMobileSearchOpen(false)}
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 py-4 backdrop-blur-2xl shadow-xl">
          {/* Mobile search bar option */}
          <div className="mb-4">
            <SearchBar
              placeholder="Search iPhone 17, Pro, 0% EMI..."
              onSearchSubmit={() => setMobileOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition',
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.highlight && (
                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                      Popular
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{user.name}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">₹3.4L Limit</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
