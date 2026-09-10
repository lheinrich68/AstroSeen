import {useEffect, useState} from "react"
import { X } from "lucide-react"
import { joinClassNames} from "../../../utils/joinClassNames.js";
import styles from "./Modal.module.css"

//? Modal générique : clic sur l'overlay ou touche Échap ferme, clic dans le
//  panneau ne propage pas. `maxWidth` ajuste la largeur (ex. 480 pour un
//  formulaire, 600 pour une grille plus large).

//? Le vrai démontage (onClose du parent, qui retire <Modal /> du DOM) est
//  retardé de CLOSE_ANIMATION_MS : sans ça, React démonterait le composant
//  instantanément et l'animation de sortie (panelOut/overlayOut) n'aurait
//  jamais le temps de jouer.

const CLOSE_ANIMATION_MS = 180

const Modal = ({ title, onClose, children, maxWidth = 420 }) => {
    const [closing, setClosing] = useState(false)

    const handleClose = () => {
        setClosing(true)
        setTimeout(onClose, CLOSE_ANIMATION_MS)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className={joinClassNames(styles.overlay, closing && styles.overlayClosing)}
            onClick={handleClose}
        >
            <div
                className={joinClassNames(styles.panel, closing && styles.panelClosing)}
                style={{ '--modal-max-width': `${maxWidth}px` }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                {title && (
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                        <button type="button" className={styles.closeButton} onClick={handleClose} aria-label="Fermer">
                            <X size={20} />
                        </button>
                    </div>
                )}
                {typeof children === 'function' ? children({ requestClose: handleClose }) : children}
            </div>
        </div>
    )
}
export default Modal