import React from "react";
import CandidatCard from "./CandidatCard";

export default function CandidatList({ candidats }) {
  if (!candidats || candidats.length === 0) {
    return <p className="text-center text-gray-600">Aucun candidat trouvé.</p>;
  }

  return (
    <div className="space-y-4 h-[600px] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidats.map((c) => (
          <CandidatCard key={c.id} candidat={c} />
        ))}
      </div>
    </div>
  );
}