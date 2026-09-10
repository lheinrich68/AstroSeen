import Avatar from "../../atoms/avatar/Avatar.jsx";
import { joinClassNames} from "../../../utils/joinClassNames.js";
import styles from "./CommentItem.module.css"

// Découpe le texte du commentaire pour colorer les @mentions (cf. HiFi
// "Détail du post" -> "Magnifique ! @PlanetHunter tu devrais...").
function renderTextWithMentions(text) {
    const parts = text.split(/(@\w+)/g)
    return parts.map((part, i) => part.startsWith("@") ? (
        <span key={i} className={styles.mention}>
            {part}
        </span>
        ) : (
            part
        )
    )
}

const CommentItem = ({ comment, indented = false, onReply }) => {
    return (
        <div className={joinClassNames(styles.comment, indented && styles.indented)}>
            <Avatar src={comment.author.avatarUrl} size={28} className={styles.avatar} />
            <div className={styles.body}>
        <span className={styles.meta}>
          {comment.author.name} · {comment.timeAgo}
        </span>
                <p className={styles.text}>{renderTextWithMentions(comment.text)}</p>
                <button type="button" className={styles.replyButton} onClick={() => onReply?.(comment)}>
                    Répondre
                </button>
            </div>
        </div>
    )
}
export default CommentItem