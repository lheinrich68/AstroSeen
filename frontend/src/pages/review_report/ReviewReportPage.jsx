import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Ban } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import RadioButton from "../../components/atoms/radio_button/RadioButton.jsx";
import Select from "../../components/atoms/select/Select.jsx";
import TextArea from "../../components/atoms/text_area/TextArea.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import Modal from "../../components/molecules/modal/Modal.jsx";
import styles from "./ReviewReportPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur,
//  identiques quel que soit :id.
//TODO: À remplacer par GET /moderation/reports/:id (détail réel) et POST
//      /moderation/reports/:id/resolve (action) une fois les endpoints disponibles.
const MOCK_CONTENT = {
    authorName: 'Nébuleuse42',
    imageUrl: undefined,
    meta: 'Photo de Jupiter, publiée il y a 2h — visibilité publique',
}

const MOCK_REPORTS = [
    { author: 'PlanetHunter', timeAgo: '2h', reason: 'Spam', detail: null },
    {
        author: 'GalaxyGirl',
        timeAgo: '1h',
        reason: 'Harcèlement',
        detail: 'Ne respecte pas les règles de la communauté.',
    },
    { author: 'CielProfond', timeAgo: '45 min', reason: 'Contenu inapproprié', detail: null },
]

const ACTIONS = [
    { value: 'reject', label: 'Rejeter les signalements (contenu correct)' },
    { value: 'restrict', label: 'Restreindre (visible staff + auteur)' },
    { value: 'request-edit', label: 'Demander une modification' },
    { value: 'approve', label: 'Valider et republier' },
    { value: 'delete', label: 'Supprimer' },
]

const ReviewReportPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [action, setAction] = useState('')
    const [structuredReason, setStructuredReason] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [banModalOpen, setBanModalOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!action) {
            showToast.warning('Choisissez une action de modération.')
            return
        }

        setSubmitting(true)
        // TODO: remplacer par un vrai appel API
        // (POST /moderation/reports/:id/resolve, avec { action, structuredReason, message }).
        setTimeout(() => {
            showToast.success('Action de modération enregistrée.')
            setSubmitting(false)
            navigate('/moderation')
        }, 600)
    }

    const handleBan = (requestClose) => {
        // TODO: remplacer par un vrai appel API (POST /moderation/users/:id/ban).
        showToast.success(`${MOCK_CONTENT.authorName} a été banni.`)
        requestClose()
        navigate('/moderation')
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/moderation')}>
                <ArrowLeft size={16} />
                Retour à la file
            </button>

            <h1 className={styles.title}>Examiner le contenu</h1>

            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <div className={styles.authorRow}>
                        <Avatar size={28} />
                        <span className={styles.authorName}>{MOCK_CONTENT.authorName}</span>
                    </div>
                    {MOCK_CONTENT.imageUrl && <img src={MOCK_CONTENT.imageUrl} alt="" className={styles.contentImage} />}
                    {!MOCK_CONTENT.imageUrl && <div className={styles.contentImage} />}
                    <p className={styles.contentMeta}>{MOCK_CONTENT.meta}</p>
                </div>

                <div>
                    <h2 className={styles.sectionTitle}>Signalements ({MOCK_REPORTS.length})</h2>
                    <div className={styles.reportsList}>
                        {MOCK_REPORTS.map((report, i) => (
                            <div key={i} className={styles.reportRow}>
                                <div className={styles.reportHead}>
                  <span className={styles.reportAuthor}>
                    {report.author} · {report.timeAgo}
                  </span>
                                    <span className={styles.reportChip}>{report.reason}</span>
                                </div>
                                {report.detail && <p className={styles.reportDetail}>{report.detail}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <h2 className={styles.sectionTitle}>Action de modération</h2>
                        <div className={styles.actionsList}>
                            {ACTIONS.map((opt) => (
                                <RadioButton
                                    key={opt.value}
                                    className={styles.radioRow}
                                    name="moderation-action"
                                    label={opt.label}
                                    checked={action === opt.value}
                                    onChange={() => setAction(opt.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <Select
                        label="Motif (optionnel)"
                        placeholder="Choisissez un motif structuré"
                        value={structuredReason}
                        onChange={(e) => setStructuredReason(e.target.value)}
                    >
                        <option value="spam">Spam</option>
                        <option value="harassment">Harcèlement</option>
                        <option value="inappropriate">Contenu inapproprié</option>
                        <option value="misinformation">Désinformation</option>
                        <option value="illegal">Contenu illégal</option>
                        <option value="other">Autre</option>
                    </Select>

                    <TextArea
                        label="Message pour l'auteur"
                        rows={3}
                        placeholder="Expliquez la décision prise..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button type="submit" disabled={submitting}>
                        {submitting ? 'Envoi...' : "Confirmer l'action"}
                    </Button>

                    <button type="button" className={styles.banRow} onClick={() => setBanModalOpen(true)}>
                        <Ban size={15} />
                        Bannir l'utilisateur
                    </button>
                </form>
            </div>

            {banModalOpen && (
                <Modal title="Bannir cet utilisateur ?" onClose={() => setBanModalOpen(false)} maxWidth={420}>
                    {({ requestClose }) => (
                        <>
                            <p className={styles.contentMeta}>
                                {MOCK_CONTENT.authorName} ne pourra plus se connecter ni publier de contenu. Cette action
                                est réversible depuis par un administrateur.
                            </p>
                            <div className={styles.banButtonsRow}>
                                <Button variant="muted" onClick={requestClose}>
                                    Annuler
                                </Button>
                                <Button variant="danger" onClick={() => handleBan(requestClose)}>
                                    Bannir
                                </Button>
                            </div>
                        </>
                    )}
                </Modal>
            )}
        </div>
    )
}
export default ReviewReportPage;