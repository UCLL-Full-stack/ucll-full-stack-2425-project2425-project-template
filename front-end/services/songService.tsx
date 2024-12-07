import { Song } from "types"

const getAllSongs = () => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null


    return fetch(process.env.NEXT_PUBLIC_API_URL + "/songs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}


const getSongById = (id: number) => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/songs/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

const createSong = async (title: string, genre: string): Promise<Response> => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/songs/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title, genre
        })
    })

    return response
}


const SongService = {
    getAllSongs,
    getSongById,
    createSong
}
export default SongService