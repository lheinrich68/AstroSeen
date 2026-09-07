import Header from '../../components/organisms/header/Header.jsx'
import Footer from '../../components/organisms/footer/Footer.jsx'
import HeroSection from "../../components/organisms/hero_section/HeroSection.jsx";
import CTA_Section from "../../components/organisms/cta_section/CTASection.jsx"
import FeaturesSection from "../../components/organisms/feature_section/FeatureSection.jsx";
import StarField from "../../components/atoms/star_field/StarField.jsx";
import styles from './HomePage.module.css'

const HomePage = () => {
    return (
        <div className={styles.page}>
            <title>AstroSeen</title>
            <StarField count={80} />

            <div className={styles.content}>
                <Header />
                <HeroSection />
                <FeaturesSection />
                <CTA_Section />
                <Footer />
            </div>

            <span className={styles.credit}>
                Photo :{' '}
                <a
                    href="https://www.pexels.com/fr-fr/@thirdman/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Thirdman
                </a>{' '}
            / Pexels
        </span>
</div>
)}
export default HomePage