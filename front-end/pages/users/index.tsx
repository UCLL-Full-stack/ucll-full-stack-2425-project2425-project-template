import UserService from '@/services/UserService';
import { User } from '@/types';
import Header from '@components/header';
import UserOverview from '@components/users/UserOverview';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Users: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  const getAllUsers = async () => {
    const response = await UserService.getAllUsers();
    if (Array.isArray(response)) {
      setUsers(response);
    } else {
      console.error('Unexpected response format:', response);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main>
        <h1>All Users</h1>
        <section>
          {users.length > 0 ? <UserOverview users={users} /> : <p>No users found.</p>}
        </section>
      </main>
    </>
  );
};

export default Users;