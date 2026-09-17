import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import DeletionRequestCard from "../../components/organisms/deletion_request_card/DeletionRequestCard.jsx";
import styles from "./DeletionsPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un appel API (GET /admin/deletion-requests,
//      DELETE /admin/deletion-requests/:id pour annuler,
//      POST /admin/deletion-requests/:id/confirm pour exécuter) une fois les
//      endpoints disponibles.

const INITIAL_REQUESTS = [
    {
        id: 'd1',
        name: 'Nébuleuse42',
        email: 'nebuleuse42@exemple.com',
        receivedDate: '02/09/2026',
        scheduledDate: '02/10/2026',
        urgent: false,
    },
    {
        id: 'd2',
        name: 'PlanetHunter',
        email: 'planethunter@exemple.com',
        receivedDate: '28/08/2026',
        scheduledDate: '27/09/2026',
        urgent: true,
    },
]

const DeletionsPage = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState(INITIAL_REQUESTS);

    const handleCancel = (request) => {
        //TODO: remplacer par un appel API (DELETE /admin/deletion-requests/:id).
        setRequests((prev) => prev.filter((r) => r.id !== request.id))
        showToast.success(`Demande de suppression annulée pour ${request.name}.`)
    }

    const handleConfirm = (request) => {
        //TODO: remplacer par un appel API
        //     (POST /admin/deletion-requests/:id/confirm).
        setRequests((prev) => prev.filter((r) => r.id !== request.id))
        showToast.success(`Compte de ${request.name} supprimé.`)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/admin')}>
                <ArrowLeft size={16} />
                Administration
            </button>

            <h1 className={styles.title}>Suppressions de compte</h1>
            <p className={styles.description}>
                Demandes RGPD en attente.<br/>
                La suppression écrase les données personnelles et anonymise le contenu déjà publié.
            </p>

            <div className={styles.list}>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <DeletionRequestCard
                            key={request.id}
                            request={request}
                            onCancel={handleCancel}
                            onConfirm={handleConfirm}
                        />
                    ))
                ) : (
                    <p className={styles.empty}>Aucune demande en attente.</p>
                )}
            </div>
        </div>
    )
}
export default DeletionsPage;