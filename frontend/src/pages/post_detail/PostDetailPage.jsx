import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, Star, Heart, Send } from "lucide-react"
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import CommentItem from "../../components/molecules/comment_item/CommentItem.jsx";
import ReportContentModal from "../../components/organisms/modals/report_content_modal/ReportContentModal.jsx";
import styles from "./PostDetailPage.module.css"

//? PAS ENCORE branché à un backend => données de démonstration en dur,
//  identiques quel que soit :id.
//TODO: À remplacer par un vrai appel API (GET /posts/:id) une fois l'endpoint disponible.
const MOCK_POST = {
    author: { name: 'AstroLouis' },
    timeAgo: 'Hier',
    title: 'Superbe soirée sur M42',
    body: "Seeing correct (7/10), transparence excellente. Belle vue sur les filaments de la nébuleuse, on distingue nettement le Trapèze. Session d'une heure avec mon Dobson 200mm, sans filtre.",
    objectLabel: "M42 — Nébuleuse d'Orion",
    likes: 8,
}

const INITIAL_COMMENTS = [
    {
        id: 'c1',
        author: { name: 'Nébuleuse42' },
        timeAgo: '3h',
        text: 'Magnifique ! @PlanetHunter tu devrais venir voir ça la prochaine fois.',
        indented: false,
    },
    {
        id: 'c2',
        author: { name: 'AstroLouis' },
        timeAgo: '2h',
        text: 'Carrément, on prévoit une sortie ce weekend !',
        indented: true,
    },
    {
        id: 'c3',
        author: { name: 'CielProfond' },
        timeAgo: '1h',
        text: "Quel filtre utilises-tu d'habitude sur cette cible ?",
        indented: false,
    },
]

const PostDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [comments, setComments] = useState(INITIAL_COMMENTS)
    const [newComment, setNewComment] = useState('')
    const [replyingTo, setReplyingTo] = useState(null) // id du commentaire ciblé par "Répondre"
    const [reportOpen, setReportOpen] = useState(false)

    const handleAddComment = (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        // TODO: remplacer par un vrai appel API (POST /posts/:id/comments,
        // avec parentId: replyingTo pour que le backend sache où l'insérer).
        const comment = {
            id: `local-${Date.now()}`,
            author: { name: 'Vous' },
            timeAgo: "à l'instant",
            text: newComment,
            indented: Boolean(replyingTo),
        }

        setComments((prev) => {
            if (!replyingTo) return [...prev, comment]
            // Insère juste après le commentaire auquel on répond, plutôt qu'à la fin.
            const index = prev.findIndex((c) => c.id === replyingTo)
            if (index === -1) return [...prev, comment]
            return [...prev.slice(0, index + 1), comment, ...prev.slice(index + 1)]
        })

        setNewComment('')
        setReplyingTo(null)
    }

    const handleReply = (comment) => {
        setReplyingTo(comment.id)
        setNewComment(`@${comment.author.name} `)
    }

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate(-1)}>
                <ArrowLeft size={16} />
                Retour
            </button>

            <div className={styles.container}>
                <div className={styles.authorRow}>
                    <div className={styles.authorGroup}>
                        <Avatar size={34} />
                        <div>
                            <div className={styles.authorName}>{MOCK_POST.author.name}</div>
                            <div className={styles.time}>{MOCK_POST.timeAgo}</div>
                        </div>
                    </div>
                    <button type="button" className={styles.moreButton} aria-label="Plus d'options" onClick={() => setReportOpen(true)}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                <h1 className={styles.title}>{MOCK_POST.title}</h1>
                <p className={styles.body}>{MOCK_POST.body}</p>

                <span className={styles.objectChip}>
        <Star size={12} />
                    {MOCK_POST.objectLabel}
      </span>

                <div className={styles.likeRow}>
                    <Heart size={17} />
                    {MOCK_POST.likes} j'aime
                </div>

                <hr className={styles.divider} />

                <h2 className={styles.commentsTitle}>Commentaires</h2>

                <div className={styles.commentsList}>
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} indented={comment.indented} onReply={handleReply} />
                    ))}
                </div>

                {replyingTo && (
                    <div className={styles.replyingToRow}>
                        En réponse à {comments.find((c) => c.id === replyingTo)?.author.name}
                        <button
                            type="button"
                            className={styles.cancelReplyButton}
                            onClick={() => {
                                setReplyingTo(null)
                                setNewComment('')
                            }}
                        >
                            Annuler
                        </button>
                    </div>
                )}

                <form className={styles.commentInputRow} onSubmit={handleAddComment}>
                    <input
                        type="text"
                        className={styles.commentInput}
                        placeholder="Ajouter un commentaire... (@ pour mentionner)"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className={styles.sendButton} disabled={!newComment.trim()} aria-label="Envoyer">
                        <Send size={17} />
                    </button>
                </form>
            </div>

            {reportOpen && <ReportContentModal onClose={() => setReportOpen(false)} />}
        </div>
    )
}
export default PostDetailPage;