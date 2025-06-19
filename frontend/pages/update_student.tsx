// frontend/pages/update_student.tsx

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { api } from '../lib/api';
import type {
  Student,
  UpdateStudentDto,
  AcademicLevel,
} from '../types';
import styles from './update_student.module.css';

export default function UpdateStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [levels, setLevels] = useState<AcademicLevel[]>([]);
  const [loadingLevels, setLoadingLevels] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Student | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateStudentDto>();

  // Load both datasets in parallel on mount
  useEffect(() => {
    setLoadingStudents(true);
    api.get<Student[]>('/students')
      .then(res => {
        setStudents(res.data);
        setFiltered(res.data);
      })
      .catch(console.error)
      .finally(() => setLoadingStudents(false));

    setLoadingLevels(true);
    api.get<AcademicLevel[]>('/academic-levels')
      .then(res => setLevels(res.data))
      .catch(console.error)
      .finally(() => setLoadingLevels(false));
  }, []);

  // Filter whenever `search` or `students` changes
  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      students.filter(
        s =>
          s.id.toString().includes(term) ||
          s.firstName.toLowerCase().includes(term) ||
          s.lastName.toLowerCase().includes(term)
      )
    );
    setSelected(null);
  }, [search, students]);

  // When a student is selected, prefill the form
  const loadStudent = (s: Student) => {
    setSelected(s);
    reset({
      firstName:       s.firstName,
      lastName:        s.lastName,
      email:           s.email,
      dateOfBirth:     s.dateOfBirth,
      gender:          s.gender,
      phone:           s.phone,
      address:         s.address,
      enrollmentDate:  s.enrollmentDate,
      major:           s.major,
      academicLevelId: s.academicLevel.id,
      newLevel:        undefined,
    });
  };

  // Handle form submission
  const onSave = async (data: UpdateStudentDto) => {
    if (!selected) return;
    try {
      await api.patch(`/students/${selected.id}`, data);
      // Refresh students
      const res = await api.get<Student[]>('/students');
      setStudents(res.data);
      setSearch('');
      setSelected(null);
      alert('Student updated successfully!');
    } catch (err: any) {
      console.error(err);
      alert(`Update failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Show a global loading screen until both are loaded
  if (loadingStudents || loadingLevels) {
    return <p className={styles.loading}>Loading…</p>;
  }

  return (
    <div className={styles.container}>
      {/* Header & Search */}
      <div className={styles.header}>
        <FaEdit className={styles.icon} />
        <h3 className={styles.title}>Edit Student</h3>
      </div>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search by ID, name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Student List */}
      <ul className={styles.list}>
        {filtered.map(s => (
          <li
            key={s.id}
            className={styles.item}
            onClick={() => loadStudent(s)}
          >
            <span>#{s.id} – {s.firstName} {s.lastName}</span>
            <button className={styles.button}>Edit</button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={styles.empty}>No matching students.</li>
        )}
      </ul>

      {/* Edit Form */}
      {selected && (
        <form onSubmit={handleSubmit(onSave)} className={styles.form}>
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
              <input {...register('enrollmentDate')} type="date" className={styles.input} />
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
              {levels.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.level}
                </option>
              ))}
            </select>
            {errors.academicLevelId && <p className={styles.error}>{errors.academicLevelId.message}</p>}
          </div>

          {/* New Level */}
          <div className={styles.field}>
            <label className={styles.label}>— or create new level</label>
            <input
              {...register('newLevel')}
              placeholder='e.g. "Diploma"'
              className={styles.input}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submit}>
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
}
