// frontend/pages/update_student.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getAllStudents, updateStudent, Student } from '../lib/students';

interface AcademicLevel {
  id: number;
  level: string;
}

export default function UpdateStudent() {
  const { query, push } = useRouter();
  const id = typeof query.id === 'string' ? parseInt(query.id, 10) : null;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Partial<Student>>();
  const [levels, setLevels] = useState<AcademicLevel[]>([]);

  useEffect(() => {
    axios.get<AcademicLevel[]>(`${process.env.NEXT_PUBLIC_API_URL}/academic-levels`)
      .then(res => setLevels(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (id) {
      getAllStudents().then(res => {
        const stu = res.data.find(s => s.id === id);
        if (stu) reset(stu);
      });
    }
  }, [id, reset]);

  const onSubmit = async (data: Partial<Student>) => {
    if (!id) return;
    await updateStudent(id, data);
    push('/get_student');
  };

  if (!id) return <p className="text-center mt-8">No student selected</p>;

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Update Student #{id}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            className="w-full border p-2 rounded"
          />
          {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full border p-2 rounded"
          />
          {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
            className="w-full border p-2 rounded"
            type="email"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Academic Level</label>
          <select
            {...register('academicLevelId', { required: 'Select a level', valueAsNumber: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Level</option>
            {levels.map(l => (
              <option key={l.id} value={l.id}>{l.level}</option>
            ))}
          </select>
          {errors.academicLevelId && <p className="text-red-600">{errors.academicLevelId.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </main>
  );
}
