import { Link, useParams } from 'react-router-dom'

function ProductDetailPage() {
    const { id } = useParams()

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-5xl">
                <Link
                    to="/"
                    className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                    ← Back to dashboard
                </Link>

                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-medium text-blue-600">Product Detail</p>

                    <h1 className="mt-3 text-3xl font-bold text-slate-900">
                        Product #{id}
                    </h1>

                    <p className="mt-4 text-slate-600">
                        This page will later display full product details fetched from the
                        API.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default ProductDetailPage