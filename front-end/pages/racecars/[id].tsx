import { GetServerSideProps } from 'next';
import { Racecar } from '@types';
import racecarService from '@services/RacecarService';

interface Props {
  racecar: Racecar;
}

const RacecarPage: React.FC<Props> = ({ racecar }) => {
  return (
    <div>
      <h1>{racecar.name}</h1>
      <p><strong>Type:</strong> {racecar.type}</p>
      <p><strong>Brand:</strong> {racecar.brand}</p>
      <p><strong>Horsepower:</strong> {racecar.hp}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const racecar = await racecarService.getRacecarById(id as string);

  return {
    props: {
      racecar,
    },
  };
};

export default RacecarPage;