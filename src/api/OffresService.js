// src/services/OffresService.js

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API ||
  "https://back-talentmatch-2-596715584253.us-central1.run.app";

export const getAllOffres = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/offres/`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des offres");
    }
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.error("Erreur OffresService:", error);
    throw error;
  }
};
