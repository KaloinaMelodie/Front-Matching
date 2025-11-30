import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import CandidatePage from "./pages/Candidats/CandidatePage.jsx";
import OfferPage from "./pages/Offers/OfferPage.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/Authentification/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
         
          <Navbar />

          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/candidate" element={<CandidatePage />} />
              <Route path="/offer" element={<OfferPage />} />
            </Routes>
          </main>

          <Toaster position="top-center" reverseOrder={false} />
        </div>
    
    </AuthProvider>
  );
}
