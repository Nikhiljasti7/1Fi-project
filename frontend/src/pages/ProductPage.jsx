import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, ApiError } from '../api/client.js';
import ProductGallery from '../components/ProductGallery.jsx';
import VariantSelector from '../components/VariantSelector.jsx';
import EmiPlanList from '../components/EmiPlanList.jsx';
import PriceSummary from '../components/PriceSummary.jsx';
import ProceedButton from '../components/ProceedButton.jsx';
import PledgeCheckoutModal from '../components/PledgeCheckoutModal.jsx';
import ErrorState from '../components/ErrorState.jsx';
import { ProductPageSkeleton } from '../components/LoadingSkeleton.jsx';
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Cpu,
  Smartphone,
  Camera,
  Battery,
  Shield,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function ProductPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: 'loading', product: null, error: null, notFound: false });
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const load = () => {
    setState({ status: 'loading', product: null, error: null, notFound: false });
    getProductBySlug(slug)
      .then((product) => {
        setState({ status: 'success', product, error: null, notFound: false });
        const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
        setSelectedVariantId(defaultVariant?.id ?? null);
        const recommended = defaultVariant?.emiPlans?.find((p) => p.isRecommended) || defaultVariant?.emiPlans?.[0];
        setSelectedPlanId(recommended?.id ?? null);
      })
      .catch((err) => {
        const message = err instanceof ApiError ? err.message : 'Failed to load this product.';
        setState({ status: 'error', product: null, error: message, notFound: err?.code === 'PRODUCT_NOT_FOUND' });
      });
  };

  useEffect(load, [slug]);

  const selectedVariant = useMemo(() => {
    if (!state.product) return null;
    return state.product.variants.find((v) => v.id === selectedVariantId) || state.product.variants[0] || null;
  }, [state.product, selectedVariantId]);

  const selectedPlan = useMemo(() => {
    if (!selectedVariant) return null;
    return selectedVariant.emiPlans.find((p) => p.id === selectedPlanId) || selectedVariant.emiPlans[0] || null;
  }, [selectedVariant, selectedPlanId]);

  function handleVariantSelect(variantId) {
    setSelectedVariantId(variantId);
    const variant = state.product.variants.find((v) => v.id === variantId);
    const recommended = variant?.emiPlans?.find((p) => p.isRecommended) || variant?.emiPlans?.[0];
    setSelectedPlanId(recommended?.id ?? null);
  }

  function handlePlanSelect(planId) {
    setSelectedPlanId(planId);
  }

  if (state.status === 'loading') return <ProductPageSkeleton />;

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Smartphones</span>
        </Link>
        <ErrorState
          title={state.notFound ? 'Smartphone Not Found' : "Couldn't load product"}
          message={state.notFound ? `We couldn't find a device matching "/products/${slug}".` : state.error}
          onRetry={state.notFound ? undefined : load}
        />
      </div>
    );
  }

  const { product } = state;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:text-white hover:border-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Shop</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
          <ShieldCheck className="h-4 w-4" />
          <span>100% Subsidized 0% Wealth EMI Eligible</span>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Gallery & Device Specs (5 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          <ProductGallery
            imageUrl={selectedVariant?.imageUrl}
            alt={`${product.name} ${selectedVariant?.label}`}
          />

          {/* Technical Specifications Matrix */}
          {product.specs && (
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-brand-400" />
                <span>Technical Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {product.specs.display && (
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-slate-400 font-medium block">Display</span>
                    <span className="font-semibold text-white mt-0.5 block">{product.specs.display}</span>
                  </div>
                )}
                {product.specs.processor && (
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-slate-400 font-medium block flex items-center gap-1">
                      <Cpu className="h-3 w-3 text-brand-400" />
                      Processor
                    </span>
                    <span className="font-semibold text-white mt-0.5 block">{product.specs.processor}</span>
                  </div>
                )}
                {product.specs.camera && (
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-slate-400 font-medium block flex items-center gap-1">
                      <Camera className="h-3 w-3 text-cyan-400" />
                      Camera Setup
                    </span>
                    <span className="font-semibold text-white mt-0.5 block">{product.specs.camera}</span>
                  </div>
                )}
                {product.specs.battery && (
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-slate-400 font-medium block flex items-center gap-1">
                      <Battery className="h-3 w-3 text-emerald-400" />
                      Battery &amp; Charging
                    </span>
                    <span className="font-semibold text-white mt-0.5 block">{product.specs.battery}</span>
                  </div>
                )}
              </div>

              {product.description && (
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                  {product.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Variant Switcher, Price & EMI Plans (7 cols on lg) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-20 lg:self-start">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-brand-500/20 border border-brand-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
                {product.brand}
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                LAMF Backed
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {product.tagline || `${selectedVariant?.storage} • ${selectedVariant?.color}`}
            </p>
          </div>

          {/* Pricing & Net Financial Cost */}
          <PriceSummary variant={selectedVariant} selectedPlan={selectedPlan} />

          {/* Variant Selector */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Choose Storage &amp; Finish
            </h2>
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariantId}
              onSelect={handleVariantSelect}
            />
          </div>

          {/* EMI Plans Ladder */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Choose EMI Tenure Backed by Mutual Funds / Stocks
              </h2>
              <span className="text-[11px] font-medium text-emerald-400">
                {selectedVariant?.emiPlans?.length || 0} Plans
              </span>
            </div>

            <EmiPlanList
              plans={selectedVariant?.emiPlans}
              selectedPlanId={selectedPlanId}
              onSelect={handlePlanSelect}
            />
          </div>

          {/* Action Trigger */}
          <div className="space-y-3">
            <ProceedButton
              disabled={!selectedPlan || selectedVariant?.stockStatus === 'out_of_stock'}
              onProceed={() => setIsCheckoutOpen(true)}
            />

            {/* Order Confirmation Banner if already completed */}
            {placedOrder && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold block">Order Placed! LAN: {placedOrder.data?.loanAccountNumber}</span>
                    <span className="text-slate-400 text-[11px]">Check your active loans &amp; delivery status.</span>
                  </div>
                </div>
                <Link
                  to="/orders"
                  className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 font-bold text-emerald-300 hover:bg-emerald-500/30"
                >
                  View Loan →
                </Link>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-slate-500" />
                256-bit Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-slate-500" />
                Zero Processing Fee
              </span>
              <span>•</span>
              <span>CAMS &amp; Demat Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <PledgeCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        variant={selectedVariant}
        plan={selectedPlan}
        onOrderSuccess={(order) => {
          setPlacedOrder(order);
        }}
      />
    </div>
  );
}
