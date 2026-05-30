import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import { getProductById } from '../services/productsApi'
import type { Product } from '../types/product'
import { delay } from '../utils/delay'

const MIN_LOADING_DELAY_MS = 800

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadProduct = useCallback(async () => {
    if (!id) {
      setErrorMessage('Product ID is missing.')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')

      const [productData] = await Promise.all([
        getProductById(id),
        delay(MIN_LOADING_DELAY_MS),
      ])

      setProduct(productData)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to load product details. Please try again.'

      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void loadProduct()
  }, [loadProduct])

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-6">
          {isLoading && <LoadingState message="Loading product details..." />}

          {!isLoading && errorMessage && (
            <ErrorState message={errorMessage} onRetry={loadProduct} />
          )}

          {!isLoading && !errorMessage && product && (
            <article className="animate-fade-in-up overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-8">
                <div className="rounded-2xl bg-slate-100 p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mx-auto h-80 w-full object-contain"
                  />

                  {product.images.length > 1 && (
                    <div className="mt-6 grid grid-cols-4 gap-3">
                      {product.images.slice(0, 4).map((image) => (
                        <div
                          key={image}
                          className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white p-2"
                        >
                          <img
                            src={image}
                            alt={product.title}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
                    {product.category}
                  </p>

                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    {product.title}
                  </h1>

                  <p className="mt-4 text-slate-600">{product.description}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                      ${product.price}
                    </span>

                    <span className="rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                      ⭐ {product.rating.toFixed(1)}
                    </span>

                    <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Brand</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {product.brand ?? 'Not specified'}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">SKU</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {product.sku ?? 'Not specified'}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Discount</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {product.discountPercentage}% off
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Product ID</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        #{product.id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      API Integration
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      This detail page is loaded dynamically from the public API
                      based on the route parameter.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default ProductDetailPage