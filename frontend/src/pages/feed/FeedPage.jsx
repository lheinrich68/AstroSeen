import { useState, useMemo } from 'react'
import { Search } from "lucide-react"
import Input from "../../components/atoms/input/Input.jsx"
import FilterChip from "../../components/molecules/filter_chip/FilterChip.jsx"
import PostCard from "../../components/organisms/post_card/PostCard.jsx"
import styles from "./FeedPage.module.css"

// PAS ENCORE branché au backend => données de démonstration en dur.
// À remplacer par un vrai appel API (GET /posts) avec pagination une fois
// l'endpoint disponible.
const MOCK_POSTS = [
    {
        id: '1',
        type: 'photo',
        author: { name: 'Nébuleuse42' },
        staffRole: 'Modérateur',
        timeAgo: 'Il y a 2h',
        imageUrl: undefined,
        objectLabel: "M31 — Galaxie d'Andromède",
        likes: 12,
        comments: 3,
        tags: ['astrophoto'],
    },
    {
        id: '2',
        type: 'note',
        author: { name: 'AstroLouis' },
        timeAgo: 'Hier',
        title: 'Superbe soirée sur M42',
        excerpt:
            'Seeing correct (7/10), transparence excellente. Belle vue sur les filaments de la nébuleuse...',
        objectLabel: "M42 — Nébuleuse d'Orion",
        likes: 8,
        comments: 1,
        tags: [],
    },
    {
        id: '3',
        type: 'session',
        author: { name: 'CielProfond' },
        timeAgo: 'Il y a 3 jours',
        title: 'Nuit des étoiles filantes — entre amis',
        excerpt: "Observation entre amis des étoiles du ciel profond à la recherche d'une étoile binaire.",
        likes: 5,
        comments: 0,
        tags: ['débutant'],
    },
]

const FILTERS = [
    { key: 'tous', label: 'Tous' },
    { key: 'astrophoto', label: '#astrophoto' },
    { key: 'débutant', label: '#débutant' },
]

const FeedPage = () => {
    const [search, setSearch] = useState('')
    const [activeFilter, setActiveFilter] = useState('tous')

    const filteredPosts = useMemo(() => {
        return MOCK_POSTS.filter((post) => {
            const matchesFilter = activeFilter === 'tous' || post.tags.includes(activeFilter)
            const matchesSearch =
                search.trim() === '' ||
                post.title?.toLowerCase().includes(search.toLowerCase()) ||
                post.objectLabel?.toLowerCase().includes(search.toLowerCase()) ||
                post.author.name.toLowerCase().includes(search.toLowerCase())
            return matchesFilter && matchesSearch
        })
    }, [search, activeFilter])

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Fil d'actualité</h1>

            <Input
                icon={Search}
                placeholder="Rechercher par tag ou catégorie"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.filterRow}>
                {FILTERS.map((filter) => (
                    <FilterChip
                        key={filter.key}
                        label={filter.label}
                        selected={activeFilter === filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                    />
                ))}
            </div>

            <div className={styles.list}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className={styles.empty}>Aucun post ne correspond à ta recherche.</p>
                )}
            </div>
        </div>
    )
}
export default FeedPage