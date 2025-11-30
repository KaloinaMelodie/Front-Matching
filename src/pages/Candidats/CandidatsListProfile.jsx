import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import CandidatList from "../../components/OffersProfile/CandidatsList";
import { getPublicCandidats } from "../../controllers/CandidatController";

const initDB = async () => {
  return await openDB("CandidatsDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("candidats")) {
        db.createObjectStore("candidats");
      }
    },
  });
};

const loadCandidats = async () => {
  const db = await initDB();
  const cached = await db.get("candidats", "all");
  if (cached) {
    return cached;
  }

  console.log("Chargement depuis API...");
  const data = await getPublicCandidats(); 
  await db.put("candidats", data, "all");
  console.log("Données mises en cache IndexedDB");
  return data;
};

export default function CandidatsMyList() {
  const [candidats, setCandidats] = useState([]);
  const [filteredCandidats, setFilteredCandidats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedCompetence, setSelectedCompetence] = useState("");

  useEffect(() => {
    const charger = async () => {
      const data = await loadCandidats();
      setCandidats(data);
      setFilteredCandidats(data);
      setLoading(false);
    };
    charger();
  }, []);

  const filterCandidats = () => {
    const filtered = candidats.filter((c) => {
      const formationMatch = selectedFormation
        ? c.formation?.some((f) =>
            f.diplome.toLowerCase().includes(selectedFormation.toLowerCase())
          )
        : true;

      const experienceMatch = selectedExperience
        ? c.experiences_professionnelles?.some((exp) =>
            exp.titre_du_poste
              .toLowerCase()
              .includes(selectedExperience.toLowerCase())
          )
        : true;

      const competenceMatch = selectedCompetence
        ? c.competences?.competences_techniques?.some((comp) =>
            comp.toLowerCase().includes(selectedCompetence.toLowerCase())
          )
        : true;

      const searchMatch = searchTerm
        ? JSON.stringify(c).toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return formationMatch && experienceMatch && competenceMatch && searchMatch;
    });

    setFilteredCandidats(filtered);
  };

  useEffect(() => {
    filterCandidats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedFormation, selectedExperience, selectedCompetence]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Liste des Candidats
      </h2>

      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Rechercher un mot-clé..."
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrer par formation (ex: Master)"
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            value={selectedFormation}
            onChange={(e) => setSelectedFormation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrer par poste (ex: Stage)"
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrer par compétence (ex: Java)"
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            value={selectedCompetence}
            onChange={(e) => setSelectedCompetence(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : (
        <CandidatList candidats={filteredCandidats} />
      )}
    </div>
  );
}
