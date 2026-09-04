import { useState, useEffect } from 'react';
import { Shield, Sparkles, Star, Truck, Check, Layers, Image as ImageIcon, Box } from 'lucide-react';
import ThreeDPhoneViewer from './ThreeDPhoneViewer.jsx';

export default function ProductGallery({ imageUrl, images = [], alt, color, colorHex }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | '3d'

  // Build the list of angle gallery photos
  const galleryList =
    images && images.length > 0
      ? images
      : [
          {
            url: imageUrl,
            label: 'Front & Back View',
            angle: 'front_back',
          },
          {
            url: imageUrl,
            label: 'Camera System Close-up',
            angle: 'camera',
            transform: 'scale-125 translate-x-3 translate-y-3',
          },
          {
            url: imageUrl,
            label: 'Titanium Edge Profile',
            angle: 'side',
            transform: 'rotate-12 scale-110',
          },
          {
            url: imageUrl,
            label: 'Display Dynamic View',
            angle: 'display',
            transform: '-rotate-6 scale-105',
          },
        ];

  // Reset selected image when variant image changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [imageUrl, images]);

  const currentItem = galleryList[selectedIndex] || galleryList[0];
  const activeUrl = currentItem?.url || imageUrl;
  const fallback =
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90';

  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.35)',
    });
  }

  function handleMouseLeave() {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)',
    });
  }

  return (
    <div className="space-y-4">
      {/* Studio View Mode Switcher */}
      <div className="flex items-center justify-between gap-3 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={[
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm',
              activeTab === 'photos'
                ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
            ].join(' ')}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Studio Photos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('3d')}
            className={[
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm',
              activeTab === '3d'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
            ].join(' ')}
          >
            <Box className="h-3.5 w-3.5 text-amber-400" />
            <span>Interactive 3D Model</span>
            <span className="rounded-full bg-amber-400/20 border border-amber-400/30 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-300 ml-0.5">
              360°
            </span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden sm:inline mr-2">
          {activeTab === '3d' ? 'Full 3D Hardware Simulation' : 'Certified Apple Retail Angles'}
        </span>
      </div>

      {activeTab === '3d' ? (
        <ThreeDPhoneViewer
          productName={alt}
          imageUrl={activeUrl}
          initialColor={colorHex || '#C96A3C'}
          colorName={color || 'Cosmic Orange'}
        />
      ) : (
        <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
          {/* Vertical Thumbnail Column */}
          <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-w-full md:w-20 shrink-0 pb-1 md:pb-0 no-scrollbar">
            {galleryList.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  aria-label={item.label || `View angle ${idx + 1}`}
                  className={[
                    'relative h-18 w-18 md:h-20 md:w-20 shrink-0 rounded-2xl border p-1.5 transition-all duration-200 bg-white dark:bg-slate-900 overflow-hidden group',
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-500/30 shadow-md scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 opacity-75 hover:opacity-100',
                  ].join(' ')}
                >
                  <div className="h-full w-full rounded-xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.thumbUrl || item.url || fallback}
                      alt={item.label || `Angle ${idx + 1}`}
                      className={`h-full w-full object-contain p-1 transition duration-300 ${
                        item.transform && !item.thumbUrl ? item.transform : 'group-hover:scale-110'
                      }`}
                      onError={(e) => {
                        e.currentTarget.src = fallback;
                      }}
                    />
                  </div>

                  {isSelected && (
                    <div className="absolute top-1 right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-indigo-600 text-white shadow-sm">
                      <Check className="h-2 w-2 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main High-Res Stage */}
          <div className="flex-1 w-full space-y-3">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm flex items-center justify-center cursor-crosshair group"
            >
              {/* Top Stage Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  Brand Certified Sealed
                </span>
                <span className="flex items-center gap-1 rounded-md border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                  <Shield className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  1Fi Lien Eligible
                </span>
              </div>

              {/* Main Large Image */}
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <img
                  src={activeUrl || fallback}
                  alt={alt || currentItem?.label || 'Product showcase'}
                  style={zoomStyle}
                  className={`max-h-[90%] max-w-[90%] object-contain drop-shadow-md transition-transform duration-200 ${
                    currentItem?.transform && !zoomStyle.transform ? currentItem.transform : ''
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = fallback;
                  }}
                />
              </div>

              {/* Bottom Floating Photo Angle Label */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="rounded-md bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-200 shadow-sm">
                  {currentItem?.label || 'Front & Back View'}
                </span>
              </div>

              {/* Bottom Right Rating Pill */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-md bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>4.9</span>
                <span className="text-slate-400 font-normal text-[10px]">(500+ reviews)</span>
              </div>

              {/* Device Floor Shadow */}
              <div className="absolute bottom-6 h-6 w-3/4 rounded-full bg-slate-300/30 dark:bg-black/60 blur-xl pointer-events-none z-0" />
            </div>

            {/* Value Highlights under the photo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-sm">
                <Truck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate">Free Insured Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 text-emerald-800 dark:text-emerald-300 shadow-sm">
                <span className="font-bold">₹</span>
                <span className="truncate">Up to ₹11,000 Direct Cashback</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-sm col-span-2 sm:col-span-1">
                <Shield className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">1-Yr Official Brand Warranty</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
