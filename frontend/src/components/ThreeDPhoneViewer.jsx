import { useState, useRef, useEffect, useMemo } from 'react';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  Camera,
  Cpu,
  Shield,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  Smartphone,
  ChevronRight,
  Info,
} from 'lucide-react';

/**
 * ThreeDPhoneViewer
 * E-Commerce photorealistic 3D / 360° Smartphone Inspector (Flipkart / Amazon 3D View Style).
 * Uses real retail studio hardware photography across multiple perspectives,
 * smooth 360-degree rotational turntable scrubbing, specular lighting glints,
 * interactive hardware hotspots, and finish selection.
 */
export default function ThreeDPhoneViewer({
  productName = 'iPhone 17 Pro Max',
  brand = 'Apple',
  initialColor = '#C96A3C',
  colorName = 'Cosmic Orange',
  onClose,
}) {
  // Available authentic finishes with their real studio photography
  const finishes = useMemo(
    () => [
      {
        id: 'orange',
        name: 'Cosmic Orange',
        hex: '#C96A3C',
        accent: '#FF7A33',
        tag: 'New Colorway',
        frontBack: '/images/iphone-17-orange/front_back.jpg',
        display: '/images/iphone-17-orange/front_back_main.png',
        camera: '/images/iphone-17-orange/camera_macro.jpg',
        side: '/images/iphone-17-orange/side_profile.jpg',
      },
      {
        id: 'blue',
        name: 'Deep Blue Titanium',
        hex: '#1E293B',
        accent: '#38BDF8',
        tag: 'Titanium Pro',
        frontBack: '/images/iphone-17-blue/front_back.jpg',
        display: '/images/iphone-17-blue/display_showcase.jpg',
        camera: '/images/iphone-17-blue/camera_macro.jpg',
        side: '/images/iphone-17-blue/side_profile.jpg',
      },
      {
        id: 'natural',
        name: 'Natural Titanium',
        hex: '#9E978E',
        accent: '#E2DCD5',
        tag: 'Raw Grade 5',
        frontBack: '/images/iphone-17-natural/front_back.jpg',
        display: '/images/iphone-17-natural/display_showcase.jpg',
        camera: '/images/iphone-17-natural/camera_macro.jpg',
        side: '/images/iphone-17-natural/side_profile.jpg',
      },
      {
        id: 'black',
        name: 'Black Titanium',
        hex: '#1F2428',
        accent: '#6B7280',
        tag: 'Stealth PVD',
        frontBack: '/images/iphone-17-black/front_back.jpg',
        display: '/images/iphone-17-black/display_showcase.jpg',
        camera: '/images/iphone-17-black/camera_macro.jpg',
        side: '/images/iphone-17-black/side_profile.jpg',
      },
      {
        id: 'white',
        name: 'White Titanium',
        hex: '#F2F2F0',
        accent: '#FFFFFF',
        tag: 'Pure Ceramic Glass',
        frontBack: '/images/iphone-17-white/front_back.jpg',
        display: '/images/iphone-17-white/display_showcase.jpg',
        camera: '/images/iphone-17-white/camera_macro.jpg',
        side: '/images/iphone-17-white/side_profile.jpg',
      },
    ],
    []
  );

  // Match initial finish by colorHex or colorName
  const initialFinish = useMemo(() => {
    const foundByHex = finishes.find(
      (f) => f.hex.toLowerCase() === (initialColor || '').toLowerCase()
    );
    if (foundByHex) return foundByHex;
    const foundByName = finishes.find((f) =>
      (colorName || '').toLowerCase().includes(f.name.toLowerCase().split(' ')[0])
    );
    return foundByName || finishes[0];
  }, [initialColor, colorName, finishes]);

  const [currentFinish, setCurrentFinish] = useState(initialFinish);
  const [rotY, setRotY] = useState(25); // 0 to 360 degrees
  const [rotX, setRotX] = useState(6); // -30 to 30 degrees tilt
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 1, 1.4, 1.8
  const [viewAngleMode, setViewAngleMode] = useState('360'); // '360' | 'front' | 'camera' | 'side' | 'isometric'

  const containerRef = useRef(null);

  // Update currentFinish if prop changes
  useEffect(() => {
    if (initialColor || colorName) {
      const match =
        finishes.find((f) => f.hex.toLowerCase() === (initialColor || '').toLowerCase()) ||
        finishes.find((f) =>
          (colorName || '').toLowerCase().includes(f.name.toLowerCase().split(' ')[0])
        );
      if (match) setCurrentFinish(match);
    }
  }, [initialColor, colorName, finishes]);

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging || viewAngleMode !== '360') return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.6) % 360);
    }, 28);
    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging, viewAngleMode]);

  // Mouse & Touch Drag Handlers
  function handlePointerDown(e) {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStartX(e.clientX || (e.touches && e.touches[0]?.clientX) || 0);
    setDragStartY(e.clientY || (e.touches && e.touches[0]?.clientY) || 0);
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;

    setRotY((prev) => (prev + dx * 0.75 + 360) % 360);
    setRotX((prev) => Math.max(-25, Math.min(25, prev - dy * 0.4)));
    setDragStartX(clientX);
    setDragStartY(clientY);
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  // Preset Angle Selection
  function handleSelectPreset(preset) {
    setViewAngleMode(preset);
    setIsAutoRotating(false);
    setActiveHotspot(null);
    if (preset === '360') {
      setRotY(30);
      setRotX(6);
      setZoomLevel(1);
    } else if (preset === 'front') {
      setRotY(0);
      setRotX(0);
      setZoomLevel(1);
    } else if (preset === 'camera') {
      setRotY(180);
      setRotX(4);
      setZoomLevel(1.4);
    } else if (preset === 'side') {
      setRotY(90);
      setRotX(0);
      setZoomLevel(1.2);
    } else if (preset === 'isometric') {
      setRotY(40);
      setRotX(14);
      setZoomLevel(1);
    }
  }

  // Calculate which authentic retail asset to show based on rotY angle
  // 0° - 45°: Front Display / 3D Angle
  // 45° - 135°: Side Profile
  // 135° - 225°: Triple 48MP Camera & Rear Glass
  // 225° - 315°: Left Profile
  // 315° - 360°: Front Display
  const currentAngleInfo = useMemo(() => {
    if (viewAngleMode === 'camera') {
      return {
        image: currentFinish.camera,
        title: 'Triple 48MP Periscope Camera System',
        badge: 'Macro Telephoto View',
        isMacro: true,
      };
    }
    if (viewAngleMode === 'side') {
      return {
        image: currentFinish.side,
        title: 'Grade 5 Aerospace Titanium Edge Profile',
        badge: 'Action Button & Camera Control',
        isMacro: false,
      };
    }
    if (viewAngleMode === 'front') {
      return {
        image: currentFinish.display,
        title: 'Super Retina XDR OLED Display',
        badge: 'Dynamic Island & Ceramic Shield',
        isMacro: false,
      };
    }

    // 360 degree turntable calculation
    const norm = (rotY % 360 + 360) % 360;
    if (norm >= 65 && norm < 115) {
      return {
        image: currentFinish.side,
        title: 'Titanium Right Profile',
        badge: 'Camera Control 2.0',
        isMacro: false,
      };
    }
    if (norm >= 115 && norm < 245) {
      return {
        image: currentFinish.frontBack,
        title: 'Rear Satin-Matte Glass & 48MP System',
        badge: 'Triple Sapphire Lenses',
        isMacro: false,
      };
    }
    if (norm >= 245 && norm < 295) {
      return {
        image: currentFinish.side,
        title: 'Titanium Left Profile',
        badge: 'Action Button & Volume Keys',
        isMacro: false,
      };
    }
    return {
      image: currentFinish.display,
      title: 'Front Super Retina XDR & 3D Angle',
      badge: 'Edge-to-Edge ProMotion',
      isMacro: false,
    };
  }, [viewAngleMode, rotY, currentFinish]);

  // Interactive Hardware Hotspots
  const hotspots = [
    {
      id: 'camera',
      title: 'Triple 48MP Pro System',
      desc: '48MP Fusion (ƒ/1.7) + 48MP Ultra-Wide + 48MP Periscope Telephoto with 10x optical-quality zoom & sapphire rings.',
      icon: Camera,
      top: '24%',
      left: '32%',
      angleTarget: 'camera',
    },
    {
      id: 'titanium',
      title: 'Aerospace Grade 5 Titanium',
      desc: 'Micro-blasted satin texture with refined contoured edges. The strongest and lightest Pro chassis ever built.',
      icon: Shield,
      top: '52%',
      left: '82%',
      angleTarget: 'side',
    },
    {
      id: 'display',
      title: '6.9" Super Retina XDR',
      desc: '1-120Hz ProMotion, narrower Dynamic Island, 2,600 nits outdoor peak brightness, 3rd-Gen Ceramic Shield.',
      icon: Smartphone,
      top: '38%',
      left: '50%',
      angleTarget: 'front',
    },
    {
      id: 'processor',
      title: 'A19 Pro Silicon (2nm)',
      desc: 'Next-gen 2nm architecture with 6-core CPU, 6-core GPU with Neural Ray Tracing, and 32-core NPU.',
      icon: Cpu,
      top: '72%',
      left: '42%',
      angleTarget: 'isometric',
    },
  ];

  return (
    <div className="relative w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-[#0E131F] dark:to-slate-950 p-4 sm:p-6 shadow-2xl overflow-hidden select-none">
      {/* Background Studio Grid & Ambient Radial Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${currentFinish.accent}20 0%, transparent 70%)`,
        }}
      />

      {/* ================= TOP HEADER BAR ================= */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-2xl text-white shadow-lg transition-colors duration-300"
            style={{ backgroundColor: currentFinish.hex === '#F2F2F0' ? '#64748B' : currentFinish.hex }}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {productName} 3D Turntable Studio
              </h3>
              <span className="rounded-full bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/70 dark:border-indigo-800 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                Retail 360°
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Drag to spin 360° • Amazon/Flipkart Certified Retail Hardware • Click hotspots to inspect
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Auto Spin */}
          <button
            type="button"
            onClick={() => {
              setIsAutoRotating((prev) => !prev);
              setViewAngleMode('360');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            {isAutoRotating ? (
              <>
                <Pause className="h-3.5 w-3.5 text-indigo-500" />
                <span>Pause Turntable</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-indigo-500" />
                <span>Auto-Spin 360°</span>
              </>
            )}
          </button>

          {/* Zoom Buttons */}
          <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
              disabled={zoomLevel <= 1}
              className="p-1.5 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 font-mono">
              {zoomLevel.toFixed(1)}x
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
              disabled={zoomLevel >= 2}
              className="p-1.5 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={() => handleSelectPreset('360')}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition"
            title="Reset 3D Turntable"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ================= PRESET ANGLE PILLS ================= */}
      <div className="relative z-20 flex items-center justify-between gap-2 pt-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Angles:
          </span>
          {[
            { id: '360', label: '360° Turntable' },
            { id: 'camera', label: 'Triple 48MP Macro' },
            { id: 'side', label: 'Titanium Profile' },
            { id: 'front', label: 'Front Display' },
            { id: 'isometric', label: '45° 3D Angle' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => handleSelectPreset(btn.id)}
              className={[
                'px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0',
                viewAngleMode === btn.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/20'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white',
              ].join(' ')}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Current Active Angle Label Badge */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {currentAngleInfo.title}
          </span>
        </div>
      </div>

      {/* ================= 3D VIEWPORT STAGE ================= */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative h-[440px] sm:h-[500px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden my-3 rounded-2xl bg-slate-50/50 dark:bg-black/40 border border-slate-200/50 dark:border-slate-800/50"
      >
        {/* Soft 3D Ground Reflection & Elliptical Shadow */}
        <div
          className="absolute bottom-6 h-12 w-72 rounded-full blur-2xl transition-all duration-300 pointer-events-none"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            transform: `scale(${1.1 * zoomLevel})`,
          }}
        />

        {/* Photorealistic Turntable Stage with 3D Perspective */}
        <div
          className="relative flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoomLevel}) perspective(1200px) rotateX(${rotX}deg) rotateY(${
              viewAngleMode === '360' ? Math.sin((rotY * Math.PI) / 180) * 16 : 0
            }deg)`,
            transformStyle: 'preserve-3d',
            maxWidth: '380px',
            maxHeight: '440px',
          }}
        >
          {/* Main Photorealistic Retail Hardware Render */}
          <div className="relative rounded-3xl overflow-hidden p-2">
            <img
              src={currentAngleInfo.image}
              alt={`${productName} in ${currentFinish.name} - ${currentAngleInfo.title}`}
              className={`max-h-[380px] sm:max-h-[420px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-all duration-300 pointer-events-none select-none ${
                currentAngleInfo.isMacro ? 'scale-110' : ''
              }`}
            />

            {/* Specular Light Sweep / Luxury Reflection Glint */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-35 dark:opacity-50 transition-all duration-100"
              style={{
                background: `linear-gradient(${rotY + 45}deg, transparent 35%, rgba(255,255,255,0.7) 50%, transparent 65%)`,
              }}
            />
          </div>

          {/* ================= INTERACTIVE HOTSPOT MARKERS ================= */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute z-30 transition-all duration-300"
              style={{ top: spot.top, left: spot.left }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                  if (spot.angleTarget) handleSelectPreset(spot.angleTarget);
                }}
                className={[
                  'group relative grid h-7 w-7 place-items-center rounded-full text-white shadow-xl transition-transform hover:scale-125 focus:outline-none',
                  activeHotspot?.id === spot.id
                    ? 'bg-indigo-600 ring-4 ring-indigo-400/40 scale-110'
                    : 'bg-black/80 dark:bg-white/80 text-white dark:text-black hover:bg-indigo-600 hover:text-white',
                ].join(' ')}
                title={spot.title}
              >
                <spot.icon className="h-3.5 w-3.5" />
                <span className="absolute -inset-1 rounded-full border border-indigo-400/60 animate-ping pointer-events-none opacity-75" />
              </button>

              {/* Hotspot Popover Card */}
              {activeHotspot?.id === spot.id && (
                <div
                  className="absolute z-40 top-9 -left-28 w-60 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-3.5 text-left shadow-2xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <spot.icon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      {spot.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {spot.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Drag Helper Guidance Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 rounded-full bg-black/75 dark:bg-slate-900/90 px-4 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md border border-white/10">
          <Eye className="h-3.5 w-3.5 text-indigo-400" />
          <span>Click &amp; drag horizontally to scrub 360° turntable</span>
          <span className="text-[10px] text-indigo-300 font-mono">
            ({Math.round(rotY)}°)
          </span>
        </div>
      </div>

      {/* ================= BOTTOM FINISH / COLOR SELECTOR ================= */}
      <div className="relative z-20 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Certified Finish:
          </span>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
            {currentFinish.name}
          </span>
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
            {currentFinish.tag}
          </span>
        </div>

        {/* Color Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {finishes.map((f) => {
            const isSel = f.id === currentFinish.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setCurrentFinish(f)}
                className={[
                  'flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-sm',
                  isSel
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:border-indigo-500 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400',
                ].join(' ')}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/25 shadow-inner"
                  style={{ backgroundColor: f.hex }}
                />
                <span>{f.name}</span>
                {isSel && <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
