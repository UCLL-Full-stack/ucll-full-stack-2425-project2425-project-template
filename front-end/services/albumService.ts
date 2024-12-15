import { Album, AlbumResponse } from "@/types/index";

const searchAlbums = async (query: string): Promise<Album[]> => {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`);
    if(!response.ok){
        return await response.json();
    }
    const albumResponse: AlbumResponse = await response.json();
    const albums = albumResponse.results.albummatches.album;
    albums.forEach(album=>album.id=`${album.name}-${album.artist}`);
    return albums;
}

// const fetchAlbum = async (title: string, artist: string): Promise<Album> => {
//     const albumsJson = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`);
//     const albumResponse: AlbumResponse = await albumsJson.json();
// }

export default {
    searchAlbums,
}
