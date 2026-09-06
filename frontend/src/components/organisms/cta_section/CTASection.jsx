import { Link } from 'react-router-dom'
import Button from '../../atoms/button/Button'
import styles from './CTASection.module.css'

export default function CTASection() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Rejoins la communauté</h2>
            <Button as={Link} to="/inscription">
                S'inscrire
            </Button>
        </section>
    )
}