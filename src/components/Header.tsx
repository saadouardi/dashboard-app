import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link 
                        to="/" 
                        className="text-lg font-bold text-slate-900"
                    >
                        Dashboard
                    </Link>

                    <nav className="flex items-center gap-4 text-sm">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                            isActive
                                ? 'font-medium text-blue-600'
                                : 'font-medium text-slate-600 hover:text-slate-900'
                            }
                        >
                            Dashboard
                        </NavLink>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"

                            className="font-medium text-slate-600 hover:text-slate-900"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </header>
    )
}

export default Header