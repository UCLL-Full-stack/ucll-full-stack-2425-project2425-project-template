import { Album } from "@/types/index";

const getAllAlbums = async (): Promise<Album[]> => {
    const albumsJson = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`);
    return await albumsJson.json();
}

export default {
    getAllAlbums
}
