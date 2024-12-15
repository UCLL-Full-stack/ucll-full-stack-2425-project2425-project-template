import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Bestelling, User } from '@/types';
import Header from '@/components/header';
import UserService from '@/services/UserService';
import UserInfo from '@/components/users/UserInfo';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const UserId = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { t } = useTranslation();

    const fetchUserWithBestellingen = async () => {
        const [userResponses, bestellingResponses] = await Promise.all([
            UserService.getUserById(userId as string),
            UserService.getUserBestellingen(userId as string)
        ]);

        if (userResponses.ok && bestellingResponses.ok) {
            const [user, bestellingen] = await Promise.all([
                userResponses.json(),
                bestellingResponses.json(),
            ]);
            return { user, bestellingen };
        }
    }

    const { data, isLoading, error } = useSWR("users", fetchUserWithBestellingen);


    return (
        <>
            <Head>
                <title>User profiel {data?.user?.gebruikersnaam}</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>{data?.user.gebruikersnaam}'s profiel</h1>
                <section>
                    {error && <p className="error-field">{error}</p>}
                    {data && <UserInfo user={data.user} bestellingen={data.bestellingen} />}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};
  

export default UserId;