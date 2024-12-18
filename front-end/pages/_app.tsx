import { UserProvider } from '@/context/UserContext'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import '../src/i18n/config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}