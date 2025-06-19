// frontend/pages/post_student.tsx

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlusCircle } from 'react-icons/fa';
import { api } from '../lib/api';
import type { CreateStudentDto, AcademicLevel } from '../types';
import styles from './post_student.module.css';

export default function PostStudent() {
  // Set up react-hook-form, no defaultValues
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStudentDto>();

  const [levels, setLevels] = useState<AcademicLevel[]>([]);
  const [loading, setLoading] = useState(true);

  // Load academic levels once
  useEffect(() => {
    api
      .get<AcademicLevel[]>('/academic-levels')
      .then(res => setLevels(res.data))
      .catch(err => {
        console.error('Could not load levels', err);
        alert('Error loading academic levels. Is the backend running?');
      })
      .finally(() => setLoading(false));
  }, []);

  // Submit handler
  const onSubmit = async (data: CreateStudentDto) => {
    console.log('Submitting', data);
    try {
      // We only have academicLevelId here
      await api.post('/students', data);
      alert('Student created successfully!');
      reset();
    } catch (err: any) {
      console.error('Create error', err);
      alert(`Error creating student: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading levels…</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaPlusCircle className={styles.icon} />
        <h3 className={styles.title}>Add New Student</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* First & Last Name */}
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>First Name</label>
            <input
              {...register('firstName', { required: 'Required' })}
              className={styles.input}
            />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Last Name</label>
            <input
              {...register('lastName', { required: 'Required' })}
              className={styles.input}
            />
            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            {...register('email', {
              required: 'Required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            type="email"
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className={styles.field}>
          <label className={styles.label}>Date of Birth</label>
          <input
            {...register('dateOfBirth', { required: 'Required' })}
            type="date"
            className={styles.input}
          />
          {errors.dateOfBirth && <p className={styles.error}>{errors.dateOfBirth.message}</p>}
        </div>

        {/* Gender & Phone */}
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Gender</label>
            <select {...register('gender')} className={styles.select}>
              <option value="">Unspecified</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="X">Other</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone</label>
            <input {...register('phone')} type="tel" className={styles.input} />
          </div>
        </div>

        {/* Address */}
        <div className={styles.field}>
          <label className={styles.label}>Address</label>
          <input {...register('address')} className={styles.input} />
        </div>

        {/* Enrollment & Major */}
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label className={styles.label}>Enrollment Date</label>
            <input
              {...register('enrollmentDate')}
              type="date"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Major</label>
            <input {...register('major')} className={styles.input} />
          </div>
        </div>

        {/* Academic Level */}
        <div className={styles.field}>
          <label className={styles.label}>Academic Level</label>
          <select
            {...register('academicLevelId', {
              required: 'Please select a level',
              valueAsNumber: true,
            })}
            className={styles.select}
          >
            <option value="">Select Level</option>
            {levels.map(l => (
              <option key={l.id} value={l.id}>
                {l.level}
              </option>
            ))}
          </select>
          {errors.academicLevelId && <p className={styles.error}>{errors.academicLevelId.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? 'Submitting…' : 'Create Student'}
        </button>
      </form>
    </div>
  );
}
