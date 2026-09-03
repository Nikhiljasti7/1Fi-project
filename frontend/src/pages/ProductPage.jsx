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
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 mb-6">
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 bg-slate-50">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:text-slate-900 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Catalog</span>
          <span>/</span>
          <span className="font-semibold text-slate-700 uppercase">{product.brand}</span>
          <span>/</span>
          <span className="font-bold text-slate-900 truncate max-w-[150px] sm:max-w-none">{product.name}</span>
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
          />

          {/* Technical Specifications Matrix */}
          {product.specs && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Flagship Hardware Specifications
                </h3>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                  Certified Genuine
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <Smartphone className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Display</span>
                    <span className="text-slate-600 mt-0.5 block">{product.specs.display}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <Cpu className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Processor &amp; AI</span>
                    <span className="text-slate-600 mt-0.5 block">{product.specs.processor}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <Camera className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Pro Camera System</span>
                    <span className="text-slate-600 mt-0.5 block">{product.specs.camera}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <Battery className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Battery &amp; Charging</span>
                    <span className="text-slate-600 mt-0.5 block">{product.specs.battery}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 text-xs text-slate-700 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              1Fi Official Pledge &amp; Delivery Guarantee
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>1-Year Official Brand Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Zero pre-closure charges on your loan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Pledge is 100% digital via CAMS / CDSL OTP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Dispatched through insured courier in 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Variant picker, EMI ladder, Summary, CTA (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Header info */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                {product.brand}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Mutual Fund Backed 0% EMI
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {product.tagline || product.description}
            </p>
          </div>

          {/* Variant Selector */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900">
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Choose Your Wealth-Backed EMI Plan
                  </h3>
                  <p className="text-[11px] text-slate-500">
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
            <p className="mt-2 text-center text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3 text-emerald-600" />
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
