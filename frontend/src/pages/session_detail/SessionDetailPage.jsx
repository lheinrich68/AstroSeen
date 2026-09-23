import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    XCircle,
    Pencil,
    CheckCircle2,
    Star,
    Mail,
    Maximize2,
    History,
    UserPlus,
    Trash2,
} from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Badge from "../../components/atoms/badge/Badge.jsx";
import Modal from "../../components/molecules/modal/Modal.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import ParticipantRow from "../../components/organisms/participant_row/ParticipantRow.jsx";
import ActivityLogItem from "../../components/organisms/activity_log_item/ActivityLogItem.jsx";
import styles from "./SessionDetailPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur,
//  identiques quel que soit :id.
//TODO: À remplacer par GET /sessions/:id une fois l'endpoint disponible.
const MOCK_SESSION = {
    name: 'Observation entre amis',
    status: 'En cours',
    description: 'Sortie décontractée pour observer les étoiles filantes, ouverte aux débutants.',
    date: '30/08/2026 · 21h00',
    place: 'Plateau de Valensole',
    type: 'Loisir',
    visibility: 'Sur invitation',
}

const INITIAL_PARTICIPANTS = [
    { id: 'p1', name: 'AstroLouis', isMe: true, isHost: true, status: 'Confirmée' },
    { id: 'p2', name: 'Nébuleuse42', isMe: false, isHost: false, status: 'Confirmée' },
    { id: 'p3', name: 'PlanetHunter', isMe: false, isHost: false, status: 'Invitée' },
]

const NOTES = [
    { id: 'n1', author: 'AstroLouis', title: 'Superbe soirée sur M42', excerpt: 'Seeing correct (7/10), transparence excellente...' },
    { id: 'n2', author: 'Nébuleuse42', title: "Passage de l'ISS", excerpt: 'Bien visible vers 22h15, trajectoire nord-est...' },
]

const PHOTOS = [{ id: 'ph1' }, { id: 'ph2' }, { id: 'ph3' }, { id: 'ph4' }]

const ACTIVITY_LOG = [
    { icon: Star, text: 'AstroLouis a créé la session', time: 'Il y a 2j' },
    { icon: UserPlus, text: 'AstroLouis a invité PlanetHunter', time: 'Il y a 2j' },
    { icon: Pencil, text: 'Nébuleuse42 a modifié une note', time: 'Il y a 5h' },
    { icon: Trash2, text: 'CielProfond a supprimé une photo', time: 'Il y a 3h' },
]


const SessionDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS)
    const [status, setStatus] = useState(MOCK_SESSION.status)
    const [cancelModalOpen, setCancelModalOpen] = useState(false)
    const [finishModalOpen, setFinishModalOpen] = useState(false)

    const handleRemoveParticipant = (participant) => {
        // TODO: remplacer par un vrai appel API (DELETE /sessions/:id/participants/:userId).
        setParticipants((prev) => prev.filter((p) => p.id !== participant.id))
        showToast.success(`${participant.name} retiré de la session.`)
    }

    const handleEdit = () => {
        // TODO: rediriger vers un flux d'édition une fois construit (réutiliser
        // CreateSessionPage pré-rempli, par exemple).
        showToast.info('Modification pas encore disponible.')
    }

    const handleCancelSession = (requestClose) => {
        // TODO: remplacer par un vrai appel API (DELETE /sessions/:id).
        showToast.success('Session annulée.')
        requestClose()
        navigate('/sessions')
    }

    const handleFinishSession = (requestClose) => {
        // TODO: remplacer par un vrai appel API (PATCH /sessions/:id, status: terminée).
        setStatus('Terminée')
        showToast.success('Session marquée comme terminée.')
        requestClose()
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/sessions')}>
                <ArrowLeft size={16} />
                Mes sessions
            </button>

            <div className={styles.titleRow}>
                <h1 className={styles.title}>{MOCK_SESSION.name}</h1>
                <Badge variant={status === 'En cours' ? 'signal' : status === 'Terminée' ? 'neutral' : 'starlight'}>
                    {status}
                </Badge>
            </div>

            <div className={styles.actionsRow}>
                <button
                    type="button"
                    className={`${styles.actionButton} ${styles.actionDanger}`}
                    onClick={() => setCancelModalOpen(true)}
                >
                    <XCircle size={14} />
                    Annuler
                </button>
                <button type="button" className={styles.actionButton} onClick={handleEdit}>
                    <Pencil size={14} />
                    Modifier
                </button>
                <button type="button" className={styles.actionButton} onClick={() => setFinishModalOpen(true)}>
                    <CheckCircle2 size={14} />
                    Terminer
                </button>
            </div>

            <div className={styles.contentGrid}>
                <p className={`${styles.description} ${styles.descriptionArea}`}>{MOCK_SESSION.description}</p>

                <div className={`${styles.infoCard} ${styles.infoArea}`}>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Date</span>
                        <span className={styles.infoValue}>{MOCK_SESSION.date}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Lieu</span>
                        <span className={styles.infoValue}>{MOCK_SESSION.place}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Type</span>
                        <span className={styles.infoChip}>
                            <Star size={11} />
                            {MOCK_SESSION.type}
                        </span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Visibilité</span>
                        <span className={styles.infoChip}>
                            <Mail size={11} />
                            {MOCK_SESSION.visibility}
                        </span>
                    </div>
                </div>

                <div className={styles.participantsArea}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTitle}>Participants ({participants.length})</span>
                        <button
                            type="button"
                            className={styles.sectionAction}
                            onClick={() => navigate('/sessions/new-session/invite')}
                        >
                            + Inviter
                        </button>
                    </div>
                    <div className={styles.participantsList}>
                        {participants.map((participant) => (
                            <ParticipantRow key={participant.id} participant={participant} onRemove={handleRemoveParticipant} />
                        ))}
                    </div>
                </div>

                <div className={styles.notesArea}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTitle}>Notes ({NOTES.length})</span>
                        <button type="button" className={styles.sectionAction} onClick={() => showToast.warning('Pas encore disponible.')}>
                            + Ajouter
                        </button>
                    </div>
                    {NOTES.map((note) => (
                        <div key={note.id} className={styles.noteCard} onClick={() => showToast.warning('Détail de note pas encore disponible.')}>
                            <div className={styles.noteHeadRow}>
                                <div className={styles.noteAuthorGroup}>
                                    <span className={styles.noteAuthorName}>{note.author}</span>
                                </div>
                            </div>
                            <p className={styles.noteTitle}>{note.title}</p>
                            <p className={styles.noteExcerpt}>{note.excerpt}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.photosArea}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTitle}>Photos ({PHOTOS.length})</span>
                        <button type="button" className={styles.sectionAction} onClick={() => showToast.warning('Pas encore disponible.')}>
                            + Ajouter
                        </button>
                    </div>
                    <div className={styles.photosGrid}>
                        {PHOTOS.map((photo) => (
                            <button
                                key={photo.id}
                                type="button"
                                className={styles.photoTile}
                                onClick={() => showToast.warning('Visionneuse pas encore disponible.')}
                            >
                                <Maximize2 size={14} className={styles.photoExpandIcon} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.activityArea}>
                    <div className={styles.sectionHeader}>
            <span className={styles.activityIconRow}>
              <History size={16} className={styles.sectionTitleIcon} />
              <span className={styles.sectionTitle}>Journal d'activité</span>
            </span>
                    </div>
                    <div className={styles.activityLog}>
                        {ACTIVITY_LOG.map((entry, i) => (
                            <ActivityLogItem key={i} icon={entry.icon} text={entry.text} time={entry.time} />
                        ))}
                    </div>
                </div>
            </div>

            {cancelModalOpen && (
                <Modal title="Annuler la session ?" onClose={() => setCancelModalOpen(false)} maxWidth={400}>
                    {({ requestClose }) => (
                        <>
                            <p className={styles.description}>
                                Tous les participants seront notifiés de l'annulation.<br/>Cette action est irréversible.
                            </p>
                            <div className={styles.modalButtonsRow}>
                                <Button variant="muted" onClick={requestClose}>
                                    Retour
                                </Button>
                                <Button variant="danger" onClick={() => handleCancelSession(requestClose)}>
                                    Annuler la session
                                </Button>
                            </div>
                        </>
                    )}
                </Modal>
            )}

            {finishModalOpen && (
                <Modal title="Terminer la session ?" onClose={() => setFinishModalOpen(false)} maxWidth={400}>
                    {({ requestClose }) => (
                        <>
                            <p className={styles.description}>
                                La session passera en statut "Terminée".<br/>Les participants pourront toujours consulter les
                                notes et photos partagées.
                            </p>
                            <div className={styles.modalButtonsRow}>
                                <Button variant="muted" onClick={requestClose}>
                                    Retour
                                </Button>
                                <Button onClick={() => handleFinishSession(requestClose)}>Terminer la session</Button>
                            </div>
                        </>
                    )}
                </Modal>
            )}
        </div>
    )
}
export default SessionDetailPage