// src/components/CandidateFullForm.jsx
import { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const cls = {
  card: "bg-white border border-gray-100 shadow-lg rounded-xl p-6 space-y-8",
  h3: "font-semibold text-primary",
  addIcon:
    "inline-flex items-center gap-1 rounded-lg px-3 py-1 text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition",
  removeIcon:
    "inline-flex items-center justify-center rounded-lg px-3 py-1 text-sm bg-rose-50 text-rose-700 hover:bg-rose-100 transition",
  input:
    "rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40",
  chip:
    "inline-flex items-center gap-2 rounded-full text-xs px-3 py-1 bg-gray-100 text-gray-700",
  actionBar: "sm:col-span-2 flex justify-end",
  grid2: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  gridRow: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2",
  box: "border rounded-lg p-4 mb-4",
  dangerBtn:
    "btn-secondary bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-100",
  primaryBtn:
    "btn-primary px-8 py-2 font-semibold disabled:opacity-60",
};

const pretty = (raw) => {
  if (!raw) return "";
  const map = {
    "informations_personnelles.nom": "Nom",
    "informations_personnelles.prenom": "Prénom",
    "informations_personnelles.adresse": "Adresse",
    "informations_personnelles.sexe": "Sexe",
    "informations_personnelles.email": "Email",
    "informations_personnelles.numero_telephone": "Téléphone",
    "informations_personnelles.date_de_naissance":
      "Date de naissance (YYYY-MM-DD ou vide = null)",
  };
  if (map[raw]) return map[raw];

  const noIndex = String(raw).replace(/\[[^\]]+\]$/, "");
  const simple = noIndex.split(".").pop().replace(/_/g, " ");
  return simple.charAt(0).toUpperCase() + simple.slice(1);
};

export default function CandidateFullForm({
  onSubmit,
  defaultValues,
  onFile, 
  submitting,
  errorMsg,
}) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      informations_personnelles: {
        nom: "",
        prenom: "",
        adresse: "",
        sexe: "",
        date_de_naissance: null, // laisse vide pour null
        email: "",
        numero_telephone: "",
      },
      experiences_professionnelles: [
        {
          titre_du_poste: "",
          nom_de_l_entreprise: "",
          dates_de_debut_et_de_fin: "",
          missions_realisees: [""],
        },
      ],
      formation: [
        {
          diplome: "",
          etablissement: "",
          dates_de_debut_et_de_fin: "",
          specialite: "",
        },
      ],
      langues: [
        { langue_maitrisee: "", niveau_de_maitrise: "" },
      ],
      certifications: [
        { titre: "", dates_d_obtention: "" },
      ],
      passe_temps: [
        { nom: "" },
      ],
      competences: {
        competences_techniques: [""],
        competences_comportementales_soft_skills: [""],
      },
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const expFA  = useFieldArray({ control, name: "experiences_professionnelles" });
  const formFA = useFieldArray({ control, name: "formation" });
  const langFA = useFieldArray({ control, name: "langues" });
  const certFA = useFieldArray({ control, name: "certifications" });
  const ptFA   = useFieldArray({ control, name: "passe_temps" });
  const techFA = useFieldArray({ control, name: "competences.competences_techniques" });
  const softFA = useFieldArray({ control, name: "competences.competences_comportementales_soft_skills" });

  const submit = (values) => {
    if (values?.informations_personnelles?.date_de_naissance === "") {
      values.informations_personnelles.date_de_naissance = null;
    }
    values.competences.competences_techniques =
      (values.competences.competences_techniques || []).filter(Boolean);
    values.competences.competences_comportementales_soft_skills =
      (values.competences.competences_comportementales_soft_skills || []).filter(Boolean);

    values.experiences_professionnelles =
      (values.experiences_professionnelles || []).map((exp) => ({
        ...exp,
        missions_realisees: (exp.missions_realisees || []).filter(Boolean),
      }));

    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={cls.card}>
      {/* Informations perso */}
      <Section title="Informations personnelles" onAdd={null}>
        <div className={cls.grid2}>
          <Field label="informations_personnelles.nom" name="informations_personnelles.nom" register={register} errors={errors} required />
          <Field label="informations_personnelles.prenom" name="informations_personnelles.prenom" register={register} errors={errors} required />
          <Field label="informations_personnelles.adresse" name="informations_personnelles.adresse" register={register} errors={errors} />
          <Field label="informations_personnelles.sexe" name="informations_personnelles.sexe" register={register} errors={errors} />
          <Field label="informations_personnelles.email" name="informations_personnelles.email" register={register} errors={errors} />
          <Field label="informations_personnelles.numero_telephone" name="informations_personnelles.numero_telephone" register={register} errors={errors} />
          <Field label="informations_personnelles.date_de_naissance" name="informations_personnelles.date_de_naissance" register={register} errors={errors} />
        </div>
      </Section>

      <Section
        title="Expériences professionnelles"
        addIcon
        onAdd={() =>
          expFA.append({
            titre_du_poste: "",
            nom_de_l_entreprise: "",
            dates_de_debut_et_de_fin: "",
            missions_realisees: [""],
          })
        }
      >
        {expFA.fields.map((f, i) => (
          <div key={f.id} className={cls.box}>
            <div className={cls.grid2}>
              <Field label="titre_du_poste" name={`experiences_professionnelles.${i}.titre_du_poste`} register={register} errors={errors} niceLabel="Titre du poste" />
              <Field label="nom_de_l_entreprise" name={`experiences_professionnelles.${i}.nom_de_l_entreprise`} register={register} errors={errors} niceLabel="Entreprise" />
              <Field label="dates_de_debut_et_de_fin" name={`experiences_professionnelles.${i}.dates_de_debut_et_de_fin`} register={register} errors={errors} niceLabel="Dates (début / fin)" />
            </div>

            <ArrayString
              title="Missions réalisées"
              control={control}
              name={`experiences_professionnelles.${i}.missions_realisees`}
            />

            <div className="flex justify-end mt-6">
              <button type="button" className="btn-primary" onClick={() => expFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer l'éxperience</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Formation"
        addIcon
        onAdd={() => formFA.append({ diplome: "", etablissement: "", dates_de_debut_et_de_fin: "", specialite: "" })}
      >
        {formFA.fields.map((f, i) => (
          <div key={f.id} className={`${cls.box} ${cls.grid2}`}>
            <Field label="diplome" name={`formation.${i}.diplome`} register={register} errors={errors} niceLabel="Diplôme" />
            <Field label="etablissement" name={`formation.${i}.etablissement`} register={register} errors={errors} niceLabel="Établissement" />
            <Field label="dates_de_debut_et_de_fin" name={`formation.${i}.dates_de_debut_et_de_fin`} register={register} errors={errors} niceLabel="Dates (début / fin)" />
            <Field label="specialite" name={`formation.${i}.specialite`} register={register} errors={errors} niceLabel="Spécialité" />
            <div className={cls.actionBar}>
              <button type="button" className="btn-secondary" onClick={() => formFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Langues"
        addIcon
        onAdd={() => langFA.append({ langue_maitrisee: "", niveau_de_maitrise: "" })}
      >
        {langFA.fields.map((f, i) => (
          <div key={f.id} className={`${cls.box} ${cls.grid2}`}>
            <Field label="langue_maitrisee" name={`langues.${i}.langue_maitrisee`} register={register} errors={errors} niceLabel="Langue" />
            <Field label="niveau_de_maitrise" name={`langues.${i}.niveau_de_maitrise`} register={register} errors={errors} niceLabel="Niveau de maîtrise" />
            <div className={cls.actionBar}>
              <button type="button" className="btn-secondary" onClick={() => langFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Certifications"
        addIcon
        onAdd={() => certFA.append({ titre: "", dates_d_obtention: "" })}
      >
        {certFA.fields.map((f, i) => (
          <div key={f.id} className={`${cls.box} ${cls.grid2}`}>
            <Field label="titre" name={`certifications.${i}.titre`} register={register} errors={errors} niceLabel="Titre" />
            <Field label="dates_d_obtention" name={`certifications.${i}.dates_d_obtention`} register={register} errors={errors} niceLabel="Date d’obtention" />
            <div className={cls.actionBar}>
              <button type="button" className="btn-secondary" onClick={() => certFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Centres d’intérêt"
        addIcon
        onAdd={() => ptFA.append({ nom: "" })}
      >
        {ptFA.fields.map((f, i) => (
          <div key={f.id} className={`${cls.box} ${cls.grid2}`}>
            <Field label="nom" name={`passe_temps.${i}.nom`} register={register} errors={errors} niceLabel="Intérêt" />
            <div className={cls.actionBar}>
              <button type="button" className="btn-secondary" onClick={() => ptFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Compétences techniques"
        addIcon
        onAdd={() => techFA.append("")}
      >
        {techFA.fields.map((f, i) => (
          <div key={f.id} className={cls.gridRow}>
            <Field
              label={`competences.competences_techniques.${i}`}
              name={`competences.competences_techniques.${i}`}
              register={register}
              errors={errors}
              niceLabel="Compétence technique"
            />
            <div className="flex items-end">
              <button type="button" className="btn-secondary" onClick={() => techFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Soft skills"
        addIcon
        onAdd={() => softFA.append("")}
      >
        {softFA.fields.map((f, i) => (
          <div key={f.id} className={cls.gridRow}>
            <Field
              label={`competences.competences_comportementales_soft_skills.${i}`}
              name={`competences.competences_comportementales_soft_skills.${i}`}
              register={register}
              errors={errors}
              niceLabel="Soft skill"
            />
            <div className="flex items-end">
              <button type="button" className="btn-secondary" onClick={() => softFA.remove(i)} aria-label="Supprimer">
                <span aria-hidden>Supprimer</span>
              </button>
            </div>
          </div>
        ))}
      </Section>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <div className="pt-2">
        <button type="submit" disabled={submitting} className={cls.primaryBtn}>
          {submitting ? "Envoi..." : "Valider"}
        </button>
      </div>
    </form>
  );
}

function Section({ title, addIcon, onAdd, children }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h3 className={cls.h3}>{title}</h3>
        {onAdd && (
          <button type="button" className="btn-primary" onClick={onAdd} aria-label="Ajouter">
            <span aria-hidden>＋</span>
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function Field({ label, name, register, errors, required, niceLabel }) {
  const final = useMemo(() => niceLabel || pretty(label), [label, niceLabel]);
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">{final}</label>
      <input
        {...register(name, required ? { required: "Requis" } : undefined)}
        className={cls.input}
        placeholder={final}
      />
      {errors?.[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );
}

function ArrayString({ title, control, name }) {
  const fa = useFieldArray({ control, name });
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">{title}</label>
        <button type="button" className={cls.addIcon} onClick={() => fa.append("")} aria-label="Ajouter">
          <span aria-hidden>＋</span>
        </button>
      </div>
      <div className="space-y-2">
        {fa.fields.map((f, i) => (
          <div key={f.id} className="flex gap-2">
            <input
              {...control.register?.(`${name}.${i}`)}
              className={cls.input + " flex-1"}
              placeholder={`${title} #${i + 1}`}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => fa.remove(i)}
              aria-label="Supprimer"
            >
              <span aria-hidden>Supprimer</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
