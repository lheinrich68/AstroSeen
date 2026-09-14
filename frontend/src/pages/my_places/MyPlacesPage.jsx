import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import PlaceCard from "../../components/organisms/place_card/PlaceCard.jsx";
import PlacesOverviewMap from "../../components/organisms/places_overview_map/PlacesOverviewMap.jsx";
import styles from "./MyPlacesPage.module.css"

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un appel API (GET /me/places, DELETE /me/places/:id)
//      une fois les endpoints disponibles.

const INITIAL_PLACES = [
    { id: 'p1', name: 'Plateau de Valensole', bortle: 3, latitude: '43.8367', longitude: '5.9917' },
    { id: 'p2', name: 'Col du Galibier', bortle: 2, latitude: '45.0625', longitude: '6.4078' },
    { id: 'p3', name: 'Jardin (domicile)', bortle: 7, latitude: '45.7640', longitude: '4.8357' },
]

const MyPlacesPage = () => {
    const navigate = useNavigate()
    const [places, setPlaces] = useState(INITIAL_PLACES)

    const handleEdit = (place) => {
        navigate(`/my-places/${place.id}/edit`)
    }

    const handleDelete = (place) => {
        // TODO: remplacer par un vrai appel API (DELETE /me/places/:id).
        setPlaces((prev) => prev.filter((p) => p.id !== place.id))
        showToast.success(`"${place.name}" supprimé.`)
    }

    const handleAdd = () => {
        navigate('/my-places/new')
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate('/profile')}>
                <ArrowLeft size={16} />
                Profil
            </button>

            <h1 className={styles.title}>Mes lieux</h1>

            <Button variant="outline" className={styles.addButton} onClick={handleAdd}>
                <Plus size={15} />
                Ajouter un lieu
            </Button>

            <PlacesOverviewMap places={places} />

            <div className={styles.list}>
                {places.length > 0 ? (
                    places.map((place) => (
                        <PlaceCard key={place.id} place={place} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                ) : (
                    <p className={styles.empty}>Aucun lieu enregistré pour l'instant.</p>
                )}
            </div>
        </div>
    )
}
export default MyPlacesPage;