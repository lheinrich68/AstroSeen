import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Button.module.css'

export default function Button({
                                   variant = 'primary',
                                   as: Component = 'button',
                                   className = '',
                                   children,
                                   ...props
                               }) {
    return (
        <Component className={joinClassNames(styles.button, styles[variant], className)} {...props}>
            {children}
        </Component>
    )
}
