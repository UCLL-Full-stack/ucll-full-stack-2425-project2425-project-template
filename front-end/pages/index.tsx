import Header from "@/components/header";
import albumService from "@/services/albumService";
import { Album } from "@/types/index";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: React.FC = () => {

    const [albums, setAlbums] = useState<Album[]>([]);

    const getAlbums = async ()=>{
        setAlbums(await albumService.getAllAlbums());    
    }

    useEffect(()=>{
        getAlbums();
    },[]);
    
    return (
        <>
            <Head>
                <title>Yadig</title>
            </Head>
            <div className="flex flex-col h-screen">
                <Header current="home"/>
                <main className="flex-1 bg-bg1 p-10 overflow-y-auto">
                </main>
            </div>
        </>
    );
}

export default Home;
