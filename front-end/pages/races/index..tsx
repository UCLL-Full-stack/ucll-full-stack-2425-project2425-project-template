import Head from 'next/head';
import Header from '@components/header';
import { useState, useEffect } from 'react';
import raceService from '@services/RaceService';
import { Race } from '@types';

const Races: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);

  const fetchRaces = async () => {
    try {
      const getRaces = await raceService.getAllRaces();
      const races = await getRaces.json();
      setRaces(races);
    } catch (error) {
      console.error('Failed to fetch races:', error);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  return (
    <>
      <Head>
        <title>Races</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Races</h1>
        <section>
          <h2>Races overview</h2>
          {races.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                {races.map((race, index) => (
                  <tr key={index}>
                    <td>{race.name}</td>
                    <td>{race.type}</td>
                    <td>{race.description}</td>
                    <td>{race.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Races;