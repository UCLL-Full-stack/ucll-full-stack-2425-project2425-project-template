import PlaylistService from "@services/PlaylistService";
import classNames from "classnames";
import { table } from "console";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Playlist, Song, StatusMessage } from "types";
import Image from 'next/image';

type Props = {
    playlists: Array<Playlist>
    songs: Array<Song>
}

const PlaylistOverview: React.FC<Props> = ({ playlists, songs }: Props) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string | null>(null);


    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const clearErrors = () => {
        setNameError(null)
        setStatusMessages([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!name || name.trim() === "") {
            setNameError("Playlist name is required")
            return false
        }

        return result
    }

    const handleAddPlaylist = async (event: React.FormEvent) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const response = await PlaylistService.createPlaylist(name)
        const data = await response.json();
        if (!response.ok) {
            setStatusMessages([{message: data, type: "error"}])
        } else {
            setStatusMessages([{message: 'Playlist created successfully.', type: 'success'}]);
            setIsPopupOpen(false);
        }

    }

    const selectPlaylist = (playlist: Playlist) => {
        setSelectedPlaylist(playlist)
    }

    const handleAddSong = async (song: Song) => {
        if (selectedPlaylist) {
            await PlaylistService.addSongToPlaylist(selectedPlaylist, song);
            selectedPlaylist.songs.push(song);
        }
    }

    return (
        <>
        {playlists && (
            <table className="mt-6 w-100">
                <thead className="bg-yellow-200 border-b-yellow-400 border-b-8">
                    <tr>
                        <th className="pl-10"></th>
                        <th className="px-12 py-5 text-xl">Name</th>
                        <th className="px-12 py-5 text-xl">totalNumbers</th>
                        <th className="px-12 py-5 text-xl">User</th>
                        <th className="px-12 py-5 text-xl">Added Songs</th>
                        <th>
                                <button
                                    className="mt-2 text-white font-bold text-3xl"
                                    onClick={() => setIsPopupOpen(true)}
                                >
                                    <Image
                                        src="/img/add.png"
                                        alt="Add Logo"
                                        width={40}
                                        height={40}
                                    />
                                </button>
                                <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                            <div className="p-12 bg-gray-100 border-yellow-400 border-8 flex flex-col items-center justify-center">
                                <form onSubmit={handleAddPlaylist}>
                                    {statusMessages.length > 0 && (
                                    <div className="mb-6">
                                    <ul className="list-none">
                                        {statusMessages.map(({ message, type }, index) => (
                                        <li
                                            key={index}
                                            className={classNames({
                                            "text-red-800": type === "error",
                                            "text-green-800": type === "success",
                                            })}
                                        >
                                            {message}
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                    )}
                                    <div className="mb-3 flex justify-center items-center">
                                        <h2 className="font-bold text-2xl text-">Add a playlist</h2>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">Playlist name:</label>
                                        <div>
                                            <input 
                                            id="nameInput"
                                            type="text" 
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}/>
                                            {nameError && <div className="text-red-800 text-sm mt-1">{nameError}</div>}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-gray-800 hover:text-white  border-gray-800  border-4  text-gray-800 py-2 rounded-lg focus:outline-none"
                                        >
                                            Make Playlist
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Popup>
                        </th>
                        <th className="pr-10"></th>
                    </tr>
                </thead>
                <tbody className="bg-gray-400 border-b-gray-800 border-b-8">
                    {playlists.map((playlist, index) => (
                        <tr
                            key={index}
                            onClick={() => selectPlaylist(playlist)}
                            className= {classNames({
                                "table-active":
                                    selectedPlaylist?.id === playlist.id,
                            })}
                            role="button">
                            <td className="pl-10"></td>
                            <td className="px-12 py-5">{playlist.name}</td>
                            <td className="px-12 py-5">{playlist.totalNumbers}</td>
                            <td className="px-12 py-5">{playlist.user.username}</td>
                            <td className="px-12 py-5">{playlist.songs.length}</td>
                            <td className="px-12 py-5"></td>
                            <td className="pr-10"></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        {selectedPlaylist && (
                <section className="mt-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Songs</h2>
                    <table>
                        <thead className="bg-yellow-200 border-b-yellow-400 border-b-8">
                            <tr>
                                <th className="pl-10"></th>
                                <th className="px-12 py-5">Title</th>
                                <th className="px-12 py-5">Genre</th>
                                <th className="px-12 py-5">Song to add</th>
                                <th className="pr-10"></th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-400 border-b-gray-800 border-b-8">
                            {songs.map((song, index) => (
                                <tr key={index}>
                                    <td className="pl-10"></td>
                                    <td className="px-12 py-5">{song.title}</td>
                                    <td className="px-12 py-5">{song.genre}</td>

                                    <td>
                                        {!selectedPlaylist.songs.find(
                                            (s) =>
                                                s.id ===
                                                song.id
                                        ) && (
                                            <button
                                                className=" hover:bg-gray-800 hover:text-white font-medium border-2 border-gray-800 rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={() =>
                                                    handleAddSong(song)
                                                }>
                                                Add song
                                            </button>
                                        )}
                                        {selectedPlaylist.songs.find(
                                            (s) =>
                                                s.id ===
                                                song.id
                                        ) && (
                                            <p>In Playlist</p>
                                        )}
                                    </td>
                                    <td className="pr-10"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
    </>
    );
};

export default PlaylistOverview;