function DashboardPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-medium text-blue-600">Dashboard</p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        Product Dashboard
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-600">
                        Browse products, search by keyword, filter by category and open
                        detailed product information.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Products</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Categories</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Average Rating</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Highest Price</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DashboardPage