import Header from "@components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import playlistService from "@services/playlistService";
import { Playlist } from "types";
import PlaylistOverview from "@components/playlists/playlistOverview";
const Songs: React.FC = () => {
    const [playlists, setPlaylists] = useState<Array<Playlist>>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');


    const getPlaylists = async () => {
        const response = await playlistService.getAllPlaylists();
        const playlists = await response.json();
        setPlaylists(playlists)
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewPlaylistName('');
        getPlaylists();
    };

    const createPlaylist = async () => {
        if (!newPlaylistName.trim()) {
            alert("Please enter a playlist name.");
            return;
        }
        await playlistService.createPlaylist(newPlaylistName);
        closeModal();
        getPlaylists();
    };

    useEffect(() => {
        getPlaylists()
    },
        []);

    return (
        <>
            <Head>
                <title>Playlists</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Playlists</h1>
                <button onClick={openModal}>+</button>
                <section className="bg-white shadow-md rounded-lg p-6">
                    {playlists ? (
                        <PlaylistOverview playlists={playlists} />
                    ) : (
                        <p>Loading playlists...</p>
                    )}
                </section>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                            <h2 className="text-xl font-bold mb-4">Create New Playlist</h2>
                            <input
                                type="text"
                                placeholder="Playlist Name"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                className="border border-gray-300 p-2 w-full rounded mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createPlaylist}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Songs;