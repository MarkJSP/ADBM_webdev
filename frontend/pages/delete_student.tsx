// frontend/pages/delete_student.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent, Student } from '../lib/students';

export default function DeleteStudent() {
  const { query, push } = useRouter();
  const id = typeof query.id === 'string' ? parseInt(query.id, 10) : null;
  const [students, setStudents] = useState<Student[]>([]);

  const reload = () => getAllStudents().then(r => setStudents(r.data));
  useEffect(reload, []);

  const onDelete = async (sid: number) => {
    if (!confirm(`Delete student #${sid}?`)) return;
    await deleteStudent(sid);
    reload();
    if (sid === id) push('/get_student');
  };

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>Delete Students</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(s => (
          <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0', borderBottom: '1px solid #ddd' }}>
            {s.firstName} {s.lastName}
            <button onClick={() => onDelete(s.id!)} style={{ background: '#c00', color: '#fff', border: 'none', padding: '.3rem .6rem', borderRadius: 4 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
