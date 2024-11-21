import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Bestelling, User } from '@/types';
import Header from '@/components/header';
import UserService from '@/services/UserService';
import UserInfo from '@/components/users/UserInfo';

const UserId = () => {
    const [user, setUser] = useState<User | null>(null);
    const [bestellingen, setBestellingen] = useState<Array<Bestelling>>([]);
    const router = useRouter();
    const { userId } = router.query;

    const getUserById = async () => {
        const response = await UserService.getUserById(userId as string);
        const result = await response.json();
        setUser(result);
    }

    const getBestellingByUserId = async () => {
        const response = await UserService.getUserBestellingen(userId as string);
        const result = await response.json();
        setBestellingen(result);
    }

    useEffect(() => {
        if (userId) {
            getUserById();
            getBestellingByUserId();
        }
    }, [userId]);


    return (
        <>
            <Head>
                <title>User profiel {user?.gebruikersnaam}</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>{user?.gebruikersnaam}'s profiel</h1>
                <section>
                    {!userId && <p>Profile not found</p>}
                    {userId && <UserInfo user={user} bestellingen={bestellingen} />}
                </section>
            </main>
        </>
    );
};

export default UserId;