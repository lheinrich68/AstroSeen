import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import styles from "./InviteParicipantPage.module.css"

//* PAS ENCORE branché à un backend => annuaire d'utilisateurs en dur pour la recherche.
//TODO: À remplacer par GET /users?search=... une fois l'endpoint disponible.

//? C'est ici que la session est réellement créée (POST /sessions, avec
//  sessionDetails reçu de CreateSessionPage + la liste des participants).
//TODO: à brancher une fois le backend prêt.
//? Sans sessionDetails (accès direct à cette page), on retombe
//  silencieusement sur des valeurs vides plutôt que de planter.

const MOCK_USERS = [
    { id: 'u1', name: 'Nébuleuse42' },
    { id: 'u2', name: 'PlanetHunter' },
    { id: 'u3', name: 'CielProfond' },
    { id: 'u4', name: 'GalaxyGirl' },
    { id: 'u5', name: 'AstroLouis' },
]

const InviteParticipantPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const sessionDetails = location.state?.sessionDetails ?? {}

    const [search, setSearch] = useState('')
    const [selectedIds, setSelectedIds] = useState(['u1', 'u2']) // pré-rempli comme dans le HiFi
    const [submitting, setSubmitting] = useState(false)

    const selectedUsers = useMemo(
        () => MOCK_USERS.filter((u) => selectedIds.includes(u.id)),
        [selectedIds],
    )

    const results = useMemo(() => {
        return MOCK_USERS.filter(
            (u) => !selectedIds.includes(u.id) && u.name.toLowerCase().includes(search.trim().toLowerCase()),
        )
    }, [selectedIds, search])

    const handleAdd = (userId) => setSelectedIds((prev) => [...prev, userId])
    const handleRemove = (userId) => setSelectedIds((prev) => prev.filter((id) => id !== userId))

    const handleSubmit = () => {
        setSubmitting(true)
        // TODO: remplacer par un vrai appel API (POST /sessions, avec
        // { ...sessionDetails, participantIds: selectedIds }).
        setTimeout(() => {
            showToast.success('Session créée.')
            setSubmitting(false)
            navigate('/sessions')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/sessions/new-session')}>
                <ArrowLeft size={16} />
                Retour
            </button>

            <h1 className={styles.title}>Inviter des participants</h1>

            <Input icon={Search} placeholder="Rechercher un utilisateur" value={search} onChange={(e) => setSearch(e.target.value)} />

            {selectedUsers.length > 0 && (
                <div className={styles.selectedRow}>
                    {selectedUsers.map((user) => (
                        <span key={user.id} className={styles.chip}>
                            <Avatar size={20} />
                            {user.name}
                            <button
                                type="button"
                                className={styles.chipRemove}
                                onClick={() => handleRemove(user.id)}
                                aria-label={`Retirer ${user.name}`}
                            >
                                <X size={13} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <h2 className={styles.sectionTitle}>Résultats</h2>

            <div className={styles.resultsList}>
                {results.length > 0 ? (
                    results.map((user) => (
                        <div key={user.id} className={styles.resultRow}>
                            <div className={styles.resultUser}>
                                <Avatar size={28} />
                                <span className={styles.resultName}>{user.name}</span>
                            </div>
                            <button type="button" className={styles.addButton} onClick={() => handleAdd(user.id)}>
                                + Ajouter
                            </button>
                        </div>
                    ))
                ) : (
                    <p className={styles.empty}>Aucun résultat.</p>
                )}
            </div>

            <div className={styles.submitButtonRow}>
                <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Envoi en cours...' : 'Envoyer les invitations'}
                </Button>
            </div>
        </div>
    )
}
export default InviteParticipantPage;