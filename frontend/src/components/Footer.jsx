import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 mt-20 transition-colors">
      {/* Trust & Regulatory Highlights */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">SEBI Registered Depositories</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Pledging via CAMS, KFintech &amp; CDSL</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Your Portfolio Stays Yours</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Units remain invested &amp; earn 12-18% CAGR</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Subsidized 0% EMI</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Up to ₹11,000 instant cashback</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Instant Lien Release</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Automatic unpledge on final EMI debit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                1Fi <span className="text-indigo-600 dark:text-indigo-400">Wealth-Backed EMI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              1Fi is India&apos;s pioneering credit-against-investments infrastructure. We enable discerning smartphone buyers to purchase flagship phones without liquidating long-term investments or blocking credit card limits.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>CAMS &amp; KFintech API Certified • RBI Compliant NBFC Network</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Smartphones on EMI
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products/iphone-17-pro-max" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition font-semibold text-indigo-600 dark:text-indigo-400">Apple iPhone 17 Pro Max (A19 Pro)</Link></li>
              <li><Link to="/products/iphone-17-air" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Apple iPhone 17 Air (Ultra-thin)</Link></li>
              <li><Link to="/products/iphone-16-pro-max" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Apple iPhone 16 Pro Max</Link></li>
              <li><Link to="/products/samsung-galaxy-s24-ultra" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Samsung Galaxy S24 Ultra</Link></li>
              <li><Link to="/products/google-pixel-9-pro-xl" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Google Pixel 9 Pro XL</Link></li>
              <li><Link to="/products/oneplus-13" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">OnePlus 13</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Wealth Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/wealth-backed-emi" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium text-emerald-700 dark:text-emerald-400">Wealth EMI Simulator</Link></li>
              <li><Link to="/portfolio" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Portfolio Vault &amp; Limits</Link></li>
              <li><Link to="/compare" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Flagship Specs Compare</Link></li>
              <li><Link to="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">My Active Loans &amp; Orders</Link></li>
              <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Investor Sign In</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} 1Fi Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-slate-700 dark:hover:text-slate-300 transition">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-700 dark:hover:text-slate-300 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-700 dark:hover:text-slate-300 transition">Fair Practices Code</Link>
            <Link to="/terms" className="hover:text-slate-700 dark:hover:text-slate-300 transition">SEBI Depository Rules</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
