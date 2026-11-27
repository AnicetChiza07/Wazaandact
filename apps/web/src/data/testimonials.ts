/**
 * Témoignages (src/data/testimonials.ts).
 *
 * Cette liste ne contient que les identifiants. Les textes (citation, nom, rôle)
 * sont dans messages/fr.json et messages/en.json, sous
 * "Testimonials" > "items" > "<id>" : { "quote", "name", "role" }.
 *
 * ⚠️ Les textes fournis sont TEMPORAIRES : à remplacer par les vrais
 * témoignages (avec l'accord écrit des personnes) avant la mise en ligne.
 *
 * Pour en ajouter : ajoutez un id ici et son texte dans les deux langues.
 * Les cartes sont réparties automatiquement sur les deux colonnes.
 * Prévoyez au moins 4 témoignages pour que le défilement soit fluide.
 */
export const testimonials: string[] = [
    "t1",
    "t2",
    "t3",
    "t4",
    "t5",
    "t6",
];