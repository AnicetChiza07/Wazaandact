/**
 * Articles du blog (src/lib/posts.ts).
 *
 * ⚠️ Données temporaires pour le frontend : à remplacer par l'appel au backend.
 * Il suffira de réécrire `getLatestPosts` pour qu'elle appelle l'API
 * et renvoie des objets de type `Post` : le composant ne change pas.
 */
export type Post = {
    slug: string;
    image: string;
    category: string;
    date: string;
    readMinutes: number;
    title: string;
    excerpt: string;
    author: string;
    featured?: boolean;
    content?: string[];
};

const posts: Post[] = [
    {
        slug: "education-pour-tous",
        image: "/images/post-1.jpg",
        category: "Éducation",
        date: "2026-11-07",
        readMinutes: 5,
        title: "L'éducation, première clé pour transformer un destin",
        excerpt:
            "À Goma, l'accès à l'école change la trajectoire des jeunes vulnérables. Retour sur notre approche et sur ce qu'elle rend possible pour les familles.",
        author: "Équipe Waza and Act",
        featured: true,
    },
    {
        slug: "formation-professionnelle",
        image: "/images/post-2.jpg",
        category: "Formation",
        date: "2026-11-04",
        readMinutes: 4,
        title: "Se former pour retrouver un métier et un revenu",
        excerpt:
            "Des ateliers pratiques pour accompagner les adultes fragilisés par les épreuves de la vie vers une activité durable.",
        author: "Équipe Waza and Act",
    },
    {
        slug: "dialogue-communautaire",
        image: "/images/post-3.jpg",
        category: "Communauté",
        date: "2026-11-01",
        readMinutes: 3,
        title: "Le dialogue, un pilier de la dignité des communautés",
        excerpt:
            "Rencontres de quartier et sensibilisation : comment l'écoute et la solidarité renforcent le vivre-ensemble.",
        author: "Équipe Waza and Act",
    },
];

export function getLatestPosts(count = 3): Post[] {
    return getAllPosts().slice(0, count);
}

export function getAllPosts(): Post[] {
    return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((post) => post.slug === slug);
}