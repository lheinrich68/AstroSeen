import { Link } from 'react-router-dom'
import styles from './Footer.module.css'


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Link to="/cgu" className={styles.link}>CGU</Link>
            <Link to="/confidentialite" className={styles.link}>Confidentialité</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
        </footer>
    )
}
