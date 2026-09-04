import { useEffect, useState, useRef } from 'react';

/**
 * BackgroundPhoneTransitions
 * Renders high-tech floating 3D smartphone models and holographic device transitions
 * in the background with smooth perspective parallax and ambient glows.
 */
export default function BackgroundPhoneTransitions() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    function handleMouseMove(e) {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax offsets
  const tiltX = mousePos.y * 12;
  const tiltY = -mousePos.x * 16;
  const transX1 = mousePos.x * 20;
  const transY1 = mousePos.y * 15;
  const transX2 = -mousePos.x * 25;
  const transY2 = -mousePos.y * 20;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      style={{ perspective: '1200px' }}
    >
      {/* Dynamic Ambient Color Mesh Orbs */}
      <div
        className="absolute -top-32 -left-28 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/20 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${transX1 * 1.5}px, ${transY1 * 1.5}px)` }}
      />
      <div
        className="absolute top-1/4 -right-28 h-96 w-96 rounded-full bg-purple-500/10 dark:bg-violet-600/20 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${transX2 * 1.2}px, ${transY2 * 1.2}px)` }}
      />
      <div
        className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 dark:bg-emerald-600/15 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${transX1 * 0.8}px, ${transY2 * 0.8}px)` }}
      />

      {/* Subtle Perspective Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] [background-image:linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)]" />

      {/* ================= 3D FLOATING DEVICE 1: Left Angled Cosmic Titanium iPhone ================= */}
      <div
        className="absolute -left-12 sm:left-4 lg:left-12 top-20 sm:top-16 opacity-70 dark:opacity-85 transition-transform duration-500 ease-out hidden sm:block"
        style={{
          transform: `translate3d(${transX1}px, ${transY1}px, 0) rotateX(${18 + tiltX * 0.5}deg) rotateY(${24 + tiltY * 0.6}deg) rotateZ(-10deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-44 sm:w-52 h-[340px] sm:h-[400px] rounded-[38px] p-2 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 shadow-2xl border-2 border-white/60 dark:border-slate-600/60 transition-all duration-300">
          {/* Titanium Edge Glint */}
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-amber-500/20 via-transparent to-indigo-500/20 pointer-events-none" />

          {/* Device Screen Bezel */}
          <div className="relative h-full w-full rounded-[30px] bg-gradient-to-br from-slate-900 via-indigo-950 to-black p-3.5 flex flex-col justify-between overflow-hidden shadow-inner border border-black/40">
            {/* Screen Wallpaper / Cosmic Graphic */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-indigo-900/40 to-slate-950/90" />

            {/* Dynamic Island */}
            <div className="relative z-10 mx-auto h-4 w-20 rounded-full bg-black/90 border border-white/10 flex items-center justify-between px-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-800 border border-white/20" />
              </div>
            </div>

            {/* Screen Content Mock: Wealth-Backed EMI notification badge */}
            <div className="relative z-10 space-y-2 mt-4">
              <div className="rounded-xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-[9px] text-slate-300">
                  <span className="font-semibold text-emerald-400">0% EMI Approved</span>
                  <span>1Fi Wealth</span>
                </div>
                <div className="text-[11px] font-bold text-white mt-1">
                  iPhone 17 Pro Max
                </div>
                <div className="text-[9px] text-slate-400">
                  ₹12,908/mo • 0% Interest
                </div>
              </div>

              {/* Mini Compounding chart animation */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-2 backdrop-blur-sm">
                <div className="flex justify-between text-[8px] text-slate-400">
                  <span>Portfolio Compounding</span>
                  <span className="text-emerald-400 font-bold">+14.2%</span>
                </div>
                <div className="mt-1.5 flex items-end gap-1 h-7">
                  <div className="w-1/5 bg-indigo-500/60 rounded-t h-2" />
                  <div className="w-1/5 bg-indigo-500/70 rounded-t h-3.5" />
                  <div className="w-1/5 bg-indigo-500/80 rounded-t h-4" />
                  <div className="w-1/5 bg-indigo-500/90 rounded-t h-5.5" />
                  <div className="w-1/5 bg-emerald-400 rounded-t h-7" />
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-10 mx-auto h-1 w-24 rounded-full bg-white/40 mb-1" />
          </div>

          {/* Realistic Camera Bump floating in 3D perspective on the edge */}
          <div
            className="absolute -top-2 -left-2 h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900 border border-white/30 shadow-lg p-1.5 hidden lg:block"
            style={{ transform: 'translateZ(15px)' }}
          >
            <div className="grid grid-cols-2 gap-1 h-full w-full items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-black border border-white/30 shadow-inner" />
              <div className="h-4 w-4 rounded-full bg-black border border-white/30 shadow-inner" />
              <div className="h-4 w-4 rounded-full bg-black border border-white/30 shadow-inner col-span-2 mx-auto" />
            </div>
          </div>
        </div>

        {/* 3D Drop Shadow */}
        <div className="h-6 w-48 mx-auto -mt-3 rounded-full bg-slate-900/20 dark:bg-black/50 blur-xl" />
      </div>

      {/* ================= 3D FLOATING DEVICE 2: Right Angled Deep Blue Titanium iPhone ================= */}
      <div
        className="absolute -right-8 sm:right-6 lg:right-16 top-32 sm:top-24 opacity-60 dark:opacity-80 transition-transform duration-500 ease-out hidden sm:block"
        style={{
          transform: `translate3d(${transX2}px, ${transY2}px, 0) rotateX(${15 - tiltX * 0.4}deg) rotateY(${-22 - tiltY * 0.5}deg) rotateZ(8deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-40 sm:w-48 h-[310px] sm:h-[370px] rounded-[36px] p-2 bg-gradient-to-b from-blue-900 via-slate-800 to-slate-900 shadow-2xl border-2 border-indigo-400/40 dark:border-indigo-500/30">
          {/* Subtle Blue Titanium Glow */}
          <div className="absolute inset-0 rounded-[34px] bg-gradient-to-bl from-cyan-500/20 via-transparent to-blue-600/20 pointer-events-none" />

          {/* Screen */}
          <div className="relative h-full w-full rounded-[28px] bg-slate-950 p-3 flex flex-col justify-between overflow-hidden border border-white/10">
            {/* Screen Wallpaper */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-blue-950/30 to-indigo-900/30" />

            {/* Dynamic Island */}
            <div className="relative z-10 mx-auto h-3.5 w-16 rounded-full bg-black border border-white/15 flex items-center justify-center">
              <span className="h-1 w-1 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Screen Mock Graphic */}
            <div className="relative z-10 space-y-2">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-2 text-center backdrop-blur-sm">
                <span className="text-[9px] font-semibold text-cyan-300 block uppercase tracking-wider">
                  Apple A19 Pro
                </span>
                <span className="text-[11px] font-extrabold text-white">
                  2nm Architecture
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm text-[9px] text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Pledged Folio:</span>
                  <span className="text-white font-mono">HDFC Top 100</span>
                </div>
                <div className="flex justify-between">
                  <span>LTV Ratio:</span>
                  <span className="text-emerald-400 font-bold">50% Max</span>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="relative z-10 mx-auto h-1 w-20 rounded-full bg-white/40" />
          </div>
        </div>

        {/* 3D Drop Shadow */}
        <div className="h-5 w-40 mx-auto -mt-2 rounded-full bg-slate-900/20 dark:bg-black/50 blur-lg" />
      </div>

      {/* ================= 3D HOLOGRAPHIC FLOATING WIREFRAME CUBES / RINGS ================= */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] rounded-full border border-indigo-500/10 dark:border-indigo-400/15 pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) rotateX(${tiltX * 0.3}deg) rotateY(${tiltY * 0.3}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Orbit Ring 2 */}
        <div className="absolute inset-8 rounded-full border border-dashed border-slate-400/10 dark:border-slate-500/20 animate-[spin_80s_linear_infinite]" />
        {/* Orbit Ring 3 */}
        <div className="absolute inset-20 rounded-full border border-indigo-400/10 dark:border-indigo-300/15 animate-[spin_50s_linear_infinite_reverse]" />
      </div>

      {/* Floating Specs Chips */}
      <div
        className="absolute left-8 lg:left-24 bottom-16 hidden md:flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-900/80 px-3 py-1.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 shadow-lg backdrop-blur-md transition-transform duration-500"
        style={{ transform: `translate(${transX1 * 0.6}px, ${transY1 * 0.6}px)` }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Titanium Precision Enclosure • 3D Spatial Audio</span>
      </div>

      <div
        className="absolute right-8 lg:right-24 bottom-20 hidden md:flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-900/80 px-3 py-1.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 shadow-lg backdrop-blur-md transition-transform duration-500"
        style={{ transform: `translate(${transX2 * 0.6}px, ${transY2 * 0.6}px)` }}
      >
        <span className="h-2 w-2 rounded-full bg-indigo-500" />
        <span>Hardware-Accelerated Ray Tracing</span>
      </div>
    </div>
  );
}
