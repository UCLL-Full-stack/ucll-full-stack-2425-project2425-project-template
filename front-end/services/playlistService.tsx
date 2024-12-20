import { Playlist, Song } from "types"

const getAllPlaylists = () => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null


    return fetch(process.env.NEXT_PUBLIC_API_URL + "/playlists", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}

// const createPlaylist = (name: string, userId: number) => {

//     const loggedInUser = localStorage.getItem('loggedInUser')
//     const token = loggedInUser ? JSON.parse(loggedInUser).token : null

//     fetch(process.env.NEXT_PUBLIC_API_URL + "/playlists/create", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             name,
//             userId
//         })
//     })
// }

const createPlaylist = async (name: string): Promise<Response> => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const id = loggedInUser ? JSON.parse(loggedInUser).id : "";

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/playlists/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, user: { id } }),
    });

    return response;
};


const addSongToPlaylist = (playlist: Playlist, song: Song) => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null

    fetch(process.env.NEXT_PUBLIC_API_URL + `/playlists/addSong`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            playlist,
            songs: [song]
        })
    })
}

const getPlaylistById = (id: number) => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlists/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}


const PlaylistService = {
   getAllPlaylists,
   createPlaylist,
   addSongToPlaylist,
   getPlaylistById
}
export default PlaylistService