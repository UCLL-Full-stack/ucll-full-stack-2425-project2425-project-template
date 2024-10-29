import Layout from '@components/Layout';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { Lexend } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout className={lexend.className}>
            <Component {...pageProps} />
        </Layout>
    );
}
