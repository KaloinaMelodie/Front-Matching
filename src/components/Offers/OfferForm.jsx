import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import UploadBox from "../UploadBox.jsx";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API ||
  "https://back-talentmatch-2-596715584253.us-central1.run.app";

const schema = z.object({
  titre: z.string().min(2, "Obligatoire"),
  entreprise: z.string().min(2, "Obligatoire"),
  contrat: z.string().min(2, "Obligatoire"),
  description: z.string().optional(),
  date_limite: z.string(),
  avantages_entreprise: z.array(z.string()).optional(),
  mission: z.array(z.string().min(1, "Mission ne peut pas être vide")),
  profil: z.array(z.string().min(1, "Profil ne peut pas être vide")),
  reference: z.string().default(""),
  contenu: z.string().default(""),
  location: z.string().min(2, "Obligatoire"),
});
const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
export default function OfferForm({ onMatch }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mission",
  });
  const {
    fields: avantages_fields,
    append: avantages_appends,
    remove: avantages_remove,
  } = useFieldArray({
    control,
    name: "avantages_entreprise",
  });
  const {
    fields: profil_fields,
    append: profil_appends,
    remove: profil_remove,
  } = useFieldArray({
    control,
    name: "profil",
  });
  const [preview, setPreview] = useState(null);
  const saveOffres = async (data) => {
    const newData = { ...data };
    newData.contenu=`avantages:${newData.avantages_entreprise.join(",")}. description:${newData.description}. 
    titre:${newData.titre}.entreprise:${newData.entreprise}.entreprise:${newData.entreprise}.location:${newData.location}.mission:${newData.mission.join(',')}
    profil:${newData.profil.join(',')}`
    newData.description = newData.description.split(".");
    newData.avantages_entreprise = newData.avantages_entreprise.join(",");
    newData.lien_offre = "";
    newData.lien_description = "";
    await searchMatch(newData);
  };
  const searchMatch = async (offre) => {
    const response = await fetch(
      `${API_BASE_URL}/api/matching/offre?top_n=20`,
      {
        method: "POST",
      body: JSON.stringify(offre),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    onMatch(res);
  };

  const submit = (data) => {
    toast
      .promise(saveOffres(data), {
        loading: "Matching en cours...",
        success: <b>Matching terminé!</b>,
        error: <b>Erreur de matching.</b>,
      })
      .catch((e) => {
        console.log(e);
      });
   
  };

  const handleFile = (file) => {
    setValue("jdFile", file);
    const fake = {
      titre: "Senior React Developer",
      entreprise: "ACME Corp.",
      location: "Paris / Remote",
      skills: "React, TypeScript, AWS",
      description: "Build and maintain a large-scale SaaS platform.",
    };
    setPreview(fake);
    Object.entries(fake).forEach(([k, v]) => setValue(k, v));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* <UploadBox onFile={handleFile} /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Intitulé du poste"
            field="titre"
            register={register}
            errors={errors}
          />
          <Input
            label="Entreprise"
            field="entreprise"
            register={register}
            errors={errors}
          />
          <Input
            label="Contrat"
            field="contrat"
            register={register}
            errors={errors}
          />
          <Input
            label="Adresse"
            field="location"
            register={register}
            errors={errors}
          />
          <Input
            label="Date limite"
            type="date"
            field="date_limite"
            register={register}
            errors={errors}
          />
        </div>

        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avantages de l'entreprise
          </label>
          {avantages_fields.map((field, index) => (
            <div className="flex gap-5 mb-4" key={field.id}>
              <input
                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
                {...register(`avantages_entreprise.${index}`)}
              />
              <button
                className="rounded-md bg-red-700 p-2 text-white"
                type="button"
                onClick={() => avantages_remove(index)}
              >
                Effacer
              </button>
              {errors.avantages_entreprise?.[index] && (
                <p>{errors.avantages_entreprise[index]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            className="rounded-md bg-green-600 p-2 text-white"
            onClick={() => avantages_appends("")}
          >
            Ajouter
          </button>
        </div>
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Missions
          </label>
          {fields.map((field, index) => (
            <div className="flex gap-5 mb-4" key={field.id}>
              <input
                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
                {...register(`mission.${index}`)}
              />
              <button
                className="rounded-md bg-red-700 p-2 text-white"
                type="button"
                onClick={() => remove(index)}
              >
                Effacer
              </button>
              {errors.mission?.[index] && (
                <p>{errors.mission[index]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            className="rounded-md bg-green-600 p-2 text-white"
            onClick={() => append("")}
          >
            Ajouter
          </button>
        </div>
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profil
          </label>
          {profil_fields.map((field, index) => (
            <div className="flex gap-5 mb-4" key={field.id}>
              <input
                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
                {...register(`profil.${index}`)}
              />
              <button
                className="rounded-md bg-red-700 p-2 text-white"
                type="button"
                onClick={() => profil_remove(index)}
              >
                Effacer
              </button>
              {errors.profil?.[index] && <p>{errors.profil[index]?.message}</p>}
            </div>
          ))}
          <button
            type="button"
            className="rounded-md bg-green-600 p-2 text-white"
            onClick={() => profil_appends("")}
          >
            Ajouter
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Summarise the position in a few lines"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full sm:w-auto px-8 py-2 text-base font-semibold"
        >
          Find matching candidates
        </button>
      </form>

      {preview && (
        <div className="mt-10 p-6 bg-white rounded-xl border border-primary/20 shadow-md">
          <h3 className="font-semibold text-primary mb-4 text-lg">
            Preview extracted from Job Description
          </h3>
          <ul className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {Object.entries(preview).map(([k, v]) => (
              <li key={k} className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {k}
                </span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function Input({ label, field, register, errors, type }) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...(type && { type })}
        {...register(field)}
        className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
        placeholder={label}
      />
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>
      )}
    </div>
  );
}
