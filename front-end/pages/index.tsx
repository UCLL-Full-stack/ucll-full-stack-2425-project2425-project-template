import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '../styles/Index.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';

const OverviewPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles['overview-page']}>
      <Navbar />
      <section className={styles['welcome-section']}>
        <h1>{t("index.welkom")}</h1>
        <p>
          {t("index.inleidendetekst")}
        </p>
      </section>

      <section className={styles['hero-image']}>
        <img src="/europe-buildings-travel-illustration-card_1284-35665.avif" alt="Image of Europe" />
      </section>

      <section className={styles['navigation-links']}>
        <h2>{t("index.plan")}</h2>
        <Link href="/trips">{t("index.trips")}</Link>
        <Link href="/bookings">{t("index.bookings")}</Link>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const  { locale} = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "nl", ["common"]))
      },
  };
};

export default OverviewPage;
