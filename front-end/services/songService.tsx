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

const createSong = async (title: string, genre: string, userId: number): Promise<Response> => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/songs/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title, genre, user: { id: userId }
        })
    })

    return response
}

const deleteSongById = async (id: number, userId: number): Promise<Response> => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/songs/delete/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            user: { id: userId }
        })
    })

    return response
}


const SongService = {
    getAllSongs,
    getSongById,
    createSong,
    deleteSongById
}
export default SongService