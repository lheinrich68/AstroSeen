import { Link, useNavigate} from "react-router-dom";
import { Wrench, MapPin, Shield, ShieldCheck, Settings, LogOut } from "lucide-react";
import Avatar from "../../components/atoms/avatar/Avatar.jsx";
import Badge from "../../components/atoms/badge/Badge.jsx";
import Button from "../../components/atoms/button/Button.jsx";
import MenuRow from "../../components/molecules/menu_row/MenuRow.jsx";
import styles from "./ProfilePage.module.css"

//* PAS ENCORE branché à un backend => données de l'utilisateur en dur.
//TODO: À remplacer par un vrai API (GET /me) une fois l'endpoint dispo.
//? "Modération" et "Administration" ne devraient s'afficher que si
//  l'utilisateur a le rôle correspondant -> pour l'instant affichés en dur
//  (isModerator/isAdmin) en attendant un vrai contexte d'authentification.
const MOCK_USER = {
    name: 'AstroLouis',
    bio: "Passionné d'astrophotographie depuis 2019.",
    userType: 'Professionnel',
    level: 'Expert',
    certified: true,
    isModerator: true,
    isAdmin: true,
}

const ProfilePage = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // TODO: remplacer par un appel API (POST /auth/logout)
        //  + purge du contexte d'authentification une fois en place.
        navigate('/login')
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Profil</h1>

            <div className={styles.headerCard}>
                <Avatar size={72} />
                <span className={styles.name}>{MOCK_USER.name}</span>
                <p className={styles.bio}>{MOCK_USER.bio}</p>

                <div className={styles.badgesRow}>
                    <Badge variant="neutral">{MOCK_USER.userType}</Badge>
                    <Badge variant="neutral">{MOCK_USER.level}</Badge>
                    {MOCK_USER.certified && (
                        <Badge variant="starlight" icon={ShieldCheck}>
                            Astronome certifié
                        </Badge>
                    )}
                </div>
            </div>

            <Button as={Link} to="/profile/edit" variant="outline" className={styles.editButton}>
                Modifier le profil
            </Button>

            <div className={styles.menuList}>
                <MenuRow to="/my-equipment" icon={Wrench} label="Mon matériel" />
                <hr className={styles.divider} />
                <MenuRow to="/my-places" icon={MapPin} label="Mes lieux" />
                {MOCK_USER.isModerator && (
                    <>
                        <hr className={styles.divider} />
                        <MenuRow to="/moderation" icon={Shield} label="Modération" subtitle="Accéder au panel de modération" />
                    </>
                )}
                {MOCK_USER.isAdmin && (
                    <>
                        <hr className={styles.divider} />
                        <MenuRow to="/admin" icon={ShieldCheck} label="Administration" subtitle="Accéder au panel d'administration" />
                    </>
                )}
                <hr className={styles.divider} />
                <MenuRow to="/parametres" icon={Settings} label="Paramètres" />
                <hr className={styles.divider} />
                <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                    <div className={styles.logoutIconWrapper}>
                      <LogOut size={17} />
                    </div>
                    Déconnexion
                </button>
            </div>
        </div>
    )
}
export default ProfilePage;