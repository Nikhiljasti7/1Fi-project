import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#272727] text-[#8c8c8c] mt-24 border-t border-[#333333]">
      {/* Trust & Regulatory Highlights Strip */}
      <div className="border-b border-[#333333] py-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#0070d5] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">SEBI Registered Depositories</h4>
                <p className="text-xs text-[#8c8c8c] mt-1">Digital lien pledge via CAMS, KFintech &amp; CDSL</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-[#0070d5] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Portfolio Stays Invested</h4>
                <p className="text-xs text-[#8c8c8c] mt-1">Holdings continue compounding at ~14% CAGR</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-[#0070d5] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">0% No-Cost Subsidized EMI</h4>
                <p className="text-xs text-[#8c8c8c] mt-1">Up to ₹11,000 instant cashback on flagships</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#0070d5] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Instant Lien Release</h4>
                <p className="text-xs text-[#8c8c8c] mt-1">Automatic depository unpledge upon loan closure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Link Grid (DJI 48px Internal Padding) */}
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="h-7 w-7" />
              <span className="font-display font-semibold text-lg text-white tracking-tight">
                1Fi <span className="text-[#0070d5]">Wealth</span>
              </span>
            </div>
            <p className="text-sm text-[#8c8c8c] max-w-md leading-relaxed">
              1Fi is India&apos;s pioneering credit-against-investments infrastructure. Purchase flagship smartphones on 0% No-Cost EMI backed by your existing mutual funds and equities without liquidating capital or blocking credit limits.
            </p>
            <div className="text-xs text-[#8c8c8c] flex items-center gap-2 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0070d5]" />
              <span>CAMS &amp; KFintech Integrated • RBI Compliant NBFC Network</span>
            </div>
          </div>

          {/* Column 2: Smartphones on EMI */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Smartphones on EMI
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products/iphone-17-pro-max" className="hover:text-white transition">
                  Apple iPhone 17 Pro Max
                </Link>
              </li>
              <li>
                <Link to="/products/iphone-17-air" className="hover:text-white transition">
                  Apple iPhone 17 Air
                </Link>
              </li>
              <li>
                <Link to="/products/iphone-16-pro-max" className="hover:text-white transition">
                  Apple iPhone 16 Pro Max
                </Link>
              </li>
              <li>
                <Link to="/products/samsung-galaxy-s24-ultra" className="hover:text-white transition">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link to="/products/google-pixel-9-pro-xl" className="hover:text-white transition">
                  Google Pixel 9 Pro XL
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Wealth Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Wealth Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/wealth-backed-emi" className="text-[#0070d5] hover:underline font-medium inline-flex items-center gap-1">
                  <span>Wealth EMI Simulator</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition">
                  Portfolio Vault &amp; Limits
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition">
                  Flagship Specs Compare
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition">
                  My Active Loans &amp; Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Investor Portal Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Band */}
        <div className="mt-12 pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c8c8c]">
          <p>© {new Date().getFullYear()} 1Fi Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Fair Practices Code</Link>
            <Link to="/terms" className="hover:text-white transition">SEBI Depository Rules</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
