// src/components/CandidatCard.jsx
import React from "react";

export default function CandidatCard({ candidat }) {
  const experiences = candidat.experiences_professionnelles || [];
  const formations = candidat.formation || [];
  const competences = candidat.competences?.competences_techniques || [];

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md bg-white">
      <h3 className="text-lg font-bold mb-2">
        {/* Candidat #{candidat.id?.slice(0, 6) || "?"} */}
        Candidat ########
      </h3>

      {experiences.length > 0 && (
        <div className="mb-2">
          <h4 className="font-semibold text-sm">Expériences :</h4>
          <ul className="list-disc ml-5 text-sm">
            {experiences.slice(0, 2).map((exp, i) => (
              <li key={i}>
                {exp.titre_du_poste} — {exp.nom_de_l_entreprise}
              </li>
            ))}
          </ul>
        </div>
      )}

      {formations.length > 0 && (
        <div className="mb-2">
          <h4 className="font-semibold text-sm">Formation :</h4>
          <p className="text-sm">
            {formations[0].diplome} — {formations[0].etablissement}
          </p>
        </div>
      )}

      {competences.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm">Compétences clés :</h4>
          <ul className="list-disc ml-5 text-sm">
            {competences.slice(0, 2).map((comp, i) => (
              <li key={i}>{comp}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="mt-3 bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800">
        Contacter
      </button>
    </div>
  );
}
