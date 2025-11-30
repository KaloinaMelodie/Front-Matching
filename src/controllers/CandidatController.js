// src/controllers/CandidatController.js
import { fetchCandidats } from "../api/CandidatService";

export const getPublicCandidats = async () => {
  try {
    const candidats = await fetchCandidats();

    // Supprimer les infos personnelles avant affichage
    const candidatsPublics = candidats.map((c) => ({
      id: c.id,
      experiences_professionnelles: c.experiences_professionnelles,
      formation: c.formation,
      competences: c.competences,
    }));

    return candidatsPublics;
  } catch (error) {
    console.error("Erreur dans le contrôleur :", error);
    return [];
  }
};
