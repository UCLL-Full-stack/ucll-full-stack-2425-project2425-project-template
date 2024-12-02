import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import raceService from '@services/RaceService';
import { Race, Crash } from '@types';
import RaceOverviewTable from '@components/races/RaceOverviewTable';
import CrashOverviewTable from '@components/crashes/CrashOverviewTable';

const Races: React.FC = () => {
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
            {selectedRace.crashes && (
              <CrashOverviewTable crashes={selectedRace.crashes} onCrashClick={handleCrashClick} selectedRace={selectedRace} />
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default Races;