import { Link, NavLink } from "react-router-dom";
import { joinClassNames } from "../../../utils/joinClassNames.js";
import { LayoutDashboard, BarChart3, Calendar, Award, Database, UserX, Shield } from 'lucide-react'
import styles from "./AdminSidebar.module.css"

const LINKS = [
    { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
    { to: '/admin/statistics', label: 'Statistiques', icon: BarChart3 },
    { to: '/admin/events', label: 'Événements astronomiques', icon: Calendar },
    { to: '/admin/certification', label: 'Certification des astronomes', icon: Award },
    { to: '/admin/reference-tables', label: 'Tables de référence', icon: Database },
    { to: '/admin/deletions', label: 'Suppressions de compte', icon: UserX },
    { to: '/moderation', label: 'Modération', icon: Shield },
]

// Sidebar persistante de la section Administration => desktop uniquement
// (cf. HiFi "Tableau de bord admin (desktop)"). Sur mobile, la navigation
// entre ces sous-pages reste dans la liste "Gestion" de AdminDashboardPage.
const AdminSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {LINKS.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) => joinClassNames(styles.link, isActive && styles.linkActive)}
                    >
                        <Icon size={17} className={styles.linkIcon} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
export default AdminSidebar;