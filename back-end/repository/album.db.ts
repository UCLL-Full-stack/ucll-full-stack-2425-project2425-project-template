import { Album } from "../model/album";
import { Artist } from "../model/artist";

const albums: Album[] = [
    new Album({
        id: 0,
        title: 'to pimp a butterfly',
        duration: {hours: 1, minutes: 19, seconds: 0},
        artists: [new Artist({name: 'Kendrick Lamar'})],
        songs: [],
        releaseDate: new Date(2015, 3, 16), 
    }), 

    new Album({
        id: 1,
        title: 'Be',
        duration: {hours: 0, minutes: 42, seconds: 0},
        artists: [new Artist({name: 'Common'})],
        songs: [],
        releaseDate: new Date(2005, 5, 24), 
    }), 

    new Album({
        id: 2,
        title: '3 feet high and rising',
        duration: {hours: 1, minutes: 3, seconds: 3},
        artists: [new Artist({name: 'De La Soul'})],
        songs: [],
        releaseDate: new Date(1989, 1, 24), 
    }), 

    new Album({
        id: 3,
        title: 'swimming',
        duration: {hours: 0, minutes: 58, seconds: 39},
        artists: [new Artist({name: 'Mac Miller'})],
        songs: [],
        releaseDate: new Date(2018, 8, 3), 
    }), 

    new Album({
        id: 4,
        title: 'After Hours',
        duration: {hours: 0, minutes: 56, seconds: 17},
        artists: [new Artist({name: 'The Weeknd'})],
        songs: [],
        releaseDate: new Date(2020, 3, 20), 
    }), 

    new Album({
        id: 5,
        title: 'Arthiopes',
        duration: {hours: 0, minutes: 39, seconds: 9},
        artists: [new Artist({name: 'Billy Woods'})],
        songs: [],
        releaseDate: new Date(2022, 4, 8), 
    }), 

    new Album({
        id: 6,
        title: 'Blue Train',
        duration: {hours: 0, minutes: 42, seconds: 14},
        artists: [new Artist({name: 'John Coltrane'})],
        songs: [],
        releaseDate: new Date(1958, 1, 1)
    }), 

    new Album({
        id: 7,
        title: 'Kids See Ghosts',
        duration: {hours: 0, minutes: 42, seconds: 14},
        artists: [new Artist({name: 'Kanye West'}), new Artist({name: 'Kid Cudi'})],
        songs: [],
        releaseDate: new Date(2018, 6, 8)
    }) 
]

const getAlbums = (): Album[] => {
    return albums;
}

const getAlbumById = (id: number): Album | undefined => {
    return albums.find((album)=>album.getId() == id);
}

export default {
    getAlbums,
    getAlbumById
}
