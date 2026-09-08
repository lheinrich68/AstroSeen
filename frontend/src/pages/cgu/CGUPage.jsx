import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './CGUPage.module.css'
import StarField from "../../components/atoms/star_field/StarField.jsx";
import Header from "../../components/organisms/header/Header.jsx"
import Footer from "../../components/organisms/footer/Footer.jsx"

// Conditions Générales d'Utilisation — brouillon représentatif du projet,
// à faire relire par un juriste avant toute mise en production réelle.

const CGU_Page = () => {
    return (
        <div className={styles.page}>
            <title>CGU - AstroSeen</title>
            <StarField count={80} />
            <Header />
            <div className={styles.container}>
                <Link to="/" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Retour à l'accueil
                </Link>

                <h1 className={styles.title}>Conditions générales d'utilisation</h1>
                <p className={styles.updated}>Dernière mise à jour : septembre 2026</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Objet</h2>
                    <p className={styles.paragraph}>
                        AstroSeen est une plateforme communautaire destinée aux passionnés d'astronomie amateurs et
                        professionnels. Elle permet de consigner des observations, de planifier des sessions
                        d'observation, de partager des notes et des photos, et de consulter un catalogue d'objets
                        célestes (planétarium). Les présentes conditions régissent l'accès et l'utilisation du service.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Création de compte</h2>
                    <p className={styles.paragraph}>
                        L'inscription nécessite une adresse email valide et un mot de passe respectant les règles de
                        sécurité affichées lors de la création (12 caractères minimum, au moins un chiffre, une
                        majuscule et un caractère spécial). Chaque utilisateur est responsable de la confidentialité de
                        ses identifiants et de l'activité réalisée depuis son compte.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Contenu publié par les utilisateurs</h2>
                    <p className={styles.paragraph}>
                        Les notes d'observation, photos, croquis et publications restent la propriété de leur auteur.
                        En les publiant sur AstroSeen, l'utilisateur autorise leur affichage dans les limites de la
                        visibilité qu'il a choisie (privée, session, ou publique). Tout contenu contraire à la loi,
                        portant atteinte aux droits d'un tiers, ou ne respectant pas l'esprit communautaire du service
                        pourra être signalé, restreint ou supprimé par la modération.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Modération</h2>
                    <p className={styles.paragraph}>
                        Le contenu signalé par les utilisateurs est examiné par l'équipe de modération, qui peut le
                        rejeter, le restreindre, demander une modification, ou le supprimer. Un compte peut être
                        suspendu ou banni en cas de manquement répété ou grave aux présentes conditions.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Suppression de compte</h2>
                    <p className={styles.paragraph}>
                        Toute demande de suppression de compte est traitée dans un délai de 30 jours, pendant lequel
                        elle peut être annulée. Passé ce délai, les données personnelles sont supprimées et le contenu
                        déjà publié est anonymisé plutôt que supprimé, afin de préserver la cohérence des sessions et
                        discussions auxquelles l'utilisateur a pu participer.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Responsabilité</h2>
                    <p className={styles.paragraph}>
                        AstroSeen est fourni "en l'état". Le service met à disposition un espace d'échange et de
                        documentation, mais ne garantit ni l'exactitude des informations publiées par les utilisateurs
                        (notamment les données du planétarium ou des événements astronomiques), ni une disponibilité
                        continue de la plateforme.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Modification des conditions</h2>
                    <p className={styles.paragraph}>
                        Ces conditions peuvent évoluer. Toute modification substantielle sera annoncée sur la
                        plateforme avant son entrée en vigueur.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Contact</h2>
                    <p className={styles.paragraph}>
                        Pour toute question relative à ces conditions, voir la <Link to="/contact">page Contact</Link>.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    )
}
export default CGU_Page