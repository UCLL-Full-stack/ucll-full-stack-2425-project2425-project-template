import React from 'react';
import { GetServerSideProps } from 'next';
import { Driver } from '@types';
import driverService from '@services/DriverService';
import Header from '@components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Props {
  driver: Driver;
}

const DriverPage: React.FC<Props> = ({ driver }) => {
  return (
    <>
      <Header />
      <main className="container">
        <h1>{driver.name} {driver.surname}</h1>
        <p><strong>Birthdate:</strong> {new Date(driver.birthdate).toLocaleDateString()}</p>
        <p><strong>Team:</strong> {driver.team}</p>
        <p><strong>Country:</strong> {driver.country}</p>
        <p><strong>Description:</strong> {driver.description}</p>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await driverService.getDriverById(id as string);
  const driver = await response.json();
  const { locale } = context;

  return {
    props: {
      driver,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default DriverPage;