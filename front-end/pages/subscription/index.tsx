import Header from "@components/Header";
import SubscriptionOverview from "@components/subscriptions/SubscriptionOverview";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from 'react';
import { useTranslation } from "react-i18next";

const Subscriptions = () => {
  
    const { t } = useTranslation();
    
  return (
    <>
      <Head>
        <title>Subscriptions</title>
      </Head>
      <Header />
      <SubscriptionOverview />
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

export default Subscriptions;