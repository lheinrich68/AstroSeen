import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Bell, ChevronDown, Plus } from 'lucide-react'
import Logo from '../../atoms/logo/Logo.jsx'
import Button from '../../atoms/button/Button'
import Avatar from '../../atoms/avatar/Avatar'
import ProfileDropdown from '../../organisms/profile_drop_down/ProfileDropDown.jsx'
import { joinClassNames } from '../../../utils/joinClassNames.js'
import styles from './DesktopTopNav.module.css'

const LINKS = [
    { to: '/feed', label: "Fil d'actualité", end: true },
    { to: '/planetarium', label: 'Planétarium' },
    { to: '/calendar', label: 'Calendrier' },
    { to: '/sessions', label: 'Mes sessions' },
]

const DesktopTopNav = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.leftGroup}>
                <Logo size={42} />
                <span className={styles.wordmark}>ASTROSEEN</span>

                <div className={styles.divider} />

                <nav className={styles.linksRow}>
                    {LINKS.map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) => joinClassNames(styles.link, isActive && styles.linkActive)}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className={styles.rightGroup}>
                <Button as={Link} to="/new-post" className={styles.createButton}>
                    <Plus size={16} strokeWidth={2.4} />
                    Nouveau post
                </Button>

                <button type="button" aria-label="Notifications" className={styles.bellButton}>
                    <Bell size={20} />
                </button>

                <div className={styles.profileWrapper}>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className={styles.profileButton}
                        aria-expanded={menuOpen}
                    >
                        <Avatar size={32} className={styles.avatar} />
                        <ChevronDown size={16} className={styles.chevron} />
                    </button>

                    {menuOpen && <ProfileDropdown onClose={() => setMenuOpen(false)} />}
                </div>
            </div>
        </header>
    )
}
export default DesktopTopNav