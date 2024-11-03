


const getAllPlaylists = async() => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/playlists", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}


const createPlaylist = async(name: string) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/playlists/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
        })
    })
}



const addSongToPlaylist = async(songId: number, playlistId: number) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/playlists/${playlistId}/${songId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}

const getPlaylistById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlists/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}


const playlistService = {
   getAllPlaylists,
   createPlaylist,
   addSongToPlaylist,
   getPlaylistById
}
export default playlistService