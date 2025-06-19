// frontend/components/Layout.tsx

import React, { ReactNode } from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaPlusCircle,
  FaList,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import styles from './Layout.module.css';  // <-- now correctly points to Layout.module.css

interface NavLink {
  href: string;
  icon: ReactNode;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/',               icon: <FaHome />,       label: 'Home' },
  { href: '/post_student',   icon: <FaPlusCircle />, label: 'New Student' },
  { href: '/get_student',    icon: <FaList />,       label: 'List Students' },
  { href: '/update_student', icon: <FaEdit />,       label: 'Update' },
  { href: '/delete_student', icon: <FaTrash />,      label: 'Delete' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Student Mgr</div>
        <nav className={styles.nav}>
          {navLinks.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={styles.navLink}>
              <span className={styles.icon}>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Student Management System</h1>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
