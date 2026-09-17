import { CheckCircle2 } from "lucide-react";
import Avatar from "../../atoms/avatar/Avatar.jsx";
import Button from "../../atoms/button/Button.jsx";
import styles from "./CertificationRow.module.css"

// Le badge "Certifié" est cliquable pour retirer le badge (survol → bascule
// visuellement en rouge, pour signaler l'action destructrice) -> cf. le
// sous-titre du menu admin "Accorder ou retirer le badge".
const CertificationRow = ({ user, onToggle }) => {
    return (
        <div className={styles.row}>
            <div className={styles.userGroup}>
                <Avatar size={34} src={user.avatarUrl} />
                <div className={styles.textCol}>
                    <span className={styles.name}>{user.name}</span>
                    <span className={styles.level}>{user.level}</span>
                </div>
            </div>

            {user.certified ? (
                <button type="button" className={styles.certifiedBadge} onClick={() => onToggle(user)}>
                    <CheckCircle2 size={14} />
                    Certifié
                </button>
            ) : (
                <Button variant="outline" onClick={() => onToggle(user)}>
                    Certifier
                </Button>
            )}
        </div>
    )
}
export default CertificationRow;