import { useState } from 'react'
import { Plus } from 'lucide-react'
import { showToast } from "../../../../utils/showToast.jsx";
import Modal from '../../../molecules/modal/Modal.jsx'
import Tabs from '../../../molecules/tabs/Tabs.jsx'
import styles from './ChooseContentModal.module.css'

//? PAS ENCORE branché à un backend => contenu de démonstration en dur.
//TODO: À remplacer par un appel API (GET /me/photos, /me/notes,
//  /me/croquis) une fois les endpoints disponibles.
const TABS = [
    { key: 'photos', label: 'Photos', typeLabel: 'Photo' },
    { key: 'notes', label: 'Notes', typeLabel: 'Note' },
    { key: 'croquis', label: 'Croquis', typeLabel: 'Croquis' },
]

const MOCK_CONTENT = {
    photos: [
        { id: 'p1', label: "M31 — Galaxie d'Andromède" },
        { id: 'p2', label: "M42 — Nébuleuse d'Orion" },
        { id: 'p3', label: 'Jupiter' },
    ],
    notes: [
        { id: 'n1', label: 'Superbe soirée sur M42' },
        { id: 'n2', label: 'Session du weekend' },
    ],
    croquis: [{ id: 'k1', label: "Croquis de Saturne à l'oculaire" }],
}

//? onSelect(content) est appelé avec { id, type, label } quand une vignette
//  est choisie -> le composant appelant (ex. CreatePostPage) ferme lui-même
//  la modale et applique la sélection.

const ChooseContentModal = ({ onSelect, onClose }) => {
    const [activeTab, setActiveTab] = useState('photos')

    const activeTabConfig = TABS.find((t) => t.key === activeTab)
    const items = MOCK_CONTENT[activeTab]

    const handleAdd = () => {
        // TODO: rediriger vers le flux d'ajout correspondant une fois ces écrans construits.
        showToast.warning("Flux d'ajout pas encore disponible.")
    }

    return (
        <Modal title="Lier un contenu" onClose={onClose} maxWidth={480}>
            {({ requestClose }) => (
                <>
                    <Tabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />

                    <p className={styles.hint}>Uniquement ce qui t'appartient.</p>

                    <div className={styles.grid}>
                        <button type="button" className={`${styles.tile} ${styles.addTile}`} onClick={handleAdd}>
                            <Plus size={18} />
                            <span>Ajouter</span>
                        </button>

                        {items.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={styles.tile}
                                onClick={() => {
                                    onSelect({ id: item.id, type: activeTabConfig.typeLabel, label: item.label })
                                    requestClose()
                                }}
                                aria-label={item.label}
                                title={item.label}
                            >
                                {item.thumbnailUrl && <img src={item.thumbnailUrl} alt="" className={styles.tileImage} />}
                                <span className={styles.tileLabel}>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </Modal>
    )
}
export default ChooseContentModal