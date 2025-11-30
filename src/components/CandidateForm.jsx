import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import UploadBox from './UploadBox.jsx';

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Invalid'),
  location: z.string().min(2, 'Required'),
  skills: z.string().min(2, 'Required'),
  experience: z.string().optional(),
});

export default function CandidateForm({ onMatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const [preview, setPreview] = useState(null);

  const submit = () => {
    onMatch([
      { id: 1, title: 'Frontend Developer', company: 'ACME', location: 'Remote' },
      { id: 2, title: 'Full-stack Engineer', company: 'Globex', location: 'Paris' },
    ]);
  };

  const handleFile = (file) => {
    setValue('cvFile', file);
    const fake = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+33 6 01 02 03 04',
      location: 'Antananarivo',
      skills: 'React, Node, AWS',
      experience: '3 years @ ACME Inc.',
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
        <UploadBox onFile={handleFile} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Input label="Full name" field="fullName" register={register} errors={errors} />
          <Input label="Email" field="email" register={register} errors={errors} />
          <Input label="Phone" field="phone" register={register} errors={errors} />
          <Input label="Location" field="location" register={register} errors={errors} />
        </div>

        <Input
          label="Skills (comma separated)"
          field="skills"
          register={register}
          errors={errors}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience summary
          </label>
          <textarea
            {...register('experience')}
            rows={3}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Short paragraph about your recent role"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full sm:w-auto px-8 py-2 text-base font-semibold"
        >
          Find matching offers
        </button>
      </form>

      {preview && (
        <div className="mt-10 p-6 bg-white rounded-xl border border-primary/20 shadow-md">
          <h3 className="font-semibold text-primary mb-4 text-lg">
            Preview extracted from CV
          </h3>
          <ul className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {Object.entries(preview).map(([k, v]) => (
              <li key={k} className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-gray-500">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function Input({ label, field, register, errors }) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
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
