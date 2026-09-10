import { Link } from 'react-router-dom'
import { Home, Star, Calendar, User, Plus } from 'lucide-react'
import NavItem from '../../molecules/nav_item/NavItem.jsx'
import styles from './MobileBottomNav.module.css'


const MobileBottomNav = () => {
    return (
        <nav className={styles.nav}>
            <NavItem to="/feed" end icon={Home} label="Fil" />
            <NavItem to="/planetarium" icon={Star} label="Planétarium" />

            <Link to="/new-post" className={styles.createButton} aria-label="Créer un nouveau post">
                <Plus size={26} strokeWidth={2.4} className={styles.createIcon} />
            </Link>

            <NavItem to="/calendar" icon={Calendar} label="Calendrier" />
            <NavItem to="/profile" icon={User} label="Profil" />
        </nav>
    )
}
export default MobileBottomNav