import Link from 'next/link';
import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import raceService from '@services/RaceService';
import { Race } from '@types';

const Races: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await raceService.getAllRaces();
        const races = await response.json();
        setRaces(races);
      } catch (error) {
        console.error('Failed to fetch races:', error);
      }
    };

    fetchRaces();
  }, []);

  return (
    <>
      <Head>
        <title>Races</title>
      </Head>
      <Header />
      <main className="container">
        <h1>Races</h1>
        <ul>
          {races.map(race => (
            <li key={race.id}>
              <Link href={`/races/${race.id}`}>
                {race.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Races;