import React, { useEffect, useState } from "react";
import { List, Album, ListInput } from "@/types/index";
import albumService from "@/services/albumService";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newList: ListInput) => void;
};

const ListModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [albums, setAlbums] = useState<Album[]>([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState<number>(0);
    const [listAlbums, setListAlbums] = useState<Album[]>([]);

    const handleSave = () => {
        const albumIds = [...listAlbums.map((album)=>album.id)];
        console.log(albumIds);

        if(!albumIds) return;

        const newList: ListInput = {
            title,
            description,
            albums: albumIds
        };
        
        onSave(newList);
    };

    const getAlbums= async ()=>{
        setAlbums(await albumService.getAllAlbums());    
    }

    useEffect(()=>{
        getAlbums();
    },[]);

    const albumIsAdded = () => {
        return listAlbums.find((album) => album.id == selectedAlbumId);
    }

    const handleAddAlbum = () => {
        
        if(listAlbums && albumIsAdded()) return;

        const selectedAlbum = albums.find((album)=>album.id == selectedAlbumId);
        if(!selectedAlbum) return;

        setListAlbums([ ...listAlbums, selectedAlbum ])
    }

    const handleRemoveAlbum = (toRemove: Album) => {
        setListAlbums([
            ...listAlbums.filter((album)=>album.id != toRemove.id)
        ])
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-bg2 p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-2xl text-text2 font-bold mb-4">Create New List</h2>
                
                <label className="block mb-2 text-sm text-text2 main-font">
                    Title
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block bg-bg1 w-full mt-1 p-2 rounded"
                    />
                </label>

                <label className="block mb-4 text-sm text-text2 main-font">
                    Description
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full mt-1 p-2 bg-bg1 text-text2 rounded"
                    />
                </label>
                <label className="block mb-4 text-sm text-text2 main-font">
                    Albums
                    <div className="flex gap-5">
                        <select 
                            value={selectedAlbumId} 
                            onChange={(e)=>{setSelectedAlbumId(Number(e.target.value))}}
                            className="block w-full mt-1 p-2 bg-bg1 text-white rounded">
                            {albums.map((album)=><option value={album.id}> {album.artists.map((artist, i)=>(i>0?", ":"") + artist.name)} - {album.title}</option>)}
                        </select>
                        <button 
                            type="button" 
                            onClick={handleAddAlbum}
                            className="rounded-lg min-w-[4rem] px-3 py-2 text-sm border-text1 border-[1px] text-text2 bg-bg2 hover:text-white hover:bg-bg1 transition-colors duration-150"
                        >
                            +
                        </button>
                    </div>
                </label>
                <div className={listAlbums.length>0?"border rounded-md border-text2":""}>
                    {listAlbums.map((album: Album)=>
                            <div className="w-full justify-between flex gap-5 p-2 items-center">
                                <h2 className="text-white main-font text-sm">
                                    {album.artists.map((artist, i)=>(i>0?", ":"") + artist.name)} - {album.title}
                                </h2>  
                                <button
                                    className="rounded-lg px-2 text-bg2 bg-text2 border-text2 border hover:text-white hover:bg-bg1 transition-colors duration-150"
                                    onClick={()=>{handleRemoveAlbum(album)}}
                                >
                                   ✖ 
                                </button>
                            </div>
                    )}
                </div>
                <div className="flex justify-end main-font space-x-3 mt-4">
                    <button 
                        onClick={onClose} 
                        className="rounded-lg px-3 py-2 text-sm text-bg2 bg-text2 border-text2 border hover:text-white hover:bg-bg1 transition-colors duration-150"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        className="rounded-lg px-3 min-w-[4rem] py-2 text-sm border-text1 border-[1px] text-text2 bg-bg2 hover:text-white hover:bg-bg1 transition-colors duration-150"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListModal;
