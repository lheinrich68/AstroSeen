// Logo AstroSeen -> exporté depuis Figma dans public/logo_astroseen.svg.
// Pas d'import : les fichiers de public/ se référencent par leur chemin
// (servi tel quel à la racine par Vite), jamais via `import`.

export default function Logo({ size = 32, className = '' }) {
    return (
        <img
            src="/logo_astroseen.svg"
            alt="AstroSeen"
            width={size}
            height={size}
            className={className}
        />
    )
}
