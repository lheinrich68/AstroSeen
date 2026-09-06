import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Badge.module.css'

export default function Badge({ variant = 'neutral', icon: Icon, className = '', children }) {
    return (
        <span className={joinClassNames(styles.badge, styles[variant], className)}>
      {Icon && <Icon size={12} />}
            {children}
    </span>
    )
}