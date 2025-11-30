import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // ✅ import du contexte d’auth

const LoginPopup = ({ isOpen, onClose }) => {
  const { login } = useAuth(); // ✅ fonction login depuis AuthContext
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(""); // état pour le rôle

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const result = await login(email, password , role); // passe le rôle au login
  
      if (result.success) {
        onClose(); // succès
      } else {
        setError(result.message); // affiche le message exact du backend
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative animate-fadeIn">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Connexion
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 mb-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
            } text-white py-2 rounded-md transition`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-3">
          Pas encore inscrit ?{" "}
          <a href="#" className="text-black hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
