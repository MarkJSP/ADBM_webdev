'use client';
import { useEffect, useState } from 'react';

interface Student { id: number; firstName: string; lastName: string; email: string; }

export default function GetStudents() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [list, setList] = useState<Student[]>([]);

  useEffect(() => {
    fetch(`${api}/student`)
      .then(r => r.json())
      .then(setList);
  }, []);

  return (
    <main>
      <h1>All Students</h1>
      <ul>
        {list.map(s => (
          <li key={s.id}>#{s.id} – {s.firstName} {s.lastName} ({s.email})</li>
        ))}
      </ul>
      <style jsx>{`
        main { max-width:600px; margin:2rem auto; }
        h1 { text-align:center; margin-bottom:1rem; }
        ul { list-style:none; padding:0; }
        li { padding:0.5rem; border-bottom:1px solid #ddd; }
      `}</style>
    </main>
  );
}
