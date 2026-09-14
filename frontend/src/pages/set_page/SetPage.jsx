import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Telescope, Camera } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import Checkbox from "../../components/atoms/checkbox/Checkbox.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import FilterChip from "../../components/molecules/filter_chip/FilterChip.jsx";
import styles from "./SetPage.module.css"

//* PAS ENCORE branché à un backend => inventaire et données d'édition en dur.
//TODO: À remplacer par GET /me/equipment (liste réelle), GET /me/equipment-sets/:id
//      (pré-remplissage édition) et POST/PATCH /me/equipment-sets une fois les
//      endpoints disponibles.

const MOCK_EQUIPMENT = [
    { id: 'e1', name: 'Dobson 200/1200', type: 'Télescope' },
    { id: 'e2', name: 'EQ5 Pro', type: 'Monture' },
    { id: 'e3', name: 'ASI294MC Pro', type: 'Caméra' },
    { id: 'e4', name: '82° 14mm', type: 'Oculaire' },
]

const MOCK_SETS = {
    s1: { name: 'Setup astrophoto complet', category: 'Astrophoto', equipmentIds: ['e1', 'e2', 'e3'] },
    s2: { name: 'Setup visuel léger', category: 'Classique', equipmentIds: ['e1', 'e4'] },
}

const CATEGORIES = [
    { value: 'Classique', icon: Telescope },
    { value: 'Astrophoto', icon: Camera },
]

const FILTERS = ['Tous', 'Télescope', 'Monture', 'Caméra', 'Oculaire']

const SetPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)
    const existing = isEditing ? MOCK_SETS[id] : null

    const [name, setName] = useState(existing?.name ?? '')
    const [category, setCategory] = useState(existing?.category ?? '')
    const [selectedIds, setSelectedIds] = useState(new Set(existing?.equipmentIds ?? []))
    const [activeFilter, setActiveFilter] = useState('Tous')
    const [submitting, setSubmitting] = useState(false)

    const filteredEquipment = useMemo(() => {
        if (activeFilter === 'Tous') return MOCK_EQUIPMENT
        return MOCK_EQUIPMENT.filter((item) => item.type === activeFilter)
    }, [activeFilter])

    const toggleEquipment = (equipmentId) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(equipmentId)) next.delete(equipmentId)
            else next.add(equipmentId)
            return next
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim() || !category || selectedIds.size === 0) {
            showToast.error('Renseignez un nom, une catégorie et au moins un matériel.')
            return
        }

        setSubmitting(true)
        // TODO: remplacer par un vrai appel API (POST /me/equipment-sets ou
        //       PATCH /me/equipment-sets/:id selon isEditing).
        setTimeout(() => {
            showToast.success(isEditing ? 'Ensemble mis à jour.' : 'Ensemble créé.')
            setSubmitting(false)
            navigate('/my-equipment')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/my-equipment')}>
                <ArrowLeft size={16} />
                Mon matériel
            </button>

            <h1 className={styles.title}>{isEditing ? "Modifier l'ensemble" : 'Créer un ensemble'}</h1>
            <p className={styles.legend}>* Champ obligatoire</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Nom *"
                    placeholder="Exemple: Setup astrophoto complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Catégorie *</span>
                    <div className={styles.categoryRow}>
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.value}
                                    type="button"
                                    className={`${styles.categoryCard} ${category === cat.value ? styles.categoryCardSelected : ''}`}
                                    onClick={() => setCategory(cat.value)}
                                >
                                    <Icon size={20} />
                                    {cat.value}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Matériel inclus *</span>

                    <div className={styles.filterRow}>
                        {FILTERS.map((filter) => (
                            <FilterChip
                                key={filter}
                                label={filter}
                                selected={activeFilter === filter}
                                onClick={() => setActiveFilter(filter)}
                            />
                        ))}
                    </div>

                    <div className={styles.checklist}>
                        {filteredEquipment.map((item) => (
                            <Checkbox
                                key={item.id}
                                className={styles.checkRow}
                                label={`${item.name} (${item.type})`}
                                checked={selectedIds.has(item.id)}
                                onChange={() => toggleEquipment(item.id)}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        className={styles.addEquipmentLink}
                        onClick={() => navigate('/my-equipment/new')}
                    >
                        + Ajouter un nouveau matériel
                    </button>
                </div>

                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Enregistrement...' : isEditing ? "Enregistrer l'ensemble" : "Créer l'ensemble"}
                </Button>
            </form>
        </div>
    )
}
export default SetPage