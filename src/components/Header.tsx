import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div>
                    <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
                        Dashboard
                    </Link>
                </div>

                <nav className="flex flex-wrap items-center gap-2 text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive
                            ? 'rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700'
                            : 'rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'
                        }
                    >
                        Dashboard
                    </NavLink>

                    <a
                        href="https://github.com/saadouardi/dashboard-app"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://dummyjson.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        API Source
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header