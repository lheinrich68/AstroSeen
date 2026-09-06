import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Bell, ChevronDown, Plus } from 'lucide-react'
import Logo from '../../../../public/logo_astroseen.svg'
import Button from '../../atoms/button/Button'
import Avatar from '../../atoms/avatar/Avatar'
import { joinClassNames } from '../../../utils/joinClassNames.js'
import styles from './DesktopTopNav.module.css'

const LINKS = [
    { to: '/feed', label: "Fil d'actualité", end: true },
    { to: '/planetarium', label: 'Planétarium' },
    { to: '/calendar', label: 'Calendrier' },
    { to: '/sessions', label: 'Mes sessions' },
]

export default function DesktopTopNav() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.leftGroup}>
                <Link to="/" className={styles.logoLink}>
                    <Logo size={28} />
                    <span className={styles.wordmark}>ASTROSEEN</span>
                </Link>

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
                <Button as={Link} to="/create" className={styles.createButton}>
                    <Plus size={16} strokeWidth={2.4} />
                    Créer
                </Button>

                <button type="button" aria-label="Notifications" className={styles.bellButton}>
                    <Bell size={20} />
                </button>

                <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className={styles.profileButton}
                    aria-expanded={menuOpen}
                >
                    <Avatar size={32} className={styles.avatar} />
                    <ChevronDown size={16} className={styles.chevron} />
                </button>
            </div>
        </header>
    )
}
