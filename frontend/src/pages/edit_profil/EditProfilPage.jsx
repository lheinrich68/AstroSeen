import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from 'lucide-react';
import { showToast } from "../../utils/showToast.jsx";
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import TextArea from "../../components/atoms/text_area/TextArea.jsx";
import Select from "../../components/atoms/select/Select.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import styles from "./EditProfilPage.module.css"

//* PAS ENCORE branché à un backend -> pré-rempli avec des données de
//  démonstration, la sauvegarde simule juste l'envoi (toast + retour au
//  profil).
//TODO: À remplacer par GET /me (pré-remplissage) et PATCH /me
//  (sauvegarde) une fois les endpoints disponibles.

//? Changer l'email devrait déclencher une nouvelle vérification côté
//  serveur (cf. le hint affiché) -> pas géré ici puisqu'il n'y a pas de
//  backend, mais à prévoir : après un changement d'email, rediriger vers
//  VerifyEmailPage plutôt que directement vers le profil.
const INITIAL_VALUES = {
    pseudo: 'AstroLouis',
    displayName: 'Louis H.',
    bio: "Passionné d'astrophotographie depuis 2019.",
    userType: 'Professionnel',
    level: 'Expert',
    email: 'astro-louis@exemple.com',
}

const EditProfilePage = () => {
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [values, setValues] = useState(INITIAL_VALUES)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()

        if (newPassword && newPassword !== confirmPassword) {
            showToast.error('Les deux nouveaux mots de passe ne correspondent pas.')
            return
        }
        if (newPassword && !currentPassword) {
            showToast.warning('Indique ton mot de passe actuel pour le changer.')
            return
        }

        setSubmitting(true)
        // TODO: remplacer par un vrai appel API (PATCH /me).
        setTimeout(() => {
            showToast.success('Profil mis à jour.')
            setSubmitting(false)
            navigate('/profile')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/profile')}>
                <ArrowLeft size={16} />
                Profil
            </button>

            <h1 className={styles.title}>Modifier le profil</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.avatarRow}>
                    <Avatar size={80} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={() => showToast.warning("Import de photo pas encore branché à un backend.")}
                    />
                    <button type="button" className={styles.changePhotoButton} onClick={() => fileInputRef.current?.click()}>
                        Changer la photo
                    </button>
                </div>

                <Input label="Pseudo *" value={values.pseudo} onChange={handleChange('pseudo')} required />
                <Input label="Nom affiché" value={values.displayName} onChange={handleChange('displayName')} />
                <TextArea label="Bio" rows={3} value={values.bio} onChange={handleChange('bio')} />

                <Select label="Statut" value={values.userType} onChange={handleChange('userType')}>
                    <option value="Amateur">Amateur</option>
                    <option value="Astrophotographe">Astrophotographe</option>
                    <option value="Professionnel">Professionnel</option>
                </Select>

                <Select label="Niveau d'expérience" value={values.level} onChange={handleChange('level')}>
                    <option value="Débutant">Débutant</option>
                    <option value="Confirmé">Confirmé</option>
                    <option value="Expert">Expert</option>
                </Select>

                <div>
                    <Input
                        label="Email *"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        required
                    />
                    <p className={styles.emailHint}>Modifier l'email nécessite une nouvelle vérification.</p>
                </div>

                <h2 className={styles.sectionTitle}>Mot de passe</h2>

                <Input
                    label="Mot de passe actuel"
                    type="password"
                    icon={Lock}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                    label="Nouveau mot de passe"
                    type="password"
                    icon={Lock}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                    label="Confirmer le nouveau mot de passe"
                    type="password"
                    icon={Lock}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
            </form>
        </div>
    )
}
export default EditProfilePage