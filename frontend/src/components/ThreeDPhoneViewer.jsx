import { useState, useRef, useEffect } from 'react';
import {
  RotateCcw,
  Maximize2,
  Sparkles,
  Layers,
  Eye,
  Camera,
  Cpu,
  Shield,
  Play,
  Pause,
  Sliders,
} from 'lucide-react';

/**
 * ThreeDPhoneViewer
 * An interactive 3D flagship smartphone viewer with 360° rotation,
 * realistic titanium chassis, glass reflection, dynamic camera bumps,
 * finish selection, and an interactive "Exploded 3D Internal Architecture" mode!
 */
export default function ThreeDPhoneViewer({
  productName = 'iPhone 17 Pro Max',
  brand = 'Apple',
  initialColor = '#C96A3C', // Cosmic Orange
  colorName = 'Cosmic Orange',
  imageUrl,
  onClose,
}) {
  // 3D Rotational angles
  const [rotX, setRotX] = useState(5);
  const [rotY, setRotY] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [viewMode, setViewMode] = useState('assemble'); // 'assemble' | 'exploded' | 'front' | 'back'
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedFinishLabel, setSelectedFinishLabel] = useState(colorName);

  const containerRef = useRef(null);

  // Available finishes
  const finishes = [
    { name: 'Cosmic Orange', hex: '#C96A3C', bezel: '#8B4219', accent: '#FF7A33' },
    { name: 'Deep Blue Titanium', hex: '#1E293B', bezel: '#0F172A', accent: '#38BDF8' },
    { name: 'Natural Titanium', hex: '#9E978E', bezel: '#645E56', accent: '#E2DCD5' },
    { name: 'Black Titanium', hex: '#1C1F22', bezel: '#0B0D0E', accent: '#6B7280' },
    { name: 'Desert Gold', hex: '#D4AF37', bezel: '#997E24', accent: '#F3E5AB' },
  ];

  const currentFinish =
    finishes.find((f) => f.hex.toLowerCase() === selectedColor.toLowerCase()) || finishes[0];

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging || viewMode === 'exploded') return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.75) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging, viewMode]);

  // Mouse drag handlers
  function handleMouseDown(e) {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotY((prev) => (prev + dx * 0.65) % 360);
    setRotX((prev) => Math.max(-60, Math.min(60, prev - dy * 0.5)));
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  // Preset Views
  function setPresetView(view) {
    setIsAutoRotating(false);
    setViewMode(view);
    if (view === 'front') {
      setRotX(0);
      setRotY(0);
    } else if (view === 'back') {
      setRotX(0);
      setRotY(180);
    } else if (view === 'side') {
      setRotX(0);
      setRotY(90);
    } else if (view === 'isometric') {
      setRotX(15);
      setRotY(35);
    }
  }

  return (
    <div className="relative w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6 shadow-xl overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                3D Interactive Flagship Model
              </h3>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                360° Real-Time
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Drag to rotate device • Switch finishes • Inspect titanium chassis
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setIsAutoRotating((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            {isAutoRotating ? (
              <>
                <Pause className="h-3.5 w-3.5 text-indigo-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-indigo-500" />
                <span>Auto-Spin</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setViewMode((prev) => (prev === 'exploded' ? 'assemble' : 'exploded'));
              setIsAutoRotating(false);
              setRotX(18);
              setRotY(40);
            }}
            className={[
              'inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-sm',
              viewMode === 'exploded'
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700',
            ].join(' ')}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{viewMode === 'exploded' ? 'Reassemble Phone' : 'Exploded 3D View'}</span>
          </button>

          <button
            type="button"
            onClick={() => setPresetView('isometric')}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
            title="Reset to default angle"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Preset View Switcher Pills */}
      <div className="relative z-20 flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0 mr-1">
          Camera Angles:
        </span>
        {[
          { id: 'isometric', label: '3D Angle' },
          { id: 'front', label: 'Front Display' },
          { id: 'back', label: 'Triple Camera' },
          { id: 'side', label: 'Titanium Edge' },
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setPresetView(btn.id)}
            className={[
              'px-2.5 py-1 rounded-lg text-xs font-semibold transition shrink-0',
              viewMode === btn.id
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
            ].join(' ')}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ================= 3D VIEWPORT STAGE ================= */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative h-[430px] sm:h-[480px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden my-2"
        style={{ perspective: '1400px' }}
      >
        {/* Subtle radial floor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 55%, ${currentFinish.accent}25 0%, transparent 65%)`,
          }}
        />

        {/* 3D Floor Shadow */}
        <div
          className="absolute bottom-10 h-10 w-64 rounded-full blur-2xl transition-all duration-300 pointer-events-none"
          style={{
            backgroundColor: '#00000050',
            transform: `scale(${1 - Math.abs(rotX) / 120}) rotateX(90deg)`,
          }}
        />

        {/* ================= 3D SMARTPHONE MODEL ASSEMBLY ================= */}
        <div
          className="relative transition-transform duration-75 ease-out"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformStyle: 'preserve-3d',
            width: '210px',
            height: '420px',
          }}
        >
          {/* ================= LAYER 1: FRONT OLED DISPLAY ================= */}
          <div
            className="absolute inset-0 rounded-[44px] p-2 transition-all duration-500"
            style={{
              transform: viewMode === 'exploded' ? 'translateZ(90px)' : 'translateZ(10px)',
              transformStyle: 'preserve-3d',
              backgroundColor: currentFinish.bezel,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 1.5px rgba(255,255,255,0.2)',
            }}
          >
            {/* Front Glass Bezel */}
            <div className="relative h-full w-full rounded-[36px] bg-slate-950 p-3 flex flex-col justify-between overflow-hidden border border-black/80">
              {/* Dynamic Island Pill */}
              <div className="relative z-30 mx-auto h-5 w-24 rounded-full bg-black border border-white/10 flex items-center justify-between px-2.5 shadow-md">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-bold text-emerald-400">0% EMI</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Screen Wallpaper / UI Interface */}
              <div className="relative z-20 space-y-3 mt-4">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md text-white shadow-lg">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="uppercase font-bold tracking-wider text-emerald-300">1Fi Wealth LAMF</span>
                    <span>14% CAGR</span>
                  </div>
                  <div className="mt-1.5 text-sm font-extrabold">{productName}</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Finish: <strong className="text-white">{selectedFinishLabel}</strong>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/40 p-2.5 backdrop-blur-md space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-300">
                    <span>Monthly EMI:</span>
                    <span className="font-bold text-emerald-400">Zero Interest</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-300">
                    <span>SEBI Pledged LTV:</span>
                    <span className="font-bold text-white">50% Available</span>
                  </div>
                </div>
              </div>

              {/* Screen Glass Glare reflection */}
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform -rotate-45" />

              {/* Home indicator bar */}
              <div className="relative z-30 mx-auto h-1.5 w-28 rounded-full bg-white/60 mb-1" />
            </div>
          </div>

          {/* ================= LAYER 2 (EXPLODED ONLY): A19 PRO CHIP & MOTHERBOARD ================= */}
          {viewMode === 'exploded' && (
            <div
              className="absolute inset-4 rounded-3xl p-3 border border-emerald-500/40 bg-slate-950/90 text-white shadow-2xl backdrop-blur-md transition-all duration-500 flex flex-col justify-between"
              style={{
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Cpu className="h-4 w-4" />
                  <span className="text-[11px] font-bold">Apple A19 Pro Logic Board</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">2nm FinFET</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] my-auto">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400">CPU Cores</div>
                  <div className="font-bold text-white text-xs">6-Core Architecture</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400">Neural Engine</div>
                  <div className="font-bold text-white text-xs">32 Cores NPU</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400">Ray Tracing</div>
                  <div className="font-bold text-emerald-400 text-xs">Hardware Gen-2</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-slate-400">Sub-display ID</div>
                  <div className="font-bold text-white text-xs">Face ID TrueDepth</div>
                </div>
              </div>

              <div className="text-[8px] text-slate-400 text-center border-t border-white/10 pt-1.5">
                Internal Hardware Structure • Layer 2 of 4
              </div>
            </div>
          )}

          {/* ================= LAYER 3: BRUSHED TITANIUM CHASSIS FRAME (SIDES) ================= */}
          <div
            className="absolute inset-0 rounded-[44px] transition-all duration-500"
            style={{
              transform: viewMode === 'exploded' ? 'translateZ(-15px)' : 'translateZ(0px)',
              transformStyle: 'preserve-3d',
              backgroundColor: currentFinish.hex,
              border: `4px solid ${currentFinish.bezel}`,
            }}
          >
            {/* Left Buttons (Volume & Action Button) */}
            <div className="absolute -left-2 top-20 h-8 w-1.5 rounded-l bg-slate-600" title="Action Button" />
            <div className="absolute -left-2 top-32 h-12 w-1.5 rounded-l bg-slate-600" title="Volume Up" />
            <div className="absolute -left-2 top-48 h-12 w-1.5 rounded-l bg-slate-600" title="Volume Down" />

            {/* Right Buttons (Side Button & Camera Control) */}
            <div className="absolute -right-2 top-24 h-16 w-1.5 rounded-r bg-slate-600" title="Power / Siri" />
            <div className="absolute -right-2 top-48 h-10 w-1.5 rounded-r bg-indigo-400" title="Camera Control 2.0" />

            {/* Bottom Speaker grills & USB-C */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-10 rounded-t bg-slate-900 border border-slate-700" title="USB-C 10Gbps" />
          </div>

          {/* ================= LAYER 4: REAR SAPPHIRE GLASS & TRIPLE CAMERA BUMP ================= */}
          <div
            className="absolute inset-0 rounded-[44px] p-3 transition-all duration-500"
            style={{
              transform: viewMode === 'exploded' ? 'translateZ(-90px) rotateY(180deg)' : 'translateZ(-10px) rotateY(180deg)',
              transformStyle: 'preserve-3d',
              backgroundColor: currentFinish.hex,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255,255,255,0.15)',
            }}
          >
            {/* Satin Matte Glass Texture */}
            <div className="relative h-full w-full rounded-[36px] flex flex-col justify-between p-4 overflow-hidden">
              {/* Apple Logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
                <svg className="h-14 w-14 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.89-11.95-14.54-6.3-9.8-11.16-20.9-14.57-33.3-3.42-12.4-5.13-23.75-5.13-34.05 0-14.28 3.51-26.04 10.53-35.29 7.02-9.25 15.93-14.01 26.74-14.28 4.69 0 9.87 1.25 15.54 3.76 5.66 2.5 9.4 3.82 11.22 3.94 1.58-.13 5.43-1.48 11.55-4.07 6.13-2.58 11.36-3.76 15.71-3.52 12.07.74 21.84 5.38 29.31 13.92-10.49 6.35-15.62 15.15-15.38 26.4.24 8.79 3.56 16.14 9.97 22.05 6.4 5.91 14.16 9.17 23.27 9.77-2.31 7.27-5.13 14.44-8.47 21.52zM119.22 33.72c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.75-10.37 19.35-11.95.24 1.13.36 2.13.36 3 0 7.39-2.73 14.36-8.2 20.92-5.46 6.55-12 10.52-19.61 11.9-.12-1.07-.18-2.14-.18-3.2z" />
                </svg>
              </div>

              {/* Triple 48MP Camera Bump Island */}
              <div
                className="relative h-32 w-32 rounded-3xl p-2.5 shadow-2xl border border-white/30"
                style={{
                  backgroundColor: currentFinish.bezel,
                  transform: 'translateZ(10px)',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                }}
              >
                {/* 3 Lenses */}
                <div className="relative h-full w-full">
                  {/* Lens 1: Top Main 48MP */}
                  <div className="absolute top-1 left-1 h-11 w-11 rounded-full bg-black border-2 border-slate-600 p-1.5 shadow-inner">
                    <div className="h-full w-full rounded-full bg-slate-900 border border-indigo-400/40 flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/80 shadow-sm" />
                    </div>
                  </div>

                  {/* Lens 2: Bottom Telephoto 48MP 10x Periscope */}
                  <div className="absolute bottom-1 left-1 h-11 w-11 rounded-full bg-black border-2 border-slate-600 p-1.5 shadow-inner">
                    <div className="h-full w-full rounded-full bg-slate-900 border border-indigo-400/40 flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shadow-sm" />
                    </div>
                  </div>

                  {/* Lens 3: Right Ultra-Wide 48MP */}
                  <div className="absolute top-6 right-1 h-11 w-11 rounded-full bg-black border-2 border-slate-600 p-1.5 shadow-inner">
                    <div className="h-full w-full rounded-full bg-slate-900 border border-indigo-400/40 flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-sm" />
                    </div>
                  </div>

                  {/* True Tone Flash */}
                  <div className="absolute top-1 right-2.5 h-3.5 w-3.5 rounded-full bg-amber-100 border border-amber-300 shadow-sm" />

                  {/* LiDAR Scanner */}
                  <div className="absolute bottom-2 right-2.5 h-3 w-3 rounded-full bg-black border border-slate-700" />
                </div>
              </div>

              {/* Bottom text */}
              <div className="text-[10px] font-bold text-white/70 text-center">
                Titanium Pro Chassis • 48MP Pro System
              </div>
            </div>
          </div>
        </div>

        {/* Drag Guidance Helper */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 rounded-full bg-black/60 dark:bg-slate-800/80 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
          <Eye className="h-3 w-3 text-indigo-400" />
          <span>Click &amp; drag mouse horizontally or vertically to spin in 3D</span>
        </div>
      </div>

      {/* ================= BOTTOM FINISH & COLOR SELECTOR ================= */}
      <div className="relative z-20 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Select 3D Finish:
          </span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {selectedFinishLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {finishes.map((f) => {
            const isSel = f.hex.toLowerCase() === selectedColor.toLowerCase();
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => {
                  setSelectedColor(f.hex);
                  setSelectedFinishLabel(f.name);
                }}
                className={[
                  'flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-sm',
                  isSel
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-500 dark:text-indigo-300 ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300',
                ].join(' ')}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/20 shadow-sm"
                  style={{ backgroundColor: f.hex }}
                />
                <span>{f.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
