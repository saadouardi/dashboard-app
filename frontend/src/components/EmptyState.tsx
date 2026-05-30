type EmptyStateProps = {
  title?: string
  message?: string
}

function EmptyState({
  title = 'No results found',
  message = 'Try changing your search or filter options.',
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {message}
      </p>
    </div>
  )
}

export default EmptyState