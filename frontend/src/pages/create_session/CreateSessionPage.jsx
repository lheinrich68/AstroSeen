import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Globe, Lock, Mail } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import TextArea from "../../components/atoms/text_area/TextArea.jsx";
import Select from "../../components/atoms/select/Select.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import styles from "./CreateSessionPage.module.css"

//* PAS ENCORE branché à un backend ! => Lieux enregistrés en dur pour le select
//TODO: à remplacer par GET /me/places une fois branché).
//? "Suivant" transmet les
//  détails saisis à la page "Inviter des participants" via l'état de
//  navigation, sans encore rien créer côté serveur. La session ne sera
//  réellement créée qu'à la toute fin du flux (POST /sessions).
const MOCK_PLACES = [
    { id: 'p1', name: 'Plateau de Valensole' },
    { id: 'p2', name: 'Col du Galibier' },
    { id: 'p3', name: 'Jardin (domicile)' },
]

const VISIBILITY_OPTIONS = [
    { value: 'public', label: 'Publique', icon: Globe },
    { value: 'private', label: 'Privée', icon: Lock },
    { value: 'invite', label: 'Invitation', icon: Mail },
]

const EMPTY_VALUES = {
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    placeId: '',
    type: '',
    visibility: '',
}

const CreateSessionPage = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(EMPTY_VALUES);

    const handleChange = (field) => (e) => setValue((v) => ({ ...v, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.title.trim() || !values.startDate || !values.visibility) {
            showToast.warning('Renseignez au moins un titre, une date de début de session ainsi que sa visibilité.')
            return
        }
        navigate(`/sessions/new-session/invite`, { state: { sessionDetails: values } })
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Créer une session</h1>
            <p className={styles.legend}>* Champ obligatoire</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Titre *"
                    placeholder="Ex: Nuit des étoiles filantes"
                    value={values.title}
                    onChange={handleChange('title')}
                    required
                />

                <TextArea
                    label="Description"
                    rows={3}
                    placeholder="Détails de la session..."
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
                    <Input label="Heure" type="time" value={values.startTime} onChange={handleChange('startTime')} />
                </div>

                <Input label="Date de fin" type="date" value={values.endDate} onChange={handleChange('endDate')} />

                <Select
                    label="Lieu d'observation"
                    placeholder="Choisir un lieu"
                    value={values.placeId}
                    onChange={handleChange('placeId')}
                >
                    {MOCK_PLACES.map((place) => (
                        <option key={place.id} value={place.id}>
                            {place.name}
                        </option>
                    ))}
                </Select>

                <button
                    type="button"
                    className={styles.addPlaceLink}
                    onClick={() => navigate('/my-places/new-place')}
                >
                    <Plus size={14} />
                    Ajouter un nouveau lieu
                </button>

                <Select
                    label="Type de session"
                    placeholder="Choisir un type de session"
                    value={values.type}
                    onChange={handleChange('type')}
                >
                    <option value="Loisir">Loisir</option>
                    <option value="Campagne">Campagne</option>
                    <option value="Formation">Formation</option>
                </Select>

                <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Visibilité *</span>
                    <div className={styles.visibilityRow}>
                        {VISIBILITY_OPTIONS.map((opt) => {
                            const Icon = opt.icon
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`${styles.visibilityCard} ${
                                        values.visibility === opt.value ? styles.visibilityCardSelected : ''
                                    }`}
                                    onClick={() => setValues((v) => ({ ...v, visibility: opt.value }))}
                                >
                                    <Icon size={18} />
                                    {opt.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <Button type="submit">Suivant</Button>
            </form>
        </div>
    )
}
export default CreateSessionPage;