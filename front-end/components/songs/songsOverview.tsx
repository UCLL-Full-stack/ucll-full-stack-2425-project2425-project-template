import React, { useState } from "react";
import { Song } from "types";

type Props = {
    songs: Array<Song>
}

const SongsOverview: React.FC<Props> = ({ songs }: Props) => {
    const [visibleCount, setVisibleCount] = useState(10); // State to track visible songs

    const loadMoreSongs = () => {
        setVisibleCount((prevCount: number) => prevCount + 10); // Increase the count by 10
    };

    return (
        <>
            {songs && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Cover</th>
                                <th className="px-4 py-2 text-gray-600 text-center">Name</th>
                                <th className="px-4 py-2 text-gray-600">Genre</th>
                                <th className="px-4 py-2 text-gray-600"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.slice(0, visibleCount).map((song, index) => (
                                <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">img</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">{song.title}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">{song.genre}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">
                                        <button>...</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {visibleCount < songs.length && ( // Show button only if there are more songs to show
                        <div className="mt-4 text-center">
                            <button 
                                onClick={loadMoreSongs} 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                            >
                                View More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SongsOverview;