/**
 * Statistiques de la page d'accueil (src/data/stats.ts).
 *
 * ⚠️ VALEURS TEMPORAIRES : à confirmer avec le client avant la mise en ligne.
 *
 * Pour modifier une statistique :
 *   - le chiffre / le suffixe : ici
 *   - le libellé : messages/fr.json et messages/en.json,
 *     sous "Stats" > "items" > "<id>"
 * Pour en ajouter ou en retirer, modifiez simplement cette liste
 * (la grille s'adapte : 3 en haut puis le reste en dessous, centré).
 */
export type Stat = {
    id: string;
    value: number;
    /** Texte collé après le chiffre, ex. "+" ou "%" */
    suffix?: string;
    /** Met la carte en avant (bordure verte) : à réserver à la statistique principale */
    highlight?: boolean;
};

export const stats: Stat[] = [
    { id: "youth", value: 1200, suffix: "+", highlight: true },
    { id: "trained", value: 350, suffix: "+" },
    { id: "neighborhoods", value: 25, suffix: "+" },
    { id: "projects", value: 80, suffix: "+" },
    { id: "years", value: 10, suffix: "+" },
];