import { joinClassNames } from '@/utils/joinClassNames'
import styles from './IconButton.module.css'

export default function IconButton({ icon: Icon, size = 18, className = '', ...props }) {
    return (
        <button type="button" className={joinClassNames(styles.button, className)} {...props}>
            <Icon size={size} />
        </button>
    )
}
