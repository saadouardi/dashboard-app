import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem('dashboard-theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    return prefersDark ? 'dark' : 'light'
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        const rootElement = document.documentElement

        if (theme === 'dark') {
            rootElement.classList.add('dark')
        } else {
            rootElement.classList.remove('dark')
        }

        window.localStorage.setItem('dashboard-theme', theme)
    }, [theme])

    function toggleTheme() {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    }

    return {
        theme,
        toggleTheme,
    }
}