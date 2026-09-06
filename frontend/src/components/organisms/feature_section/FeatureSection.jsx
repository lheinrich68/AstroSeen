import { Calendar, Users, Telescope } from 'lucide-react'
import FeatureCard from '../../molecules/feature_card/FeatureCard'
import styles from './FeaturesSection.module.css'

const FEATURES = [
    {
        icon: Calendar,
        title: "Sessions d'observation",
        description: "Planifie tes sorties, invite d'autres observateurs, garde une trace de chaque nuit.",
    },
    {
        icon: Users,
        title: 'Fil communautaire',
        description: 'Publie tes notes et photos, découvre celles des autres passionnés.',
    },
    {
        icon: Telescope,
        title: 'Planétarium',
        description: "Un catalogue d'objets du ciel, avec les photos de toute la communauté.",
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
