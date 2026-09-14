import { useState, useMemo } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { showToast } from "../../utils/showToast.jsx";
import Input from "../../components/atoms/input/Input.jsx";
import Select from "../../components/atoms/select/Select.jsx";
import TextArea from "../../components/atoms/text_area/TextArea.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import styles from "./NewEquipmentPage.module.css"

//* PAS ENCORE branché à un backend. Le catalogue (marque/modèle déjà
//  référencés par d'autres utilisateurs) et les données de démonstration en
//  mode édition sont en dur.
//TODO: À remplacer par GET /equipment-catalog?q=... (recherche de doublon), GET /me/equipment/:id (pré-remplissage édition)
//      et POST/PATCH /me/equipment une fois les endpoints disponibles.

const MOCK_CATALOG = [{
    type: 'Télescope',
    brand: 'Skywatcher',
    model: 'Dobson 200/1200'
}]

const MOCK_EQUIPMENT = {
    e1: { type: 'Télescope', brand: 'Skywatcher', model: 'Dobson 200/1200', description: '' },
    e2: { type: 'Monture', brand: 'Skywatcher', model: 'EQ5 Pro', description: 'Motorisée, autoguidage possible' },
    e3: { type: 'Caméra', brand: 'ZWO', model: 'ASI294MC Pro', description: 'Couleur, refroidie' },
    e4: { type: 'Oculaire', brand: 'Explore Scientific', model: '82° 14mm', description: '' },
}

const EMPTY_STEP1 = { type: '', brand: '', model: '' }

const NewEquipmentPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    // En édition, on saute directement à l'étape 2 (le modèle ne change pas,
    // seuls les détails personnels sont modifiables).
    const [step, setStep] = useState(isEditing ? 2 : 1)
    const [step1Values, setStep1Values] = useState(() =>
        isEditing ? (MOCK_EQUIPMENT[id] ?? EMPTY_STEP1) : EMPTY_STEP1,
    )
    const [description, setDescription] = useState(() => (isEditing ? MOCK_EQUIPMENT[id]?.description ?? '' : ''))
    const [submitting, setSubmitting] = useState(false)

    const catalogMatch = useMemo(() => {
        if (!step1Values.brand.trim() || !step1Values.model.trim()) return null
        return MOCK_CATALOG.find(
            (item) =>
                item.brand.toLowerCase() === step1Values.brand.trim().toLowerCase() &&
                item.model.toLowerCase() === step1Values.model.trim().toLowerCase(),
        )
    }, [step1Values])

    const handleUseCatalogMatch = () => {
        setStep1Values((v) => ({ ...v, type: catalogMatch.type }))
        setStep(2)
    }

    const handleContinue = (e) => {
        e.preventDefault()
        if (!step1Values.type || !step1Values.brand.trim() || !step1Values.model.trim()) {
            showToast.error('Renseignez le type, la marque et le modèle avant de continuer.')
            return
        }
        setStep(2)
    }

    const handlePhotoClick = () => {
        showToast.warning("Import de photo pas encore branché à un backend.")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        // TODO: remplacer par un appel API (POST /me/equipment ou
        //  PATCH /me/equipment/:id selon isEditing).
        setTimeout(() => {
            showToast.success(isEditing ? 'Matériel mis à jour.' : 'Matériel ajouté à votre inventaire.')
            setSubmitting(false)
            navigate('/my-equipment')
        }, 600)
    }

    if (step === 1) {
        return (
            <div className={styles.page}>
                <button type="button" className={styles.backLink} onClick={() => navigate('/my-equipment')}>
                    <ArrowLeft size={16} />
                    Mon matériel
                </button>

                <h1 className={styles.title}>Choisir le modèle (1/2)</h1>
                <p className={styles.legend}>* Champ obligatoire</p>

                <form className={styles.form} onSubmit={handleContinue}>
                    <Select
                        label="Type de matériel *"
                        placeholder="Télescope, Monture, Caméra..."
                        value={step1Values.type}
                        onChange={(e) => setStep1Values((v) => ({ ...v, type: e.target.value }))}
                        required
                    >
                        <option value="Télescope">Télescope</option>
                        <option value="Monture">Monture</option>
                        <option value="Caméra">Caméra</option>
                        <option value="Oculaire">Oculaire</option>
                    </Select>

                    <Input
                        label="Marque *"
                        placeholder="Exemple: Skywatcher"
                        value={step1Values.brand}
                        onChange={(e) => setStep1Values((v) => ({ ...v, brand: e.target.value }))}
                        required
                    />

                    <Input
                        label="Modèle *"
                        placeholder="Exemple: Dobson 200/1200"
                        value={step1Values.model}
                        onChange={(e) => setStep1Values((v) => ({ ...v, model: e.target.value }))}
                        required
                    />

                    {catalogMatch && (
                        <>
                            <p className={styles.helperText}>Ce modèle existe déjà. Le réutiliser ?</p>
                            <div className={styles.matchCard}>
                                <div className={styles.matchCardText}>
                  <span className={styles.matchCardName}>
                    {catalogMatch.brand} {catalogMatch.model}
                  </span>
                                    <span className={styles.matchCardHint}>Déjà dans le catalogue</span>
                                </div>
                                <button type="button" className={styles.matchCardButton} onClick={handleUseCatalogMatch}>
                                    Utiliser
                                </button>
                            </div>
                        </>
                    )}

                    <p className={styles.helperText}>
                        Si vous réutilisé une fiche existante, vous passez directement à vos détails personnels. Sinon
                        une nouvelle fiche catalogue est créée.
                    </p>

                    <Button type="submit">Continuer</Button>
                </form>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <button
                type="button"
                className={styles.backLink}
                onClick={() => (isEditing ? navigate('/my-equipment') : setStep(1))}
            >
                <ArrowLeft size={16} />
                {isEditing ? 'Mon matériel' : 'Retour'}
            </button>

            <h1 className={styles.title}>Mes détails (2/2)</h1>
            <p className={styles.subtitle}>
                {step1Values.brand} {step1Values.model} · {step1Values.type}
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.photoRow}>
                    <button type="button" className={styles.photoButton} onClick={handlePhotoClick}>
                        <Camera size={24} />
                        Photo de ton exemplaire (optionnel)
                    </button>
                </div>
                <p className={styles.photoHint}>Sans photo, l'icône générique du type est utilisée à la place.</p>

                <TextArea
                    label="Caractéristiques (optionnel)"
                    rows={3}
                    placeholder="Modifications, accessoires, notes propres à ton exemplaire..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Enregistrement...' : 'Ajouter à mon inventaire'}
                </Button>
            </form>
        </div>
    )
}
export default NewEquipmentPage