import type { Product, ProductsResponse } from '../types/product'

const API_BASE_URL = 'https://dummyjson.com'

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json() as Promise<T>
}

export async function getProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/products?limit=100`)
    return handleResponse<ProductsResponse>(response)
}

export async function getProductById(id: string): Promise<Product> {
    const response = await fetch(
        `${API_BASE_URL}/products/${encodeURIComponent(id)}`,
    )

    return handleResponse<Product>(response)
}

export async function getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/products/category-list`)
    return handleResponse<string[]>(response)
}