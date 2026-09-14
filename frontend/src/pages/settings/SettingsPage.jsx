import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Select from "../../components/atoms/select/Select.jsx";
import Toggle from "../../components/atoms/toggle/Toggle.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import DeleteAccountModal from "../../components/organisms/modals/delete_account_modal/DeleteAccountModal.jsx";
import styles from "./SettingsPage.module.css"

//? PAS ENCORE branché à un backend => préférences en dur, chaque changement simule juste la sauvegarde.
//TODO: À remplacer par GET /me/settings et PATCH /me/settings une fois les endpoints disponibles.
const INITIAL_NOTIFICATIONS = {
    mentions: true,
    comments: true,
    sessionInvites: true,
    astroEvents: false,
}

const SettingsPage = () => {
    const navigate = useNavigate()
    const [defaultVisibility, setDefaultVisibility] = useState('session')
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
    const [exporting, setExporting] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const handleExport = () => {
        setExporting(true)
        // TODO: remplacer par un vrai appel API (GET /me/export).
        setTimeout(() => {
            showToast.success('Export en préparation. Tu recevras un email avec le lien de téléchargement.')
            setExporting(false)
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/profile')}>
                <ArrowLeft size={16} />
                Profil
            </button>

            <h1 className={styles.title}>Paramètres</h1>

            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>Confidentialité</h2>
                <Select
                    label="Visibilité par défaut des publications"
                    value={defaultVisibility}
                    onChange={(e) => setDefaultVisibility(e.target.value)}
                >
                    <option value="private">Privée</option>
                    <option value="session">Session</option>
                    <option value="public">Publique</option>
                </Select>

                <hr className={styles.divider} />

                <h2 className={styles.sectionTitle}>Notifications</h2>
                <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>Mentions (@pseudo)</span>
                    <Toggle checked={notifications.mentions} onChange={() => toggleNotification('mentions')} />
                </div>
                <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>Commentaires sur mes publications</span>
                    <Toggle checked={notifications.comments} onChange={() => toggleNotification('comments')} />
                </div>
                <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>Invitations à une session</span>
                    <Toggle checked={notifications.sessionInvites} onChange={() => toggleNotification('sessionInvites')} />
                </div>
                <div className={styles.toggleRow}>
                    <span className={styles.toggleLabel}>Événements astronomiques à venir</span>
                    <Toggle checked={notifications.astroEvents} onChange={() => toggleNotification('astroEvents')} />
                </div>

                <hr className={styles.divider} />

                <h2 className={styles.sectionTitle}>Vos données</h2>
                <p className={styles.description}>
                    Récupère une copie de tes données (profil, sessions, notes, photos) dans un format exploitable.
                </p>
                <Button variant="outline" onClick={handleExport} disabled={exporting}>
                    {exporting ? 'Préparation...' : 'Exporter mes données'}
                </Button>

                <hr className={styles.divider} />

                <h2 className={styles.sectionTitle}>Compte</h2>
                <p className={styles.description}>
                    La suppression écrase tes données personnelles et anonymise le contenu déjà publié,{' '}
                    <span className={styles.dangerText}>30 jours après la demande</span>. Pour annuler pendant ce
                    délai, contacte le support.
                </p>
                <Button variant="danger" onClick={() => setDeleteModalOpen(true)}>
                    Supprimer mon compte
                </Button>
            </div>

            {deleteModalOpen && <DeleteAccountModal onClose={() => setDeleteModalOpen(false)} />}
        </div>
    )
}
export default SettingsPage;