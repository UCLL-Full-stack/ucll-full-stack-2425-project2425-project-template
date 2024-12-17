import React from "react";
import { Album } from "@/types";

type Props = {
    album: Album;
};

const AlbumCard: React.FC<Props> = ({ album }) => {
    const imageUrl = album.image[3]?.["#text"] || "";

    return (
        <div className="flex min-w-[10vw] max-w-[15vw] flex-col items-center bg-bg3 shadow-md rounded-lg p-4 hover:scale-105 hover:shadow-lg duration-200">
            <div className="w-full aspect-square mb-4">
                <img
                    src={imageUrl}
                    alt={`${album.name} cover`}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            <h3 className="text-lg main-font text-text2 text-center truncate w-full">
                {album.name}
            </h3>
            <p className="text-md main-thin text-text1 text-center truncate w-full">
                    {album.artist}
            </p>
        </div>    
    );
};

export default AlbumCard;

