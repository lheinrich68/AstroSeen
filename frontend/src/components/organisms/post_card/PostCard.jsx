import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Camera, FileText, Calendar, MoreHorizontal, Star, Heart, MessageCircle, Shield } from "lucide-react";
import Avatar from "../../atoms/avatar/Avatar.jsx";
import ReportContentModal from "../../organisms/modals/report_content_modal/ReportContentModal.jsx"
import styles from "./PostCard.module.css";

const TYPE_CONFIG = {
    photo: { icon: Camera, label: "Photo" },
    note: { icon: FileText, label: "Note" },
    session: { icon: Calendar, label: "Session" },
}

//? Carte générique du fil d'actualité => cf. HiFi "Fil d'actualité", 3
//  variantes selon `post.type` : photo (avec image), note (titre+extrait),
//  session (titre+extrait, pas de chip objet).
//* Note: div cliquable (pas <Link> englobant) car le bouton "•••" à
//  l'intérieur serait un bouton imbriqué dans un lien — HTML invalide.

//? Le bouton "•••" ouvre directement le signalement pour l'instant
//TODO: à remplacer par un vrai menu (Signaler, Copier le lien, Modifier/Supprimer
//  si auteur...) quand un composant de menu déroulant existera.

const PostCard = ({ post }) => {
    const navigate = useNavigate()
    const [reportOpen, setReportOpen] = useState(false)
    const { type, id, author, timeAgo, staffRole, imageUrl, title, excerpt, objectLabel, likes, comments } = post
    const { icon: TypeIcon, label: typeLabel } = TYPE_CONFIG[type]

    return (
        <div
            className={styles.card}
            role="link"
            tabIndex={0}
            onClick={() => navigate(`/post/${id}`)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/post/${id}`)}
        >
            <div className={styles.header}>
                <div className={styles.authorGroup}>
                    <Avatar src={author.avatarUrl} size={34} />
                    <div>
                        <div className={styles.nameRow}>
                            <span className={styles.authorName}>{author.name}</span>
                            {staffRole && (
                                <span className={styles.typeBadge}>
                  <Shield size={11} />
                                    {staffRole}
                </span>
                            )}
                        </div>
                        <span className={styles.time}>{timeAgo}</span>
                    </div>
                </div>

                <div className={styles.headerRight}>
          <span className={styles.typeBadge}>
            <TypeIcon size={12} />
              {typeLabel}
          </span>
                    <button
                        type="button"
                        className={styles.moreButton}
                        aria-label="Plus d'options"
                        onClick={(e) => {
                            e.stopPropagation()
                            setReportOpen(true)
                        }}
                    >
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            {type === 'photo' && imageUrl !== undefined && <img src={imageUrl} alt="" className={styles.image} />}
            {type === 'photo' && imageUrl === undefined && <div className={styles.image} />}

            {title && <p className={styles.title}>{title}</p>}
            {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

            {objectLabel && (
                <span className={styles.objectChip}>
          <Star size={11} />
                    {objectLabel}
        </span>
            )}

            <div className={styles.statsRow}>
        <span className={styles.stat}>
          <Heart size={14} />
            {likes}
        </span>
                <span className={styles.stat}>
          <MessageCircle size={14} />
                    {comments}
        </span>
            </div>

            {reportOpen && (
                <div onClick={(e) => e.stopPropagation()}>
                    <ReportContentModal onClose={() => setReportOpen(false)} />
                </div>
            )}
        </div>
    )
}
export default PostCard