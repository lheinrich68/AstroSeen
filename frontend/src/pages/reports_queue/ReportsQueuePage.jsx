import { useState, useMemo } from "react";
import Tabs from "../../components/molecules/tabs/Tabs.jsx";
import ReportQueueCard from "../../components/organisms/report_queue_card/ReportQueueCard.jsx";
import styles from "./ReportsQueuePage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un appel API (GET /moderation/reports?status=...)
//      une fois l'endpoint disponible.
const MOCK_REPORTS = [
    {
        id: 'r1',
        contentType: 'Photo',
        authorName: 'Nébuleuse42',
        description: 'Photo de Jupiter publiée il y a 2h',
        reasons: ['Spam', 'Contenu inapproprié'],
        status: 'pending',
    },
    {
        id: 'r2',
        contentType: 'Commentaire',
        authorName: 'PlanetHunter',
        description: "« Ce commentaire n'a rien à faire ici... »",
        reasons: ['Harcèlement'],
        status: 'pending',
    },
    {
        id: 'r3',
        contentType: 'Note',
        authorName: 'CielProfond',
        description: 'Session astro du weekend en montagne',
        reasons: ['Autre'],
        status: 'pending',
    },
    {
        id: 'r4',
        contentType: 'Photo',
        authorName: 'AstroLouis',
        description: 'Photo de la Lune publiée hier',
        reasons: ['Spam'],
        status: 'pending',
    },
    {
        id: 'r5',
        contentType: 'Commentaire',
        authorName: 'GalaxyGirl',
        description: 'Commentaire signalé la semaine dernière',
        reasons: ['Contenu inapproprié'],
        status: 'resolved',
    },
]

const ReportsQueuePage = () => {
    const [activeTab, setActiveTab] = useState('pending')

    const pendingCount = useMemo(() => MOCK_REPORTS.filter((r) => r.status === 'pending').length, [])
    const filteredReports = useMemo(
        () => MOCK_REPORTS.filter((r) => r.status === activeTab),
        [activeTab],
    )

    const TABS = [
        { key: 'pending', label: `En attente (${pendingCount})` },
        { key: 'resolved', label: 'Traités' },
    ]

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Modération</h1>

            <Tabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />

            <div className={styles.list}>
                {filteredReports.length > 0 ? (
                    filteredReports.map((report) => <ReportQueueCard key={report.id} report={report} />)
                ) : (
                    <p className={styles.empty}>Aucun signalement pour le moment.</p>
                )}
            </div>
        </div>
    )
}
export default ReportsQueuePage;