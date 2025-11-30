import React, { useMemo, useState } from "react";

// MatchMaker - Single-file React component (drop into a Vite + React project as src/App.jsx)
// Styling uses Tailwind classes (assumes Tailwind is configured in the project)

const RAW_OFFERS = [
  {
    _id: { $oid: "68aad899a517b82777d29284" },
    titre: "Développeurs Java - Réf. : Java_082025",
    entreprise: "Anonyme",
    contrat: "Contrat CDI",
    description: [
      "Dans le cadre d’un projet de modernisation applicative, nous recrutons plusieurs développeurs Java/JEE expérimentés, curieux et motivés, souhaitant s’impliquer dans une mission structurante et évolutive.…                        ",
      "Date limite : 31/08/2025",
    ],
    date_limite: "31/08/2025",
    avantages_entreprise: "Externalisation informatique",
    mission: [
      "Dans le cadre d’un projet de modernisation applicative, nous recrutons plusieurs développeurs Java/JEE expérimentés, curieux et motivés, souhaitant s’impliquer dans une mission structurante et évolutive.",
      "VOS MISSIONS :",
      "- Prendre en main l’application existante et en comprendre les principaux mécanismes fonctionnels et techniques",
      "- Participer à la définition d’une stratégie de migration progressive vers une architecture plus moderne",
      "- Contribuer à l’évolution du code en appliquant les bonnes pratiques de développement (lisibilité, modularité, maintenabilité)",
      "- Réaliser des tests réguliers pour assurer la stabilité et la fiabilité des évolutions apportées",
      "- Documenter les travaux réalisés de manière claire et utile pour les autres membres de l’équipe",
      "- Collaborer avec les autres développeurs, les équipes métiers et les référents techniques dans une logique d’amélioration continue",
      "ENVIRONNEMENT TECHNIQUE :",
      "- Java / JEE, avec une application en cours de modernisation",
      "- Framework MVC : une connaissance des frameworks comme Spring MVC, JSF, ou Struts est un plus — la maîtrise d’un seul suffit",
      "- Technologies front-end classiques : JSP, HTML, CSS, JavaScript…",
      "- Bases de données relationnelles : Oracle, SQL",
      "- Outils d’équipe : Git, outils de tests unitaires, documentation collaborative...",
    ],
    profil: [
      "· Diplôme Bac+5 minimum (Master 2 en informatique ou équivalent)",
      "· Expérience significative en développement Java/JEE",
      "· Capacité à travailler sur une base de code existante et ses évolutions",
      "· Bonnes bases en architecture logicielle et en bonnes pratiques de développement",
      "· Goût pour le travail en équipe, sens de l’analyse, autonomie",
      "· Français parlé",
      "POURQUOI CE PROJET ?",
    ],
    reference: "Réf. : Java_082025",
    lien_offre:
      "https://www.portaljob-madagascar.com/emploi/view/eludes-services-developpeurs-java-ref-java-082025173539",
    lien_description:
      "https://www.portaljob-madagascar.com/emploi/view/eludes-services-developpeurs-java-ref-java-082025173539",
    contenu:
      "Titre: Développeurs Java - Réf. : Java_082025, Entreprise: Anonyme, Contrat: Contrat CDI, Date limite: 31/08/2025, Avantages: Externalisation informatique, Description: Dans le cadre d’un projet de modernisation applicative, nous recrutons plusieurs développeurs Java/JEE expérimentés, curieux et motivés, souhaitant s’impliquer dans une mission structurante et évolutive.…                        .Date limite : 31/08/2025, Mission: Dans le cadre d’un projet de modernisation applicative, nous recrutons plusieurs développeurs Java/JEE expérimentés, curieux et motivés, souhaitant s’impliquer dans une mission structurante et évolutive..VOS MISSIONS :.- Prendre en main l’application existante et en comprendre les principaux mécanismes fonctionnels et techniques.- Participer à la définition d’une stratégie de migration progressive vers une architecture plus moderne.- Contribuer à l’évolution du code en appliquant les bonnes pratiques de développement (lisibilité, modularité, maintenabilité).- Réaliser des tests réguliers pour assurer la stabilité et la fiabilité des évolutions apportées.- Documenter les travaux réalisés de manière claire et utile pour les autres membres de l’équipe.- Collaborer avec les autres développeurs, les équipes métiers et les référents techniques dans une logique d’amélioration continue.ENVIRONNEMENT TECHNIQUE :.- Java / JEE, avec une application en cours de modernisation.- Framework MVC : une connaissance des frameworks comme Spring MVC, JSF, ou Struts est un plus — la maîtrise d’un seul suffit.- Technologies front-end classiques : JSP, HTML, CSS, JavaScript….- Bases de données relationnelles : Oracle, SQL.- Outils d’équipe : Git, outils de tests unitaires, documentation collaborative..., Profil: · Diplôme Bac+5 minimum (Master 2 en informatique ou équivalent).· Expérience significative en développement Java/JEE.· Capacité à travailler sur une base de code existante et ses évolutions.· Bonnes bases en architecture logicielle et en bonnes pratiques de développement.· Goût pour le travail en équipe, sens de l’analyse, autonomie.· Français parlé.POURQUOI CE PROJET ?.· Un challenge technique stimulant, avec un vrai rôle de moteur dans l’évolution d’un système clé.· Un environnement structuré, mais à taille humaine, où la collaboration est essentielle.· Une montée en compétences continue, avec des perspectives vers des technos plus récentes à moyen terme.· Une entreprise stable, attentive à la qualité et au bien-être de ses équipes.CE QUE NOUS VOUS OFFRONS :.· Un CDI dans une entreprise solide et en croissance.· Prime de fin d’année.· Prime d’ancienneté.· Primes liées à l’implication, la performance et la contribution collective.· Des perspectives d’évolution pour les profils motivés et ambitieux.· Un cadre de travail agréable, alliant professionnalisme et bienveillance.· Une ambiance d’équipe conviviale, avec des moments partagés :.o Fêtes d’anniversaire.o Activités sportives.o Sorties et événements organisés régulièrement.· Des outils modernes, une organisation structurée, et une direction à l’écoute.Vous êtes curieux(se), rigoureux(se) et passionné(e) par la qualité votre métier d’informaticien ? On vous attend pour relever ce défi ensemble !, Référence: Réf. : Java_082025, Lien offre: https://www.portaljob-madagascar.com/emploi/view/eludes-services-developpeurs-java-ref-java-082025173539, Lien description: https://www.portaljob-madagascar.com/emploi/view/eludes-services-developpeurs-java-ref-java-082025173539",
  },
];

function formatDateFR(dStr) {
  // expected format dd/mm/yyyy or iso-like
  if (!dStr) return "";
  return dStr;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [contractFilter, setContractFilter] = useState("Tous");
  const [companyFilter, setCompanyFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  // In a real app you would fetch offers from an API and implement server-side filtering/pagination.
  const offers = RAW_OFFERS; // replace with fetched data or props

  const companies = useMemo(() => ["Tous", ...new Set(offers.map((o) => o.entreprise))], [offers]);
  const contracts = useMemo(() => ["Tous", ...new Set(offers.map((o) => o.contrat))], [offers]);

  const filtered = useMemo(() => {
    let list = offers.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          (o.titre || "").toLowerCase().includes(q) ||
          (o.entreprise || "").toLowerCase().includes(q) ||
          (o.contenu || "").toLowerCase().includes(q)
      );
    }

    if (contractFilter !== "Tous") list = list.filter((o) => o.contrat === contractFilter);
    if (companyFilter !== "Tous") list = list.filter((o) => o.entreprise === companyFilter);

    if (sortBy === "date") {
      list.sort((a, b) => {
        // naive dd/mm/yyyy compare
        const pa = a.date_limite?.split("/").reverse().join("-") || "";
        const pb = b.date_limite?.split("/").reverse().join("-") || "";
        return pa < pb ? -1 : pa > pb ? 1 : 0;
      });
    }

    return list;
  }, [offers, query, contractFilter, companyFilter, sortBy]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function gotoPage(n) {
    const p = Math.max(1, Math.min(pages, n));
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return ( 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left: filters */}
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
              {contracts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium">Entreprise</label>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="mt-2 mb-3 w-full rounded border p-2 text-sm"
            >
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
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
                  setQuery("");
                  setContractFilter("Tous");
                  setCompanyFilter("Tous");
                  setSortBy("relevance");
                }}
                className="px-3 py-2 rounded border"
              >
                Réinitialiser
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <div>Offres trouvées: <strong className="text-black">{total}</strong></div>
            </div>
          </aside>

          {/* Right: list */}
          <main className="md:col-span-3">
            {/* Top controls */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="text-sm">Par page:</label>
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

              <div className="text-sm text-gray-600">Page {page} / {pages}</div>
            </div>

            <div className="space-y-4">
              {paginated.map((offer) => (
                <article key={offer._id.$oid} className="bg-white rounded-lg p-5 shadow">
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
                      >Voir l'offre</a>
                      <a
                        href={offer.lien_description}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-black text-white rounded text-sm"
                      >Description</a>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 text-sm text-gray-700">
                      <p className="line-clamp-5">{(offer.description || []).join(" ")}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div><strong>Date limite :</strong> {formatDateFR(offer.date_limite)}</div>
                      <div className="mt-2"><strong>Avantages :</strong> {offer.avantages_entreprise}</div>
                      <div className="mt-2"><strong>Réf :</strong> {offer.reference}</div>
                    </div>
                  </div>

                </article>
              ))}

              {paginated.length === 0 && (
                <div className="bg-white p-6 rounded shadow text-center text-gray-600">Aucune offre trouvée.</div>
              )}
            </div>

            {/* Pagination controls */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <button
                  onClick={() => gotoPage(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-2 rounded border mr-2 disabled:opacity-50"
                >Précédent</button>

                <button
                  onClick={() => gotoPage(page + 1)}
                  disabled={page >= pages}
                  className="px-3 py-2 rounded border disabled:opacity-50"
                >Suivant</button>
              </div>

              <div className="text-sm text-gray-600">{total} offre(s) — page {page} / {pages}</div>
            </div>
          </main>
        </div>

  );
}
