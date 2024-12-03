import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import raceService from '@services/RaceService';
import { Race, Crash } from '@types';
import RaceOverviewTable from '@components/races/RaceOverviewTable';
import CrashOverviewTable from '@components/crashes/CrashOverviewTable';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const InformationOverview: React.FC = () => {
  const [races, setRaces] = useState<Array<Race>>([]);
  const [error, setError] = useState<string>('');
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedCrash, setSelectedCrash] = useState<Crash | null>(null);

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

  const casualtiesData = {
    labels: races.map(race => race.name),
    datasets: [
      {
        label: 'Casualties',
        data: races.map(race => race.crashes.reduce((total, crash) => total + crash.casualties, 0)),
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
        data: races.map(race => race.crashes.length),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Information Overview</title>
      </Head>
      <Header />
      <main className="container">
        <h1>Information Overview</h1>
        <section>
          <h2>Races</h2>
          <p>Click on a race to see its crashes</p>
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
            <p>Click on a crash to see its drivers with their racecars</p>
            {selectedRace.crashes && (
              <CrashOverviewTable crashes={selectedRace.crashes} onCrashClick={handleCrashClick} selectedRace={selectedRace} />
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

export default InformationOverview;