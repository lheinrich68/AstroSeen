import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import BortleSelect from "../../components/molecules/bortle_select/BortleSelect.jsx";
import PlaceMapPicker from "../../components/organisms/place_map_picker/PlaceMapPicker.jsx";
import styles from "./NewPlacePage.module.css"

//* PAS ENCORE branché à un backend — données de démonstration en dur pour pré-remplir le mode édition.
//TODO: À remplacer par GET /me/places/:id (pré-remplissage) et POST/PATCH /me/places une fois les endpoints
//      disponibles.

//? Carte : pas d'intégration réelle (Leaflet/Mapbox) pour l'instant, juste
//  un placeholder visuel. La saisie manuelle de latitude/longitude reste le
//  seul moyen de renseigner la position tant que la carte n'est pas branchée.
const MOCK_PLACES = {
    p1: { name: 'Plateau de Valensole', latitude: '43.8367', longitude: '5.9917', bortle: '3' },
    p2: { name: 'Col du Galibier', latitude: '45.0625', longitude: '6.4078', bortle: '2' },
    p3: { name: 'Jardin (domicile)', latitude: '45.7640', longitude: '4.8357', bortle: '7' },
}

const BORTLE_OPTIONS = [
    { value: '1', description: 'Ciel d’exception, noir absolu' },
    { value: '2', description: 'Ciel très sombre' },
    { value: '3', description: 'Ciel rural' },
    { value: '4', description: 'Transition rural/périurbain' },
    { value: '5', description: 'Ciel périurbain' },
    { value: '6', description: 'Ciel suburbain lumineux' },
    { value: '7', description: 'Ciel urbain' },
    { value: '8', description: 'Ciel urbain dense' },
    { value: '9', description: 'Cœur de grande ville' },
]

const EMPTY_VALUES = {
    name: '',
    latitude: '',
    longitude: '',
    bortle: ''
}

const NewPlacePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [values, setValues] = useState(() => (isEditing ? MOCK_PLACES[id] ?? EMPTY_VALUES : EMPTY_VALUES))
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        // TODO: remplacer par un appel API (POST /me/places ou
        //       PATCH /me/places/:id selon isEditing).
        setTimeout(() => {
            showToast.success(isEditing ? 'Lieu mis à jour.' : 'Lieu enregistré.')
            setSubmitting(false)
            navigate('/my-places')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/my-places')}>
                <ArrowLeft size={16} />
                Mes lieux
            </button>

            <h1 className={styles.title}>{isEditing ? 'Modifier le lieu' : 'Ajouter un lieu'}</h1>
            <p className={styles.legend}>* Champ obligatoire</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Nom *"
                    placeholder="Exemple: Plateau de Valensole"
                    value={values.name}
                    onChange={handleChange('name')}
                    required
                />

                <PlaceMapPicker
                    latitude={values.latitude}
                    longitude={values.longitude}
                    onChange={(lat, lng) => setValues((v) => ({ ...v, latitude: lat, longitude: lng }))}
                />

                <div className={styles.coordsRow}>
                    <Input
                        label="Latitude *"
                        placeholder="Exemple: 43.8367"
                        value={values.latitude}
                        onChange={handleChange('latitude')}
                        required
                    />
                    <Input
                        label="Longitude *"
                        placeholder="Exemple: 5.9917"
                        value={values.longitude}
                        onChange={handleChange('longitude')}
                        required
                    />
                </div>

                <BortleSelect
                    label="Bortle (pollution lumineuse) *"
                    value={values.bortle}
                    onChange={(bortle) => setValues((v) => ({ ...v, bortle }))}
                    required
                />

                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Enregistrement...' : 'Enregistrer le lieu'}
                </Button>
            </form>
        </div>
    )
}
export default NewPlacePage