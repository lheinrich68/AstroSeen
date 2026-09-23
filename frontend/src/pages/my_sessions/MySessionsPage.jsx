import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"
import Button from "../../components/atoms/button/Button.jsx";
import Tabs from "../../components/molecules/tabs/Tabs.jsx";
import SessionCard from "../../components/organisms/session_card/SessionCard.jsx";
import styles from "./MySessionsPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un vrai appel API (GET /me/sessions?filter=...) une fois
//      l'endpoint disponible.

const MOCK_SESSIONS = [
    {
        id: 's1',
        name: 'Observation entre amis',
        status: 'En cours',
        date: '30/08/2026',
        place: 'Plateau de Valensole',
        type: 'Loisir',
        participantsCount: 3,
    },
    {
        id: 's2',
        name: 'Nuit des Perséides',
        status: 'À venir',
        date: '12/08/2026',
        place: 'Col du Galibier',
        type: 'Loisir',
        participantsCount: 8,
    },
    {
        id: 's3',
        name: 'Initiation astrophoto',
        status: 'Terminée',
        date: '02/07/2026',
        place: 'Jardin (domicile)',
        type: 'Formation',
        participantsCount: 5,
    },
]

const TABS = [
    { key: 'all', label: 'Toutes' },
    { key: 'upcoming', label: 'À venir' },
    { key: 'past', label: 'Passées' },
]


const MySessionsPage = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('all')

    const filteredSessions = useMemo(() => {
        if (activeTab === 'upcoming') {
            return MOCK_SESSIONS.filter((s) => s.status === 'À venir' || s.status === 'En cours')
        }
        if (activeTab === 'past') {
            return MOCK_SESSIONS.filter((s) => s.status === 'Terminée')
        }
        return MOCK_SESSIONS
    }, [activeTab])

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Mes sessions</h1>

            <Tabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />

            <Button variant="outline" className={styles.addButton} onClick={() => navigate('/sessions/new-session')}>
                <Plus size={15} />
                Créer une session
            </Button>

            <div key={activeTab} className={styles.list}>
                {filteredSessions.length > 0 ? (
                    filteredSessions.map((session) => <SessionCard key={session.id} session={session} />)
                ) : (
                    <p className={styles.empty}>Aucune session trouvé. 😕</p>
                )}
            </div>
        </div>
    )
}
export default MySessionsPage