import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Eventer</title>
        <meta name="description" content="Eventer home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            In the current digital age, it is becoming increasingly more
            important to get people to connect in the real world again. This is
            what eventer aims to do. Connect all different kinds of people over
            common passions, in real life. Users get offered events targeted at
            their interests and get to experience them in a new social setting.
          </p>
        </div>
      </main>
    </>
  );
};
export default Home;
