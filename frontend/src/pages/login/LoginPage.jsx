import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../components/atoms/logo/Logo.jsx'
import Input from '../../components/atoms/input/Input.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import Header from '../../components/organisms/header/Header.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import styles from './LoginPage.module.css'

// PAS ENCORE branché à un backend -> la soumission ne fait que simuler une
// connexion (toast + redirection factice). À remplacer par un vrai appel
// API (POST /auth/login) une fois l'endpoint disponible, avec gestion des
// erreurs (identifiants invalides, compte non vérifié...).
const LoginPage = () => {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)

        // TODO: remplacer par un vrai appel API (POST /auth/login).
        setTimeout(() => {
            toast.success('Connexion réussie.')
            setSubmitting(false)
            navigate('/')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <title>Connection - AstroSeen</title>
            <StarField count={80} />

            <div className={styles.main}>
                <div className={styles.content}>
                    <Link to="/" className={styles.logoLink}>
                        <Logo size={56} />
                        <span className={styles.wordmark}>ASTROSEEN</span>
                    </Link>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Connexion</h1>
                        <p className={styles.legend}>* Champ obligatoire</p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <Input
                                label="Email *"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="example@mail.com"
                                required
                            />
                            <Input
                                label="Mot de passe *"
                                name="password"
                                type="password"
                                icon={Lock}
                                placeholder="••••••••"
                                required
                            />

                            <Link to="/mot-de-passe-oublie" className={styles.forgotLink}>
                                Mot de passe oublié ?
                            </Link>

                            <Button type="submit" disabled={submitting}>
                                {submitting ? 'Connexion...' : 'Se connecter'}
                            </Button>
                        </form>

                        <p className={styles.signupText}>
                            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
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
export default LoginPage