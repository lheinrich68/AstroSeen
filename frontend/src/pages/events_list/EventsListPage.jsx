import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import EventCard from "../../components/organisms/event_card/EventCard.jsx";
import styles from "./EventsListPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un appel API (GET /admin/events,
//      DELETE /admin/events/:id) une fois les endpoints disponibles.

const INITIAL_EVENTS = [
    {
        id: 'ev1',
        name: 'Éclipse partielle de Lune',
        importance: 'Majeur',
        type: 'Éclipse',
        date: '18/09/2026',
        object: 'Lune',
    },
    {
        id: 'ev2',
        name: 'Pluie des Perséides',
        importance: 'Majeur',
        type: 'Pluie de météores',
        date: '12/08/2026',
        object: null,
    },
    {
        id: 'ev3',
        name: 'Opposition de Jupiter',
        importance: 'Mineur',
        type: 'Opposition',
        date: '03/11/2026',
        object: 'Jupiter',
    },
]

const EventsListPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([INITIAL_EVENTS]);

    const handleEdit = (event) => {
        navigate(`/admin/events/${event.id}/edit`)
    }

    const handleDelete = (event) => {
        // TODO: remplacer par un appel API (DELETE /admin/events/:id).
        setEvents((prev) => prev.filter((e) => e.id !== event.id))
        showToast.success(`"${event.name}" supprimé.`)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/admin')}>
                <ArrowLeft size={16} />
                Administration
            </button>

            <h1 className={styles.title}>Événements</h1>

            <Button variant="outline" className={styles.addButton} onClick={() => navigate('/admin/events/new')}>
                <Plus size={15} />
                Créer un événement
            </Button>

            <div className={styles.list}>
                {events.length > 0 ? (
                    events.map((event) => <EventCard key={event.id} event={event} onEdit={handleEdit} onDelete={handleDelete} />)
                ) : (
                    <p className={styles.empty}>Aucun événement pour l'instant.</p>
                )}
            </div>
        </div>
    )
}
export default EventsListPage;