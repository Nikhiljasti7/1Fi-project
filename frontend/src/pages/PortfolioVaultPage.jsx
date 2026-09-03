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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10 bg-slate-50">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-800 shadow-sm mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>CAMS &amp; Demat Verified Investor</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Portfolio Vault &amp; Credit Power
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your pledged mutual funds and demat shares backing your active smartphone loans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsLinkingModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Link New Folio / Demat</span>
          </button>
        </div>
      </div>

      {linkSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Successfully synced with CAMS. Your borrowing limit has increased by ₹1,20,000.</span>
          </div>
          <button type="button" onClick={() => setLinkSuccess(false)} className="text-emerald-700 font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Linked Portfolio */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Total Linked Portfolio
          </span>
          <div className="font-display text-2xl font-extrabold text-slate-900">
            {formatINR(totalPortfolioValue || 650000)}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
            <TrendingUp className="h-3 w-3" />
            +16.4% Weighted 3Y CAGR
          </span>
        </div>

        {/* Approved Credit Limit */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Approved Borrowing Limit
          </span>
          <div className="font-display text-2xl font-extrabold text-indigo-700">
            {formatINR(totalBorrowingLimit || 340000)}
          </div>
          <span className="text-[11px] text-slate-500 font-medium block pt-1">
            50% LTV on Equity, 80% on Liquid
          </span>
        </div>

        {/* Active Lien Locked */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Active Lien Locked
          </span>
          <div className="font-display text-2xl font-extrabold text-amber-700">
            {formatINR(activePledgedValue)}
          </div>
          <span className="text-[11px] text-slate-500 font-medium block pt-1">
            1 Device Loan in progress
          </span>
        </div>

        {/* Free Limit Available */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
            Available For New Devices
          </span>
          <div className="font-display text-2xl font-extrabold text-emerald-700">
            {formatINR(freeAvailableLimit || 200100)}
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 pt-1">
            0% Downpayment Ready
          </span>
        </div>
      </div>

      {/* Holdings List & Collateral Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900">
              Eligible Collateral Holdings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select or inspect your assets currently linked via CAMS and Central Depository Services.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'all'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Assets
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mf')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'mf'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mutual Funds
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stocks')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'stocks'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demat Stocks
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="py-3 px-4 font-bold">Asset Name &amp; Category</th>
                <th className="py-3 px-4 font-bold">Current NAV / CMP</th>
                <th className="py-3 px-4 font-bold">Returns (CAGR)</th>
                <th className="py-3 px-4 font-bold">Max LTV</th>
                <th className="py-3 px-4 font-bold">Lien Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activeTab === 'all' || activeTab === 'mf') &&
                collateral.mutualFunds.map((mf) => (
                  <tr key={mf.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{mf.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {mf.category} • Folio: CAMS-910482
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                      ₹{mf.nav}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      +{mf.cagr3Y}% (3Y)
                    </td>
                    <td className="py-4 px-4">
                      <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {Math.round(mf.ltv * 100)}% LTV
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {mf.id === 'mf-1' ? (
                        <span className="flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                          <Lock className="h-3.5 w-3.5" />
                          Lien Active (1 Device)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Free Unencumbered
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        <span>Shop with this</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}

              {(activeTab === 'all' || activeTab === 'stocks') &&
                collateral.stocks.map((stk) => (
                  <tr key={stk.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{stk.name} ({stk.symbol})</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {stk.sector} • CDSL Demat DP ID: 12081600
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                      ₹{stk.marketPrice}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      +{stk.cagr1Y}% (1Y)
                    </td>
                    <td className="py-4 px-4">
                      <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {Math.round(stk.ltv * 100)}% LTV
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Free Unencumbered
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        <span>Shop with this</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Linking Modal */}
      {isLinkingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 space-y-4">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Link Depository Folio
            </h3>
            <p className="text-xs text-slate-500">
              Enter your PAN or Demat registered mobile number to fetch mutual funds from CAMS &amp; KFintech.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered PAN
                </label>
                <input
                  type="text"
                  defaultValue="ABCPS8912K"
                  className="w-full glass-input rounded-xl p-2.5 text-xs font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Depository Provider
                </label>
                <select className="w-full glass-input rounded-xl p-2.5 text-xs text-slate-900 font-medium">
                  <option>CAMS (Computer Age Management Services)</option>
                  <option>KFin Technologies Ltd</option>
                  <option>CDSL (Central Depository Services Ltd)</option>
                  <option>NSDL (National Securities Depository)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsLinkingModal(false)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMockLink}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20"
              >
                Fetch via OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
