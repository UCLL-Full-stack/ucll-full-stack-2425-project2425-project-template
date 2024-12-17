import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; permission: string } | null>(null);

  useEffect(() => {
    // Retrieve logged-in user's info
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const users = [
    { username: 'admin', password: 'Password1', role: 'ADMIN' },
    { username: 'user1', password: 'password', role: 'USER' },
  ];

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
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
            Welcome {loggedInUser.username}, you are logged in as {loggedInUser.permission}
          </div>
        )}

        <h2>Users to login:</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Home;
