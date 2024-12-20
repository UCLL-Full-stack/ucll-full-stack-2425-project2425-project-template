import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import UserService from "@services/userService";
import Header from "@components/Header";
import UserOverview from "@components/users/UserOverview";
import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

const Users: React.FC = () => {
    const [error, setError] = useState<string>("");
    const { t } = useTranslation();

    const getUsers = async () => {
        setError("");
        const response = await UserService.getAllUsers();

        if (response.ok) {
            const users = await response.json();
            return users;
        }

        if (!response.ok) {
            if (response.status === 401) {
                setError('You are not allowed to see this page, please log in');
            } else {
                setError('An error occurred while fetching data');
            }
        }
    };

    const { data, isLoading } = useSWR("users", getUsers);

    useInterval(() => {
        mutate("users", getUsers());
    }, 2000);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Users</h1>
                <>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && <UserOverview users={data} />}
                </>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
};

export default Users;