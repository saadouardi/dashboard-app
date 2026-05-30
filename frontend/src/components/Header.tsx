import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur transition dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900 transition dark:text-white"
          >
            Dashboard
          </Link>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            React · TypeScript · Native Fetch · Tailwind
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                : 'rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            }
          >
            Dashboard
          </NavLink>

          <a
            href="https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPOSITORY-NAME"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            API Source
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            title="Toggle light and dark mode"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header