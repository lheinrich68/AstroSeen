import { NavLink } from 'react-router-dom'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './NavItem.module.css'

export default function NavItem({ to, icon: Icon, label, end = false }) {
    return (
        <NavLink to={to} end={end} className={styles.link}>
            {({ isActive }) => (
                <>
                    <Icon size={22} className={joinClassNames(styles.icon, isActive && styles.iconActive)} />
                    <span className={joinClassNames(styles.label, isActive && styles.labelActive)}>{label}</span>
                </>
            )}
        </NavLink>
    )
}
