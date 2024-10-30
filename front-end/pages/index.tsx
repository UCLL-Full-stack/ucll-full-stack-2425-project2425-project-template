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
        <span>
          <Image 
            src="/images/TeamTrackLogo.png"
            alt="TeamTrack Logo"
            width={200}
            height={200}
          />
        </span>
        <div>
          <p className={styles.description}>
            Welcome to TeamTrack! This is a simple app to track your team's performance, games, and players.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
