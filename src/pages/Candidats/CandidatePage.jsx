// src/pages/Candidats/CandidatePage.jsx
import { useState } from "react";
import CandidateForm from "../../components/CandidateForm.jsx";
import MatchList from "../../components/MatchList.jsx";
import OffresList from "../Offers/OffresList.jsx";
import LoginPopup from "../../components/Authentification/LoginPopup.jsx";
import { useAuth } from "../../components/Authentification/AuthContext.jsx";
import CandidateImportPage from "../../components/CandidateProfile/CandidateImportPage.jsx";

export default function CandidatePage() {
  const [matches, setMatches] = useState([]);
  const [showLogin, setShowLogin] = useState(false); 
  const { user, login } = useAuth();

  if (!user) {
    return (
      <section className="p-6">
        <div className="text-center bg-red-100 border border-red-400 p-8 rounded-lg shadow">
          <p className="text-red-700 mb-4 font-medium">
            Vous devez être connecté pour créer un profil candidat et voir vos correspondances.
          </p>
          {/* <button
            onClick={() => setShowLogin(true)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Se connecter
          </button> */}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Offres disponibles</h2>
          <OffresList />
        </div>

        <LoginPopup
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={async (credentials) => {
            const role = "candidat"; // rôle défini localement
            const result = await login(credentials.email, credentials.password,role);

            if (result.success) {
              setShowLogin(false);
            } else {
              alert(result.message); // ou setError(result.message)
            }
          }}
        />
      </section>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Matching Candidat</h1>

      <CandidateImportPage onMatch={setMatches} />

      {matches.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Offres correspondantes</h2>
          <MatchList items={matches} type="offer" />
        </div>
      )}
    </section>
  );
}
