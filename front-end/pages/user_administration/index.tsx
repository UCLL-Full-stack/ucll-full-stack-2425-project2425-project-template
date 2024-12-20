import React, { use } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/administration/UserOverviewTable';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const InformationOverview: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <div>
            <Head>
                <title>User Administration</title>
            </Head>
            <Header />
            <h1>All users</h1>
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

export default InformationOverview;