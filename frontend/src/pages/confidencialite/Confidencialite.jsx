import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StarField from '../../components/atoms/star_field/StarField.jsx'
import styles from './Confidencialite.module.css'
import Header from '../../components/organisms/header/Header.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'

// Politique de confidentialité -> brouillon représentatif du projet
// (RGPD/CNIL), à faire relire par un juriste avant toute mise en
// production réelle.

const Confidenciality = () => {
    return (
        <div className={styles.page}>
            <title>Politique de confidentialité - AstroSeen</title>
            <StarField count={80} />

            <Header />
            <div className={styles.content}>
                <div className={styles.container}>
                    <Link to="/" className={styles.backLink}>
                        <ArrowLeft size={16} />
                        Retour à l'accueil
                    </Link>

                    <h1 className={styles.title}>Politique de confidentialité</h1>
                    <p className={styles.updated}>Dernière mise à jour : septembre 2026</p>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Données collectées</h2>
                        <ul className={styles.list}>
                            <li>Données de compte : email, pseudonyme, mot de passe (chiffré), niveau d'expérience.</li>
                            <li>Contenu que vous créez : notes d'observation, photos, croquis, publications, commentaires.</li>
                            <li>Données d'observation : lieux enregistrés, matériel déclaré, conditions météo saisies.</li>
                            <li>Données techniques : connexion, adresse IP, informations de navigateur (à des fins de sécurité).</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Pourquoi ces données sont collectées</h2>
                        <p className={styles.paragraph}>
                            Ces données sont utilisées pour faire fonctionner le service (création et gestion de votre
                            compte, affichage de vos contenus selon la visibilité choisie, modération), et pour améliorer
                            l'expérience proposée (statistiques d'usage agrégées et anonymisées). Aucune donnée n'est
                            vendue à des tiers.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Conservation des données</h2>
                        <p className={styles.paragraph}>
                            Vos données sont conservées tant que votre compte est actif. En cas de demande de suppression
                            de compte, un délai de 30 jours s'applique avant suppression définitive des données
                            personnelles — délai pendant lequel vous pouvez annuler la demande depuis votre profil. Passé
                            ce délai, vos données personnelles sont effacées ; le contenu déjà publié (notes, photos) est
                            anonymisé plutôt que supprimé, pour préserver la cohérence des sessions et discussions
                            partagées avec d'autres utilisateurs.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Vos droits</h2>
                        <p className={styles.paragraph}>
                            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de
                            limitation et de portabilité de vos données. Vous pouvez consulter et modifier la plupart de
                            vos informations directement depuis votre profil, ou demander la suppression complète de votre
                            compte depuis les paramètres.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Partage des données</h2>
                        <p className={styles.paragraph}>
                            Vos contenus sont visibles selon la visibilité que vous choisissez à la publication (privée,
                            limitée à une session, ou publique). Les données ne sont partagées avec des tiers que lorsque
                            la loi l'exige.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Nous contacter</h2>
                        <p className={styles.paragraph}>
                            Pour exercer vos droits ou pour toute question, voir la <Link to="/contact">page Contact</Link>.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Confidenciality