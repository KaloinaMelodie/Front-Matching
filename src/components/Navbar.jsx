import { Link, NavLink } from "react-router-dom";
import { Briefcase, UserCircle } from "lucide-react";
import LoginPopup from "./Authentification/LoginPopup";
import { useAuth } from "./Authentification/AuthContext";
import { useState } from "react";

const navItem =
  "inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-black hover:text-white transition";

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-black">
            MatchMaker
          </Link>

          <nav className="space-x-4 flex items-center">
            {user ? (
                  <>
                      {user.role === "candidat" && (
                        <NavLink to="/candidate" className={navItem}>
                          <UserCircle size={18} /> Candidate
                        </NavLink>
                      )}

                      {user.role === "recruteur" && (
                        <NavLink to="/offer" className={navItem}>
                          <Briefcase size={18} /> Recruiter
                        </NavLink>
                      )}

                      <button onClick={logout} className="ml-4 px-3 py-2 bg-gray-800 text-white rounded">
                        Se déconnecter
                      </button>
                  </>
                ) : (
                      <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 bg-black text-white rounded">
                        Se connecter
                      </button>
              )}
          </nav>
        </div>
      </header>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(credentials) => {
          login(credentials);
          setIsLoginOpen(false);
        }}
      />
    </>
  );
}
