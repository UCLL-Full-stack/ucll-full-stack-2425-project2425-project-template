import UserService from '@services/UserService';
import { useEffect, useState } from 'react';
import { User } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/users/UserOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Users: React.FC = () => {
    const getUsers = async () => {
        try {
            const response = await UserService.getUsers();
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('You are not authorized to view this page.');
                } else {
                    throw new Error(response.statusText);
                }
            } else {
                return await response.json();
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };
    
    const { data, isLoading, error } = useSWR('users', getUsers);

    useInterval(
        () => {
            mutate('users', getUsers());
        },
        isLoading ? 1000 : null
    );

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Admin Dashboard</h1>
                <section>
                    <h2>Users overview</h2>
                    {error && <div className="text-center text-red-800">{error.message}</div>}
                    {isLoading && <p className="text-center text-green-800">Loading...</p>}
                    {data && <UserOverviewTable users={data} />}
                </section>
            </main>
        </>
    );
};

export default Users;
