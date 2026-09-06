import { Calendar, Users, Telescope } from 'lucide-react'
import FeatureCard from '../../molecules/feature_card/FeatureCard'
import styles from './FeatureSection.module.css'

const FEATURES = [
    {
        icon: Calendar,
        title: "Sessions d'observation",
        description: "Organise tes sorties à l'avance, invite d'autres observateurs à te rejoindre, et retrouve l'historique complet de chaque nuit passée (lieu, horaires, participants, conditions du ciel...).",
    },
    {
        icon: Users,
        title: 'Fil communautaire',
        description: 'Publie tes notes d\'observation et tes photos, commente et réagis à celles des autres, et suis les astronomes dont le travail t\'inspire pour ne rien rater de leurs prochaines publications.',
    },
    {
        icon: Telescope,
        title: 'Planétarium',
        description: "Explore un catalogue d'objets célestes détaillé (étoiles, galaxies, nébuleuses, planètes) enrichi par l'histoire de chaque objet et les photos que la communauté a capturées au fil du temps.",
    },
]

export default function FeaturesSection() {
    return (
        <section className={styles.section}>
            {FEATURES.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
            ))}
        </section>
    )
}
