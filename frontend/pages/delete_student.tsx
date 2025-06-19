import { useEffect, useState } from 'react';
import { FaTrash, FaSearch } from 'react-icons/fa';
import { api } from '../lib/api';
import type { Student } from '../types';
import styles from './delete_student.module.css';

export default function DeleteStudent() {
  const [all, setAll] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/students').then(res => {
      setAll(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      all.filter(
        s =>
          s.id.toString().includes(term) ||
          s.firstName.toLowerCase().includes(term) ||
          s.lastName.toLowerCase().includes(term)
      )
    );
  }, [search, all]);

  const remove = async (id: number) => {
    await api.delete(`/students/${id}`);
    const updated = all.filter(s => s.id !== id);
    setAll(updated);
    setFiltered(
      updated.filter(
        s =>
          s.id.toString().includes(search.toLowerCase()) ||
          s.firstName.toLowerCase().includes(search.toLowerCase()) ||
          s.lastName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <FaTrash className={styles.icon} />
        <span className={styles.title}>Delete Students</span>
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

      <ul className={styles.list}>
        {filtered.map(s => (
          <li key={s.id} className={styles.item}>
            <span>#{s.id} – {s.firstName} {s.lastName}</span>
            <button onClick={() => remove(s.id)} className={styles.button}>
              Delete
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={styles.empty}>No matching students.</li>
        )}
      </ul>
    </div>
  );
}
