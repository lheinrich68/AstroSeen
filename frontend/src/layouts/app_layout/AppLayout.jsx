import { Outlet } from 'react-router-dom'
import DesktopTopNav from '../../components/organisms/desktop_top_nav/DesktopTopNav.jsx'
import MobileBottomNav from '../../components/organisms/mobile_bottom_nav/MobileBottomNav.jsx'
import AppToast from '../../components/molecules/app_toast/AppToast.jsx'
import styles from './AppLayout.module.css'

// Shell des pages authentifiées (mobile : nav basse fixe ; desktop : barre
// haute). Les pages Auth et la page d'accueil visiteur ne passent PAS par ce
// layout, donc pas de nav ni de toasts sur ces écrans-là par construction.

const AppLayout = () => {
    return (
        <div className={styles.wrapper}>
            <DesktopTopNav />

            <main className={styles.main}>
                <Outlet />
            </main>

            <MobileBottomNav />

            <AppToast />
        </div>
    )
}
export default AppLayout