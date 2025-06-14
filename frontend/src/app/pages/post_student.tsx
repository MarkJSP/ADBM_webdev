'use client';
import { useState } from 'react';

export default function PostStudent() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    academicLevelId: ''
  });
  const [msg, setMsg] = useState<string | null>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${api}/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: form.dateOfBirth,
        email: form.email,
        academicLevelId: +form.academicLevelId
      })
    });
    if (res.ok) {
      setMsg('✅ Student created!');
      setForm({ firstName: '', lastName: '', dateOfBirth: '', email: '', academicLevelId: '' });
    } else {
      const err = await res.json();
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <main>
      <h1>Post Student</h1>
      <form onSubmit={submit}>
        {['firstName','lastName','dateOfBirth','email','academicLevelId'].map(key => (
          <div key={key}>
            <label>{key}</label>
            <input
              name={key}
              type={key==='dateOfBirth' ? 'date' : 'text'}
              value={(form as any)[key]}
              onChange={handle}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {msg && <p>{msg}</p>}
      <style jsx>{`
        main { max-width:400px; margin:2rem auto; padding:1rem; border:1px solid #ccc; border-radius:8px; }
        h1 { text-align:center; margin-bottom:1rem; }
        form div { margin-bottom:0.75rem; }
        label { display:block; font-weight:bold; margin-bottom:0.25rem; }
        input { width:100%; padding:0.5rem; border:1px solid #888; border-radius:4px; }
        button { width:100%; padding:0.75rem; background:#0070f3; color:white; border:none; border-radius:4px; cursor:pointer; }
        button:hover { background:#005bb5; }
        p { text-align:center; margin-top:1rem; }
      `}</style>
    </main>
  );
}
