import { Link } from 'react-router-dom'
import Button from '../../atoms/button/Button.jsx'
import styles from './HeroSection.module.css'

export default function HeroSection() {
    return (
        <section className={styles.section}>
            <div className={styles.textCol}>
                <h1 className={styles.title}>Observez. Partagez. Découvrez le ciel.</h1>
                <p className={styles.description}>
                    La plateforme des passionnés d'astronomie, amateurs, astrophotographes et professionnels.
                    Consignez vos observations nuit après nuit, organisez vos sorties avec d'autres passionnés,
                    et partagez vos plus belles photos avec une communauté qui comprend vraiment ce que
                    représente une bonne nuit de ciel dégagé.
                </p>
                <div className={styles.ctaCol}>
                    <Button as={Link} to="/register">
                        Créer un compte gratuitement
                    </Button>
                    <Link to="/login" className={styles.loginLink}>
                        Déjà un compte ? Se connecter
                    </Link>
                </div>
            </div>

            {/* Photo (libre de droits, crédit ajouté par courtoisie) */}
            <div className={styles.illustration}>
        <span className={styles.credit}>
          Photo :{' '}
            <a
                href="https://www.pexels.com/fr-fr/@lucaspezeta/"
                target="_blank"
                rel="noopener noreferrer"
            >
            Lucas Pezeta
          </a>{' '}
            / Pexels
        </span>
            </div>
        </section>
    )
}
