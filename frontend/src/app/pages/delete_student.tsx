'use client';
import { useEffect, useState } from 'react';

interface Student { id: number; firstName: string; lastName: string; }

export default function DeleteStudents() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [list, setList] = useState<Student[]>([]);
  const reload = () => fetch(`${api}/student`).then(r => r.json()).then(setList);

  useEffect(reload, []);

  const remove = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch(`${api}/student?id=${id}`, { method: 'DELETE' });
    reload();
  };

  return (
    <main>
      <h1>Delete Students</h1>
      <ul>
        {list.map(s => (
          <li key={s.id}>
            {s.firstName} {s.lastName}
            <button onClick={() => remove(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        main { max-width:600px; margin:2rem auto; }
        h1 { text-align:center; }
        ul { list-style:none; padding:0; }
        li { display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid #ddd; }
        button { background:#c00; color:white; border:none; padding:0.3rem 0.6rem; border-radius:4px; }
      `}</style>
    </main>
  );
}
