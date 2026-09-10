import { Link } from 'react-router-dom'
import Button from '../../atoms/button/Button.jsx'
import styles from './CTASection.module.css'

const CTASection = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Rejoins la communauté</h2>
            <Button as={Link} to="/register">
                S'inscrire
            </Button>
        </section>
    )
}
export default CTASection