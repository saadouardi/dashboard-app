import { Link } from 'react-router-dom'
import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-48 items-center justify-center bg-slate-100 dark:bg-slate-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain p-4"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {product.category}
            </p>

            <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900 dark:text-white">
              {product.title}
            </h2>
          </div>

          <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white">
            ${product.price}
          </p>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ⭐ {product.rating.toFixed(1)}
          </p>

          <Link
            to={`/products/${product.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard