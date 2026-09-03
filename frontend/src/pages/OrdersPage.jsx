import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, prepayOrder } from '../api/client.js';
import { formatINR } from '../utils/format.js';
import {
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  Calendar,
  Building2,
  ArrowRight,
  FileDown,
  Sparkles,
} from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const fetchOrders = () => {
    getOrders()
      .then((res) => {
        setOrders(res || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handlePrepay(orderId) {
    try {
      const res = await prepayOrder(orderId);
      setNotification(res.message);
      fetchOrders();
      setTimeout(() => setNotification(null), 6000);
    } catch (err) {
      setNotification(err.message || 'Payment simulation failed.');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10 bg-slate-50">
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
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition self-start md:self-auto"
        >
          <Smartphone className="h-4 w-4" />
          <span>Shop More Flagships</span>
        </Link>
      </div>

      {notification && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-center justify-between shadow-sm animate-in fade-in">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 text-slate-400">
            <PackageCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No active smartphone loans</h3>
          <p className="text-xs text-slate-500">
            You haven&apos;t placed any wealth-backed orders yet. Browse our flagships and upgrade with 0% EMI backed by your mutual funds!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md"
          >
            <span>Explore Smartphones</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => {
            const progress = Math.min(100, Math.round((order.emisPaid / order.plan.tenureMonths) * 100));
            const remainingEmis = order.plan.tenureMonths - order.emisPaid;

            return (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      Order ID: <strong className="text-slate-900">{order.id}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-xs font-bold text-indigo-600">
                      LAN: {order.loanAccountNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                      {order.status === 'ACTIVE' ? 'Active Auto-Debit' : order.status}
                    </span>
                    {order.lienReleased && (
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
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      className="h-20 w-20 rounded-2xl object-contain bg-slate-50 p-2 border border-slate-100 shadow-sm shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {order.product.brand}
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-900">
                        {order.product.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{order.product.variantLabel}</p>
                      <div className="mt-1 text-xs font-extrabold text-slate-900">
                        Device Value: {formatINR(order.product.sellingPrice)}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly EMI Debit:</span>
                      <span className="font-extrabold text-slate-900">{formatINR(order.plan.monthlyPayment)} / mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tenure Duration:</span>
                      <span className="font-bold text-slate-800">{order.plan.tenureMonths} Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Interest Subvention:</span>
                      <span className="font-bold text-emerald-700">{order.plan.annualInterestRate}% (No-Cost)</span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 text-right space-y-2">
                    <button
                      type="button"
                      disabled={remainingEmis <= 0}
                      onClick={() => handlePrepay(order.id)}
                      className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-emerald-800 transition disabled:opacity-40"
                    >
                      {remainingEmis > 0 ? 'Simulate 1-Month Prepayment' : 'Loan Fully Closed ✓'}
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
                      Repayment Progress: {order.emisPaid} of {order.plan.tenureMonths} EMIs Paid
                    </span>
                    <span className="font-extrabold text-emerald-700">{progress}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Collateral Lien Details Box */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Pledged Collateral: {order.pledgedAsset.name}
                      </span>
                      <span className="text-slate-600 text-[11px]">
                        {order.pledgedAsset.unitsPledged} Units Under Lien • Value: {formatINR(order.pledgedAsset.pledgedValue)}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold uppercase text-slate-500">
                      Auto-Debit Mandate
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {order.bankDetails.bankName} ({order.bankDetails.accountMasked})
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
