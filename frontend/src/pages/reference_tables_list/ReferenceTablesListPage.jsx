import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import Input from "../../components/atoms/input/Input.jsx";
import styles from "./ReferenceTablesListPage.module.css"

//* PAS ENCORE branché à un backend — données de démonstration en dur.
//TODO: À remplacer par un appel API (GET /admin/reference-tables) une fois
//      l'endpoint disponible.

const TABLES = [
    { slug: 'classification-astronomique', name: 'Classification astronomique', count: 15 },
    { slug: 'type-materiel', name: 'Type de matériel', count: 8 },
    { slug: 'motif-signalement', name: 'Motif de signalement', count: 6 },
]

const ReferenceTablesListPage = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const filteredTables = useMemo(() => {
        if (!search.trim()) return TABLES
        return TABLES.filter((t) => t.name.toLowerCase().includes(search.trim().toLowerCase()))
    }, [search])

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/admin')}>
                <ArrowLeft size={16} />
                Administration
            </button>

            <h1 className={styles.title}>Tables de référence</h1>

            <Input
                icon={Search}
                placeholder="Rechercher une table"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.list}>
                {filteredTables.length > 0 ? (
                    filteredTables.map((table) => (
                        <button
                            key={table.slug}
                            type="button"
                            className={styles.row}
                            onClick={() => navigate(`/admin/reference-tables/${table.slug}`)}
                        >
                            <div className={styles.textCol}>
                                <span className={styles.name}>{table.name}</span>
                                <span className={styles.count}>{table.count} valeurs</span>
                            </div>
                            <ChevronRight size={18} className={styles.chevron} />
                        </button>
                    ))
                ) : (
                    <p className={styles.empty}>Aucune table trouvée.</p>
                )}
            </div>
        </div>
    )
}
export default ReferenceTablesListPage