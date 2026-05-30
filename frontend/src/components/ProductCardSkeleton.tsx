function ProductCardSkeleton() {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="h-48 animate-pulse bg-slate-50 dark:bg-slate-800" />

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="w-full">
                        <div className="h-3 w-20 animate-pulse rounded bg-slate-50 dark:bg-slate-800" />
                        <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-slate-50 dark:bg-slate-800" />
                    </div>

                    <div className="h-7 w-16 animate-pulse rounded-full bg-slate-50 dark:bg-slate-800" />
                </div>

                <div className="mt-4 space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-slate-50 dark:bg-slate-800" />
                    <div className="h-3 w-5/6 animate-pulse rounded bg-slate-50 dark:bg-slate-800" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-50 dark:bg-slate-800" />
                    <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-50 dark:bg-slate-800" />
                </div>
            </div>
        </article>
    )
}

export default ProductCardSkeleton