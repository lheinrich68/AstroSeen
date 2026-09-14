import { useState } from 'react'
import { useNavigate} from "react-router-dom";
import { showToast } from "../../../../utils/showToast.jsx";
import Modal from "../../../molecules/modal/Modal.jsx";
import Button from "../../../atoms/button/Button.jsx";
import styles from "./DeleteAccountModal.module.css"

//? PAS ENCORE branché à un backend -> la confirmation simule juste l'envoi
//  de la demande (toast + déconnexion).
//TODO: À remplacer par un appel API (POST /me/delete-request) une fois l'endpoint disponible.

export const DeleteAccountModal = ({ onClose }) => {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)

    const handleConfirm = (requestClose) => {
        setSubmitting(true)
        // TODO: remplacer par un vrai appel API (POST /me/delete-request).
        setTimeout(() => {
            showToast.success('Demande de suppression enregistrée.')
            setSubmitting(false)
            requestClose()
            navigate('/login')
        }, 600)
    }

    return (
        <Modal title="Supprimer le compte ?" onClose={onClose} maxWidth={420}>
            {({ requestClose }) => (
                <>
                    <p className={styles.warningText}>
                        Cette action déclenche un délai de <strong>30 jours</strong> avant suppression définitive.
                        Tes données personnelles seront alors effacées, et le contenu déjà publié sera anonymisé
                        plutôt que supprimé. Tu peux annuler la demande pendant ce délai en contactant le support.
                    </p>

                    <div className={styles.buttonsRow}>
                        <Button variant="muted" onClick={requestClose}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={() => handleConfirm(requestClose)} disabled={submitting}>
                            {submitting ? 'Envoi...' : 'Supprimer mon compte'}
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    )
}
export default DeleteAccountModal