type BackendStatus = 'checking' | 'online' | 'offline'

type BackendStatusBadgeProps = {
  status: BackendStatus
}

const statusStyles = {
  checking: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  online: 'border-green-200 bg-green-50 text-green-700',
  offline: 'border-slate-200 bg-slate-50 text-slate-600',
}

const statusLabels = {
  checking: 'Checking backend...',
  online: 'Backend Connected',
  offline: 'Backend Optional',
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