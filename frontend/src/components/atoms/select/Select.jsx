import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Select.module.css'

// Select natif (accessibilité/clavier gratuits) stylé pour ressembler à Input.
const Select = forwardRef(function Select(
    { label, placeholder, children, className = '', ...props },
    ref,
) {
    return (
        <label className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.box}>
                <select ref={ref} defaultValue="" className={joinClassNames(styles.select, className)} {...props}>
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {children}
                </select>
                <ChevronDown size={15} className={styles.chevron} />
            </div>
        </label>
    )
})

export default Select