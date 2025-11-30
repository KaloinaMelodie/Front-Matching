// OffresList.jsx
import React, { useEffect, useState, useMemo } from "react";
import { openDB } from "idb";
import { fetchOffres } from "../../controllers/OffresController";

// Formatage date simple
function formatDateFR(dStr) {
  if (!dStr) return "";
  return dStr;
}

const initDB = async () => {
  return await openDB("OffresDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offres")) {
        db.createObjectStore("offres");
      }
    },
  });
};

const loadOffres = async () => {
  const db = await initDB();
  const cached = await db.get("offres", "all");
  if (cached) return cached;

  const data = await fetchOffres(); 
  await db.put("offres", data, "all");
  return data;
};

export default function OffresList() {
  const [query, setQuery] = useState("");
  const [contractFilter, setContractFilter] = useState("Tous");
  const [companyFilter, setCompanyFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadOffres();
        setOffers(data);
      } catch (err) {
        console.error("Erreur chargement offres:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let list = offers.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          (o.titre || "").toLowerCase().includes(q) ||
          (o.entreprise || "").toLowerCase().includes(q) ||
          (o.description || []).join(" ").toLowerCase().includes(q)
      );
    }

    if (contractFilter !== "Tous") list = list.filter((o) => o.contrat === contractFilter);
    if (companyFilter !== "Tous") list = list.filter((o) => o.entreprise === companyFilter);

    if (sortBy === "date") {
      list.sort((a, b) => {
        const pa = a.date_limite?.split("/").reverse().join("-") || "";
        const pb = b.date_limite?.split("/").reverse().join("-") || "";
        return pa < pb ? -1 : pa > pb ? 1 : 0;
      });
    }

    return list;
  }, [offers, query, contractFilter, companyFilter, sortBy]);

  // Pagination
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const gotoPage = (n) => {
    const p = Math.max(1, Math.min(pages, n));
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const companies = useMemo(() => ["Tous", ...new Set(offers.map((o) => o.entreprise))], [offers]);
  const contracts = useMemo(() => ["Tous", ...new Set(offers.map((o) => o.contrat))], [offers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Filtres */}
      <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="font-medium mb-3">Filtres</h2>
        <label className="block text-sm font-medium">Recherche</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Titre, entreprise, mot-clé..."
          className="mt-2 mb-3 w-full rounded border p-2 text-sm"
        />
        <label className="block text-sm font-medium">Contrat</label>
        <select
          value={contractFilter}
          onChange={(e) => setContractFilter(e.target.value)}
          className="mt-2 mb-3 w-full rounded border p-2 text-sm"
        >
          {contracts.map((c , i) => (
            <option key={c + i} value={c}>{c}</option>
          ))}
        </select>
        <label className="block text-sm font-medium">Entreprise</label>
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="mt-2 mb-3 w-full rounded border p-2 text-sm"
        >
          {companies.map((c , i) => (
            <option key={c + i} value={c}>{c}</option>
          ))}
        </select>
        <label className="block text-sm font-medium">Trier</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-2 mb-3 w-full rounded border p-2 text-sm"
        >
          <option value="relevance">Pertinence</option>
          <option value="date">Date limite</option>
        </select>
        <div className="mt-4">
          <button
            onClick={() => {
              setQuery(""); setContractFilter("Tous"); setCompanyFilter("Tous"); setSortBy("relevance");
            }}
            className="px-3 py-2 rounded border"
          >
            Réinitialiser
          </button>
        </div>
      </aside>

      {/* Liste */}
      <main className="md:col-span-3">
        {loading && <div className="p-4 text-center text-gray-600">Chargement...</div>}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm">Afficher par:</label>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="rounded border p-1"
            >
              {[6, 12, 24].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Page {page} / {pages}
          </div>
        </div>

<div className="space-y-4 h-[600px] overflow-y-auto">
  {paginated.map((offer) => (
    <article key={offer._id} className="bg-white rounded-lg p-5 shadow mb-4">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{offer.titre}</h3>
          <div className="text-sm text-gray-600">{offer.entreprise} • {offer.contrat}</div>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-3">
          <a
            href={offer.lien_offre}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 border rounded text-sm"
          >
            Voir l'offre
          </a>
          <a
            href={offer.lien_description}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-black text-white rounded text-sm"
          >
            Description
          </a>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 text-sm text-gray-700">
          <p className="line-clamp-5">{(offer.description || []).join(" ")}</p>
        </div>
        <div className="text-sm text-gray-600">
          <div><strong>Date limite :</strong> {formatDateFR(offer.date_limite)}</div>
          <div className="mt-2"><strong>Avantages :</strong> {(offer.avantages_entreprise || "").slice(0, 50)}...</div>
          <div className="mt-2"><strong>Réf :</strong> {offer.reference}</div>
        </div>
      </div>
    </article>
  ))}

  {paginated.length === 0 && !loading && (
    <div className="bg-white p-6 rounded shadow text-center text-gray-600">Aucune offre trouvée.</div>
  )}
</div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <button onClick={() => gotoPage(page-1)} disabled={page<=1} className="px-3 py-2 rounded border mr-2 disabled:opacity-50">Précédent</button>
            <button onClick={() => gotoPage(page+1)} disabled={page>=pages} className="px-3 py-2 rounded border disabled:opacity-50">Suivant</button>
          </div>
          <div className="text-sm text-gray-600">{filtered.length} offre(s) — page {page} / {pages}</div>
        </div>
      </main>
    </div>
  );
}
