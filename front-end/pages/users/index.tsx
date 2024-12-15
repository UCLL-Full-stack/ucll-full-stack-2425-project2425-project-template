import Header from "@/components/header";
import UserOverzicht from "@/components/users/UserOverzicht";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Users: React.FC = () => {
    const { t } = useTranslation();

    const [selectedUser, setSelectedUser] = useState<User>();
    const getUsers = async () => {
        const response = await Promise.all([
            UserService.getAllUsers()
        ]);
        const [userResponse] = response;

        if (userResponse.ok) {
            const users = await userResponse.json();
            return { users };
        }
    };

    const { data, isLoading, error } = useSWR("users", getUsers);

    useInterval(() => {
        mutate("users", getUsers());
    }, 5000);

    return (
        <>
            <Head>
                <title>Users</title>
                <meta name="description" content="BowlBuddies Pokebowl Users" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>Users</h1>
                <p>Lijst van alle gebruikers</p>
                <section>
                    {error && <p className="error-field">{error}</p>}
                    {data && (
                        <UserOverzicht users={data.users} selectUser={setSelectedUser} />
                    )}
                </section>
            </main>
        </>
    )

};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Users