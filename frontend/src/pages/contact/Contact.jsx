import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../../components/atoms/input/Input.jsx'
import Select from '../../components/atoms/select/Select.jsx'
import Textarea from '../../components/atoms/text_area/TextArea.jsx'
import Button from '../../components/atoms/button/Button.jsx'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import Header from '../../components/organisms/header/Header.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import styles from './Contact.module.css'

// formulaire de contact.
const SUBJECTS = [
    'Problème avec mon compte',
    "Demande pour la certification d'astronome",
    'Signaler un bug',
    "Suggestion d'amélioration",
    'Question sur mes données / la confidentialité',
    'Autre',
]

// Formulaire de contact => PAS ENCORE branché à un backend/service d'envoi
// d'email. Pour l'instant, la soumission affiche juste un toast de
// confirmation factice. À remplacer par un vrai appel API quand le backend
// aura un endpoint dédié (ou un service tiers type Formspree/Resend).
// ToastContainer local : cette page est publique (hors AppLayout, qui porte
// déjà le sien pour les pages authentifiées).

const ContactPage = () => {
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)

        // TODO: remplacer par un vrai appel API une fois l'endpoint disponible.
        setTimeout(() => {
            toast.success('Votre message à été envoyé.')
            setSubmitting(false)
            e.target.reset()
        }, 600)
    }

    return (
        <div className={styles.page}>
            <title>Contact - AstroSeen</title>
            <StarField count={80} />

            <Header />
            <div className={styles.content}>
                <div className={styles.container}>
                    <Link to="/" className={styles.backLink}>
                        <ArrowLeft size={16} />
                        Retour à l'accueil
                    </Link>

                    <h1 className={styles.title}>Contact</h1>
                    <p className={styles.intro}>
                        Une question, un bug à signaler, une suggestion ? Écrivez-nous via le formulaire ci-dessous, ou
                        directement à <a href="mailto:contact@astroseen.app">contact@astroseen.app</a>.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input label="Nom" name="name" placeholder="Votre nom" required />
                        <Input label="Email" name="email" type="email" placeholder="votre.email@mail.com" icon={Mail} required />
                        <Select label="Sujet" name="subject" placeholder="Choisissez un sujet" required>
                            {SUBJECTS.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </Select>
                        <Textarea label="Message" name="message" rows={6} placeholder="Expliquez-nous votre demande..." required />
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Envoi...' : 'Envoyer'}
                        </Button>
                    </form>
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
export default ContactPage