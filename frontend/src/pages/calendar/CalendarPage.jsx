import { useState, useMemo } from "react";
import { addMonths } from "date-fns";
import MonthCalendar from "../../components/organisms/month_calendar/MonthCalendar.jsx";
import UpcomingEventsList from "../../components/organisms/upcoming_events_list/UpcomingEventsList.jsx";
import styles from "./CalendarPage.module.css"

//* PAS ENCORE branché à un backend => événements de démonstration en dur.
//TODO: À remplacer par un appel API (GET /calendar?month=... pour la grille,
//      GET /calendar/upcoming pour le panneau) une fois les endpoints disponibles.

//? "type" utilise les catégories de EVENT_TYPES (src/utils/eventTypes.js)
//  -> à garder cohérent avec le select "Type d'événement" de EventFormPage côté
//  admin, qui devra être mis à jour pour proposer les mêmes catégories.

const MOCK_EVENTS = [
    {
        id: 'e1',
        date: new Date(2026, 8, 3),
        type: 'comet_asteroid',
        icon: '☄️',
        title: 'Passage de comète',
        meta: 'Mineur · après minuit',
    },
    {
        id: 'e2',
        date: new Date(2026, 8, 12),
        type: 'planetary',
        icon: '🪐',
        title: 'Opposition de Jupiter',
        meta: 'Mineur · toute la nuit',
    },
    {
        id: 'e3',
        date: new Date(2026, 8, 18),
        type: 'lunar',
        icon: '🌘',
        title: 'Éclipse partielle de Lune',
        meta: 'Majeur · toute la nuit',
    },
    {
        id: 'e4',
        date: new Date(2026, 8, 18),
        type: 'session',
        sessionId: 's1',
        icon: '🔭',
        title: 'Observation entre amis',
        meta: 'Session · 21h00 · Plateau de Valensole',
    },
    {
        id: 'e5',
        date: new Date(2026, 8, 23),
        type: 'meteor_shower',
        icon: '🌠',
        title: 'Pic des Orionides',
        meta: 'Majeur · après 23h',
    },
    {
        id: 'e6',
        date: new Date(2026, 8, 28),
        type: 'session',
        sessionId: 's2',
        icon: '🔭',
        title: 'Nuit des Perséides',
        meta: 'Session · 22h00 · Col du Galibier',
    },
    {
        id: 'e7',
        date: new Date(2026, 9, 6),
        type: 'solar',
        icon: '🌑',
        title: 'Éclipse totale de Soleil',
        meta: 'Majeur · matinée',
    },
]


const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1))
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 18))

    const handleMonthChange = (offset) => setCurrentMonth((prev) => addMonths(prev, offset))

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Calendrier</h1>

            <div className={styles.contentGrid}>
                <div className={styles.calendarCol}>
                    <MonthCalendar
                        currentMonth={currentMonth}
                        selectedDate={selectedDate}
                        events={MOCK_EVENTS}
                        onMonthChange={handleMonthChange}
                        onSelectDate={setSelectedDate}
                    />
                </div>

                <div className={styles.listCol}>
                    <UpcomingEventsList events={MOCK_EVENTS} />
                </div>
            </div>
        </div>
    )
}
export default CalendarPage;