import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4">
            <section className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    Page not found
                </h1>

                <p className="mt-4 text-slate-600 dark:text-slate-300">
                    The page you are looking for does not exist.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Go back home
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage