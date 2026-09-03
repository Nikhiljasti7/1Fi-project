import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-950 text-slate-400 mt-20">
      {/* Trust & Regulatory Highlights */}
      <div className="border-b border-white/5 bg-white/[0.02] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">SEBI Registered Depositories</h4>
                <p className="text-[11px] text-slate-500">Pledging via CAMS, KFintech &amp; CDSL</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Your Portfolio Stays Yours</h4>
                <p className="text-[11px] text-slate-500">Units remain invested &amp; earn 12-18% CAGR</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">100% Subsidized 0% EMI</h4>
                <p className="text-[11px] text-slate-500">Up to ₹11,000 instant cashback</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Instant Lien Release</h4>
                <p className="text-[11px] text-slate-500">Automatic unpledge on final EMI debit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-white">
                1Fi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">Wealth-Backed EMI</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400 max-w-md">
              A modern consumer financing platform enabling smartphone shoppers to leverage their mutual funds and demat stocks as collateral (Loan Against Mutual Funds - LAMF), unlocking 0% and low-cost EMI plans without selling assets or blocking credit card limits.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                Apple Authorised Resellers
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                Samsung Official Store
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                Google Pixel Partner
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                OnePlus Certified
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Platform Sub-Pages</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Shop All Flagships
                </Link>
              </li>
              <li>
                <Link to="/wealth-backed-emi" className="text-emerald-400 hover:text-emerald-300 transition">
                  Wealth EMI &amp; Growth Calculator
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition">
                  Portfolio Vault (CAMS / Demat)
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition">
                  Compare Flagships Side-by-Side
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition">
                  Active Loans &amp; Repayment Schedule
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Popular Flagships</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/products/iphone-17-pro" className="hover:text-white transition">
                  iPhone 17 Pro
                </Link>
              </li>
              <li>
                <Link to="/products/iphone-16-pro-max" className="hover:text-white transition">
                  iPhone 16 Pro Max
                </Link>
              </li>
              <li>
                <Link to="/products/samsung-galaxy-s24-ultra" className="hover:text-white transition">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link to="/products/samsung-galaxy-z-fold-6" className="hover:text-white transition">
                  Samsung Galaxy Z Fold 6
                </Link>
              </li>
              <li>
                <Link to="/products/google-pixel-9-pro-xl" className="hover:text-white transition">
                  Google Pixel 9 Pro XL
                </Link>
              </li>
              <li>
                <Link to="/products/oneplus-13" className="hover:text-white transition">
                  OnePlus 13
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-10 border-t border-white/10 pt-6 text-[11px] text-slate-500 leading-relaxed">
          <p>
            Disclaimer: 1Fi Wealth-Backed EMI is a technology demonstration created for the 1Fi SDE1 Take-Home Assignment. All calculations for EMI, interest, cashback, and portfolio growth are derived via rigorous standard reducing-balance math and simulated market CAGR. Mutual Fund investments are subject to market risks; read all scheme related documents carefully.
          </p>
          <p className="mt-2 text-slate-400">
            © {new Date().getFullYear()} 1Fi Technologies. Crafted with React 18, Tailwind Glassmorphism, Node.js Express, and PostgreSQL.
          </p>
        </div>
      </div>
    </footer>
  );
}
