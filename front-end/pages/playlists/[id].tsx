import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header'; 
import playlistService from '../../services/PlaylistService'; 
import { Song } from 'types'; 
import { useRouter } from 'next/router';

const LoadPlaylist: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const router = useRouter();
    const { id } = router.query; 

    useEffect(() => {
        if (id) {
       
            const fetchPlaylistSongs = async () => {
                try {
                    const response = await playlistService.getPlaylistById(Number(id)); 
                    const data = await response.json();
                    setSongs(data.songs);
                } catch (error) {
                    console.error('Error fetching playlist songs:', error);
                }
            };

            fetchPlaylistSongs();
        }
    }, [id]);

    return (
        <>
            <Head>
                <title>Playlist Name</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center">
                <h1 className="text-3xl font-bold mb-6">Playlist Songs</h1>
                <button onClick={() => router.push("/playlists")}>go back</button>
                {songs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th>Cover</th>
                                    <th className="px-4 py-2 text-gray-600 text-center">Name</th>
                                    <th className="px-4 py-2 text-gray-600">Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((song, index) => (
                                    <tr key={song.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">img</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{song.title}</td>
                                        <td className="px-4 py-2 border-b border-gray-200 text-left">{song.genre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No songs found in this playlist.</p>
                )}
            </main>
        </>
    );
};

export default LoadPlaylist;
