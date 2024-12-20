import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import SongService from "@services/songService";
import Header from "@components/Header";
import SongsOverview from "@components/songs/songsOverview";
import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

const Songs: React.FC = () => {
    const [error, setError] = useState<string>("");
    const { t } = useTranslation();

    const getSongs = async () => {
        setError("");
        const songsResponse = await SongService.getAllSongs();

        if (songsResponse.ok) {
            const songs = await songsResponse.json();
            return songs;
        }

        if (!songsResponse.ok) {
            if (songsResponse.status === 401) {
                setError('You are not allowed to see this page, please log in');
            } else {
                setError('An error occurred while fetching data');
            }
        }
    };

    const { data, isLoading } = useSWR(
        "songs",
        getSongs
    );

    useInterval(() => {
        mutate("songs", getSongs());
    }, 2000);

    return (
        <>
            <Head>
                <title>Songs</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Songs</h1>
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