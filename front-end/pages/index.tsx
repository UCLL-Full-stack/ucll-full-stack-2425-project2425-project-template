import React from 'react';
import Header from "@components/Header";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react"

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

const Home: React.FC = () => {

    const { t } = useTranslation();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
      }, [])
  
        if (!hydrated) {
          return null;
      }

    return (
        <>
        <Head>
            <title>{t("home.home")}</title>
        </Head>
        <Header/>
        <main className="container mx-auto px-6 py-8 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">{t("home.home")}</h1>
                <section className="bg-white shadow-md rounded-lg p-6 text-lg">
                    <div>
                        {t("home.text1")} <br />
                        {t("home.text2")} <br />
                        {t("home.text3")} <br />
                    </div>
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };

export default Home;