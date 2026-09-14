import Badge from "../../atoms/badge/Badge.jsx";
import styles from "./SetCard.module.css"

const SetCard = ({ set, onEdit, onDelete }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headRow}>
                <span className={styles.name}>{set.name}</span>
                <Badge variant="signal">{set.category}</Badge>
            </div>

            <div className={styles.chipsRow}>
                {set.equipmentNames.map((name) => (
                    <span key={name} className={styles.chip}>
                        {name}
                    </span>
                ))}
            </div>

            <div className={styles.actionsRow}>
                <button type="button" className={styles.actionButton} onClick={() => onEdit(set)}>
                    Modifier
                </button>
                <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(set)}
                >
                    Supprimer
                </button>
            </div>
        </div>
    )
}
export default SetCard