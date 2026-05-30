import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProductCard from '../components/ProductCard'
import { getCategories, getProducts } from '../services/productsApi'
import type { Product } from '../types/product'

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating-high'

function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortOption, setSortOption] = useState<SortOption>('default')
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    async function loadDashboardData() {
        try {
            setIsLoading(true)
            setErrorMessage('')

            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories(),
            ])

            setProducts(productsData.products)
            setCategories(categoriesData)
        } catch (error) {
            const message =
                error instanceof Error
                ? error.message
                : 'Unable to load products. Please try again.'

            setErrorMessage(message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadDashboardData()
    }, [])

    const filteredProducts = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()

        const filtered = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(normalizedSearch) ||
            product.description.toLowerCase().includes(normalizedSearch) ||
            product.category.toLowerCase().includes(normalizedSearch)

        const matchesCategory =
            selectedCategory === 'all' || product.category === selectedCategory

        return matchesSearch && matchesCategory
        })

        return [...filtered].sort((a, b) => {
        if (sortOption === 'price-low') {
            return a.price - b.price
        }

        if (sortOption === 'price-high') {
            return b.price - a.price
        }

        if (sortOption === 'rating-high') {
            return b.rating - a.rating
        }

        return 0
        })
    }, [products, searchTerm, selectedCategory, sortOption])

    const averageRating = useMemo(() => {
        if (products.length === 0) return 0

        const totalRating = products.reduce(
            (total, product) => total + product.rating,
            0
        )

        return totalRating / products.length
    }, [products])

    const highestPrice = useMemo(() => {
        if (products.length === 0) return 0

        return Math.max(...products.map((product) => product.price))
    }, [products])

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-sm font-medium text-blue-600">Dashboard</p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        Product Dashboard
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-600">
                        Browse products, search by keyword, filter by category and open
                        detailed product information.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Products</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {products.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Categories</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {categories.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Average Rating</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {averageRating.toFixed(1)}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Highest Price</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                ${highestPrice}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">
                                Search
                            </span>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search products..."
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">
                                Category
                            </span>
                            <select
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="all">All categories</option>
                                {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Sort</span>
                            <select
                                value={sortOption}
                                onChange={(event) =>
                                setSortOption(event.target.value as SortOption)
                                }
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to high</option>
                                <option value="price-high">Price: High to low</option>
                                <option value="rating-high">Rating: Highest first</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="mt-6">
                    {isLoading && <LoadingState message="Loading product dashboard..." />}

                    {!isLoading && errorMessage && (
                        <ErrorState message={errorMessage} onRetry={loadDashboardData} />
                    )}

                    {!isLoading && !errorMessage && filteredProducts.length === 0 && (
                        <EmptyState />
                    )}

                    {!isLoading && !errorMessage && filteredProducts.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default DashboardPage