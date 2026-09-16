import { Calendar, Award, Database, UserX, Shield, Users, Flag } from "lucide-react";
import StatCard from "../../components/molecules/stat_card/StatCard.jsx";
import MenuRow from "../../components/molecules/menu_row/MenuRow.jsx";
import UsersGrowthChart from "../../components/organisms/users_growth_chart/UsersGrowthChart.jsx";
import styles from "./AdminDashboardPage.module.css"

//* PAS ENCORE branché à un backend — statistiques en dur.
//TODO: À remplacer par un vrai appel API (GET /admin/stats) une fois l'endpoint
//     disponible.

//? Style des cartes inspiré du "small-box" d'AdminLTE (adminlte.io) : icône
//  en filigrane + lien de pied de carte — voir StatCard.jsx.
const MOCK_STATS = [
    { value: '1 284', label: 'Utilisateurs actifs', icon: Users, color: 'var(--color-accent-signal)' },
    { value: '57', label: 'Sessions ce mois', icon: Calendar, color: 'var(--color-accent-starlight)' },
    {
        value: '4',
        label: 'Signalements en attente',
        icon: Flag,
        color: 'var(--color-danger)',
        to: '/moderation',
    },
    {
        value: '2',
        label: 'Demandes de suppression',
        icon: UserX,
        color: 'var(--color-accent-signal)',
        to: '/administration/suppressions',
    },
]

const AdminDashboardPage = () => {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Administration</h1>

            <div className={styles.statsRow}>
                {MOCK_STATS.map((stat) => (
                    <StatCard
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        icon={stat.icon}
                        color={stat.color}
                        to={stat.to}
                    />
                ))}
            </div>

            <UsersGrowthChart />

            <h2 className={styles.sectionTitle}>Gestion</h2>

            <div className={styles.menuList}>
                <MenuRow
                    to="/admin/events"
                    icon={Calendar}
                    label="Événements astronomiques"
                    subtitle="Créer et gérer le calendrier"
                />
                <hr className={styles.divider} />
                <MenuRow
                    to="/admin/certification"
                    icon={Award}
                    label="Certification des astronomes"
                    subtitle="Accorder ou retirer le badge"
                />
                <hr className={styles.divider} />
                <MenuRow
                    to="/admin/reference-tables"
                    icon={Database}
                    label="Tables de référence"
                    subtitle="Statuts, motifs, classifications..."
                />
                <hr className={styles.divider} />
                <MenuRow
                    to="/admin/deletions"
                    icon={UserX}
                    label="Suppressions de compte"
                    subtitle="Traiter les demandes RGPD"
                />
                <hr className={styles.divider} />
                <MenuRow
                    to="/moderation"
                    icon={Shield}
                    label="Modération"
                    subtitle="File de signalements de contenu"
                />
            </div>
        </div>
    )
}
export default AdminDashboardPage;