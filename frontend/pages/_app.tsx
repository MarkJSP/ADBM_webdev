// frontend/pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';   // your global resets
import { Layout } from '../components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
