import { GetServerSideProps } from 'next';
import { Driver } from '@types';
import driverService from '@services/DriverService';

interface Props {
  driver: Driver;
}

const DriverPage: React.FC<Props> = ({ driver }) => {
  return (
    <div>
      <h1>{driver.name} {driver.surname}</h1>
      <p><strong>Age:</strong> {driver.age}</p>
      <p><strong>Team:</strong> {driver.team}</p>
      <p><strong>Wins:</strong> {driver.wins}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const driver = await driverService.getDriverById(id as string);

  return {
    props: {
      driver,
    },
  };
};

export default DriverPage;