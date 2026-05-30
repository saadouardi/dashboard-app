type LoadingStateProps = {
    message?: string
}

function LoadingState({ message = 'Loading data...' }: LoadingStateProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>
        </div>
    )
}

export default LoadingState