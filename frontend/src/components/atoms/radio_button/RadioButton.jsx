import { forwardRef } from 'react'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './RadioButton.module.css'

const RadioButton = forwardRef(function RadioButton({ label, className = '', ...props }, ref) {
    return (
        <label className={joinClassNames(styles.wrapper, className)}>
      <span className={styles.circleWrapper}>
        <input ref={ref} type="radio" className={styles.input} {...props} />
        <span className={styles.circle} />
        <span className={styles.dot} />
      </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
})

export default RadioButton