import { List, ListItem, ListItemSuffix, Chip } from "@material-tailwind/react";
import ExperiencesProTimeLine from "./ExperiencesProTimeLine";
import FormationTimeLine from "./FormationTimeLine";
export default function DetailsMatch({ item }) {
  const colors = [
    "blue",
    "red",
    "green",
    "amber",
    "pink",
    "indigo",
    "purple",
    "teal",
    "cyan",
  ];
  return (
    <>
      <div>
        <h1>
          {item.candidat.informations_personnelles.nom}{" "}
          {item.candidat.informations_personnelles.prenom}
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="font-semibold text-gray-700">Adresse:</p>
          <p className="text-gray-600">
            {item.candidat.informations_personnelles.adresse}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <p className="font-semibold text-gray-700">Sexe:</p>
          <p className="text-gray-600">
            {item.candidat.informations_personnelles.sexe}
          </p>
        </div>
      </div>
      <div>
        <small>{item.candidat.informations_personnelles.email}</small>
      </div>
      {item.candidat.experiences_professionnelles.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Expériences professionnelles</h1>
          <div className="w-[32rem] ">
            <ExperiencesProTimeLine
              experiences_professionnelles={
                item.candidat.experiences_professionnelles
              }
            />
          </div>
        </div>
      )}

      {item.candidat.formation.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Formations</h1>
          <div className="w-[32rem] ">
            <FormationTimeLine formation={item.candidat.formation} />
          </div>
        </div>
      )}
      {item.candidat.langues.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Langues</h1>
          <List>
            {item.candidat.langues.map((langue) => (
              <ListItem>
                {langue.langue_maitrisee}
                <ListItemSuffix>
                  <Chip
                    value={langue.niveau_de_maitrise}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {item.candidat.certifications.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Certifications</h1>
          <List>
            {item.candidat.certifications.map((certification) => (
              <ListItem>
                {certification.titre}
                <ListItemSuffix>
                  <Chip
                    value={certification.dates_d_obtention}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {item.candidat.passe_temps.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Passe temps</h1>
          <div className="grid grid-cols-3 gap-2">
            {item.candidat.passe_temps.map((hobby, index) => (
              <Chip color={colors[index % 9]} value={hobby.nom} />
            ))}
          </div>
        </div>
      )}
      {item.candidat.competences.competences_techniques.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Compétences technique</h1>
          <div className="grid grid-cols-3 gap-2">
            {item.candidat.competences.competences_techniques.map((competence, index) => (
              <Chip color={colors[index % 9]} value={competence} />
            ))}
          </div>
        </div>
      )}
        {item.candidat.competences.competences_comportementales_soft_skills.length > 0 && (
        <div className="mt-5 mb-5">
          <h1 className="mb-4">Compétences transversales</h1>
          <div className="grid grid-cols-3 gap-2">
            {item.candidat.competences.competences_comportementales_soft_skills.map((competence, index) => (
              <Chip color={colors[index % 9]} value={competence} />
            ))}
          </div>
        </div>
      )}

    </>
  );
}
