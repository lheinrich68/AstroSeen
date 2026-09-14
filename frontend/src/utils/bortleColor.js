//* Échelle de Bortle (pollution lumineuse) :
//  1 = ciel le plus noir possible,
//  9 = cœur de grande ville.
//? Dégradé continu du bleu très sombre (ciel d'exception) au blanc/bleu très clair (ciel urbain),
//  plutôt que des paliers fixes
//  Inspiré des représentations visuelles classiques de l'échelle de Bortle.

export function bortleColor(value) {
    const dark = [10, 14, 39] // bleu très sombre, proche du noir
    const light = [238, 244, 251] // blanc légèrement bleuté
    const t = Math.min(Math.max((value - 1) / 8, 0), 1)
    const r = Math.round(dark[0] + (light[0] - dark[0]) * t)
    const g = Math.round(dark[1] + (light[1] - dark[1]) * t)
    const b = Math.round(dark[2] + (light[2] - dark[2]) * t)
    return `rgb(${r}, ${g}, ${b})`
}