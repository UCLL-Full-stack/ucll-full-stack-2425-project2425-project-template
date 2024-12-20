import React from 'react';
import { GetServerSideProps } from 'next';
import { Racecar } from '@types';
import racecarService from '@services/RacecarService';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Props {
  racecar: Racecar;
}

const RacecarPage: React.FC<Props> = ({ racecar }) => {
  return (
    <>
      <Header />
      <main className="container">
        <h1>{racecar.name}</h1>
        <p><strong>Type:</strong> {racecar.type}</p>
        <p><strong>Brand:</strong> {racecar.brand}</p>
        <p><strong>Horsepower:</strong> {racecar.hp}</p>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await racecarService.getRacecarById(id as string);
  const racecar = await response.json();
  const { locale } = context;

  return {
    props: {
      racecar,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default RacecarPage;