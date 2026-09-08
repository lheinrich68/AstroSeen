import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../components/atoms/logo/Logo.jsx'
import Input from '../../components/atoms/input/Input.jsx'
import Checkbox from '../../components/atoms/checkbox/Checkbox.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import PasswordChecklist, { isPasswordValid } from '../../components/molecules/password_checklist/PasswordChecklist.jsx'
import styles from './RegisterPage.module.css'

// PAS ENCORE branché à un backend -> la soumission simule juste une
// inscription (toast + redirection). À remplacer par un vrai appel API
// (POST /auth/register) une fois l'endpoint disponible, avec gestion des
// erreurs (email déjà utilisé, etc.) et l'envoi de l'email de vérification
// (cf. écran "Vérification email").
const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

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
        if (!acceptedTerms) {
            toast.error("Tu dois accepter les Conditions Générales d'Utilisation ainsi que la politique de confidentialité.")
            return
        }

        setSubmitting(true)
        // TODO: remplacer par un vrai appel API (POST /auth/register).
        setTimeout(() => {
            toast.success('Compte créé — vérifie ta boîte mail pour confirmer ton adresse.')
            setSubmitting(false)
            navigate('/verification-email', { state: { email } })
        }, 600)
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
                        <h1 className={styles.title}>Inscription</h1>
                        <p className={styles.legend}>* Champ obligatoire</p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <Input label="Pseudo *" name="pseudo" icon={User} placeholder="VotrePseudonyme" required />
                            <Input
                                label="Email *"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="exemple@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div>
                                <Input
                                    label="Mot de passe *"
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
                                label="Confirmer le mot de passe *"
                                name="confirmPassword"
                                type="password"
                                icon={Lock}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <Checkbox
                                className={styles.checkboxRow}
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                label={
                                    <>
                                        J'accepte les <Link to="/cgu">Conditions Générales d'Utilisation</Link> ainsi que la{' '}
                                        <Link to="/confidentialite">Politique de confidentialité</Link>. *
                                    </>
                                }
                            />

                            <Button type="submit" disabled={submitting}>
                                {submitting ? 'Création du compte...' : "S'inscrire"}
                            </Button>
                        </form>

                        <p className={styles.loginText}>
                            Déjà un compte ? <Link to="/connexion">Se connecter</Link>
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                theme="dark"
                toastStyle={{ background: 'var(--color-bg-surface-high)', color: 'var(--color-text-primary)' }}
            />
        </div>
    )
}
export default RegisterPage