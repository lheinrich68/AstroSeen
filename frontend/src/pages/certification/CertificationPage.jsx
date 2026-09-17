import { useState, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import CertificationRow from "../../components/organisms/certification_row/CertificationRow.jsx";
import styles from "./CertificationPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un vrai appel API (GET /admin/users?search=...,
//      POST/DELETE /admin/users/:id/certification) une fois les endpoints
//      disponibles.

const INITIAL_USERS = [
    { id: 'u1', name: 'AstroLouis', level: 'Expert', certified: true },
    { id: 'u2', name: 'Nébuleuse42', level: 'Confirmé', certified: false },
    { id: 'u3', name: 'PlanetHunter', level: 'Expert', certified: false },
    { id: 'u4', name: 'CielProfond', level: 'Débutant', certified: false },
]

const CertificationPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([INITIAL_USERS]);
    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users
        return users.filter((u) => u.name.toLowerCase().includes(search.trim().toLowerCase()))
    }, [users, search])

    const handleToggle = (user) => {
        // TODO: remplacer par un vrai appel API (POST ou DELETE
        // /admin/users/:id/certification selon l'état actuel).
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, certified: !u.certified } : u)))
        showToast.success(
            user.certified ? `Badge retiré à ${user.name}.` : `${user.name} est maintenant certifié.`,
        )
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/admin')}>
                <ArrowLeft size={16} />
                Administration
            </button>

            <h1 className={styles.title}>Certification des astronomes</h1>

            <Input icon={Search} placeholder="Rechercher un utilisateur" value={search} onChange={(e) => setSearch(e.target.value)} />

            <div className={styles.list}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <CertificationRow key={user.id} user={user} onToggle={handleToggle} />
                    ))
                ) : (
                    <p className={styles.empty}>Aucun utilisateur trouvé.</p>
                )}
            </div>
        </div>
    )
}
export default CertificationPage;