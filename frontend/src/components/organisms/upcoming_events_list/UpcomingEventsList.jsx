import { format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/showToast.jsx";
import styles from "./UpcomingEventsList.module.css"

//? Panneau de droite : événements actuels/à venir, triés chronologiquement
//  -> indépendant du jour sélectionné dans le calendrier (contrairement à
//  l'ancienne version qui montrait seulement le jour cliqué).
const UpcomingEventsList = ({ events, limit = 6 }) => {
    const navigate = useNavigate()

    const upcoming = events
        .filter((e) => isToday(e.date) || e.date > new Date())
        .sort((a, b) => a.date - b.date)
        .slice(0, limit)

    const handleClick = (event) => {
        if (event.type === 'session' && event.sessionId) {
            navigate(`/sessions/${event.sessionId}`)
        } else {
            // TODO: pas encore d'écran de détail pour un événement astro côté
            // utilisateur (seulement côté admin, /admin/events).
            showToast.info('Détail pas encore disponible.')
        }
    }

    return (
        <div>
            <h2 className={styles.title}>Événements à venir</h2>

            {upcoming.length > 0 ? (
                <div className={styles.list}>
                    {upcoming.map((event) => (
                        <div key={event.id} className={styles.item} onClick={() => handleClick(event)}>
                            <span className={styles.iconWrapper}>{event.icon}</span>
                            <div>
                                <div className={styles.itemDate}>
                                    {isToday(event.date) ? "Aujourd'hui" : format(event.date, 'd MMMM', { locale: fr })}
                                </div>
                                <div className={styles.itemName}>{event.title}</div>
                                <div className={styles.itemMeta}>{event.meta}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Aucun événement à venir.</p>
            )}
        </div>
    )
}
export default UpcomingEventsList;