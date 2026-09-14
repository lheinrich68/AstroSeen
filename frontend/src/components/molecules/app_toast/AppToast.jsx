import { ToastContainer, Slide, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useIsMobile } from '../../../hooks/useIsMobile.js'

//? Un seul ToastContainer à réutiliser partout dans l'app, plutôt que d'en
//  dupliquer un par page -> évite de répéter le style et la logique
//  responsive à chaque endroit.

//* Desktop : top-right, transition Slide.
//  Mobile : top-center, transition Flip (les toasts glissant depuis le
//  côté sont moins lisibles sur un écran étroit).
//  "Newest on top" dans les deux cas.
const AppToast = () => {
    const isMobile = useIsMobile()

    return (
        <ToastContainer
            position={isMobile ? 'top-center' : 'top-right'}
            transition={isMobile ? Flip : Slide}
            newestOnTop
            theme="dark"
            toastStyle={{ background: 'var(--color-bg-surface-high)', color: 'var(--color-text-primary)' }}
        />
    )
}
export default AppToast