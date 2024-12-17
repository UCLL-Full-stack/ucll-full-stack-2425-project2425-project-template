import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from '../styles/Index.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';

const OverviewPage: React.FC = () => {
  const { t } = useTranslation("common");

  const users = [
    { username: 'john_doe', email: 'john@example.com', role: 'student', firstName: 'John', lastName: 'Doe' },
    { username: 'jane_smith', email: 'jane@example.com', role: 'student', firstName: 'Jane', lastName: 'Smith' },
    { username: 'admin_user', email: 'admin@example.com', role: 'admin', firstName: 'Admin', lastName: 'User' },
    { username: 'guest_user', email: 'guest@example.com', role: 'guest', firstName: 'Guest', lastName: 'User' }
  ];

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

      <section className={styles['users-table-section']}>
        <h2>{t("index.usersTableTitle")}</h2>
        <div className={styles['table-container']}>
          <table className={styles['users-table']}>
            <thead>
              <tr>
                <th>{t("index.username")}</th>
                <th>{t("index.email")}</th>
                <th>{t("index.role")}</th>
                <th>{t("index.firstName")}</th>
                <th>{t("index.lastName")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "nl", ["common"]))
    },
  };
};

export default OverviewPage;
