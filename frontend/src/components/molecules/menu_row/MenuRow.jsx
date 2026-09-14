import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import styles from './MenuRow.module.css'

export default function MenuRow({ to, icon: Icon, label, subtitle, showChevron = true, onClick }) {
    const Component = to ? Link : 'button'
    const extraProps = to ? { to, onClick } : { type: 'button', onClick }

    return (
        <Component className={styles.row} {...extraProps}>
            <div className={styles.left}>
                <div className={styles.iconWrapper}>
                    <Icon size={17} />
                </div>
                <div className={styles.textCol}>
                    <div className={styles.label}>{label}</div>
                    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                </div>
            </div>
            {showChevron && <ChevronRight size={16} className={styles.chevron} />}
        </Component>
    )
}