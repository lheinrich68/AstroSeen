import { X } from 'lucide-react'
import { joinClassNames } from "../../../utils/joinClassNames.js";
import Avatar from "../../atoms/avatar/Avatar.jsx";
import styles from "./ParticipantRow.module.css"

//* "Hôte" est indépendant de isMe => c'est un rôle fixe (celui qui a créé la
//  session), visible par tout le monde, pas seulement par l'hôte lui-même.
//  isMe sert uniquement à afficher "(vous)" et à masquer le bouton retirer
//  sur sa propre ligne.
const ParticipantRow = ({ participant, onRemove }) => {
    const statusLabel = participant.isHost ? 'Hôte' : participant.status
    const statusClass = participant.isHost
        ? styles.statusHost
        : participant.status === 'Confirmée'
            ? styles.statusConfirmed
            : styles.statusInvited

    return (
        <div className={styles.row}>
            <div className={styles.userGroup}>
                <Avatar size={30} />
                <span className={styles.name}>
          {participant.name}
                    {participant.isMe ? ' (vous)' : ''}
        </span>
            </div>

            <div className={styles.rightGroup}>
                <span className={joinClassNames(styles.statusPill, statusClass)}>{statusLabel}</span>
                {!participant.isMe && !participant.isHost && (
                    <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => onRemove(participant)}
                        aria-label={`Retirer ${participant.name}`}
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    )
}
export default ParticipantRow;