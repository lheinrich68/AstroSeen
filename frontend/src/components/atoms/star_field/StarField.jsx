import { useMemo } from 'react'
import styles from './StarField.module.css'

// Génère `count` étoiles à des positions aléatoires (stables pour la durée
// de vie du composant => pas de re-tirage à chaque re-render), avec une durée
// et un délai d'animation variés pour un scintillement organique plutôt que
// synchronisé. Une étoile sur ~8 reprend l'accent starlight pour un peu de
// variation, cohérent avec la charte graphique.

function generateStars(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        starlight: Math.random() < 0.12,
    }))
}

export default function StarField({ count = 80, className = '' }) {
    const stars = useMemo(() => generateStars(count), [count])

    return (
        <div className={`${styles.field} ${className}`} aria-hidden="true">
            {stars.map((star) => (
                <span
                    key={star.id}
                    className={styles.star}
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.starlight ? 'var(--color-accent-starlight)' : undefined,
                        animationDuration: `${star.duration}s`,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </div>
    )
}