import Header from "@components/header";
import InviteOverview from "@components/invites/InviteOverview";
import InviteService from "@services/InviteService";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { InviteInput, UserInput } from "types";
import styles from '@styles/home.module.css';


const MyInvites: React.FC = () => {
    const [loggedUser, setLoggedUser] = useState<UserInput | null>(null);
    const [invites, setInvites] = useState<InviteInput[]>([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setLoggedUser(JSON.parse(loggedInUser));
        }
    }, []);

    useEffect(() => {
        if (loggedUser?.email) {
            getInvitesByUserEmail(loggedUser.email);
        }
    }, [loggedUser]);

    const getInvitesByUserEmail = async (email: string) => {
        const response = await InviteService.getInvitesByUserEmail(email);
        const invitesData = await response.json();
        setInvites(invitesData);
    };

    return (
        <>
            <Head>
                <title>My events</title>
                <meta name="description" content="Overview of my upcoming events" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.invitesMain}>
                <h1>My invites</h1>
                <InviteOverview invites={invites} showEventName={true} showUserName={false}/>
            </main>
        </>
    )
};

export default MyInvites;