// frontend/pages/get_student.tsx

import { useEffect, useState } from 'react';
import { FaList, FaSearch } from 'react-icons/fa';
import { api } from '../lib/api';
import type { Student } from '../types';
import styles from './get_student.module.css';

export default function GetStudents() {
  const [all, setAll] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get<Student[]>('/students')
      .then(res => {
        setAll(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      all.filter(s =>
        s.id.toString().includes(term) ||
        s.firstName.toLowerCase().includes(term) ||
        s.lastName.toLowerCase().includes(term)
      )
    );
  }, [search, all]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <FaList className={styles.icon} />
        <span className={styles.title}>All Students</span>
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
            <div>
              <strong>#{s.id}</strong> – {s.firstName} {s.lastName}
            </div>
            {/* Removed actions/edit/delete links */}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={styles.empty}>No matching students.</li>
        )}
      </ul>
    </div>
  );
}
