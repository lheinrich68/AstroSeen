import Badge from "../../atoms/badge/Badge.jsx";
import styles from "./EventCard.module.css"

const EventCard = ({ event, onEdit, onDelete }) => {
    const metaParts = [event.type, event.date, event.object].filter(Boolean)

    return (
        <div className={styles.card}>
            <div className={styles.headRow}>
                <span className={styles.name}>{event.name}</span>
                <Badge variant={event.importance === 'Majeur' ? 'starlight' : 'neutral'}>{event.importance}</Badge>
            </div>

            <span className={styles.meta}>{metaParts.join(' · ')}</span>

            <div className={styles.actionsRow}>
                <button type="button" className={styles.actionButton} onClick={() => onEdit(event)}>
                    Modifier
                </button>
                <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(event)}
                >
                    Supprimer
                </button>
            </div>
        </div>
    )
}
export default EventCard