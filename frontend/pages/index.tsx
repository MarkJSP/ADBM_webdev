import Link from 'next/link';
import { Hero } from '../components/Hero';

export default function HomePage() {
  return (
    <Hero
      title="Welcome to Student Manager"
      subtitle="Manage your students easily: create, view, update, and delete records."
    >
      <Link
        href="/post_student"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Create Student
      </Link>
    </Hero>
  );
}
