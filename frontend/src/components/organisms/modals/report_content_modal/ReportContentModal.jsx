import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../molecules/modal/Modal.jsx";
import RadioButton from "../../../atoms/radio_button/RadioButton.jsx";
import TextArea from "../../../atoms/text_area/TextArea.jsx";
import Button from "../../../atoms/button/Button.jsx";
import styles from "./ReportContentModal.module.css"

const REASONS = [
    'Contenu inapproprié',
    'Harcèlement',
    'Spam',
    'Désinformation/Complotisme',
    'Contenu illégal',
    'Autre',
]

//* PAS ENCORE branché à un backend => l'envoi simule juste la soumission (toast + fermeture).
//TODO: À remplacer par un appel API (POST /reports, avec contentId, reason, precision)
//  une fois l'endpoint disponible.

const ReportContentModal = ({ onClose }) => {
    const [reason, setReason] = useState(REASONS[0]);
    const [precision, setPrecision] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (requestClose) => {
        setSubmitting(true);
        // TODO: remplacer par un appel API (POST /reports).

        setTimeout(() => {
            toast.success('Votre signalement à été envoyé à l\'équipe de modération.')
            setSubmitting(false);
            requestClose();
            }, 500
        )
    }

    return (
        <Modal title="Signaler ce contenu" onClose={onClose} maxWidth={420}>
            {({ requestClose }) => (
                <>
                    <p className={styles.question}>Quel est le motif du signalement ?</p>

                    <div className={styles.reasonsList}>
                        {REASONS.map((r) => (
                            <RadioButton
                                key={r}
                                className={styles.reasonRow}
                                name="report-reason"
                                label={r}
                                checked={reason === r}
                                onChange={() => setReason(r)}
                            />
                        ))}
                    </div>

                    <label className={styles.fieldLabel} htmlFor="report-precision">
                        Précision (optionnel)
                    </label>
                    <TextArea
                        id="report-precision"
                        rows={3}
                        placeholder="Ajoutez des détails si besoin..."
                        value={precision}
                        onChange={(e) => setPrecision(e.target.value)}
                    />

                    <div className={styles.buttonsRow}>
                        <Button variant="muted" onClick={requestClose}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={() => handleSubmit(requestClose)} disabled={submitting}>
                            {submitting ? 'Envoi...' : 'Envoyer'}
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    )
}
export default ReportContentModal;