import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <p>Discover the world of Pokémon like never before with PokéPal,
             the essential app designed for trainers and gym battlers!
              Whether you're a seasoned Pokémon Master or just starting 
              your journey, PokéPal makes it easy to manage your Pokémon collection and plan your next battles.</p>
      </main>
    </>
  );
};

export default Home;
