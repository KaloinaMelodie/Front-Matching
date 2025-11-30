export default function OffersList() {
  return (
    <>
      <h2 className="text-2xl text-center mb-10">Les offres</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className=" p-4 offer-card">
          <div className="offer-card-title">
            <h2 className="text-xl text-yellow-600">Nom offre</h2>
            <h2 className="text-sm text-gray-500">Date de publication</h2>
          </div>
          <div>
            <p className="text-lg">Nom entreprise</p>
            <p>Lieu</p>
            <p>Type</p>
          </div>
        </div>
        <div className=" p-4 offer-card">
          <div className="offer-card-title">
            <h2 className="text-xl text-yellow-600">Nom offre</h2>
            <h2 className="text-sm text-gray-500">Date de publication</h2>
          </div>
          <div>
            <p className="text-lg">Nom entreprise</p>
            <p>Lieu</p>
            <p>Type</p>
          </div>
        </div>{" "}
        <div className=" p-4 offer-card">
          <div className="offer-card-title">
            <h2 className="text-xl text-yellow-600">Nom offre</h2>
            <h2 className="text-sm text-gray-500">Date de publication</h2>
          </div>
          <div>
            <p className="text-lg">Nom entreprise</p>
            <p>Lieu</p>
            <p>Type</p>
          </div>
        </div>
      </div>
    </>
  );
}
