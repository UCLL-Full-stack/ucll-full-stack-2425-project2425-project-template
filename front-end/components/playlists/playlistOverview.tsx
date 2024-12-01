import { useRouter } from "next/router";
import React, { useState } from "react";
import { Playlist } from "types";

type Props = {
    playlists: Array<Playlist>
}

const PlaylistOverview: React.FC<Props> = ({ playlists }: Props) => {
    const router = useRouter();

    const handlePlaylistClick = (id: number) => {

        router.push(`/playlists/${id}`);
    };

    return (
        <>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((playlist, index) => (
                <div 
                    key={index} 
                    className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-200 ease-in-out"
                    onClick={() => {
                        playlist.id !== undefined && handlePlaylistClick(playlist.id)
                    }}
                >
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                          
                            <span className="text-gray-500">img</span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">{playlist.name}</h2>
                        <p className="text-gray-600 mt-2">Total Songs: {playlist.songs.length}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default PlaylistOverview;