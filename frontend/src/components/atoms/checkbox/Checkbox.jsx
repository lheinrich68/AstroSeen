import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Checkbox.module.css'

const Checkbox = forwardRef(function Checkbox({ label, className = '', ...props }, ref) {
    return (
        <label className={joinClassNames(styles.wrapper, className)}>
      <span className={styles.boxWrapper}>
        <input ref={ref} type="checkbox" className={styles.input} {...props} />
        <span className={styles.box} />
        <Check size={12} strokeWidth={3} className={styles.check} />
      </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
})

export default Checkbox
