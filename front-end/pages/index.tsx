import type { NextPage } from 'next';
import BoardCreation from '../components/BoardCreation';

const Home: NextPage = () => {
  return (
    <div>
      <BoardCreation serverId="test-server-id" />
    </div>
  );
};

export default Home;