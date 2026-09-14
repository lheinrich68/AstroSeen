import { Telescope, Move, Camera, Eye, Settings } from "lucide-react"
import Badge from "../../atoms/badge/Badge.jsx";
import styles from "./EquipmentCard.module.css"

const TYPE_ICONS = {
    Télescope: Telescope,
    Monture: Move,
    Caméra: Camera,
    Oculaire: Eye,
}

const EquipmentCard = ({ item, onEdit, onDelete }) => {
    const TypeIcon = TYPE_ICONS[item.type] ?? Settings;

    return (
        <div className={styles.card}>
            <div className={styles.thumb}>
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className={styles.thumbImage} />
                ) : (
                    <Settings size={22} />
                )}
            </div>

            <div className={styles.body}>
                <div className={styles.headRow}>
                    <span className={styles.name}>{item.name}</span>
                    <Badge variant="neutral" icon={TypeIcon}>
                        {item.type}
                    </Badge>
                </div>

                {item.description && <p className={styles.description}>{item.description}</p>}

                <div className={styles.actionsRow}>
                    <button type="button" className={styles.actionButton} onClick={() => onEdit(item)}>
                        Modifier
                    </button>
                    <button
                        type="button"
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => onDelete(item)}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EquipmentCard;