import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Manchester Shitty</title>
        <meta name="description" content="Official website of Manchester Shitty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>
      <main className="relative flex flex-col items-center justify-center h-screen bg-zinc-950 text-yellow-500 px-4 py-8">
        <div className="absolute top-12 right-24">
          <LoginButton  onLogout={handleLogout} />
        </div>

        <div
          className={`flex flex-col items-center gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Image
            src="/images/shittylogo.svg"
            alt="Manchester Shitty Logo"
            width={400}
            height={400}
            priority
            draggable={false}
          />
          <h1 className="text-7xl font-extrabold text-center font-bebas">
            {t('home.title')}
          </h1>
          <nav className="flex gap-8">
            <Link
              href="/players"
              className="relative block w-56 h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center font-bold text-xl transition-transform duration-300 group-hover:-translate-y-4">
                {t('home.squad')}
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-medium text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
              {t('home.squad_description')}
              </span>
            </Link>
            <Link
              href="/coaches"
              className="relative block w-56 h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center font-bold text-xl transition-transform duration-300 group-hover:-translate-y-4">
              {t('home.coach')}
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-medium text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
              {t('home.coach_description')}
              </span>
            </Link>
            <Link
              href="/table"
              className="relative block w-56 h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center font-bold text-xl transition-transform duration-300 group-hover:-translate-y-4">
              {t('home.table')}
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-medium text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
              {t('home.table_description')}
              </span>
            </Link>
          </nav>
        </div>

        <footer className="absolute bottom-4 text-sm text-gray-500">
        {t('home.footer', {year: new Date().getFullYear()})}
        </footer>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    }
  }
};