import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    FileText,
    Heart,
    MessageCircle,
    Repeat,
    UserMinus,
    Telescope,
    Award,
    Clock,
    CheckCircle2,
} from "lucide-react";
import StatCard from "../../components/molecules/stat_card/StatCard.jsx";
import DistributionChart from "../../components/organisms/distribution_chart/DistributionChart.jsx";
import styles from "./StatisticsPage.module.css"

const YELLOW = '#e8d16a'
const GREEN = '#5fd98a'
const GRAY = 'var(--color-text-muted)'
const WHITE = 'var(--color-text-primary)'
const PURPLE = '#a084e0'

//* PAS ENCORE branché à un backend -> statistiques en dur.
//TODO: À remplacer par un appel API (GET /admin/stats/detailed) une fois
//      l'endpoint disponible.
const ENGAGEMENT_STATS = [
    { value: '142 (+8%)', label: 'Publications cette semaine', icon: FileText, color: GRAY },
    { value: '6,4', label: 'Likes moyens par publication', icon: Heart, color: 'var(--color-danger)' },
    { value: '2,1', label: 'Commentaires moyens par publication', icon: MessageCircle, color: WHITE },
]

const GROWTH_STATS = [
    { value: '68 %', label: 'Taux de rétention (30 jours)', icon: Repeat, color: YELLOW },
    { value: '5', label: 'Comptes supprimés ce mois', icon: UserMinus, color: 'var(--color-danger)' },
]

const CONTENT_STATS = [
    { value: '34', label: "Sessions d'observation créées ce mois", icon: Telescope, color: PURPLE },
    { value: '47', label: 'Astronomes certifiés (total)', icon: Award, color: YELLOW },
]

const MODERATION_STATS = [
    { value: '4,2 h', label: "Temps moyen de traitement d'un signalement", icon: Clock, color: 'var(--color-accent-starlight)' },
    { value: '68 %', label: 'Signalements validés (vs rejetés)', icon: CheckCircle2, color: GREEN },
]

const LEVEL_DISTRIBUTION = [
    { label: 'Débutant', value: 42, color: '#4fd8e0' },
    { label: 'Confirmé', value: 38, color: '#f2b872' },
    { label: 'Expert', value: 20, color: '#d95959' },
]

const TYPE_DISTRIBUTION = [
    { label: 'Amateur', value: 55, color: '#4fd8e0' },
    { label: 'Astrophotographe', value: 30, color: '#f2b872' },
    { label: 'Professionnel', value: 15, color: '#d95959' },
]

const StatisticsPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/admin')}>
                <ArrowLeft size={16} />
                Tableau de bord
            </button>

            <h1 className={styles.title}>Statistiques</h1>

            <h2 className={styles.sectionTitle}>Engagement</h2>
            <div className={styles.statsGrid}>
                {ENGAGEMENT_STATS.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <h2 className={styles.sectionTitle}>Croissance</h2>
            <div className={styles.statsGrid}>
                {GROWTH_STATS.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <h2 className={styles.sectionTitle}>Contenu</h2>
            <div className={styles.statsGrid}>
                {CONTENT_STATS.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <h2 className={styles.sectionTitle}>Modération</h2>
            <div className={styles.statsGrid}>
                {MODERATION_STATS.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <h2 className={styles.sectionTitle}>Répartitions</h2>
            <div className={styles.distributionsGrid}>
                <DistributionChart title="Utilisateurs par niveau" segments={LEVEL_DISTRIBUTION} />
                <DistributionChart title="Utilisateurs par statut" segments={TYPE_DISTRIBUTION} />
            </div>
        </div>
    )
}
export default StatisticsPage;