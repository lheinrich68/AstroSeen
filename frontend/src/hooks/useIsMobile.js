import { useState, useEffect } from 'react'

// Même seuil que le reste de l'app (768px, cf. les media queries dans les
// .module.css). Réactif au redimensionnement de la fenêtre, contrairement à
// une simple lecture ponctuelle de window.innerWidth.
const MOBILE_BREAKPOINT = '(max-width: 767px)'

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(MOBILE_BREAKPOINT).matches,
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)
        const handleChange = (e) => setIsMobile(e.matches)

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return isMobile
}