import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { bortleColor } from "../../../utils/bortleColor.js";
import { joinClassNames } from "../../../utils/joinClassNames.js";
import Modal from "../modal/Modal.jsx";
import styles from "./BortleSelect.module.css"

export const BORTLE_OPTIONS = [
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

//? Sélection en modale plutôt qu'en menu déroulant positionné. Plus robuste
//  sur mobile (une modale est centrée dans le viewport, contrairement à un
//  menu ancré au bouton qui peut se retrouver coupé par une nav fixe ou hors
//  champ selon la position de scroll). Même dégradé que PlaceCard pour la
//  cohérence visuelle.
const BortleSelect = ({ label, value, onChange, required }) => {
    const [open, setOpen] = useState(false)

    const selected = BORTLE_OPTIONS.find((opt) => opt.value === value)

    return (
        <div className={styles.wrapper}>
            {label && <span className={styles.label}>{label}</span>}

            <button type="button" className={styles.trigger} onClick={() => setOpen(true)} aria-expanded={open}>
        <span className={styles.triggerLeft}>
          {selected ? (
              <>
                  <span className={styles.dot} style={{ background: bortleColor(Number(selected.value)) }} />
                  Bortle {selected.value}   ({selected.description})
              </>
          ) : (
              <span className={styles.triggerPlaceholder}>Choisissez une valeur</span>
          )}
        </span>
                <ChevronDown size={16} className={styles.chevron} />
            </button>

            {/* Champ caché pour que le formulaire natif (required, submit) reste fonctionnel */}
            <input type="hidden" required={required} value={value} readOnly />

            {open && (
                <Modal title="Pollution lumineuse (Bortle)" onClose={() => setOpen(false)} maxWidth={420}>
                    {({ requestClose }) => (
                        <div className={styles.optionsList}>
                            {BORTLE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={joinClassNames(styles.option, opt.value === value && styles.optionSelected)}
                                    onClick={() => {
                                        onChange(opt.value)
                                        requestClose()
                                    }}
                                >
                                    <span className={styles.dot} style={{ background: bortleColor(Number(opt.value)) }} />
                                    <span className={styles.optionValue}>Bortle {opt.value}</span>
                                    <span className={styles.optionDescription}>   ({opt.description})</span>
                                </button>
                            ))}
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}
export default BortleSelect;