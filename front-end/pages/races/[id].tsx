import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '@components/header';
import raceService from '@services/RaceService';
import { Race } from '@types';

interface RacePageProps {
  race: Race;
}

const RacePage: React.FC<RacePageProps> = ({ race }) => {
  return (
    <>
      <Head>
        <title>{race.name}</title>
      </Head>
      <Header />
      <main className="container">
        <h1>{race.name}</h1>
        <p><strong>Type:</strong> {race.type}</p>
        <p><strong>Description:</strong> {race.description}</p>
        <p><strong>Location:</strong> {race.location}</p>
        
        <h2>Drivers</h2>
        <ul>
          {race.drivers?.map(driver => (
            <li key={driver.id}>
              <p><strong>Name:</strong> {driver.name}</p>
              <div style={{ marginLeft: '20px' }}>
                <p><strong>Team:</strong> {driver.team}</p>
                <p><strong>Description:</strong> {driver.description}</p>
                <p><strong>Age:</strong> {driver.age}</p>
                <p><strong>Racecar:</strong> {driver.racecar.car_name} ({driver.racecar.type})</p>
                <p><strong>Racecar Description:</strong> {driver.racecar.description}</p>
                <p><strong>Racecar HP:</strong> {driver.racecar.hp}</p>
              </div>
            </li>
          ))}
        </ul>
        
        <h2>Crashes</h2>
        <ul>
          {race.crashes?.map((crash, index) => (
            <li key={index}>
              <p><strong>Type:</strong> {crash.type}</p>
              <div style={{ marginLeft: '20px' }}>
                <p><strong>Description:</strong> {crash.description}</p>
                <p><strong>Casualties:</strong> {crash.casualties}</p>
                <p><strong>Deaths:</strong> {crash.deaths}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await raceService.getRaceById(id as string);
  const race = await response.json();

  return {
    props: {
      race,
    },
  };
};

export default RacePage;