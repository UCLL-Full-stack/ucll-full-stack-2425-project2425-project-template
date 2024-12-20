import React from 'react';
import Head from 'next/head';
import Header from '@components/header';
import CrashForm from '@components/submissionForms/CrashForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import RaceService from '@services/RaceService';

const SubmissionForms: React.FC = () => {
  const [races, setRaces] = useState([]);
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await RaceService.getAllRaces();
        const data = await response.json();
        setRaces(data);
      } catch (error) {
        console.error('Error fetching races:', error);
      }
    };

    fetchRaces();
  }, []);
  
  return (
    <div>
      <Head>
        <title>Submission Forms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Submission Forms</h1>
        <CrashForm races={races} setSubmissionForms={() => {}} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default SubmissionForms;