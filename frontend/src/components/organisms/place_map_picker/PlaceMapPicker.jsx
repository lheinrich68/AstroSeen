import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { Search, LocateFixed } from "lucide-react";
import { showToast } from "../../../utils/showToast.jsx";
import Input from "../../atoms/input/Input.jsx";
import "../../../utils/leafletIconFix.js"
import styles from "./PlaceMapPicker.module.css"

const DEFAULT_FRENCH_CENTER = [46.6, 2.5] //Centre approximatif de la France

function ClickHandler({ onMove }) {
    useMapEvents({
        click(e) {
            onMove(e.latlng.lat, e.latlng.lng)
        },
    })
    return null
}

//? Recentre la carte quand la position change depuis l'extérieur (recherche,
//  géolocalisation, ou saisie manuelle des champs) -> pas seulement au
//  "drag and drop" du marqueur, qui bouge déjà la carte tout seul.
function RecenterOnChange({ lat, lng }) {
    const map = useMap()
    useEffect(() => {
        map.setView([lat, lng], map.getZoom())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng])
    return null
}

//* PAS ENCORE branché à un backend => la recherche utilise Nominatim (service de géocodage gratuit d'OpenStreetMap, sans clé API).
//  Limite d'usage raisonnable à respecter (max ~1 requête/seconde) :
//  https://operations.osmfoundation.org/policies/nominatim/
const PlaceMapPicker = ({ latitude, longitude, onChange }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searching, setSearching] = useState(false)

    const lat = parseFloat(latitude) || DEFAULT_FRENCH_CENTER[0]
    const lng = parseFloat(longitude) || DEFAULT_FRENCH_CENTER[1]

    const handleDragEnd = (e) => {
        const pos = e.target.getLatLng()
        onChange(pos.lat.toFixed(4), pos.lng.toFixed(4))
    }

    const handleMapClick = (newLat, newLng) => {
        onChange(newLat.toFixed(4), newLng.toFixed(4))
    }

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            showToast.warning("Votre navigateur ne supporte pas la géolocalisation.")
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => onChange(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4)),
            () => showToast.error('Impossible de récupérer votre position. Veuillez vérifier si AstroSeen à l\'autorisation de pouvoir voir votre localisation.'),
        )
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setSearching(true)
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(searchQuery)}`,
            )
            const results = await res.json()
            if (results.length === 0) {
                showToast.error('Aucun lieu trouvé pour cette recherche.')
                return
            }
            onChange(parseFloat(results[0].lat).toFixed(4), parseFloat(results[0].lon).toFixed(4))
        } catch {
            showToast.error('Erreur lors de la recherche du lieu.')
        } finally {
            setSearching(false)
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.searchRow} onSubmit={handleSearch}>
                <Input
                    icon={Search}
                    placeholder="Rechercher un lieu par son nom..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={searching}
                />
                <button
                    type="button"
                    className={styles.locateButton}
                    onClick={handleLocateMe}
                    aria-label="Utiliser ma position actuelle"
                >
                    <LocateFixed size={18} />
                </button>
            </form>

            <div className={styles.mapContainer}>
                <MapContainer center={[lat, lng]} zoom={8} className={styles.map}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[lat, lng]} draggable eventHandlers={{ dragend: handleDragEnd }} />
                    <ClickHandler onMove={handleMapClick} />
                    <RecenterOnChange lat={lat} lng={lng} />
                </MapContainer>
            </div>
        </div>
    )
}
export default PlaceMapPicker