import { Link } from 'react-router-dom'
import Logo from '../../atoms/logo/Logo.jsx'
import Button from '../../atoms/button/Button.jsx'
import styles from './Header.module.css'

// Sur mobile, seul "Se connecter" apparaît dans le header (le bouton
// "S'inscrire" est réservé au desktop) — le CTA principal reste dans le hero.
export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logoLink}>
                <Logo size={39} />
                <span className={styles.wordmark}>ASTROSEEN</span>
            </Link>

            <div className={styles.actions}>
                <Link to="/login" className={styles.loginLink}>
                    Se connecter
                </Link>
                <Button as={Link} to="/register" className={styles.signupButton}>
                    S'inscrire
                </Button>
            </div>
        </header>
    )
}
