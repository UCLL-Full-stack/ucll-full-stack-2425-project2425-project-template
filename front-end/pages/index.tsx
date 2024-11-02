import Head from 'next/head';
import styles from '@/styles/home.module.css';
import Header from '@/components/header';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Personal Finance Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Courses lets you see as a lecturer all the courses you are teaching
            and as a student all the courses you are enrolled in. <br />
            You can also see when the courses are scheduled and the students
            enrolled in each course.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
