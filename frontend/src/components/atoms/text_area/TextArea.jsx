import { forwardRef } from 'react'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Textarea.module.css'

const Textarea = forwardRef(function Textarea(
    { label, rows = 3, className = '', ...props },
    ref,
) {
    return (
        <label className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}
            <textarea
                ref={ref}
                rows={rows}
                className={joinClassNames(styles.textarea, className)}
                {...props}
            />
        </label>
    )
})

export default Textarea