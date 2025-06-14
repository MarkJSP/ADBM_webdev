'use client';
import { useEffect, useState } from 'react';

interface Student { id: number; firstName: string; lastName: string; }

export default function UpdateStudents() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [list, setList] = useState<Student[]>([]);
  const [edited, setEdited] = useState<Partial<Student>>({});

  useEffect(() => {
    fetch(`${api}/student`).then(r => r.json()).then(setList);
  }, []);

  const save = async () => {
    if (!edited.id) return;
    await fetch(`${api}/student?id=${edited.id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(edited)
    });
    alert('✅ Updated!');
  };

  return (
    <main>
      <h1>Update Student</h1>
      <select
        onChange={e => {
          const id = +e.target.value;
          const s = list.find(x => x.id === id);
          setEdited(s ? { ...s } : {});
        }}
      >
        <option value="">Select</option>
        {list.map(s => (
          <option key={s.id} value={s.id}>
            {s.firstName} {s.lastName}
          </option>
        ))}
      </select>
      {edited.id && (
        <div>
          <input
            value={edited.firstName || ''}
            onChange={e => setEdited(e => ({ ...e, firstName: e.target.value }))}
          />
          <input
            value={edited.lastName || ''}
            onChange={e => setEdited(e => ({ ...e, lastName: e.target.value }))}
          />
          <button onClick={save}>Save</button>
        </div>
      )}
      <style jsx>{`
        main { max-width:400px; margin:2rem auto; }
        h1 { text-align:center; }
        select, input { width:100%; padding:0.5rem; margin:0.5rem 0; }
        button { padding:0.5rem 1rem; background:#0a0; color:white; border:none; border-radius:4px; }
      `}</style>
    </main>
  );
}
