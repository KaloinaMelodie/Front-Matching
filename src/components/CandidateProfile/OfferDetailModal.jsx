export default function OfferDetailModal({ open, offer, onClose }) {
  if (!open || !offer) return null;

  
    console.log(offer)

  const {
    titre,
    entreprise,
    contrat,
    date_limite,
    avantages_entreprise,
    mission,
    profil,
    description,
    lien_offre,
    lien_description,
    score,
  } = offer;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-3">
      <div className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">
              {titre || "Offre"}
              {typeof score === "number" && (
                <span className="ml-2 text-xs text-gray-500">
                  {(score * 100).toFixed(0)}% match
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600">
              {entreprise || "(Entreprise)"} — {contrat || "Contrat non précisé"}
            </p>
          </div>
          <button className="btn-secondary" onClick={onClose}>Fermer</button>
        </div>

        <div className="mt-4 grid gap-4">
          {date_limite && (
            <InfoLine label="Date limite" value={date_limite} />
          )}
          {avantages_entreprise && (
            <InfoLine label="À propos" value={avantages_entreprise} />
          )}

          {Array.isArray(description) && description.length > 0 && (
            <Block title="Description">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {description.filter(Boolean).map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </Block>
          )}

          {Array.isArray(mission) && mission.length > 0 && (
            <Block title="Missions">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {mission.filter(Boolean).map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </Block>
          )}

          {Array.isArray(profil) && profil.length > 0 && (
            <Block title="Profil recherché">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {profil.filter(Boolean).map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </Block>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {lien_offre && (
              <a href={lien_offre} target="_blank" rel="noreferrer" className="btn-primary">
                Voir l’annonce
              </a>
            )}
            {lien_description && lien_description !== lien_offre && (
              <a href={lien_description} target="_blank" rel="noreferrer" className="btn-secondary">
                Description détaillée
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <span className="font-medium">{label} :</span> {value}
    </p>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <h4 className="text-sm font-semibold text-primary mb-1">{title}</h4>
      {children}
    </section>
  );
}
