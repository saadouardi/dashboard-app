import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'dashboard-theme'

function getInitialTheme(): Theme {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)

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

        rootElement.classList.toggle('dark', theme === 'dark')
        window.localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    function toggleTheme() {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    }

    return {
        theme,
        toggleTheme,
    }
}