import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./StatCard.module.css"

//? Inspiré du "small-box" d'AdminLTE => icône géante en filigrane, lien de
//  pied de carte. `color` attend une valeur CSS (ex. 'var(--color-accent-signal)').
const StatCard = ({ value, label, icon: Icon, color, to, footerLabel = "Voir plus"}) => {
    return (
        <div className={styles.card} style={{ '--stat-color': color }}>
            {Icon && <Icon size={64} strokeWidth={1.5} className={styles.ghostIcon} />}

            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>

            {to && (
                <Link to={to} className={styles.footerLink}>
                    {footerLabel}
                    <ArrowRight size={12} />
                </Link>
            )}
        </div>
    )
}
export default StatCard;