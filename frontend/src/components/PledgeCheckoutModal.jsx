import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { formatINR } from '../utils/format.js';
import { submitOrder, getCollateral } from '../api/client.js';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileCheck,
  CreditCard,
} from 'lucide-react';

export default function PledgeCheckoutModal({ isOpen, onClose, product, variant, plan, onOrderSuccess }) {
  const [step, setStep] = useState(1);
  const [collateralData, setCollateralData] = useState({ mutualFunds: [], stocks: [] });
  const [selectedAssetType, setSelectedAssetType] = useState('MUTUAL_FUND');
  const [selectedAssetId, setSelectedAssetId] = useState('mf-1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Load collateral data
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setConfirmedOrder(null);
      setErrorMessage(null);
      getCollateral()
        .then((res) => {
          setCollateralData(res);
          if (res.mutualFunds?.length > 0) setSelectedAssetId(res.mutualFunds[0].id);
        })
        .catch(() => {
          // Fallback static collateral
          setCollateralData({
            mutualFunds: [
              { id: 'mf-1', name: 'Parag Parikh Flexi Cap Fund', nav: 84.22, ltv: 0.50, cagr3Y: 21.4 },
              { id: 'mf-2', name: 'HDFC Top 100 Fund', nav: 942.15, ltv: 0.50, cagr3Y: 19.8 },
            ],
            stocks: [
              { id: 'stk-1', symbol: 'RELIANCE', name: 'Reliance Industries Ltd', marketPrice: 2980.50, ltv: 0.50 },
            ],
          });
        });
    }
  }, [isOpen]);

  if (!isOpen || !product || !variant || !plan) return null;

  // Selected collateral calculation
  const currentAsset =
    selectedAssetType === 'MUTUAL_FUND'
      ? collateralData.mutualFunds.find((m) => m.id === selectedAssetId) || collateralData.mutualFunds[0]
      : collateralData.stocks.find((s) => s.id === selectedAssetId) || collateralData.stocks[0];

  const requiredLtv = currentAsset?.ltv || 0.50;
  const requiredCollateralValue = Math.round(variant.sellingPrice / requiredLtv);
  const unitsNeeded = currentAsset
    ? selectedAssetType === 'MUTUAL_FUND'
      ? Math.ceil(requiredCollateralValue / (currentAsset.nav || 100))
      : Math.ceil(requiredCollateralValue / (currentAsset.marketPrice || 1000))
    : 100;

  async function handleConfirmLoan() {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      product: {
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        variantLabel: variant.label,
        storage: variant.storage,
        color: variant.color,
        sellingPrice: variant.sellingPrice,
        mrp: variant.mrp,
        imageUrl: variant.imageUrl,
      },
      plan: {
        tenureMonths: plan.tenureMonths,
        monthlyPayment: plan.monthlyPayment,
        annualInterestRate: plan.annualInterestRate,
        cashbackAmount: plan.cashbackAmount,
        totalPayable: plan.totalPayable,
        effectiveAmountAfterCashback: plan.effectiveAmountAfterCashback,
      },
      pledgedAsset: {
        type: selectedAssetType,
        name: currentAsset?.name || 'Approved Collateral Portfolio',
        unitsPledged: unitsNeeded,
        pledgedValue: requiredCollateralValue,
        ltvAllowed: variant.sellingPrice,
      },
      customer: {
        name: 'Nikhil Sharma',
        pan: 'ABCPS8912K',
        phone: '+91 98765 43210',
        email: 'nikhil.sharma@example.com',
      },
      bankDetails: {
        bankName: 'HDFC Bank Ltd',
        accountMasked: '•••• 4128',
        ifsc: 'HDFC0001234',
      },
    };

    try {
      const res = await submitOrder(payload);
      setConfirmedOrder(res);
      setStep(4);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#10B981', '#38BDF8'],
        });
      } catch {
        // Confetti optional
      }
      if (onOrderSuccess) onOrderSuccess(res);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to complete pledge agreement.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-gradient-to-b from-dark-900 to-dark-950 p-6 sm:p-8 text-white shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white font-bold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Wealth-Backed EMI Checkout
            </h3>
            <p className="text-xs text-slate-400">
              Pledge your investments • Zero credit card limit blocked • Keep compounding
            </p>
          </div>
        </div>

        {/* Multi-Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center text-xs">
          {[
            { num: 1, label: 'Plan & Device' },
            { num: 2, label: 'Pledge Units' },
            { num: 3, label: 'e-NACH Auto-Debit' },
            { num: 4, label: 'Loan Approved' },
          ].map((s) => (
            <div
              key={s.num}
              className={[
                'rounded-xl py-2 px-1 border transition duration-200',
                step === s.num
                  ? 'border-brand-500 bg-brand-500/20 text-white font-bold shadow-sm'
                  : step > s.num
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/5 bg-white/[0.02] text-slate-500',
              ].join(' ')}
            >
              <div className="font-display font-semibold">Step {s.num}</div>
              <div className="text-[10px] truncate hidden sm:block">{s.label}</div>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ================= STEP 1: REVIEW PLAN ================= */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <img
                src={variant.imageUrl}
                alt={product.name}
                className="h-16 w-16 rounded-xl object-contain bg-slate-950/60 p-1"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase text-brand-400">{product.brand}</span>
                <h4 className="text-base font-bold text-white truncate">{product.name}</h4>
                <p className="text-xs text-slate-400">{variant.label}</p>
                <div className="mt-1 font-display font-bold text-emerald-400">
                  {formatINR(variant.sellingPrice)}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected EMI Plan:</span>
                <span className="font-bold text-white">{plan.tenureMonths} Months Tenure</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly EMI Payment:</span>
                <span className="font-extrabold text-white text-sm">{formatINR(plan.monthlyPayment)} / month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Interest Rate:</span>
                <span className="font-semibold text-emerald-400">
                  {plan.annualInterestRate === 0 ? '0% Subsidized' : `${plan.annualInterestRate}% p.a.`}
                </span>
              </div>
              {plan.cashbackAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Upfront Cashback:</span>
                  <span className="font-bold">− {formatINR(plan.cashbackAmount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between">
                <span className="text-slate-300 font-semibold">Net Effective Device Cost:</span>
                <span className="font-bold text-emerald-300">{formatINR(plan.effectiveAmountAfterCashback)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-500 py-3.5 text-sm font-bold text-white shadow-glow-brand transition hover:from-brand-500 hover:to-emerald-400"
            >
              <span>Continue to Pledge Collateral</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ================= STEP 2: SELECT PLEDGE COLLATERAL ================= */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedAssetType('MUTUAL_FUND');
                  if (collateralData.mutualFunds?.length > 0) setSelectedAssetId(collateralData.mutualFunds[0].id);
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  selectedAssetType === 'MUTUAL_FUND'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mutual Fund Portfolio (CAMS / KFintech)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAssetType('STOCK');
                  if (collateralData.stocks?.length > 0) setSelectedAssetId(collateralData.stocks[0].id);
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  selectedAssetType === 'STOCK'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demat Stocks (CDSL / NSDL)
              </button>
            </div>

            {/* Asset Options List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {selectedAssetType === 'MUTUAL_FUND'
                ? collateralData.mutualFunds.map((mf) => (
                    <button
                      key={mf.id}
                      type="button"
                      onClick={() => setSelectedAssetId(mf.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition ${
                        selectedAssetId === mf.id
                          ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                          : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/70'
                      }`}
                    >
                      <div>
                        <h5 className="font-bold text-white">{mf.name}</h5>
                        <p className="text-[11px] text-slate-400">
                          NAV: ₹{mf.nav} • 3Y CAGR: <span className="text-emerald-400 font-semibold">{mf.cagr3Y}%</span> • Max LTV: {Math.round(mf.ltv * 100)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[11px] font-semibold text-slate-300">
                          {selectedAssetId === mf.id ? '✓ Selected' : 'Select'}
                        </span>
                      </div>
                    </button>
                  ))
                : collateralData.stocks.map((stk) => (
                    <button
                      key={stk.id}
                      type="button"
                      onClick={() => setSelectedAssetId(stk.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition ${
                        selectedAssetId === stk.id
                          ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50'
                          : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/70'
                      }`}
                    >
                      <div>
                        <h5 className="font-bold text-white">{stk.name} ({stk.symbol})</h5>
                        <p className="text-[11px] text-slate-400">
                          CMP: ₹{stk.marketPrice} • 1Y Gain: <span className="text-emerald-400 font-semibold">{stk.cagr1Y}%</span> • Max LTV: {Math.round(stk.ltv * 100)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[11px] font-semibold text-slate-300">
                          {selectedAssetId === stk.id ? '✓ Selected' : 'Select'}
                        </span>
                      </div>
                    </button>
                  ))}
            </div>

            {/* Lien Requirement Summary */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Device Selling Price:</span>
                <span className="font-bold text-white">{formatINR(variant.sellingPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Approved LTV Limit:</span>
                <span className="font-semibold text-emerald-400">{Math.round(requiredLtv * 100)}% of Collateral</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Collateral Value Under Lien:</span>
                <span className="font-bold text-white">{formatINR(requiredCollateralValue)}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-emerald-300 font-semibold">Units Pledged:</span>
                <span className="font-extrabold text-emerald-400 text-sm">
                  {unitsNeeded} {selectedAssetType === 'MUTUAL_FUND' ? 'MF Units' : 'Shares'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                🔒 Note: These units stay registered in your folio. You continue to earn all dividends, NAV growth, and market gains. Lien is automatically released upon loan completion.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 py-3 text-xs font-bold text-white shadow-glow-brand"
              >
                <span>Proceed to Auto-Debit Setup</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: KYC & MANDATE ================= */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-brand-400" />
                Borrower Identification &amp; KYC
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Borrower Name</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue="Nikhil Sharma"
                    className="w-full glass-input rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Verified PAN Number</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue="ABCPS8912K"
                    className="w-full glass-input rounded-lg p-2 text-xs text-emerald-400 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-400" />
                Monthly EMI Auto-Debit Mandate (e-NACH / NPCI)
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div>
                    <span className="font-bold text-white block">HDFC Bank Ltd</span>
                    <span className="text-slate-400 text-[11px]">Primary Salary A/C •••• 4128 (IFSC: HDFC0001234)</span>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    Active Mandate
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Authorized auto-debit of {formatINR(plan.monthlyPayment)} on the 5th of every month for {plan.tenureMonths} months. No penal charges for early prepayment.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmLoan}
                className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-xs font-bold text-white shadow-glow-emerald hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Lien &amp; Approving...</span>
                ) : (
                  <>
                    <span>Confirm Pledge &amp; Approve Loan</span>
                    <Lock className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: ORDER & LOAN CONFIRMED ================= */}
        {step === 4 && confirmedOrder && (
          <div className="space-y-5 text-center py-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 animate-bounce">
              <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Instant Loan Approved
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-2">
                Congratulations, Your Order is Confirmed!
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Your mutual fund lien has been placed successfully. Your new {product.name} is being prepared for express delivery.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono font-bold text-white">{confirmedOrder.data?.orderId || '1FI-ORD-98214'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Loan Account Number (LAN):</span>
                <span className="font-mono font-bold text-brand-400">{confirmedOrder.data?.loanAccountNumber || '1FI-LAMF-884021'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pledged Asset:</span>
                <span className="font-bold text-emerald-300">{currentAsset?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly EMI Debit:</span>
                <span className="font-bold text-white">{formatINR(plan.monthlyPayment)} / month ({plan.tenureMonths} Months)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">First Debit Date:</span>
                <span className="font-semibold text-slate-200">
                  {new Date(Date.now() + 30 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between">
                <span className="text-slate-400">Delivery Status:</span>
                <span className="font-bold text-emerald-400">Dispatching in 24-48 Hours</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close &amp; Keep Shopping
              </button>
              <a
                href="/orders"
                className="rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-glow-brand"
              >
                View Active Loans &amp; Schedule →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
