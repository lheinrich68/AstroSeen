import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "../../../utils/leafletIconFix.js"
import styles from "./PlacesOverviewMap.module.css"

const DEFAULT_FRENCH_CENTER = [46.6, 2.5]

//? Cadre automatiquement la carte pour que tous les lieux soient visibles.
//  Avec un seul lieu, fitBounds zoomerait à l'extrême (une seule coordonnée
//  n'a pas d'étendue).
//  On centre simplement dessus avec un zoom raisonnable dans ce cas.
function FitToPlaces({ places }) {
    const map = useMap()

    useEffect(() => {
        if (places.length === 0) return
        if (places.length === 1) {
            map.setView([parseFloat(places[0].latitude), parseFloat(places[0].longitude)], 9)
            return
        }
        const bounds = places.map((p) => [parseFloat(p.latitude), parseFloat(p.longitude)])
        map.fitBounds(bounds, { padding: [32, 32] })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [places])

    return null
}

const PlacesOverviewMap = ({ places }) => {
    if (places.length === 0) return null

    return (
        <div className={styles.mapContainer}>
            <MapContainer center={DEFAULT_FRENCH_CENTER} zoom={5} className={styles.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {places.map((place) => (
                    <Marker key={place.id} position={[parseFloat(place.latitude), parseFloat(place.longitude)]}>
                        <Tooltip>
                            {place.name} // Bortle {place.bortle}
                        </Tooltip>
                    </Marker>
                ))}

                <FitToPlaces places={places} />
            </MapContainer>
        </div>
    )
}
export default PlacesOverviewMap