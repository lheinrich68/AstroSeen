import { bortleColor } from "../../../utils/bortleColor.js";
import styles from "./PlaceCard.module.css"

const PlaceCard = ({ place, onEdit, onDelete }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headRow}>
                <span className={styles.name}>{place.name}</span>
                <span className={styles.bortleBadge}>
                <span className={styles.bortleDot} style={{ background: bortleColor(place.bortle) }} />
                    Bortle {place.bortle}
                </span>
            </div>

            <span className={styles.coords}>
                {place.latitude}° N, {place.longitude}° E
            </span>

            <div className={styles.actionsRow}>
                <button type="button" className={styles.actionButton} onClick={() => onEdit(place)}>
                    Modifier
                </button>
                <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(place)}
                >
                    Supprimer
                </button>
            </div>
        </div>
    )
}
export default PlaceCard;