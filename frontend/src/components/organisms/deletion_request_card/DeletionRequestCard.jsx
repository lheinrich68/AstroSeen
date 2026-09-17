import { useState } from 'react'
import Avatar from "../../atoms/avatar/Avatar.jsx";
import Button from "../../atoms/button/Button.jsx";
import Modal from "../../molecules/modal/Modal.jsx";
import styles from "./DeletionRequestCard.module.css"

const DeletionRequestCard = ({ request, onCancel, onConfirm }) => {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.userGroup}>
                <Avatar size={34} src={request.avatarUrl} />
                <div className={styles.textCol}>
                    <span className={styles.name}>{request.name}</span>
                    <span className={styles.email}>{request.email}</span>
                </div>
            </div>

            <span className={styles.dateLine}>Demande reçue le {request.receivedDate}</span>

            <div className={styles.deadlineRow}>
                <span className={styles.dateLine}>Suppression prévue le {request.scheduledDate}</span>
                {request.urgent && <span className={styles.urgentBadge}>Suppression imminente</span>}
            </div>

            <div className={styles.buttonsRow}>
                <Button variant="muted" onClick={() => onCancel(request)}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>
                    Confirmer
                </Button>
            </div>

            {confirmModalOpen && (
                <Modal title="Confirmer la suppression ?" onClose={() => setConfirmModalOpen(false)} maxWidth={400}>
                    {({ requestClose }) => (
                        <>
                            <p className={styles.dateLine}>
                                Les données personnelles de {request.name} seront effacées immédiatement, et son contenu
                                déjà publié sera anonymisé. Cette action est irréversible.
                            </p>
                            <div className={styles.modalButtonsRow}>
                                <Button variant="muted" onClick={requestClose}>
                                    Annuler
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        onConfirm(request)
                                        requestClose()
                                    }}
                                >
                                    Confirmer la suppression
                                </Button>
                            </div>
                        </>
                    )}
                </Modal>
            )}
        </div>
    )
}
export default DeletionRequestCard