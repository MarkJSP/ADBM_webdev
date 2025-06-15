// frontend/components/Nav.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [
  { href: '/post_student', label: 'Create Student' },
  { href: '/get_student',  label: 'View Students'  },
  { href: '/update_student', label: 'Edit Student' },
  { href: '/delete_student', label: 'Delete Student' },
];

export function Nav() {
  const { pathname } = useRouter();
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '1rem 0',
      borderBottom: '1px solid #ddd',
      marginBottom: '2rem',
    }}>
      {links.map(link => {
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href}>
            <a style={{
              textDecoration: isActive ? 'underline' : 'none',
              fontWeight:      isActive ? 'bold'      : 'normal',
              color:           isActive ? '#0070f3'   : '#000',
            }}>
              {link.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
