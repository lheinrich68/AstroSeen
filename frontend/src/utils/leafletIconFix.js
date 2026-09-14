import lft from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

//? L'icône par défaut de Leaflet référence ses images via des chemins
//  relatifs qui cassent avec les bundlers (Vite). On les réimporte
//  explicitement. Import ce fichier une fois (effet de bord) dans n'importe
//  quel composant utilisant Leaflet, avant de rendre une <Marker />.

delete lft.Icon.Default.prototype._getIconUrl
lft.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})