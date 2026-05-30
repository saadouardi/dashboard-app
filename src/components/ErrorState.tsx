type ErrorStateProps = {
    message: string
    onRetry?: () => void
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-semibold text-red-700">Something went wrong</p>

            <p className="mt-2 text-sm text-red-600">{message}</p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                    Try again
                </button>
            )}
        </div>
    )
}

export default ErrorState