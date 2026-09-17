import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import IconButton from "../../components/atoms/icon_button/IconButton.jsx";
import styles from "./ManageReferenceTablePage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par GET /admin/reference-tables/:slug (pré-remplissage) et
//      POST/PATCH/DELETE /admin/reference-tables/:slug/values une fois les
//      endpoints disponibles.

const TABLES = {
    'classification-astronomique': {
        name: 'Classification astronomique',
        description: "utilisées par le catalogue d'objets du planétarium.",
        values: [
            'Étoile',
            'Étoile variable',
            'Planète',
            'Planète naine',
            'Comète',
            'Astéroïde',
            'Galaxie',
            'Nébuleuse',
            'Amas ouvert',
            'Amas globulaire',
            'Étoile à neutrons',
            'Supernova',
            'Reste de supernova',
            'Satellite',
            'Autre',
        ],
    },
    'type-materiel': {
        name: 'Type de matériel',
        description: "utilisées dans Mon matériel.",
        values: ['Télescope', 'Monture', 'Caméra', 'Oculaire', 'Filtre', 'Trépied', 'Barlow / Réducteur', 'Autre'],
    },
    'motif-signalement': {
        name: 'Motif de signalement',
        description: 'utilisées lors du signalement de contenu.',
        values: ['Contenu inapproprié', 'Harcèlement', 'Spam', 'Désinformation', 'Contenu illégal', 'Autre'],
    },
}

const ManageReferenceTablePage = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const table = TABLES[slug]

    const [values, setValues] = useState(table?.values ?? [])
    const [editingIndex, setEditingIndex] = useState(null)
    const [editValue, setEditValue] = useState('')
    const [newValue, setNewValue] = useState('')

    if (!table) {
        return (
            <div className={styles.page}>
                <button type="button" className={styles.backLink} onClick={() => navigate('/admin/reference-tables')}>
                    <ArrowLeft size={16} />
                    Tables de référence
                </button>
                <p className={styles.description}>Table introuvable.</p>
            </div>
        )
    }

    const startEdit = (index) => {
        setEditingIndex(index)
        setEditValue(values[index])
    }

    const cancelEdit = () => {
        setEditingIndex(null)
        setEditValue('')
    }

    const saveEdit = () => {
        if (!editValue.trim()) return
        // TODO: remplacer par un appel API
        //       (PATCH /admin/reference-tables/:slug/values/:index).
        setValues((prev) => prev.map((v, i) => (i === editingIndex ? editValue.trim() : v)))
        showToast.success('Valeur mise à jour.')
        cancelEdit()
    }

    const handleDelete = (index) => {
        // TODO: remplacer par un appel API
        //       (DELETE /admin/reference-tables/:slug/values/:index).
        const removed = values[index]
        setValues((prev) => prev.filter((_, i) => i !== index))
        showToast.success(`"${removed}" supprimé.`)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        if (!newValue.trim()) return
        // TODO: remplacer par un appel API
        //       (POST /admin/reference-tables/:slug/values).
        setValues((prev) => [...prev, newValue.trim()])
        setNewValue('')
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/admin/reference-tables')}>
                <ArrowLeft size={16} />
                Tables de référence
            </button>

            <h1 className={styles.title}>{table.name}</h1>
            <p className={styles.description}>
                {values.length} valeurs — {table.description}
            </p>

            <div className={styles.list}>
                {values.map((value, index) => (
                    <div key={index} className={styles.row}>
                        {editingIndex === index ? (
                            <>
                                <Input
                                    className={styles.editInput}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    autoFocus
                                />
                                <div className={styles.actionsGroup}>
                                    <IconButton icon={Check} onClick={saveEdit} aria-label="Valider" />
                                    <IconButton icon={X} onClick={cancelEdit} aria-label="Annuler" />
                                </div>
                            </>
                        ) : (
                            <>
                                <span className={styles.valueText}>{value}</span>
                                <div className={styles.actionsGroup}>
                                    <IconButton icon={Pencil} onClick={() => startEdit(index)} aria-label="Modifier" />
                                    <IconButton icon={Trash2} onClick={() => handleDelete(index)} aria-label="Supprimer" />
                                </div>
                            </>
                        )}
                    </div>
                ))}

                <form className={styles.addRow} onSubmit={handleAdd}>
                    <Input
                        className={styles.addInput}
                        placeholder="Nouvelle valeur..."
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                    <IconButton icon={Plus} type="submit" aria-label="Ajouter" />
                </form>
            </div>
        </div>
    )
}
export default ManageReferenceTablePage