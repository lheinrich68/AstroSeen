import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { User, Settings, LogOut } from "lucide-react"
import MenuRow from "../../molecules/menu_row/MenuRow.jsx";
import styles from "./ProfileDropDown.module.css"

//? Menu déroulant ouvert par le bouton avatar+chevron de DesktopTopNav
//  -> se ferme au clic en dehors ou après une navigation.
const ProfileDropdown = ({ onClose }) => {
    const ref = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onClose()
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    const handleLogout = () => {
        // TODO: remplacer par un vrai appel API (POST /auth/logout) + purge du
        // contexte d'authentification une fois en place.
        onClose()
        navigate('/login')
    }

    return (
        <div ref={ref} className={styles.dropdown}>
            <MenuRow to="/profile" icon={User} label="Mon profil" showChevron={false} onClick={onClose} />
            <MenuRow to="/settings" icon={Settings} label="Paramètres" showChevron={false} onClick={onClose} />
            <hr className={styles.divider} />
            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                <LogOut size={16} />
                Déconnexion
            </button>
        </div>
    )
}
export default ProfileDropdown