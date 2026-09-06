import { Link } from 'react-router-dom'
import Button from '../../atoms/button/Button.jsx'
import styles from './HeroSection.module.css'

export default function HeroSection() {
    return (
        <section className={styles.section}>
            <div className={styles.textCol}>
                <h1 className={styles.title}>Observez. Partagez. Découvrez le ciel.</h1>
                <p className={styles.description}>
                    La plateforme des passionnés d'astronomie — amateurs, astrophotographes et
                    professionnels. Consignez vos observations, échangez avec la communauté.
                </p>
                <div className={styles.ctaCol}>
                    <Button as={Link} to="/inscription">
                        Créer un compte gratuitement
                    </Button>
                    <Link to="/connexion" className={styles.loginLink}>
                        Déjà un compte ? Se connecter
                    </Link>
                </div>
            </div>

            <div className={styles.illustration} />
        </section>
    )
}
