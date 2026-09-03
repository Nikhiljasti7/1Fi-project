import { useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';

export default function ProductGallery({ imageUrl, alt }) {
  const [failed, setFailed] = useState(false);
  const [activeAngle, setActiveAngle] = useState(0);

  const fallback =
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=85';

  return (
    <div className="space-y-4">
      {/* Main Glass Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-dark-950/90 p-8 backdrop-blur-2xl shadow-glass flex items-center justify-center group">
        {/* Glow ambient background */}
        <div className="absolute inset-0 bg-radial-glow opacity-50 transition duration-700 group-hover:opacity-100" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-brand-300 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-brand-400" />
            100% Brand Certified
          </span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
            <Shield className="h-3 w-3 text-emerald-400" />
            Lien Pledge Eligible
          </span>
        </div>

        {/* Product Image */}
        <img
          src={failed ? fallback : imageUrl || fallback}
          alt={alt || 'Product image'}
          className={`relative z-10 max-h-[85%] max-w-[85%] object-contain transition-all duration-500 ${
            activeAngle === 1 ? 'scale-105 rotate-3' : activeAngle === 2 ? 'scale-105 -rotate-3' : 'group-hover:scale-105'
          }`}
          onError={() => setFailed(true)}
        />

        {/* Subtle shadow beneath device */}
        <div className="absolute bottom-6 h-6 w-3/4 rounded-full bg-black/60 blur-xl z-0" />
      </div>

      {/* Interactive Angle Switcher */}
      <div className="flex items-center justify-center gap-2">
        {['Studio Front', 'Dynamic Angle 1', 'Dynamic Angle 2'].map((label, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveAngle(idx)}
            className={[
              'rounded-xl border px-3 py-1.5 text-xs font-medium transition backdrop-blur-md',
              activeAngle === idx
                ? 'border-brand-500 bg-brand-500/20 text-white shadow-sm'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
