import "@styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from 'next-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from '../next-i18next.config';

i18next
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig.i18n,
    debug: nextI18NextConfig.debug,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);