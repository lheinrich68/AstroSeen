import styles from './FeatureCard.module.css'

export default function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                <Icon size={18} className={styles.icon} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    )
}
