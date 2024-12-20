import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/administration/UserOverviewTable';
import userService from '@services/UserService';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const InformationOverview: React.FC = () => {
  const { t } = useTranslation('common');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const usersData: User[] = await response.json();
        const filteredUsers = usersData.filter(user => user.permission === 'USER');
        setUsers(filteredUsers);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Head>
        <title>User Administration</title>
      </Head>
      <Header />
      <h1>All users</h1>
      {error && <div className="text-red-800">{error}</div>}
      {users.length > 0 ? (
        <UserOverviewTable users={users} selectUser={() => {}} />
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default InformationOverview;