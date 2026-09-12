export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-glass">
      <div className="relative aspect-[4/3] animate-pulse bg-secondary">
        <div className="absolute top-3 z-10 size-9 rounded-full bg-border ltr:right-3 rtl:left-3" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="h-5 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-8 animate-pulse rounded bg-secondary" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-full animate-pulse rounded bg-secondary" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-secondary" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-6 w-16 animate-pulse rounded bg-secondary" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}

export function CategoryTabsSkeleton() {
  return (
    <div className="sticky top-[72px] z-30 -mx-6 mb-8 flex gap-2 overflow-x-auto bg-background/90 px-6 py-3 backdrop-blur-md no-scrollbar">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-9 w-24 shrink-0 animate-pulse rounded-full border border-border bg-secondary" />
      ))}
    </div>
  );
}

export function ProductModalSkeleton() {
  return (
    <div className="w-full">
      <div className="aspect-[4/3] w-full animate-pulse bg-secondary md:aspect-video" />
      <div className="p-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="w-full space-y-2">
            <div className="h-7 w-2/3 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-secondary" />
          </div>
        </div>
        <div className="mb-6 h-12 w-full animate-pulse rounded-2xl bg-secondary" />
        <div className="space-y-4">
          <div className="h-20 w-full animate-pulse rounded-2xl bg-secondary" />
          <div className="h-20 w-full animate-pulse rounded-2xl bg-secondary" />
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-border bg-background p-4 md:static">
        <div className="h-14 w-full animate-pulse rounded-full bg-secondary" />
      </div>
    </div>
  );
}
