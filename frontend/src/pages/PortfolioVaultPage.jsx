import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format.js';
import { getCollateral } from '../api/client.js';
import {
  ShieldCheck,
  Building2,
  Lock,
  Plus,
  TrendingUp,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

export default function PortfolioVaultPage() {
  const [collateral, setCollateral] = useState({ mutualFunds: [], stocks: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [isLinkingModal, setIsLinkingModal] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);

  useEffect(() => {
    getCollateral()
      .then((data) => {
        setCollateral(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Compute portfolio stats
  const totalMfValue = collateral.mutualFunds.reduce(
    (sum, m) => sum + (m.defaultUnits || 1000) * (m.nav || 100),
    0
  );
  const totalStockValue = collateral.stocks.reduce(
    (sum, s) => sum + (s.defaultShares || 50) * (s.marketPrice || 1000),
    0
  );
  const totalPortfolioValue = Math.round(totalMfValue + totalStockValue);

  // 50% LTV on equity, 80% on debt
  const totalBorrowingLimit = Math.round(totalPortfolioValue * 0.52);
  const activePledgedValue = 139900; // 1 active smartphone loan
  const freeAvailableLimit = totalBorrowingLimit - activePledgedValue;

  function handleMockLink() {
    setIsLinkingModal(false);
    setLinkSuccess(true);
    setTimeout(() => setLinkSuccess(false), 5000);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              CAMS &amp; KFintech Verified Vault
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Your Investment &amp; Pledge Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time tracking of linked Mutual Funds and Demat Stocks used for 0% Smartphone EMI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsLinkingModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-glow-brand hover:from-brand-500 hover:to-emerald-400 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Link New Folio / Demat</span>
          </button>
        </div>
      </div>

      {linkSuccess && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>New Folio linked successfully via CAMS e-KYC. Additional ₹85,000 credit limit unlocked!</span>
        </div>
      )}

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl space-y-2">
          <span className="text-slate-400 text-xs font-medium">Total Portfolio Net Worth</span>
          <div className="font-display text-2xl font-extrabold text-white">
            {formatINR(totalPortfolioValue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" />
            <span>+18.4% 1Y Annual Return</span>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-5 backdrop-blur-xl space-y-2 shadow-glow-emerald">
          <span className="text-emerald-300 text-xs font-medium">Unlocked Smartphone Credit Line</span>
          <div className="font-display text-2xl font-extrabold text-emerald-400">
            {formatINR(totalBorrowingLimit)}
          </div>
          <div className="text-[11px] text-slate-400">
            Based on 50% Equity &amp; 80% Debt LTV
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl space-y-2">
          <span className="text-slate-400 text-xs font-medium">Active Lien Against Loans</span>
          <div className="font-display text-2xl font-extrabold text-brand-300">
            {formatINR(activePledgedValue)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Lock className="h-3 w-3 text-brand-400" />
            <span>Pledged for iPhone 16 Pro Max</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl space-y-2">
          <span className="text-slate-400 text-xs font-medium">Available Unencumbered Credit</span>
          <div className="font-display text-2xl font-extrabold text-cyan-400">
            {formatINR(freeAvailableLimit)}
          </div>
          <div className="text-[11px] text-slate-400">
            Ready for instant 0% device purchase
          </div>
        </div>
      </div>

      {/* Active Pledged Smartphone Loan Card */}
      <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-r from-slate-900/90 via-dark-950 to-slate-900/90 p-6 backdrop-blur-2xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-500/20 border border-brand-500/30 px-3 py-1 text-xs font-bold text-brand-300 flex items-center gap-1.5">
            <Smartphone className="h-4 w-4" />
            Active Smartphone Loan Backed by Portfolio
          </span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-400">
            Lien Active • In Good Standing
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 className="font-display font-bold text-lg text-white">iPhone 16 Pro Max (256GB / Desert Titanium)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Loan Account Number: <strong className="text-white font-mono">1FI-LAMF-884021</strong> • Pledged to: Parag Parikh Flexi Cap Fund (332 Units)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 text-[11px] block">Monthly Auto-Debit:</span>
              <span className="font-bold text-white text-sm">{formatINR(11658)} / mo</span>
            </div>
            <Link
              to="/orders"
              className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-xs font-bold text-white transition flex items-center gap-1"
            >
              <span>Manage Loan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <h2 className="font-display font-bold text-lg text-white">
            Linked Portfolio Instruments
          </h2>

          <div className="flex gap-2 text-xs">
            {['all', 'mutual_funds', 'stocks'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/5">
              <tr>
                <th className="pb-3">Asset / Scheme Name</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Units / Shares</th>
                <th className="pb-3">CMP / NAV</th>
                <th className="pb-3">Holding Value</th>
                <th className="pb-3">Eligible LTV</th>
                <th className="pb-3">Available Limit</th>
                <th className="pb-3 text-right">Lien Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {/* Mutual Funds */}
              {(activeTab === 'all' || activeTab === 'mutual_funds') &&
                collateral.mutualFunds.map((mf, i) => {
                  const val = Math.round((mf.defaultUnits || 1000) * mf.nav);
                  const limit = Math.round(val * mf.ltv);
                  const isPledged = i === 0;

                  return (
                    <tr key={mf.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 pr-3 font-semibold text-white">
                        <div>{mf.name}</div>
                        <span className="text-[10px] text-slate-500">{mf.amc}</span>
                      </td>
                      <td className="py-3.5 text-slate-400">{mf.category}</td>
                      <td className="py-3.5 text-slate-300 font-mono">{(mf.defaultUnits || 1000).toLocaleString('en-IN')}</td>
                      <td className="py-3.5 text-slate-300 font-mono">₹{mf.nav}</td>
                      <td className="py-3.5 font-bold text-white">{formatINR(val)}</td>
                      <td className="py-3.5 font-semibold text-emerald-400">{Math.round(mf.ltv * 100)}%</td>
                      <td className="py-3.5 font-bold text-emerald-300">{formatINR(limit)}</td>
                      <td className="py-3.5 text-right">
                        {isPledged ? (
                          <span className="rounded-full bg-brand-500/20 border border-brand-500/30 px-2.5 py-0.5 text-[10px] font-bold text-brand-300">
                            332 Units Pledged
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                            Free Margin
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

              {/* Demat Stocks */}
              {(activeTab === 'all' || activeTab === 'stocks') &&
                collateral.stocks.map((stk) => {
                  const val = Math.round((stk.defaultShares || 50) * stk.marketPrice);
                  const limit = Math.round(val * stk.ltv);

                  return (
                    <tr key={stk.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 pr-3 font-semibold text-white">
                        <div>{stk.name} ({stk.symbol})</div>
                        <span className="text-[10px] text-slate-500">{stk.sector}</span>
                      </td>
                      <td className="py-3.5 text-slate-400">Demat Equity (NSE)</td>
                      <td className="py-3.5 text-slate-300 font-mono">{(stk.defaultShares || 50).toLocaleString('en-IN')}</td>
                      <td className="py-3.5 text-slate-300 font-mono">₹{stk.marketPrice}</td>
                      <td className="py-3.5 font-bold text-white">{formatINR(val)}</td>
                      <td className="py-3.5 font-semibold text-emerald-400">{Math.round(stk.ltv * 100)}%</td>
                      <td className="py-3.5 font-bold text-emerald-300">{formatINR(limit)}</td>
                      <td className="py-3.5 text-right">
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          Free Margin
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Link Account Modal */}
      {isLinkingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-dark-900 p-6 text-white shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              Link Additional Mutual Fund / Demat
            </h3>
            <p className="text-xs text-slate-400">
              Fetch your mutual funds via CAMS / KFintech or connect Zerodha / Groww / Upstox.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Registrar / Broker</label>
                <select className="w-full glass-input rounded-xl p-2.5 text-white">
                  <option>CAMS (Computer Age Management Services)</option>
                  <option>KFintech Mutual Fund Services</option>
                  <option>Zerodha Demat (CDSL)</option>
                  <option>Groww Securities (NSDL)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Registered Mobile Number / PAN</label>
                <input
                  type="text"
                  defaultValue="+91 98765 43210"
                  className="w-full glass-input rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkingModal(false)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMockLink}
                className="flex-1 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 py-2.5 text-xs font-bold text-white shadow-glow-brand"
              >
                Verify &amp; Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
