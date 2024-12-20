import Head from "next/head";
import songService from "@services/SongService";
import SongsOverview from "@components/songs/SongsOverview";
import Header from "@components/header";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { useTranslation } from "react-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import UserService from "@services/UserService";



const Songs: React.FC = () => {
    const [subscriptionType, setSubscriptionType] = useState(null); 
    const { t } = useTranslation();

    const getSongs = async () => {
        const response = await songService.getAllSongs();


        if (response.ok) {
            const songs = await response.json()
            return songs
        }
    }

    const getUser = async () => {
        try {
            const loggedInUser = localStorage.getItem('loggedInUser')
            const id = loggedInUser ? JSON.parse(loggedInUser).id : null
            const user = await UserService.getUserById(id);
            if (user.subscription && user.subscription.type) {
                setSubscriptionType(user.subscription.type);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const {data, isLoading, error} = useSWR(
        "songs",
        getSongs
    )

    useEffect(() => {
        getUser()
    }, [])


    useInterval(() => {
        mutate("songs", getSongs())
    }, 2000)

    return (
        <>
            <Head>
                <title>Songs</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Songs</h1>
                <h3 className="text-3xl font-bold mb-6">{`You have the ${subscriptionType} plan!`}</h3>
                <>
                {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && (
                        <SongsOverview
                            songs={data}
                        />
                    )}
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

export default Songs;