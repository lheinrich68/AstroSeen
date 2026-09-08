import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../components/atoms/logo/Logo.jsx'
import Input from '../../components/atoms/input/Input.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import styles from './ForgotPasswordPage.module.css'

// PAS ENCORE branché à un backend — la soumission simule l'envoi du lien
// (toast + redirection vers l'écran de vérification). À remplacer par un
// vrai appel API (POST /auth/forgot-password) une fois l'endpoint dispo.
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)

        // TODO: remplacer par un vrai appel API (POST /auth/forgot-password).
        setTimeout(() => {
            toast.success('Lien envoyé si un compte existe avec cet email.')
            setSubmitting(false)
            navigate('/verification-reset', { state: { email } })
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
                        <h1 className={styles.title}>Mot de passe oublié</h1>
                        <p className={styles.description}>
                            Indique ton email, on t'envoie un lien pour choisir un nouveau mot de passe.
                        </p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="toi@exemple.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Button type="submit" disabled={submitting}>
                                {submitting ? 'Envoi...' : 'Envoyer le lien'}
                            </Button>
                        </form>

                        <p className={styles.backText}>
                            <Link to="/login">Retour à la connexion</Link>
                        </p>
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
export default ForgotPasswordPage