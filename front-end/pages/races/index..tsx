import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import raceService from '@services/RaceService';
import { Race } from '@types';
import RaceOverviewTable from '@components/races/RaceOverviewTable';
import CrashOverviewTable from '@components/crashes/CrashOverviewTable';

const Races: React.FC = () => {
  
  const [races, setRaces] = useState<Array<Race>>();
  const [error, setError] = useState<string>();
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const getRaces = async () => {
    setError("");
    const response = await raceService.getAllRaces();

    if (!response.ok) {
      setError(response.statusText);
    } else {
      const races = await response.json();
      setRaces(races);
    }
  }

  useEffect(() => {
    getRaces();
  }, []);

  return (
    <>
      <Head>
        <title>Races</title>
      </Head>
      <Header />
      <main className="container">
        <h1>Races</h1>
        <section>
          {error && <div className="text-red-800">{error}</div>}
          {races && (
            <RaceOverviewTable
              races={races}
              selectRace={setSelectedRace}
              />
          )}
        </section>

        {selectedRace && (
          <section>
            <h2>
              Crashes withing "{selectedRace.name}"
            </h2>
            {selectedRace.crashes && (
              <CrashOverviewTable race={selectedRace} />
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default Races;