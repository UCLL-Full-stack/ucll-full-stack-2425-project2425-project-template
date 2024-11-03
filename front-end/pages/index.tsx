import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to the Flashcard App</h1>
      <Link href="/flashcards">
        View Flashcards
      </Link>
    </div>
  );
};

export default Home;