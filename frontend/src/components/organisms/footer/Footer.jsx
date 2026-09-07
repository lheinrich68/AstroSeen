import { Link } from 'react-router-dom'
import styles from './Footer.module.css'


export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <Link to="/cgu" className={styles.link}>Conditions Générales d'Utilisation</Link>
                <Link to="/confidentialite" className={styles.link}>Politique de confidentialité</Link>
                <Link to="/contact" className={styles.link}>Contact</Link>
            </div>
            <p className={styles.copyright}>
                Application développée par Louis Heinrich. AstroSeen © {year} — tous droits réservés.
            </p>
        </footer>
    )
}
