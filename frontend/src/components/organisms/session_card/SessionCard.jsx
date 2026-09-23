import { useNavigate } from 'react-router-dom';
import { Star, GraduationCap, Users } from "lucide-react"
import Badge from "../../atoms/badge/Badge.jsx";
import styles from "./SessionCars.module.css"

const STATUS_VARIANT = {
    'inProgress': 'signal',
    'upcoming': 'starlight',
    'finished': 'neutral',
}

const TYPE_ICONS = {
    Loisir: Star,
    Formation: GraduationCap,
}

const SessionCard = ({ session }) => {
    const navigate = useNavigate();
    const TypeIcon = TYPE_ICONS[session.type] ?? Star

    return (
        <div className={styles.card} onClick={() => navigate(`/sessions/${session.id}`)}>
            <div className={styles.headRow}>
                <span className={styles.name}>{session.name}</span>
                <Badge variant={STATUS_VARIANT[session.status] ?? 'neutral'}>{session.status}</Badge>
            </div>

            <span className={styles.meta}>
        {session.date} · {session.place}
      </span>

            <div className={styles.footerRow}>
        <span className={styles.chip}>
          <TypeIcon size={12} />
            {session.type}
        </span>
                <span className={styles.chip}>
          <Users size={12} />
                    {session.participantsCount}
        </span>
            </div>
        </div>
    )
}
export default SessionCard;