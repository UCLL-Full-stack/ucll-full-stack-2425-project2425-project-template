import Header from "@components/header";
import UserOverview from "@components/users/UserOverview";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '@styles/home.module.css';
import useSWR from 'swr';
import UserService from "@services/UserService";

const Users: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [loggedUser, setLoggedUser] = useState<UserInput | null>(null);
    const [users, setUsers] = useState<UserInput[]>([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = loggedInUser ? JSON.parse(loggedInUser) : null;

        if (user && user.role === 'ADMIN') {
            getAllUsers();
        } else {
            setErrorMessage("You are not authorised to see this page.");
            setShowErrorMessage(true);
        }
    }, []);

    const getAllUsers = async () => {
        const response = await UserService.getAll();
        const usersData = await response.json();
        setUsers(usersData);
    }

    return (
        <>
            <Head>
                <title>Users overview</title>
                <meta name="description" content="List of all users" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.usersMain}>
                {users && users.length > 0 && <UserOverview usersData={users} />}

                {showErrorMessage && (
                    <p className="mt-3">
                        {errorMessage}
                    </p>
                )}
            </main>
        </>
    );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserInput } from "types";
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Users;