import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BackendStatusBadge from '../components/BackendStatusBadge'
import ApiStatusBadge from '../components/ApiStatusBadge'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { getCategories, getProducts } from '../services/productsApi'
import { checkBackendHealth } from '../services/backendApi'
import type { Product } from '../types/product'
import { delay } from '../utils/delay'

const PRODUCTS_PER_PAGE = 10
const MIN_LOADING_DELAY_MS = 400

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating-high'
type ApiStatus = 'checking' | 'online' | 'offline'
type BackendStatus = 'checking' | 'online' | 'offline'

function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortOption, setSortOption] = useState<SortOption>('default')
    const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')
    const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking')
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    const loadDashboardData = useCallback(async () => {
        try {
            setIsLoading(true)
            setApiStatus('checking')
            setErrorMessage('')

            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories(),
                delay(MIN_LOADING_DELAY_MS),
            ])

            setProducts(productsData.products)
            setCategories(categoriesData)
            setApiStatus('online')
        } catch (error) {
            const message =
            error instanceof Error
                ? error.message
                : 'Unable to load products. Please try again.'

            setErrorMessage(message)
            setApiStatus('offline')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const loadBackendStatus = useCallback(async () => {
        try {
            setBackendStatus('checking')
            await checkBackendHealth()
            setBackendStatus('online')
        } catch {
            setBackendStatus('offline')
        }
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

    const visibleProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount)
    }, [filteredProducts, visibleCount])

    const hasMoreProducts = visibleCount < filteredProducts.length

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

    const hasActiveFilters =
        searchTerm.trim() !== '' ||
        selectedCategory !== 'all' ||
        sortOption !== 'default'

    function handleSearchChange(value: string) {
        setSearchTerm(value)
        setVisibleCount(PRODUCTS_PER_PAGE)
    }

    function handleCategoryChange(value: string) {
        setSelectedCategory(value)
        setVisibleCount(PRODUCTS_PER_PAGE)
    }

    function handleSortChange(value: SortOption) {
        setSortOption(value)
        setVisibleCount(PRODUCTS_PER_PAGE)
    }

    function handleClearFilters() {
        setSearchTerm('')
        setSelectedCategory('all')
        setSortOption('default')
        setVisibleCount(PRODUCTS_PER_PAGE)
    }

    useEffect(() => {
        void loadDashboardData()
    }, [loadDashboardData])

    useEffect(() => {
        const observerTarget = loadMoreRef.current

        if (!observerTarget || isLoading || errorMessage || !hasMoreProducts) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
            const firstEntry = entries[0]

            if (firstEntry.isIntersecting && !isLoadingMore) {
                setIsLoadingMore(true)

                window.setTimeout(() => {
                setVisibleCount((currentCount) => currentCount + PRODUCTS_PER_PAGE)
                setIsLoadingMore(false)
                }, 600)
            }
            },
            {
            root: null,
            rootMargin: '200px',
            threshold: 0,
            },
        )

        observer.observe(observerTarget)

        return () => {
            observer.unobserve(observerTarget)
        }
        }, [errorMessage, hasMoreProducts, isLoading, isLoadingMore])

    useEffect(() => {
        void loadBackendStatus()
    }, [loadBackendStatus])
    return (
        <main className="px-4 py-6 transition-colors sm:px-6 sm:py-8 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <div className="animate-fade-in-up rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-medium text-blue-600">Dashboard</p>
                        <div className="flex flex-wrap gap-2">
                            <ApiStatusBadge status={apiStatus} />
                            <BackendStatusBadge status={backendStatus} />
                        </div>
                    </div>


                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Product Dashboard
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                        Browse products, search by keyword, filter by category and open
                        detailed product information.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Products</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                {products.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Categories</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                {categories.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Average Rating</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                {averageRating.toFixed(1)}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Highest Price</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                ${highestPrice}
                            </p>
                        </div>
                    </div>
                </div>
                
                
                <div className="mt-6 animate-fade-in-up rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm sm:p-6">

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Explore products
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Search, filter and sort products dynamically.
                            </p>
                        </div>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="rounded-lg border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-400">
                                Search
                            </span>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => handleSearchChange(event.target.value)}
                                placeholder="Search products..."
                                className="mt-2 w-full rounded-xl border border-slate-200 dark:text-white dark:border-slate-800 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-400">
                                Category
                            </span>
                            <select
                                value={selectedCategory}
                                onChange={(event) => handleCategoryChange(event.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 dark:text-white dark:bg-slate-900 dark:border-slate-800 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-400">Sort</span>
                            <select
                                value={sortOption}
                                onChange={(event) =>
                                handleSortChange(event.target.value as SortOption)
                                }
                                className="mt-2 w-full rounded-xl border border-slate-200 dark:text-white dark:bg-slate-900 dark:border-slate-800 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to high</option>
                                <option value="price-high">Price: High to low</option>
                                <option value="rating-high">Rating: Highest first</option>
                            </select>
                        </label>
                    </div>

                    {hasActiveFilters && (
                        <div className="mt-5 flex flex-wrap gap-2 text-xs">
                            {searchTerm.trim() !== '' && (
                            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                                Search: {searchTerm}
                            </span>
                            )}

                            {selectedCategory !== 'all' && (
                            <span className="rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-700">
                                Category: {selectedCategory}
                            </span>
                            )}

                            {sortOption !== 'default' && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                                Sort: {sortOption.replace('-', ' ')}
                            </span>
                            )}
                        </div>
                        )}
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
                    <>
                        <div className="mb-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <p>
                            Showing{' '}
                            <span className="font-medium text-slate-900 dark:text-white">
                            {visibleProducts.length}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium text-slate-900 dark:text-white">
                            {filteredProducts.length}
                            </span>{' '}
                            products
                        </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}

                        {isLoadingMore &&
                            Array.from({ length: 3 }).map((_, index) => (
                            <ProductCardSkeleton key={`skeleton-${index}`} />
                            ))}
                        </div>

                        <div ref={loadMoreRef} className="h-10" />

                        {!hasMoreProducts && (
                        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                            You have reached the end of the product list.
                        </p>
                        )}
                    </>
                    )}
                </div>
            </section>
        </main>
    )
}

export default DashboardPage