import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, prepayOrder } from '../api/client.js';
import { formatINR } from '../utils/format.js';
import {
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const fetchOrders = () => {
    getOrders()
      .then((res) => {
        setOrders(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handlePrepay(orderId) {
    if (!orderId) return;
    try {
      const res = await prepayOrder(orderId);
      setNotification(res?.message || '1-Month EMI Prepayment recorded successfully!');
      fetchOrders();
      setTimeout(() => setNotification(null), 6000);
    } catch (err) {
      setNotification(err.message || 'Payment simulation failed.');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10 bg-[#F8F9FA] min-h-[80vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-bold text-emerald-800 flex items-center gap-1 shadow-sm">
              <PackageCheck className="h-3.5 w-3.5 text-emerald-600" />
              Active LAMF Loans &amp; Orders
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            My Device Loans &amp; Repayment Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your active monthly auto-debits, monitor pledged mutual funds, and prepay to release collateral liens.
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors self-start md:self-auto"
        >
          <Smartphone className="h-4 w-4" />
          <span>Shop More Flagships</span>
        </Link>
      </div>

      {notification && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button type="button" onClick={() => setNotification(null)} className="text-emerald-700 font-bold">
            Dismiss
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-16 text-slate-400 text-xs">
          Loading active loan accounts...
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-slate-400">
            <PackageCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No active smartphone loans</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Explore our curated catalog of flagships and unlock 0% EMI backed by your investment portfolio.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <span>Explore Smartphones</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order, idx) => {
            const orderId = order.id || order.orderId || `1FI-ORD-${idx + 1}`;
            const lan = order.loanAccountNumber || '1FI-LAMF-884021';
            const totalEmis = order.plan?.tenureMonths || order.repaymentSchedule?.totalEmis || 12;
            const emisPaid = order.emisPaid ?? order.repaymentSchedule?.paidEmis ?? 0;
            const progress = totalEmis > 0 ? Math.min(100, Math.round((emisPaid / totalEmis) * 100)) : 0;
            const remainingEmis = Math.max(0, totalEmis - emisPaid);
            const isLienReleased = order.lienReleased || order.lienStatus === 'LIEN_RELEASED' || remainingEmis === 0;

            const productName = order.product?.name || 'Flagship Smartphone';
            const productBrand = order.product?.brand || 'Apple';
            const variantLabel = order.product?.variantLabel || '256GB';
            const sellingPrice = order.product?.sellingPrice || 144900;
            const imageUrl =
              order.product?.imageUrl ||
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80';

            const monthlyPayment = order.plan?.monthlyPayment || Math.round(sellingPrice / totalEmis);
            const interestRate = order.plan?.annualInterestRate ?? 0;

            const pledgedName = order.pledgedAsset?.name || 'Approved Mutual Fund Folio';
            const unitsPledged = order.pledgedAsset?.unitsPledged || 344;
            const pledgedValue = order.pledgedAsset?.pledgedValue || 289800;

            const bankName =
              order.bankDetails?.bankName ||
              order.repaymentSchedule?.bankName ||
              'HDFC Bank Ltd';
            const accountMasked = order.bankDetails?.accountMasked || '•••• 4128';

            return (
              <div
                key={orderId}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      Order ID: <strong className="text-slate-900">{orderId}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-xs font-bold text-indigo-600">
                      LAN: {lan}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                      {isLienReleased ? 'Loan Closed' : 'Active Auto-Debit'}
                    </span>
                    {isLienReleased && (
                      <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-0.5 text-[11px] font-bold text-indigo-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Lien Released
                      </span>
                    )}
                  </div>
                </div>

                {/* Device & Plan Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 flex items-center gap-4">
                    <img
                      src={imageUrl}
                      alt={productName}
                      className="h-20 w-20 rounded-xl object-contain bg-slate-50 p-2 border border-slate-100 shadow-sm shrink-0"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {productBrand}
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-900">
                        {productName}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{variantLabel}</p>
                      <div className="mt-1 text-xs font-extrabold text-slate-900">
                        Device Value: {formatINR(sellingPrice)}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly EMI Debit:</span>
                      <span className="font-extrabold text-slate-900">{formatINR(monthlyPayment)} / mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tenure Duration:</span>
                      <span className="font-bold text-slate-800">{totalEmis} Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Interest Subvention:</span>
                      <span className="font-bold text-emerald-700">{interestRate}% (No-Cost)</span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 text-right space-y-2">
                    <button
                      type="button"
                      disabled={remainingEmis <= 0}
                      onClick={() => handlePrepay(orderId)}
                      className="w-full rounded-xl bg-indigo-600 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {remainingEmis > 0 ? 'Simulate 1-Month Prepayment' : 'Loan Fully Closed'}
                    </button>
                    <span className="block text-[10px] text-slate-400">
                      0% Foreclosure Penalty
                    </span>
                  </div>
                </div>

                {/* Repayment Progress Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      Repayment Progress: {emisPaid} of {totalEmis} EMIs Paid
                    </span>
                    <span className="font-extrabold text-emerald-700">{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Collateral Lien Details Box */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Pledged Collateral: {pledgedName}
                      </span>
                      <span className="text-slate-600 text-[11px]">
                        {unitsPledged} Units Under Lien • Value: {formatINR(pledgedValue)}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold uppercase text-slate-500">
                      Auto-Debit Mandate
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {bankName} ({accountMasked})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
