type LoadingStateProps = {
    message?: string
}

function LoadingState({ message = 'Loading data...' }: LoadingStateProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />

            <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                {message}
            </p>
        </div>
    )
}

export default LoadingState