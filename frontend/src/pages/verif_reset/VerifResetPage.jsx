import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../components/atoms/logo/Logo.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import styles from './VerifResetPage.module.css'

// PAS ENCORE branché à un backend. Email affiché via location.state.email
// (transmis par ForgotPasswordPage), sinon texte générique. "Renvoyer
// l'email" simule l'envoi (toast + cooldown 30s) => à remplacer par un vrai
// appel API (POST /auth/forgot-password) une fois l'endpoint dispo.
const VerifyResetPage = () => {
    const location = useLocation()
    const email = location.state?.email
    const [resending, setResending] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    const handleResend = () => {
        setResending(true)
        // TODO: remplacer par un vrai appel API (POST /auth/forgot-password).
        setTimeout(() => {
            toast.info('Email de réinitialisation renvoyé.')
            setResending(false)
            setCooldown(60)
            const interval = setInterval(() => {
                setCooldown((c) => {
                    if (c <= 1) {
                        clearInterval(interval)
                        return 0
                    }
                    return c - 1
                })
            }, 1000)
        }, 600)
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
                        <div className={styles.iconBadge}>
                            <Mail size={30} strokeWidth={1.6} color="var(--color-accent-signal)" />
                        </div>

                        <h1 className={styles.title}>Vérifie ta boîte mail</h1>

                        <p className={styles.description}>
                            On a envoyé un lien de réinitialisation à{' '}
                            {email ? <strong>{email}</strong> : 'ton adresse email'}. Clique dessus pour choisir un
                            nouveau mot de passe.
                        </p>
                        <p className={styles.description}>
                            Le lien expire dans 1h.
                        </p>

                        <Button
                            variant="outline"
                            className={styles.resendButton}
                            onClick={handleResend}
                            disabled={resending || cooldown > 0}
                        >
                            {cooldown > 0 ? `Renvoyer l'email (${cooldown}s)` : "Renvoyer l'email"}
                        </Button>
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
export default VerifyResetPage