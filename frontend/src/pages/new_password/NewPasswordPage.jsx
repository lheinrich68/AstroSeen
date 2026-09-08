import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, AlertTriangle } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../components/atoms/logo/Logo.jsx'
import Input from '../../components/atoms/input/Input.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import PasswordChecklist, { isPasswordValid } from '../../components/molecules/password_checklist/PasswordChecklist.jsx'
import styles from './NewPasswordPage.module.css'

//? PAS ENCORE branché à un backend. Le token vient de l'URL
// (/nouveau-mot-de-passe?token=...), envoyé par email depuis
// ForgotPasswordPage.

// Deux vérifications distinctes :
// 1. Le token est-il présent dans l'URL ? (immédiat, côté front)
// 2. Le token est-il valide côté serveur ? (pas encore invalide, pas expiré
//    depuis plus d'1h, pas déjà consommé) -> nécessite un appel API, donc un
//    état de chargement pendant la vérification.

// Dans les deux cas d'échec, même message générique ("Lien invalide ou
// expiré") plutôt que de préciser lequel — ne pas donner d'indice qui
// faciliterait une énumération de tokens/emails.

// TODO: remplacer verifyToken() par un vrai appel
// GET /auth/reset-password/:token qui renvoie valide/invalide. Pour
// l'instant, tout token présent est traité comme valide (à ajuster une fois
// le backend en place).

async function verifyToken(token) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return Boolean(token)
}

export default function NewPasswordPage() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [tokenStatus, setTokenStatus] = useState('checking') // 'checking' | 'valid' | 'invalid'
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let cancelled = false
        verifyToken(token).then((isValid) => {
            if (!cancelled) setTokenStatus(isValid ? 'valid' : 'invalid')
        })
        return () => {
            cancelled = true
        }
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isPasswordValid(password)) {
            toast.error('Le mot de passe ne respecte pas encore toutes les règlementations.')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Les deux mots de passe ne correspondent pas.')
            return
        }

        setSubmitting(true)

// TODO: remplacer par un vrai appel API — POST /auth/reset-password
// avec { token, password }. Le backend doit rejeter un token invalide,
// expiré ou déjà consommé (message générique, sans révéler lequel de
// ces cas s'applique, pour ne pas faciliter une énumération).

        setTimeout(() => {
            toast.success('Mot de passe réinitialisé.\nConnectez-vous avec votre nouveau mot de passe.')
            setSubmitting(false)
            navigate('/login')
        }, 600)
    }

    if (tokenStatus === 'checking') {
        return (
            <div className={styles.page}>
                <StarField count={80} />
                <div className={styles.main}>
                    <div className={styles.content}>
                        <Link to="/" className={styles.logoLink}>
                            <Logo size={56} />
                            <span className={styles.wordmark}>ASTROSEEN</span>
                        </Link>
                        <div className={`${styles.card} ${styles.errorCard}`}>
                            <p className={styles.description}>Vérification du lien...</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (tokenStatus === 'invalid') {
        return (
            <div className={styles.page}>
                <StarField count={80} />
                <div className={styles.main}>
                    <div className={styles.content}>
                        <Link to="/" className={styles.logoLink}>
                            <Logo size={28} />
                            <span className={styles.wordmark}>ASTROSEEN</span>
                        </Link>
                        <div className={`${styles.card} ${styles.errorCard}`}>
                            <div className={styles.errorIcon}>
                                <AlertTriangle size={28} strokeWidth={1.6} color="var(--color-danger)" />
                            </div>
                            <h1 className={styles.title}>Lien invalide ou expiré</h1>
                            <p className={styles.description}>
                                Ce lien de réinitialisation n'est plus valable. Demandez un nouveau lien pour choisir un
                                mot de passe.
                            </p>
                            <Button as={Link} to="/forgot-password">
                                Demander un nouveau lien
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <StarField count={80} />

            <div className={styles.main}>
                <div className={styles.content}>
                    <Link to="/" className={styles.logoLink}>
                        <Logo size={28} />
                        <span className={styles.wordmark}>ASTROSEEN</span>
                    </Link>

                    <div className={styles.card}>
                        <h1 className={styles.title}>Nouveau mot de passe</h1>
                        <p className={styles.description}>Choisis un nouveau mot de passe pour ton compte.</p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div>
                                <Input
                                    label="Nouveau mot de passe"
                                    name="password"
                                    type="password"
                                    icon={Lock}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className={styles.checklistWrapper}>
                                    <PasswordChecklist password={password} />
                                </div>
                            </div>

                            <Input
                                label="Confirmer le mot de passe"
                                name="confirmPassword"
                                type="password"
                                icon={Lock}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <Button type="submit" disabled={submitting}>
                                {submitting ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />

            <ToastContainer
                position="bottom-right"
                theme="dark"
                toastStyle={{ background: 'var(--color-bg-surface-high)', color: 'var(--color-text-primary)' }}
            />
        </div>
    )
}
