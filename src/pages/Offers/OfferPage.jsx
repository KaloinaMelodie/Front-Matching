import { useState } from "react";
import { useAuth } from "../../components/Authentification/AuthContext";
import OfferForm from "../../components/Offers/OfferForm.jsx";
import MatchListOffers from "../../components/Offers/MatchListOffers.jsx";
import CandidatsListProfile from "../Candidats/CandidatsListProfile.jsx";
import LoginPopup from "../../components/Authentification/LoginPopup.jsx";

export default function OfferPage() {
  const [matches, setMatches] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const { user, login } = useAuth();

  return (
    <section className="p-6">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Matching Offres</h1>
          <OfferForm onMatch={setMatches} />
          {matches.length > 0 && <MatchListOffers items={matches} />}
        </>
      ) : (
        <div>
          <div className="text-center bg-red-100 border border-red-400 p-8 rounded-lg shadow">
            <p className="text-red-700 font-medium mb-4">
              Vous devez être connecté pour créer une offre et voir les matchs.
            </p>
            {/* <button
              onClick={() => setShowLogin(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Se connecter
            </button> */}
          </div>
          <CandidatsListProfile items={matches} type="candidate" />
        </div>
      )}

      <LoginPopup
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={async (credentials) => {
          const role = "recruteur"; // rôle défini localement
          const result = await login(credentials.email, credentials.password, role);

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
