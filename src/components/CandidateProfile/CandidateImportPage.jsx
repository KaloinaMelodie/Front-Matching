import { useState,useRef } from "react";
import CandidateFullForm from "./CandidateFullForm";
import { api } from "../../api/CandidatService";
import MatchList from "../MatchList";
import OfferDetailModal from "./OfferDetailModal";

const getId = (obj) =>
  obj?.id || obj?._id || obj?._id?.$oid || obj?._id?.toString?.() || "";

const toDisplay = (row) => {
  const off = row?.offre || row; 
  return {
    id: getId(off) || getId(row),
    title: off.titre || off.title || "Offre",
    company: off.entreprise || off.company || "(Entreprise)",
    location: off.lieu || off.location || off.ville || "—",
    score: typeof row?.score === "number" ? row.score : undefined,
    raw: off, 
  };
};

export default function CandidateImportPage() {

  const [defaults, setDefaults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [offers, setOffers] = useState([]);
  const [rawOffers, setRawOffers] = useState(null); 
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleFile = async (file) => {
    setErr("");
    setLoading(true);
    setOffers([]); setRawOffers(null); setSelectedOffer(null);
    try {
      const textRes = await api.extractText(file);
      const structured = await api.extractStructured({
        filename: textRes.filename || file.name,
        mime: textRes.mime || file.type || "application/pdf",
        size_bytes: textRes.size_bytes ?? file.size,
        text: textRes.text || "",
        char_count: textRes.char_count ?? (textRes.text ? textRes.text.length : 0),
        sha256: textRes.sha256 || "",
      });
      setDefaults(structured);
    } catch (e) {
      console.error(e);
      const text = e?.message;
      let message = "";
        if (text.includes('"detail"')) {
          try {
            const parsed = JSON.parse(text);
            message = parsed.detail || message;
          } catch {
            const match = text.match(/"detail":"([^"]+)"/);
            if (match) message = match[1];
          }
        } else if (text) {
          message = text;
        }
        setErr(message || "Échec de l'extraction / structuration");
      } finally {
        setLoading(false);
      }
    };

  const handleUseSample = async () => {
    setErr("");
    setLoading(true);
    setOffers([]); setRawOffers(null); setSelectedOffer(null);
    try {
      const sampleBody = {
        filename: "11848 - Tendry Andriamilamina.pdf",
        mime: "application/pdf",
        size_bytes: 749772,
        text: "…(ton texte d'exemple)…",
        char_count: 1533,
        sha256: "4df366f447f6d4518eca653520675b5582a9933fa36c45fa048a8681abe3a901",
      };
      const structured = await api.extractStructured(sampleBody);
      setDefaults(structured);
    } catch (e) {
      console.error(e);
      setErr(e?.message || "Échec (exemple) de structuration");
    } finally {
      setLoading(false);
    }
  };

  const abortRef = useRef(null);

  const begin = (reason) => {
    abortRef.current?.abort(reason);
    abortRef.current = new AbortController();
    return abortRef.current.signal;
  };

  const handleSubmit = async (payload) => {
    setErr("");
    setLoading(true);
    setOffers([]); setRawOffers(null); setSelectedOffer(null);

    const signal = begin('submit');

    try {
      const created = await api.createCandidate(payload, { signal });
      const id = getId(created);
      if (!id) throw new Error("ID candidat introuvable dans la réponse.");

      const matches = await api.matchByCv(id, { top: 20, signal });
      const list = (Array.isArray(matches) ? matches : []).map(toDisplay);
      setOffers(list);
    } catch (e) {
      if (e.name !== 'AbortError') setErr(e.message || "Échec lors de la création/matching");
    } finally {
      setLoading(false);
    }
  };

  const openOffer = (item) => {
    if (!item?.raw) return;
    const withScore = { ...item.raw };
    if (typeof item.score === "number") withScore.score = item.score;
    setSelectedOffer(withScore);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Importer un CV & remplir automatiquement</h1>
        <p className="text-gray-600">
          1) Uploade un PDF/Docx/Doc — ou — 2) Utilise l’exemple. Puis valide pour créer le candidat et afficher les offres matchées.
        </p>
      </header>

      <div className="flex gap-3 mb-6">
        <label className="inline-flex items-center gap-2 btn-secondary cursor-pointer">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <span>📄 Uploader un CV</span>
        </label>

        <button type="button" className="btn-secondary" onClick={handleUseSample}>
          ⚡ Utiliser un exemple (sans fichier)
        </button>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 text-gray-700">
              <svg
                className="w-10 h-10 text-primary animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          </div>
        )}

      </div>

      {err && <div className="mb-4 text-red-600">{err}</div>}

      <CandidateFullForm
        defaultValues={defaults}
        onFile={handleFile}
        onSubmit={handleSubmit}
        submitting={loading}
        errorMsg={err}
      />

      <MatchList items={offers} type="offer" onOpen={openOffer} />

      <OfferDetailModal
        open={!!selectedOffer}
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
      />

    </div>
  );
}
