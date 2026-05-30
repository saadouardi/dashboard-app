type ApiStatus = 'checking' | 'online' | 'offline'

type ApiStatusBadgeProps = {
  status: ApiStatus
}

const statusStyles = {
  checking: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  online: 'border-green-200 bg-green-50 text-green-700',
  offline: 'border-red-200 bg-red-50 text-red-700',
}

const statusLabels = {
  checking: 'Checking API...',
  online: 'API Online',
  offline: 'API Error',
}

function ApiStatusBadge({ status }: ApiStatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
      title="Shows whether the public product API is reachable."
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status === 'online'
            ? 'bg-green-500'
            : status === 'offline'
              ? 'bg-red-500'
              : 'bg-yellow-500'
        }`}
      />

      {statusLabels[status]}
    </div>
  )
}

export default ApiStatusBadge