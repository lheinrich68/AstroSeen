import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/organisms/admin_sidebar/AdminSidebar.jsx";
import styles from "./AdminLayout.module.css"

// À nicher sous AppLayout dans le router, autour de toutes les routes
// /admin/* (pas /moderation, qui reste sous AppLayout seul — la
// sidebar y pointe simplement en lien, sans que Modération fasse partie de
// cette arborescence de routes).
const AdminLayout = () => {
    return (
        <div className={styles.wrapper}>
            <AdminSidebar />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}
export default AdminLayout;