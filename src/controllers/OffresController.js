import { getAllOffres } from "../api/OffresService";

export const fetchOffres = async () => {
  try {
    const offres = await getAllOffres();
    // Ici tu peux ajouter un tri, un filtre, etc.
    return offres;
  } catch (error) {
    console.error("Erreur OffresController:", error);
    return [];
  }
};