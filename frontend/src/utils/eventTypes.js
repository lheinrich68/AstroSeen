//? Palette des sous-types d'événement astro. Chaque type a sa propre
//  couleur pour les points du calendrier et la légende. "session" reste à
//  part (cyan signal), distinct de tous les sous-types astro.
//
//  Cohérent avec la palette étendue introduite pour les cartes de stats
//  admin (jaune/vert/bleu/violet en plus des 3 accents de la charte).
export const EVENT_TYPES = {
    eclipse_partial_solar: { label: 'Éclipse partielle (solaire)', color: '#e8d16a' },
    eclipse_partial_lunar: { label: 'Éclipse partielle (lunaire)', color: '#a084e0' },
    eclipse_total_solar: { label: 'Éclipse totale (solaire)', color: '#f2b872' },
    eclipse_total_lunar: { label: 'Éclipse totale (lunaire)', color: '#d95959' },
    meteor_shower: { label: "Pic d'étoiles filantes", color: '#5fd98a' },
    conjunction: { label: 'Conjonction', color: '#5b9ee8' },
    other: { label: 'Autre', color: 'var(--color-text-muted)' },
}
export const SESSION_COLOR = "var(--color-accent-signal)";