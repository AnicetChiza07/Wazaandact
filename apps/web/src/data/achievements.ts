/**
 * Données des réalisations (src/data/achievements.ts).
 *
 * Pour ajouter une réalisation :
 *   1. ajoutez une ligne ici (id unique + image dans public/images/realisations/)
 *   2. ajoutez son texte dans messages/fr.json et messages/en.json
 *      sous "Achievements" > "items" > "<id>"
 * Le composant s'adapte tout seul (nombre d'éléments, numérotation, etc.).
 */
export type Achievement = {
    id: string;
    image: string;
};

export const achievements: Achievement[] = [
    { id: "education", image: "/images/education.jpg" },
    { id: "formation", image: "/images/formation.jpg" },
    { id: "communaute", image: "/images/communaute.jpg" },
    { id: "autonomie", image: "/images/autonomie.jpg" },
];