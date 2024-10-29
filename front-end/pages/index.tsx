import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home - TeamTrack</title>
        <meta name="description" content="TeamTrack app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
      </main>
    </>
  );
};

export default Home;
