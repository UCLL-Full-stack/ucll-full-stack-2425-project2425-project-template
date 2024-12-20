import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import SongService from "@services/songService";
import PlaylistService from "@services/playlistService";
import Header from "@components/Header";
import PlaylistOverview from "@components/playlists/playlistOverview";
import { useTranslation } from "react-i18next";
import React from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

const Songs: React.FC = () => {

    const { t } = useTranslation();
    
    const getPlaylistsAndSongs = async () => {
        const responses = await Promise.all([
            PlaylistService.getAllPlaylists(),
            SongService.getAllSongs()
        ])

        const [playlistsResponse, songsResponse] = responses;

        if (playlistsResponse.ok && songsResponse.ok) {
            const playlists = await playlistsResponse.json()
            const songs = await songsResponse.json()
            return {playlists, songs}
        }
    }

    const { data, isLoading, error } = useSWR(
        "playlistsAndSongs",
        getPlaylistsAndSongs
    )

    useInterval(() => {
        mutate("playlistsAndSongs", getPlaylistsAndSongs())
    }, 2000)


    return (
        <>
            <Head>
                <title>Playlists</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Playlists</h1>
                <>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && (
                        <PlaylistOverview
                            playlists={data.playlists}
                            songs={data.songs}
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