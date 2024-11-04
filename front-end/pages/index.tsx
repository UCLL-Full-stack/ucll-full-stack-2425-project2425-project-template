import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    // Retrieve logged-in user's info
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/courses.png"
            alt="Website Logo"
            className={styles.vercelLogo}
            width={50}
            height={50}
          />
          <h1>Welcome to the Home Page</h1>
        </span>

        <div className={styles.description}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>
            Labore cupiditate iste sunt atque distinctio mollitia assumenda
            numquam corrupti laboriosam magni nobis at impedit et quibusdam,
            sapiente autem. <br></br>
            Laudantium, asperiores debitis.
          </p>
        </div>

        {loggedInUser && (
          <div className="alert alert-success">
            Logged in as {loggedInUser.username} ({loggedInUser.role})
          </div>
        )}

      </main>
    </>
  );
};

export default Home;
