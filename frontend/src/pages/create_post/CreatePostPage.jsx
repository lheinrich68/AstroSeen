import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Link2, X } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import ChooseContentModal from "../../components/organisms/modals/choose_content_modal/ChooseContentModal.jsx";
import styles from "./CreatePostPage.module.css"

//? PAS ENCORE branché à un backend -> la publication simule juste l'envoi
//  (toast + redirection vers le fil).
//TODO: À remplacer par un appel API (POST /posts) une fois l'endpoint disponible.

//? Le contenu lié (photo/note/croquis) vient de location.state.selectedContent,
//  transmis par la page "Choisir un contenu à lier" (pas encore créée) quand
//  elle renvoie ici après sélection.

const CreatePostPage = () => {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [linkedContent, setLinkedContent] = useState(null)
    const [pickerOpen, setPickerOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handlePublish = () => {
        if (!text.trim()) {
            toast.error('Écrivez quelque chose avant de publier.')
            return
        }

        setSubmitting(true)
        // TODO: remplacer par un vrai appel API (POST /posts), avec
        // linkedContent?.id transmis si un contenu est lié.
        setTimeout(() => {
            toast.success('Post publié.')
            setSubmitting(false)
            navigate('/feed')
        }, 600)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.cancelLink} onClick={() => navigate(-1)}>
                Annuler
            </button>

            <div className={styles.container}>
                <div className={styles.authorRow}>
                    <Avatar size={34} />
                    <span className={styles.authorName}>AstroLouis</span>
                </div>

                <textarea
                    className={styles.textarea}
                    placeholder="Qu'avez-vous observé ce/cette soir(ée) ?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                />

                <span className={styles.sectionLabel}>Lier un contenu (optionnel)</span>

                {linkedContent ? (
                    <div className={styles.linkedCard}>
                        <div className={styles.linkedCardLeft}>
                            {linkedContent.thumbnailUrl ? (
                                <img src={linkedContent.thumbnailUrl} alt="" className={styles.linkedThumb} />
                            ) : (
                                <div className={styles.linkedThumb} />
                            )}
                            <div>
                                <div className={styles.linkedMeta}>{linkedContent.type} · t'appartient</div>
                                <div className={styles.linkedLabel}>{linkedContent.label}</div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => setLinkedContent(null)}
                            aria-label="Retirer le contenu lié"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        className={styles.linkButton}
                        onClick={() => setPickerOpen(true)}
                    >
                        <Link2 size={15} />
                        Lier une photo, note ou croquis
                    </button>
                )}

                <p className={styles.hint}>
                    Une seule photo, note ou croquis à la fois — uniquement parmi ce qui t'appartient.
                </p>

                <Button onClick={handlePublish} disabled={submitting}>
                    {submitting ? 'Publication...' : 'Publier'}
                </Button>
            </div>

            {pickerOpen && (
                <ChooseContentModal
                    onSelect={(content) => setLinkedContent(content)}
                    onClose={() => setPickerOpen(false)}
                />
            )}

            <ToastContainer
                position="bottom-right"
                theme="dark"
                toastStyle={{ background: 'var(--color-bg-surface-high)', color: 'var(--color-text-primary)' }}
            />
        </div>
    )
}

export default CreatePostPage