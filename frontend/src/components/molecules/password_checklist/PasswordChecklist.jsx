import { CheckCircle2, Circle } from 'lucide-react'
import { joinClassNames } from '../../../utils/joinClassNames.js'
import styles from './PasswordChecklist.module.css'

// Règle CNIL appliquée au mot de passe : 12 caractères minimum, au moins un
// chiffre, une majuscule et un caractère spécial. Cohérent avec le modèle
// de données (hashed_password) et les autres écrans qui affichent la même
// checklist (Nouveau mot de passe).
const RULES = [
    { label: '12 caractères minimum', test: (v) => v.length >= 12 },
    { label: 'Au moins 1 chiffre', test: (v) => /\d/.test(v) },
    { label: 'Au moins 1 majuscule', test: (v) => /[A-Z]/.test(v) },
    { label: 'Au moins 1 caractère spécial', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

export function isPasswordValid(value) {
    return RULES.every((rule) => rule.test(value))
}

const PasswordChecklist = ({ password = '' }) => {
    return (
        <ul className={styles.list}>
            {RULES.map((rule) => {
                const met = rule.test(password)
                return (
                    <li key={rule.label} className={styles.item}>
                        {met ? (
                            <CheckCircle2 size={13} className={styles.iconMet} />
                        ) : (
                            <Circle size={13} className={styles.iconPending} />
                        )}
                        <span className={joinClassNames(met && styles.textMet)}>{rule.label}</span>
                    </li>
                )
            })}
        </ul>
    )
}
export default PasswordChecklist
