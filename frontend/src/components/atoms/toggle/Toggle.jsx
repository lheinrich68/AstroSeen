import { forwardRef } from 'react'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Toggle.module.css'

const Toggle = forwardRef(function Toggle({ label, className = '', ...props }, ref) {
    return (
        <label className={joinClassNames(styles.wrapper, className)}>
      <span className={styles.track}>
        <input ref={ref} type="checkbox" role="switch" className={styles.input} {...props} />
        <span className={styles.background} />
        <span className={styles.knob} />
      </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
})

export default Toggle
