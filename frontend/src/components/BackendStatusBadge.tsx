type BackendStatus = 'checking' | 'online' | 'offline'

type BackendStatusBadgeProps = {
  status: BackendStatus
}

const statusStyles: Record<BackendStatus, string> = {
  checking:
    'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/60 dark:bg-yellow-950/30 dark:text-yellow-300',
  online:
    'border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-300',
  offline:
    'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
}

const statusLabels: Record<BackendStatus, string> = {
  checking: 'Checking backend...',
  online: 'Backend Connected',
  offline: 'Backend Offline',
}

function BackendStatusBadge({ status }: BackendStatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
      title="Shows whether the optional FastAPI backend is currently reachable."
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status === 'online'
            ? 'bg-green-500'
            : status === 'offline'
              ? 'bg-slate-400'
              : 'bg-yellow-500'
        }`}
      />

      {statusLabels[status]}
    </div>
  )
}

export default BackendStatusBadge