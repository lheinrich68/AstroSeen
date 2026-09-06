import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { joinClassNames } from '@/utils/joinClassNames'
import styles from './Input.module.css'

// Champ texte standard : label au-dessus, icône optionnelle à gauche,
// et bascule œil automatique pour type="password".
const Input = forwardRef(function Input(
    { label, icon: Icon, type = 'text', className = '', ...props },
    ref,
) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const resolvedType = isPassword && showPassword ? 'text' : type

    return (
        <label className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.box}>
                {Icon && <Icon size={17} className={styles.icon} />}
                <input
                    ref={ref}
                    type={resolvedType}
                    className={joinClassNames(styles.input, className)}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className={styles.toggle}
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                )}
            </div>
        </label>
    )
})

export default Input