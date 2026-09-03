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
  AlertCircle,
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
              <PackageCheck className="h-3.5 w-3.5" />
              Active LAMF Loans &amp; Orders
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-2">
            My Device Loans &amp; Repayment Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your device delivery, upcoming auto-debit schedule, and pledged mutual fund lien status.
          </p>
        </div>

        <Link
          to="/"
          className="self-start md:self-auto rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-glow-brand"
        >
          + Shop Another Device
        </Link>
      </div>

      {notification && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="h-44 rounded-3xl bg-slate-900/60 animate-pulse" />
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center text-slate-400 max-w-md mx-auto space-y-4">
          <Smartphone className="h-12 w-12 mx-auto text-slate-500" />
          <h3 className="font-display font-bold text-white text-base">No active device loans yet</h3>
          <p className="text-xs text-slate-400">
            Browse our flagship store and pledge your mutual funds to get 0% No-Cost EMI without touching your savings.
          </p>
          <Link
            to="/"
            className="inline-block rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-glow-brand"
          >
            Explore Flagships →
          </Link>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const { product, plan, pledgedAsset, repaymentSchedule, lienStatus, deliveryStatus } = order;
          const progressPercent = repaymentSchedule
            ? Math.round((repaymentSchedule.paidEmis / repaymentSchedule.totalEmis) * 100)
            : 0;
          const isClosed = lienStatus === 'LIEN_RELEASED';

          return (
            <div
              key={order.orderId}
              className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl shadow-glass space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-400">
                      Order: {order.orderId}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="font-mono text-xs font-semibold text-slate-300">
                      LAN: {order.loanAccountNumber}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Approved on: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      isClosed
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                    }`}
                  >
                    {isClosed ? 'Loan Closed • Lien Released' : 'Active EMI • Lien In Place'}
                  </span>
                </div>
              </div>

              {/* Device and Plan Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-20 w-20 rounded-2xl bg-dark-950/80 p-2 object-contain border border-white/10"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{product.name}</h3>
                    <p className="text-xs text-slate-400">{product.variantLabel}</p>
                    <div className="font-display font-extrabold text-sm text-emerald-400 mt-1">
                      {formatINR(product.sellingPrice)}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-slate-400 text-[11px] block">Monthly Payment</span>
                    <span className="font-bold text-white text-sm">{formatINR(plan.monthlyPayment)}</span>
                    <span className="text-[10px] text-slate-500 block">via e-NACH auto debit</span>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-slate-400 text-[11px] block">Next Due Date</span>
                    <span className="font-bold text-slate-200">
                      {isClosed ? 'Paid in Full' : repaymentSchedule?.nextEmiDate}
                    </span>
                    <span className="text-[10px] text-emerald-400 block">Bank Mandate Active</span>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 text-[11px] block">Pledged Units</span>
                    <span className="font-bold text-emerald-300 block truncate">{pledgedAsset.name}</span>
                    <span className="text-[10px] text-slate-400 block">{pledgedAsset.unitsPledged} Units Locked</span>
                  </div>
                </div>
              </div>

              {/* Repayment Progress Bar */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">
                    Repayment Progress: <strong className="text-white">{repaymentSchedule.paidEmis}</strong> of {repaymentSchedule.totalEmis} EMIs Paid
                  </span>
                  <span className="font-bold text-emerald-400">{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  <span>Auto-debit from: {repaymentSchedule.bankName}</span>
                </div>

                <div className="flex items-center gap-2">
                  {!isClosed && (
                    <button
                      type="button"
                      onClick={() => handlePrepay(order.orderId)}
                      className="rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-glow-brand hover:from-brand-500 hover:to-emerald-400 transition"
                    >
                      Simulate 1-Month Prepayment
                    </button>
                  )}

                  {isClosed && (
                    <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-300">
                      ✓ NOC Generated (Lien Released)
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => alert(`Loan agreement for LAN ${order.loanAccountNumber} generated.`)}
                    className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition flex items-center gap-1.5"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    <span>Loan Sanction Letter</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
