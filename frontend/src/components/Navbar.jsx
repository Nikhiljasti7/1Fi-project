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
  LogOut,
  User,
  ChevronDown,
  Search,
  ChevronRight,
} from 'lucide-react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [showPromoBar, setShowPromoBar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { to: '/', label: 'Smartphones', icon: Smartphone },
    { to: '/wealth-backed-emi', label: 'Wealth EMI Simulator', icon: TrendingUp },
    { to: '/portfolio', label: 'Portfolio Vault', icon: ShieldCheck },
    { to: '/compare', label: 'Compare Specs', icon: ArrowLeftRight },
    { to: '/orders', label: 'My Loans & Orders', icon: PackageCheck },
  ];

  function handleLogout() {
    logout();
    setUserDropdown(false);
    navigate('/');
  }

  return (
    <>
      {/* Top Announcement Bar (DJI Minimal Style) */}
      {showPromoBar && (
        <aside aria-label="Announcement" className="bg-[#ededed] dark:bg-[#1a1a1a] text-[#303233] dark:text-[#ededed] text-xs py-2 px-4 border-b border-[#dedede] dark:border-[#272727] transition-colors">
          <div className="mx-auto max-w-[1200px] flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto text-center">
              <span className="font-light">
                Introducing iPhone 17 Lineup: 0% No-Cost EMI backed by SEBI Registered Depositories.
              </span>
              <Link
                to="/wealth-backed-emi"
                className="text-[#0070d5] hover:underline font-medium inline-flex items-center gap-0.5"
              >
                <span>Calculate EMI</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setShowPromoBar(false)}
              className="text-[#6c7073] hover:text-[#000000] dark:hover:text-white p-0.5"
              aria-label="Dismiss announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#ffffff] dark:bg-[#000000] border-b border-[#ededed] dark:border-[#272727] shadow-[rgba(0,0,0,0.06)_0px_8px_16px_0px] transition-colors duration-150">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Brand Logo (DJI Clean Wordmark Style) */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Logo className="h-8 w-8" />
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-lg text-[#000000] dark:text-[#ffffff] tracking-tight">
                1Fi <span className="text-[#0070d5]">Wealth</span>
              </span>
              <span className="rounded-full bg-[#ededed] dark:bg-[#272727] px-2 py-0.5 text-[10px] font-medium text-[#6c7073] dark:text-[#8c8c8c] uppercase tracking-wider">
                LAMF
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links (Open Sans 14px / 500, 24px gap) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={[
                    'text-sm transition duration-150 py-1 relative',
                    isActive
                      ? 'text-[#0070d5] font-semibold'
                      : 'text-[#303233] dark:text-[#ededed] font-medium hover:text-[#0070d5] dark:hover:text-[#0070d5]',
                  ].join(' ')}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#0070d5] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search, Theme Toggle, Portfolio Limit & Primary CTA */}
          <div className="flex items-center gap-3">
            {/* Desktop Live Search Bar */}
            <div className="hidden md:block w-44 lg:w-56">
              <SearchBar isCompact placeholder="Search iPhone 17, Pro..." />
            </div>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* User Profile or Persistent Signal Blue CTA */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 rounded-[4px] border border-[#ededed] dark:border-[#272727] bg-[#ffffff] dark:bg-[#141414] px-3 py-1.5 hover:border-[#6c7073] transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover border border-[#ededed] dark:border-[#272727]"
                  />
                  <span className="text-xs font-medium text-[#303233] dark:text-white hidden xl:inline">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#6c7073]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-52 rounded-[4px] border border-[#ededed] dark:border-[#272727] bg-[#ffffff] dark:bg-[#141414] p-2 shadow-lg z-50 text-xs animate-in fade-in">
                    <div className="px-3 py-2 border-b border-[#ededed] dark:border-[#272727]">
                      <span className="font-semibold text-[#000000] dark:text-white block">{user.name}</span>
                      <span className="text-[#6c7073] text-[11px] truncate block">{user.email}</span>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/portfolio"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[#303233] dark:text-[#ededed] hover:bg-[#ededed] dark:hover:bg-[#272727] hover:text-[#0070d5]"
                      >
                        <ShieldCheck className="h-4 w-4 text-[#0070d5]" />
                        <span>My Portfolio Vault</span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[#303233] dark:text-[#ededed] hover:bg-[#ededed] dark:hover:bg-[#272727] hover:text-[#0070d5]"
                      >
                        <PackageCheck className="h-4 w-4 text-[#0070d5]" />
                        <span>Active Device Loans</span>
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-[#ededed] dark:border-[#272727]">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
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
                className="hidden sm:inline-flex items-center justify-center bg-[#0070d5] text-white rounded-[64px] px-5 py-2 text-sm font-medium hover:bg-[#005fb8] transition"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="p-2 text-[#303233] dark:text-white rounded-[4px]"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-[#303233] dark:text-white rounded-[4px]"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Drawer */}
        {mobileSearchOpen && (
          <div className="lg:hidden border-t border-[#ededed] dark:border-[#272727] bg-[#ffffff] dark:bg-[#141414] px-4 py-3">
            <SearchBar
              placeholder="Search iPhone 17, Galaxy..."
              onSearchSubmit={() => setMobileSearchOpen(false)}
            />
          </div>
        )}

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#ededed] dark:border-[#272727] bg-[#ffffff] dark:bg-[#141414] px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-[#303233] dark:text-[#ededed] hover:text-[#0070d5]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#ededed] dark:border-[#272727]">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-sm font-medium text-rose-600"
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-[#0070d5] text-white rounded-[64px] py-2.5 text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
