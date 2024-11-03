import Head from "next/head";
import { useEffect, useState } from "react";
import { Song } from "types";
import songService from "@services/songService";
import SongsOverview from "@components/songs/songsOverview";
import Header from "@components/Header";



const Songs: React.FC = () => {
    const [songs, setSongs] = useState<Array<Song>>()

    const getSongs = async () => {
        const response = await songService.getAllSongs();
        const songs = await response.json();
        setSongs(songs)
    }

    const generateSongs = async() => {
        await songService.generateSongs(); 
        getSongs(); 

    };
    useEffect(() => {
        getSongs()
    },
        []);

    return (
        <>
            <Head>
                <title>Songs</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Songs</h1>
                <div className="flex justify-start mb-4">
                    <button onClick={generateSongs} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out">
                        Generate Test Songs
                    </button>
                </div>
                <section className="bg-white shadow-md rounded-lg p-6">
                    {songs ? (
                        <SongsOverview songs={songs} />
                    ) : (
                        <p>Loading songs...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Songs;