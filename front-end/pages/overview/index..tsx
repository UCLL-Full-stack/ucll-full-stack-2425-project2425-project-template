import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import raceService from '@services/RaceService';
import { Race, Crash, Gebruiker } from '@types';
import RaceOverviewTable from '@components/overview/RaceOverviewTable';
import CrashOverviewTable from '@components/crashes/CrashOverviewTable';
import { useRouter } from 'next/router';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const InformationOverview: React.FC = () => {
  const [races, setRaces] = useState<Array<Race>>([]);
  const [error, setError] = useState<string>('');
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedCrash, setSelectedCrash] = useState<Crash | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<Gebruiker | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const getRaces = async () => {
    setError('');
    const response = await raceService.getAllRaces();

    if (!response.ok) {
      setError(response.statusText);
    } else {
      const races = await response.json();
      setRaces(races);
    }
  };

  useEffect(() => {
    getRaces();
  }, []);

  const handleCrashClick = (crash: Crash) => {
    setSelectedCrash(crash);
  };

  const handleRaceClick = (race: Race) => {
    setSelectedRace(race);
    setSelectedCrash(null); // Reset selected crash
  };

  const handleAddCrash = () => {
    if (selectedRace) {
      router.push(`/crashes/add?raceId=${selectedRace.id}`);
    }
  };

  const handleEditCrash = (crashId: number) => {
    router.push(`/crashes/edit?crashId=${crashId}`);
  };

  const handleDeleteCrash = async (crashId: number) => {
    if (confirm('Are you sure you want to delete this crash?')) {
      try {
        await raceService.removeCrashFromRace(selectedRace!.id!, crashId);
        getRaces(); // Refresh races
      } catch (error) {
        setError('Failed to delete crash');
      }
    }
  };

  const casualtiesData = {
    labels: races.map(race => race.name),
    datasets: [
      {
        label: 'Casualties',
        data: races.map(race => race.crashes?.reduce((total, crash) => total + crash.casualties, 0) || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const crashesData = {
    labels: races.map(race => race.name),
    datasets: [
      {
        label: 'Number of Crashes',
        data: races.map(race => race.crashes?.length || 0),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{t('header.informationOverview')}</title>
      </Head>
      <Header />
      <main className="container">
        <h1>{t('overview.title')}</h1>
        <section>
          <h2>Races</h2>
          <p>{t('overview.instructions')}</p>
          {error && <div className="text-red-800">{error}</div>}
          {races.length > 0 && (
            <RaceOverviewTable
              races={races}
              selectRace={handleRaceClick}
            />
          )}
        </section>

        {selectedRace && (
          <section>
            <h2>Crashes within "{selectedRace.name}"</h2>
            {loggedInUser?.permission === 'ADMIN' && (
              <button onClick={handleAddCrash} className="btn btn-primary mb-3">Add Crash</button>
            )}
            <p>Click on a crash to see its drivers with their racecars</p>
            {selectedRace.crashes && (
              <CrashOverviewTable
                crashes={selectedRace.crashes}
                onCrashClick={handleCrashClick}
                selectedRace={selectedRace}
                handleEditCrash={handleEditCrash}
                handleDeleteCrash={handleDeleteCrash}
                loggedInUser={loggedInUser}
              />
            )}
          </section>
        )}

        <section>
          <h2>Casualties per Race</h2>
          <Line data={casualtiesData} />

          <h2>Number of Crashes per Race</h2>
          <Bar data={crashesData} />
        </section>
      </main>
    </>
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