import { Link } from 'react-router-dom'
import { Home, Star, Calendar, User, Plus } from 'lucide-react'
import NavItem from '@/components/molecules/NavItem'
import styles from './MobileBottomNav.module.css'


export default function MobileBottomNav() {
    return (
        <nav className={styles.nav}>
            <NavItem to="/feed" end icon={Home} label="Fil" />
            <NavItem to="/planetarium" icon={Star} label="Planétarium" />

            <Link to="/create" className={styles.createButton} aria-label="Créer">
                <Plus size={26} strokeWidth={2.4} className={styles.createIcon} />
            </Link>

            <NavItem to="/calendar" icon={Calendar} label="Calendrier" />
            <NavItem to="/profil" icon={User} label="Profil" />
        </nav>
    )
}
