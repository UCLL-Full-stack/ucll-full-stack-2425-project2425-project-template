// import "@/styles/globals.css";
import '@/styles/navigation.css';
import '@/styles/style.css';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
