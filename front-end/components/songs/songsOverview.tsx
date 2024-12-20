import React, { useState, useEffect } from "react";
import { Song, StatusMessage } from "types";
import playlistService from "@services/PlaylistService";
import Image from 'next/image';
import SongService from "@services/SongService";
import Popup from "reactjs-popup";
import classNames from "classnames";

type Props = {
    songs: Array<Song>;
};

const SongsOverview: React.FC<Props> = ({ songs }: Props) => {
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState<string | null>(null)

    const [genre, setGenre] = useState('')
    const [genreError, setGenreError] = useState<string | null>(null)

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const clearErrors = () => {
        setTitleError(null),
        setGenreError(null)
        setStatusMessages([])
    }

    const validate = (): boolean => {
        let result = true;

        if (!title || title.trim() === "") {
            setTitleError("Title of the song is required")
        }

        if (!genre || genre.trim() === "") {
            setGenreError("Genre of the song is required")
        }

        return result;
    }

    const handleAddSong = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
    
        if (!validate()) {
            return;
        }
    
        const response = await SongService.createSong(title, genre);
        const data = await response.json();

    
        if (!response.ok) {
            setStatusMessages([{ message: data, type: 'error' }]);
        } else {
            setStatusMessages([{ message: 'Song created successfully', type: 'success' }]);
            setIsPopupOpen(false);
        }
    }

    const handleDeleteSong = async (id: number) => {
        clearErrors();
    
        if (!validate()) {
            return;
        }
    
        const response = await SongService.deleteSongById(id);
    

    
        if (!response.ok) {
            setStatusMessages([{ message: "error ocurred", type: 'error' }]);
        } else {
            setStatusMessages([{ message: 'Song deleted successfully', type: 'success' }]);
            setIsPopupOpen(false);
        }
    }
    

    return  (
        <>
        {songs && (
            <table className="mt-6 w-100">
                <thead className="bg-yellow-200 border-b-yellow-400 border-b-8">
                    <tr>
                        <th className="pl-10"></th>
                        <th className="px-12 py-5 text-xl">Title</th>
                        <th className="px-12 py-5 text-xl">Genre</th>
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
                                <form onSubmit={handleAddSong}>
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
                                        <h2 className="font-bold text-2xl text-">Add a song</h2>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="titleInput" className="block mb-2 text-sm font-medium">Song title:</label>
                                        <div>
                                            <input 
                                            id="titleInput"
                                            type="text" 
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}/>
                                            {titleError && <div className="text-red-800 text-sm mt-1">{titleError}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="genreInput" className="block mb-2 text-sm font-medium">Song genre:</label>
                                        <div>
                                            <input 
                                            id="genreInput"
                                            type="text" 
                                            value={genre}
                                            onChange={(event) => setGenre(event.target.value)}/>
                                            {genreError && <div className="text-red-800 text-sm mt-1">{genreError}</div>}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-gray-800 hover:text-white  border-gray-800  border-4  text-gray-800 py-2 rounded-lg focus:outline-none"
                                        >
                                            Make Song
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
                    {songs.map((song, index) => (
                        <tr
                            key={index}
                            role="button">
                            <td className="pl-10"></td>
                            <td className="px-12 py-5">{song.title}</td>
                            <td className="px-12 py-5">{song.genre}</td>
                            <td className="pr-10"></td>
                            <td onClick={() => handleDeleteSong(song.id)} className="px-12 tex-red-800 py-5">delete</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}
export default SongsOverview;
