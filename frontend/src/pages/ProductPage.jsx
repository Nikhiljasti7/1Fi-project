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
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6">
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 bg-slate-50 dark:bg-[#0B0F19] transition-colors">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Catalog</span>
          <span>/</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase">{product.brand}</span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Specs (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-8">
          <ProductGallery
            imageUrl={selectedVariant?.imageUrl}
            images={selectedVariant?.images}
            alt={`${product.name} - ${selectedVariant?.label}`}
            color={selectedVariant?.color}
            colorHex={selectedVariant?.colorHex}
          />

          {/* Technical Specifications Matrix */}
          {product.specs && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  Flagship Hardware Specifications
                </h3>
                <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                  Certified Genuine
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5">
                  <Smartphone className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Display</span>
                    <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">{product.specs.display}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5">
                  <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Processor &amp; AI</span>
                    <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">{product.specs.processor}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5">
                  <Camera className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Pro Camera System</span>
                    <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">{product.specs.camera}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 p-3.5">
                  <Battery className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Battery &amp; Charging</span>
                    <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">{product.specs.battery}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 p-6 text-xs text-slate-700 dark:text-slate-300 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              1Fi Official Pledge &amp; Delivery Guarantee
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>1-Year Official Brand Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero pre-closure charges on your loan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Pledge is 100% digital via CAMS / CDSL OTP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Dispatched through insured courier in 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Variant picker, EMI ladder, Summary, CTA (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Header info */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {product.brand}
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Mutual Fund Backed 0% EMI
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {product.tagline || product.description}
            </p>
          </div>

          {/* Variant Selector */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Select Finish &amp; Storage Tier
            </h3>
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariant?.id}
              onSelect={handleVariantSelect}
            />
          </div>

          {/* EMI Ladder */}
          {selectedVariant && selectedVariant.emiPlans && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    Choose Your Wealth-Backed EMI Plan
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Subsidized reducing-balance plans with instant cashback
                  </p>
                </div>
              </div>

              <EmiPlanList
                plans={selectedVariant.emiPlans}
                selectedPlanId={selectedPlan?.id}
                onSelect={handlePlanSelect}
              />
            </div>
          )}

          {/* Price Breakdown */}
          {selectedVariant && (
            <PriceSummary variant={selectedVariant} selectedPlan={selectedPlan} />
          )}

          {/* Proceed Button */}
          <div className="pt-2">
            <ProceedButton
              disabled={!selectedPlan || selectedVariant?.stockStatus === 'out_of_stock'}
              onProceed={() => setIsCheckoutOpen(true)}
            />
            <p className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span>Pledge lien setup via CAMS &amp; KFintech • Zero card limit blocked</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Pledge Checkout Modal */}
      <PledgeCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        variant={selectedVariant}
        plan={selectedPlan}
        onOrderSuccess={(order) => setPlacedOrder(order)}
      />
    </div>
  );
}
