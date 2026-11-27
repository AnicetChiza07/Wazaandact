/**
 * Images de la galerie (src/data/gallery.ts).
 *
 * Les photos sont dans public/images/ et nommées image-1 … image-7.
 * ⚠️ Si l'extension n'est pas .jpg (par ex. .png ou .webp), changez-la ici.
 *
 * Les légendes sont facultatives : pour en ajouter une, créez
 * "Gallery" > "items" > "<id>" dans messages/fr.json et messages/en.json
 * avec { "title": "…", "place": "…" }. Sans légende, rien ne s'affiche.
 */
const EXTENSION = "jpg";

export type GalleryImage = {
    id: string;
    src: string;
};

export const gallery: GalleryImage[] = Array.from({ length: 7 }, (_, index) => ({
    id: `image-${index + 1}`,
    src: `/images/image-${index + 1}.${EXTENSION}`,
}));