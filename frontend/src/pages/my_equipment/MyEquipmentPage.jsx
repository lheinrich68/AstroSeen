import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import Tabs from "../../components/molecules/tabs/Tabs.jsx";
import FilterChip from "../../components/molecules/filter_chip/FilterChip.jsx";
import EquipmentCard from "../../components/organisms/equipment_card/EquipmentCard.jsx";
import SetCard from "../../components/organisms/set_card/SetCard.jsx";
import styles from "./MyEquipmentPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un appel API (GET /me/equipment, GET /me/equipment-sets,
//  DELETE /me/equipment/:id) une fois les endpoints disponibles.

const INITIAL_EQUIPMENT = [
    { id: 'e1', name: 'Skywatcher Dobson 200/1200', type: 'Télescope', description: null },
    { id: 'e2', name: 'Skywatcher EQ5 Pro', type: 'Monture', description: 'Motorisée, autoguidage possible' },
    { id: 'e3', name: 'ZWO ASI294MC Pro', type: 'Caméra', description: 'Couleur, refroidie' },
    { id: 'e4', name: 'Explore Scientific 82° 14mm', type: 'Oculaire', description: null },
]

const INITIAL_SETS = [
    {
        id: 's1',
        name: 'Setup astrophoto complet',
        category: 'Astrophoto',
        equipmentNames: ['Dobson 200/1200', 'EQ5 Pro', 'ASI294MC Pro'],
    },
    {
        id: 's2',
        name: 'Setup visuel léger',
        category: 'Classique',
        equipmentNames: ['Dobson 200/1200', '82° 14mm'],
    },
]

const TABS = [
    { key: 'equipment', label: 'Matériel' },
    { key: 'sets', label: 'Ensembles' },
]

const FILTERS = ['Tous', 'Télescope', 'Monture', 'Caméra', 'Oculaire']

const MyEquipmentPage = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('equipment')
    const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT)
    const [sets, setSets] = useState(INITIAL_SETS)
    const [activeFilter, setActiveFilter] = useState('Tous')

    const filteredEquipment = useMemo(() => {
        if (activeFilter === 'Tous') return equipment
        return equipment.filter((item) => item.type === activeFilter)
    }, [equipment, activeFilter])

    const handleEdit = (item) => {
        navigate(`/my-equipment/${item.id}/edit`)
    }

    const handleDelete = (item) => {
        // TODO: remplacer par un appel API (DELETE /me/equipment/:id).
        setEquipment((prev) => prev.filter((e) => e.id !== item.id))
        showToast.success(`"${item.name}" supprimé.`)
    }

    const handleAdd = () => {
        navigate('/my-equipment/new')
    }

    const handleEditSet = (set) => {
        navigate(`/my-equipment/sets/${set.id}/edit`)
    }

    const handleDeleteSet = (set) => {
        // TODO: remplacer par un appel API (DELETE /me/equipment-sets/:id).
        setSets((prev) => prev.filter((s) => s.id !== set.id))
        showToast.success(`"${set.name}" supprimé.`)
    }

    const handleCreateSet = () => {
        navigate('/my-equipment/sets/new')
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/profile')}>
                <ArrowLeft size={16} />
                Profil
            </button>

            <h1 className={styles.title}>Mon matériel</h1>

            <div className={styles.toolbar}>
                <Tabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />

                <div key={activeTab} className={styles.toolbarTabContent}>
                    {activeTab === 'equipment' && (
                        <>
                            <Button variant="outline" className={styles.addButton} onClick={handleAdd}>
                                <Plus size={15} />
                                Ajouter un matériel
                            </Button>

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
                        </>
                    )}

                    {activeTab === 'sets' && (
                        <Button variant="outline" className={styles.addButton} onClick={handleCreateSet}>
                            <Plus size={15} />
                            Créer un ensemble
                        </Button>
                    )}
                </div>
            </div>

            {activeTab === 'equipment' ? (
                <div key={activeTab} className={styles.list}>
                    {filteredEquipment.length > 0 ? (
                        filteredEquipment.map((item) => (
                            <EquipmentCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p className={styles.empty}>Aucun matériel présent dans cette catégorie. 😕</p>
                    )}
                </div>
            ) : (
                <div key={activeTab} className={styles.list}>
                    {sets.length > 0 ? (
                        sets.map((set) => (
                            <SetCard key={set.id} set={set} onEdit={handleEditSet} onDelete={handleDeleteSet} />
                        ))
                    ) : (
                        <p className={styles.empty}>Aucun ensemble créé pour l'instant. 😢</p>
                    )}
                </div>
            )}
        </div>
    )
}
export default MyEquipmentPage