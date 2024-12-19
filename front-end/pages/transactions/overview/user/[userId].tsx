import React from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from '@/styles/Home.module.css';
import TransactionOverview from '@/components/transactions/TransactionOverview';

const OverviewExpenses = () => {
  return (
    <>
      <Head>
        <title>Transactions overview</title>
        <meta name="description" content="Personal Finance Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <TransactionOverview type="user" />
      </main>
      <Footer />
    </>
  );
};

export default OverviewExpenses;