// frontend/pages/post_student.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { createStudent, Student } from '../lib/students';

interface AcademicLevel {
  id: number;
  level: string;
}

export default function PostStudent() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Student>();
  const [levels, setLevels] = useState<AcademicLevel[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get<AcademicLevel[]>(`${process.env.NEXT_PUBLIC_API_URL}/academic-levels`)
      .then(res => setLevels(res.data))
      .catch(console.error);
  }, []);

  const onSubmit = async (data: Student) => {
    await createStudent(data);
    router.push('/get_student');
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Create Student</h1>
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
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
            })}
            className="w-full border p-2 rounded"
            type="email"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Date of Birth</label>
          <input
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            className="w-full border p-2 rounded"
            type="date"
          />
          {errors.dateOfBirth && <p className="text-red-600">{errors.dateOfBirth.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Academic Level</label>
          <select
            {...register('academicLevelId', { required: 'Please select a level', valueAsNumber: true })}
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
