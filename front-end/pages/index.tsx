import type { NextPage } from 'next';
import BoardCreation from '../components/BoardCreation';

const Home: NextPage = () => {
  return (
    <main style={{minHeight: '100vh'}}>
      <BoardCreation />
    </main>
  );
};

export default Home;