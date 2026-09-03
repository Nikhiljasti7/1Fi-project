export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse space-y-3">
      <div className="aspect-square w-full rounded-2xl bg-slate-100" />
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="h-5 w-3/4 rounded bg-slate-200" />
      <div className="h-4 w-1/2 rounded bg-slate-100" />
      <div className="h-10 w-full rounded-xl bg-slate-100" />
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 animate-pulse space-y-6">
      <div className="h-6 w-28 rounded bg-slate-200" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square rounded-3xl border border-slate-200 bg-white p-8" />
        <div className="space-y-5">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-8 w-2/3 rounded bg-slate-200" />
          <div className="h-20 rounded-2xl bg-white border border-slate-200" />
          <div className="h-32 rounded-2xl bg-white border border-slate-200" />
          <div className="h-40 rounded-2xl bg-white border border-slate-200" />
          <div className="h-12 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
