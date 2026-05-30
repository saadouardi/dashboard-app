export type BackendHealthResponse = {
    status: string
    service: string
}

const BACKEND_BASE_URL =
    import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:8000'

export async function checkBackendHealth(): Promise<BackendHealthResponse> {
    const response = await fetch(`${BACKEND_BASE_URL}/health`)

    if (!response.ok) {
        throw new Error(`Backend health check failed with status ${response.status}`)
    }

    return response.json() as Promise<BackendHealthResponse>
}