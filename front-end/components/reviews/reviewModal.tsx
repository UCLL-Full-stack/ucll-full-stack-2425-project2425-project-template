import React, { useEffect, useState } from "react";
import { Album, ReviewInput } from "@/types/index";
import albumService from "@/services/albumService";
import { Rating } from "@mui/material";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newList: ReviewInput) => void;
    authorId: number,
};

const ReviewModal: React.FC<Props> = ({ isOpen, onClose, onSave, authorId }) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [albums, setAlbums] = useState<Album[]>([]);
    const [query, setQuery] = useState<string>('');
    const [reviewAlbum, setReviewAlbum] = useState<Album | null>(null);
    const [starRating, setStarRating] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const fetchAlbums = async () => {
        if (!query) {
            setAlbums([]);
            return;
        }
        const albums = await albumService.searchAlbums(query);
        setAlbums(albums);
    }

    useEffect(() => {
        fetchAlbums();
    }, [query]);

    const handleAddAlbum = (id: string) => {
        const selectedAlbum = albums.find((album) => album.id === id);
        if (!selectedAlbum) return;
        if (selectedAlbum == reviewAlbum) return;
        setReviewAlbum(selectedAlbum);
        setQuery('');
    }

    const handleSave = () => {

        if (!reviewAlbum) {
            setError("Choose an album to review");
            return;
        }

        if (title == "" || body == ""){
            setError("Please fill out all fields")
            return;
        }

        const newReview: ReviewInput = {
            title,
            body,
            albumId: reviewAlbum.id,
            authorId,
            starRating,
        };

        onSave(newReview);
    };

    return (
        <div className={`fixed inset-0 flex px-4 items-center justify-center bg-black bg-opacity-50 transition-opacity duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-bg2 p-6 rounded-lg w-full max-w-md shadow-lg transform transition-transform duration-100 ${isOpen ? 'scale-100' : 'scale-0'}`}>
                <h2 className="text-2xl text-text2 main-font mb-4">Review an album</h2>
                <label className="block mb-2 text-sm text-text2 main-font">
                    Title
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block bg-text1 w-full mt-1 p-2 rounded"
                        required
                    />
                </label>

                <label className="block mb-4 text-sm text-text2 main-font">
                    Body
                    <textarea 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="block bg-text1 w-full mt-1 p-2 rounded"
                        required
                    />
                </label>
                <label className="flex items-center gap-5 mb-4 text-sm text-text2 main-font ">
                    Albums
                    {<input className="w-full p-2 bg-text1 rounded-md" onChange={(e) => setQuery(e.target.value)} type="search" value={query} placeholder="search"/>}                  
                </label>
                {query && albums.length > 0 && (
                    <div className="relative">
                        <div
                            className="absolute z-10 w-full max-h-60 overflow-y-auto bg-bg2 rounded-md border border-text2 shadow-lg"
                            style={{ top: "calc(100% + 8px)" }}
                        >
                            {albums.slice(0, 10).map((album, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleAddAlbum(album.id)}
                                    className="p-2 flex gap-5 items-center text-text2 cursor-pointer hover:bg-bg1 transition-colors"
                                >
                                    <img src={album.image[1]["#text"]} />
                                    <div className="text-left"> {album.name} - {album.artist} </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className={reviewAlbum ? "border rounded-md border-text2" : ""}>
                    {reviewAlbum && (
                        <>
                            <div className="w-full justify-between flex gap-5 p-2 items-center">
                                <div className="flex gap-5 items-center">
                                    <img src={reviewAlbum.image[1]["#text"]} />
                                    <h2 className="text-white main-font text-left text-sm">
                                    {reviewAlbum.artist} - {reviewAlbum.name}
                                    </h2>  
                                </div>
                                <button
                                    className="rounded-lg px-2 text-bg2 bg-text2 border-text2 border hover:text-white hover:bg-bg1 transition-colors duration-100"
                                    onClick={() => { setReviewAlbum(null) }}
                                >
                                   ✖ 
                                </button>
                            </div>
                        </>)
                    }
                </div>
                {reviewAlbum &&
                    <label className="flex justify-center items-center p-2 text-sm text-text2 main-font">
                        <Rating 
                            onChange={(e, newValue) => setStarRating(Number(newValue))}
                            value={starRating}
                            size="large"
                        />
                    </label>
                }
                {error && 
                    <div className="w-full text-center border-1 rounded-md bg-bg1 p-2">
                        <span className="text-[#d00] main-font">{error}</span>
                    </div>
                }
                <div className="flex justify-end main-font space-x-3 mt-8">
                    <button 
                        onClick={onClose} 
                        className="rounded-lg w-2/4 px-3 py-2 text-sm text-white hover:bg-text2 hover:text-red-500 bg-red-500 transition-colors duration-100"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        className="rounded-lg w-2/4 px-3 py-2 main-font text-sm sm:text-base text-text2 bg-text1 hover:bg-bg1 transition-colors duration-100"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
