// frontend/pages/get_student.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllStudents, Student } from '../lib/students';

export default function GetStudents() {
  const [students, setStudents] = useState<Student[] | null>(null);

  useEffect(() => {
    getAllStudents().then(res => setStudents(res.data));
  }, []);

  if (students === null) {
    return <p style={{ textAlign: 'center' }}>Loading…</p>;
  }
  if (students.length === 0) {
    return (
      <main style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>No students found</h1>
        <Link href="/post_student"><a>Create one</a></Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>All Students</h1>
      <Link href="/post_student"><a>Create New</a></Link>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(s => (
          <li key={s.id} style={{ margin: '.5rem 0', borderBottom: '1px solid #ddd', paddingBottom: '.5rem' }}>
            #{s.id} – {s.firstName} {s.lastName} ({s.email})
            {' ['}<Link href={`/update_student?id=${s.id}`}><a>Edit</a></Link>{']'}
            {' ['}<Link href={`/delete_student?id=${s.id}`}><a>Delete</a></Link>{']'}
          </li>
        ))}
      </ul>
    </main>
  );
}
