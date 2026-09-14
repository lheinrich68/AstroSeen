import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react"
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import Badge from "../../components/atoms/badge/Badge.jsx";
import styles from "./PublicProfilePage.module.css";

//* PAS ENCORE branché à un backend => données de démonstration en dur, identiques quel que soit :username.
//TODO: À remplacer par un appel API (GET /users/:username) une fois l'endpoint disponible.
const MOCK_PUBLIC_USER = {
    name: 'Nébuleuse42',
    bio: 'Astrophotographe amateur, spécialisée dans le ciel profond.',
    userType: 'Amateur',
    level: 'Confirmé',
    staffRole: 'Modérateur',
}

const MOCK_PUBLICATIONS = Array.from({ length: 6 }, (_, i) => ({ id: `pub-${i}`, thumbnailUrl: undefined }))

const PublicProfilePage = () => {
    const { username } = useParams()
    const navigate = useNavigate()

    return (
        <div className={styles.page}>
            <button type="button" className={styles.backLink} onClick={() => navigate(-1)}>
                <ArrowLeft size={16} />
                Retour
            </button>

            <div className={styles.headerCard}>
                <Avatar size={72} />
                <span className={styles.name}>{MOCK_PUBLIC_USER.name}</span>
                <p className={styles.bio}>{MOCK_PUBLIC_USER.bio}</p>

                <div className={styles.badgesRow}>
                    <Badge variant="neutral">{MOCK_PUBLIC_USER.userType}</Badge>
                    <Badge variant="neutral">{MOCK_PUBLIC_USER.level}</Badge>
                    {MOCK_PUBLIC_USER.staffRole && (
                        <Badge variant="signal" icon={Shield}>
                            {MOCK_PUBLIC_USER.staffRole}
                        </Badge>
                    )}
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Publications</h2>

            {MOCK_PUBLICATIONS.length > 0 ? (
                <div className={styles.grid}>
                    {MOCK_PUBLICATIONS.map((pub) => (
                        <button
                            key={pub.id}
                            type="button"
                            className={styles.tile}
                            onClick={() => navigate(`/post/${pub.id}`)}
                            aria-label="Voir la publication"
                        >
                            {pub.thumbnailUrl && <img src={pub.thumbnailUrl} alt="" className={styles.tileImage} />}
                        </button>
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Aucune publication pour l'instant.</p>
            )}
        </div>
    )
}
export default PublicProfilePage;