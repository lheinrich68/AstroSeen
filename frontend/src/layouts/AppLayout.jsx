import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DesktopTopNav from '../components/organisms/desktop_top_nav/DesktopTopNav.jsx'
import MobileBottomNav from '../components/organisms/mobile_bottom_nav/MobileBottomNav.jsx'
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

            <ToastContainer
                position="bottom-right"
                theme="dark"
                toastStyle={{ background: 'var(--color-bg-surface-high)', color: 'var(--color-text-primary)' }}
            />
        </div>
    )
}