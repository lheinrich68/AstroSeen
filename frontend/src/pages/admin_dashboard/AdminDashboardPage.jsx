import { Calendar, Award, Database, UserX, Shield, Users, Flag, UserPlus, Activity, BarChart3 } from "lucide-react";
import StatCard from "../../components/molecules/stat_card/StatCard.jsx";
import MenuRow from "../../components/molecules/menu_row/MenuRow.jsx";
import UsersGrowthChart from "../../components/organisms/users_growth_chart/UsersGrowthChart.jsx";
import styles from "./AdminDashboardPage.module.css"

// Palette étendue pour les cartes de stats uniquement -> pas des tokens de
// charte graphique globale, juste des couleurs de repère supplémentaires
// (jaune/vert/bleu/violet) en plus de nos 3 accents (signal/starlight/danger).
const YELLOW = '#e8d16a'
const GREEN = '#5fd98a'
const BLUE = '#5b9ee8'
const GRAY = 'var(--color-text-muted)'

//* PAS ENCORE branché à un backend — statistiques en dur.
//TODO: À remplacer par un vrai appel API (GET /admin/stats) une fois l'endpoint
//     disponible.

//? Style des cartes inspiré du "small-box" d'AdminLTE (adminlte.io) : icône
//  en filigrane + lien de pied de carte -> voir StatCard.jsx.

//? Seules les stats les plus "actionnables"/pertinentes au quotidien restent
//  ici. Le reste (engagement détaillé, rétention, répartitions...) est dans
//  StatisticsPage, accessible via /admin/statistics.
const MOCK_STATS = [
    { value: '1 284', label: 'Utilisateurs actifs', icon: Users, color: 'var(--color-accent-signal)' },
    { value: '186', label: 'Utilisateurs actifs (jour)', icon: Activity, color: YELLOW },
    { value: '+23', label: 'Nouvelles inscriptions (semaine)', icon: UserPlus, color: GREEN },
    { value: '57', label: 'Sessions ce mois', icon: Calendar, color: BLUE },
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
        color: GRAY,
        to: '/admin/deletions',
    },
]

const AdminDashboardPage = () => {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Tableau de bord</h1>

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

            {/* Sur desktop, la navigation vers ces sous-pages passe par
          AdminSidebar (persistante) — cette liste ne s'affiche donc que sur
          mobile, cf. .mobileOnlyGestion dans le CSS. */}
            <div className={styles.mobileOnlyGestion}>
                <h2 className={styles.sectionTitle}>Gestion</h2>

                <div className={styles.menuList}>
                    <MenuRow
                        to="/admin/statistics"
                        icon={BarChart3}
                        label="Statistiques"
                        subtitle="Engagement, rétention, répartitions..."
                    />
                    <hr className={styles.divider} />
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
        </div>
    )
}
export default AdminDashboardPage;