import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import TextArea from "../../components/atoms/text_area/TextArea.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import Select from "../../components/atoms/select/Select.jsx";
import { EVENT_TYPES } from "../../utils/eventTypes.js";
import styles from "./EventFormPage.module.css"

//* PAS ENCORE branché à un backend => données d'édition en dur.
//TODO: À remplacer par GET /admin/events/:id (pré-remplissage) et
//      POST/PATCH /admin/events une fois les endpoints disponibles.

//? "Objet concerné" est un simple champ texte ici, le HiFi montre une
//  recherche dans le catalogue du Planétarium (autocomplete), pas encore
//  construite. À relier une fois le Planétarium disponible.

//? Type d'événement : options tirées de EVENT_TYPES (src/utils/eventTypes.js),
//  la même palette de catégories utilisée pour colorer les points du
//  calendrier -> garder les deux synchronisés plutôt que dupliquer la liste.
const MOCK_EVENTS = {
    ev1: {
        name: 'Éclipse partielle de Lune',
        description: '',
        startDate: '2026-09-18',
        endDate: '',
        type: 'lunar',
        importance: 'Majeur',
        object: 'Lune',
    },
    ev2: {
        name: 'Pluie des Perséides',
        description: '',
        startDate: '2026-08-12',
        endDate: '',
        type: 'meteor_shower',
        importance: 'Majeur',
        object: '',
    },
    ev3: {
        name: 'Opposition de Jupiter',
        description: '',
        startDate: '2026-11-03',
        endDate: '',
        type: 'planetary',
        importance: 'Mineur',
        object: 'Jupiter',
    },
}

const EMPTY_VALUES = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    type: '',
    importance: '',
    object: '',
}

const EventFormPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [values, setValues] = useState(() => (isEditing ? MOCK_EVENTS[id] ?? EMPTY_VALUES : EMPTY_VALUES))
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!values.name.trim() || !values.startDate || !values.type || !values.importance) {
            showToast.error('Renseignez au moins le titre, la date de début, le type et le niveau d\'importance.')
            return
        }

        setSubmitting(true)
        // TODO: remplacer par un appel API (POST /admin/events ou
        //       PATCH /admin/events/:id selon isEditing).
        setTimeout(() => {
            showToast.success(isEditing ? 'Événement mis à jour.' : 'Événement créé.')
            setSubmitting(false)
            navigate('/admin/events')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button
                type="button"
                className={styles.backLink}
                onClick={() => navigate('/admin/events')}
            >
                <ArrowLeft size={16} />
                Événements
            </button>

            <h1 className={styles.title}>{isEditing ? "Modifier l'événement" : 'Créer un événement'}</h1>
            <p className={styles.legend}>* Champ obligatoire</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Titre *"
                    placeholder="Ex. Éclipse partielle de Lune"
                    value={values.name}
                    onChange={handleChange('name')}
                    required
                />

                <TextArea
                    label="Description"
                    rows={3}
                    placeholder="Contexte, conseils d'observation..."
                    value={values.description}
                    onChange={handleChange('description')}
                />

                <div className={styles.datesRow}>
                    <Input
                        label="Date de début *"
                        type="date"
                        value={values.startDate}
                        onChange={handleChange('startDate')}
                        required
                    />
                    <Input label="Date de fin" type="date" value={values.endDate} onChange={handleChange('endDate')} />
                </div>

                <Select
                    label="Type d'événement *"
                    placeholder="Choisissez une catégorie"
                    value={values.type}
                    onChange={handleChange('type')}
                    required
                >
                    {Object.entries(EVENT_TYPES).map(([key, { label }]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </Select>

                <Select
                    label="Niveau d'importance *"
                    placeholder="Faible / Modéré / Élevé"
                    value={values.importance}
                    onChange={handleChange('importance')}
                    required
                >
                    <option value="high">Élevé</option>
                    <option value="medium">Modéré</option>
                    <option value="low">Faible</option>
                </Select>

                <Input
                    label="Objet concerné"
                    placeholder="Rechercher un objet du catalogue"
                    value={values.object}
                    onChange={handleChange('object')}
                />

                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Enregistrement...' : "Créer l'événement"}
                </Button>
            </form>
        </div>
    )
}
export default EventFormPage