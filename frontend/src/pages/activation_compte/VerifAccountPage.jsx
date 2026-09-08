import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import Logo from '../../components/atoms/logo/Logo.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import styles from './VerifAccountPage.module.css'

//? PAS ENCORE branché à un backend. Le token vient de l'URL
// (/activation-compte?token=...), envoyé par email depuis l'inscription
// (cf. VerifyEmailPage — "on t'a envoyé un lien de vérification").

// Même logique que NewPasswordPage : vérification du token (avec état de
// chargement), message générique en cas d'échec (token absent, expiré ou
// déjà utilisé) pour ne pas faciliter une énumération.

// TODO: remplacer verifyToken() par un vrai appel
// GET /auth/verify-account/:token qui active le compte côté serveur et
// renvoie succès/échec. Pour l'instant, tout token présent est traité comme
// valide.
async function verifyToken(token) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return Boolean(token)
}

const REDIRECT_DELAY = 5

const VerifAccountPage = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [tokenStatus, setTokenStatus] = useState('checking') // 'checking' | 'valid' | 'invalid'
    const [countdown, setCountdown] = useState(REDIRECT_DELAY)
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

// Redirection automatique vers la connexion une fois le compte activé.
    useEffect(() => {
        if (tokenStatus !== 'valid') return

        const interval = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(interval)
                    navigate('/login')
                    return 0
                }
                return c - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [tokenStatus, navigate])

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
                        <div className={styles.card}>
                            <p className={styles.description}>Activation de votre compte...</p>
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
                            <Logo size={56} />
                            <span className={styles.wordmark}>ASTROSEEN</span>
                        </Link>
                        <div className={styles.card}>
                            <div className={`${styles.iconBadge} ${styles.iconBadgeError}`}>
                                <AlertTriangle size={28} strokeWidth={1.6} color="var(--color-danger)" />
                            </div>
                            <h1 className={styles.title}>Lien invalide ou expiré</h1>
                            <p className={styles.description}>
                                Ce lien d'activation n'est plus valable. Connectez-vous pour recevoir un nouveau lien de
                                vérification.
                            </p>
                            <Button as={Link} to="/login">
                                Aller à la connexion
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
                        <Logo size={56} />
                        <span className={styles.wordmark}>ASTROSEEN</span>
                    </Link>

                    <div className={styles.card}>
                        <div className={`${styles.iconBadge} ${styles.iconBadgeSuccess}`}>
                            <CheckCircle2 size={30} strokeWidth={1.6} color="var(--color-accent-signal)" />
                        </div>

                        <h1 className={styles.title}>Compte activé !</h1>
                        <p className={styles.description}>
                            Votre adresse email a bien été vérifiée. Vous allez être redirigé vers la connexion dans
                            quelques secondes.
                        </p>

                        <Button as={Link} to="/login">
                            Se connecter maintenant
                        </Button>

                        <p className={styles.redirectHint}>Redirection automatique dans {countdown}s...</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
export default VerifAccountPage