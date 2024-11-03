const songs = [
    { title: "Blinding Lights", genre: "Pop" },
    { title: "Shape of You", genre: "Dance" },
    { title: "Someone Like You", genre: "Soul" },
    { title: "Rolling in the Deep", genre: "Pop" },
    { title: "Hotel California", genre: "Rock" },
    { title: "Lose Yourself", genre: "Hip Hop" },
    { title: "Take On Me", genre: "Synth-pop" },
    { title: "Stairway to Heaven", genre: "Rock" },
    { title: "Uptown Funk", genre: "Funk" },
    { title: "Billie Jean", genre: "Pop" },
    { title: "Smells Like Teen Spirit", genre: "Grunge" },
    { title: "Shallow", genre: "Pop" },
    { title: "Wonderwall", genre: "Rock" }
];


const getAllSongs = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/songs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}



const generateSongs = async () => {
    try {
        const requests = songs.map(song => {
            return fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs/create`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: song.title,
                    genre: song.genre,
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            });
        });

        await Promise.all(requests);
        console.log('All songs generated successfully');
        window.location.reload(); 
    } catch (error) {
        console.error('Error generating songs:', error);
    }
};

const songService = {
    getAllSongs,
    generateSongs
}
export default songService