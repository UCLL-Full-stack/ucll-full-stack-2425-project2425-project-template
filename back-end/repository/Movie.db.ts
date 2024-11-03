
import { Movie } from '../model/Movie';

const movies = [
    new Movie({
        id: 1,
        name: "Infinity War",
        duration: new Date(0, 0, 0, 3, 0),
        playingdates: [new Date('2024-04-27'), new Date('2024-05-01')], 
        genre: "action",
        summary: "Reality can be whatever I want"
    }),
    new Movie({
        id: 2,
        name: "EndGame",
        duration: new Date(0, 0, 0, 3, 30),
        playingdates: [new Date('2024-06-27'), new Date('2024-08-01')], 
        genre: "action",
        summary: "We are in the endgame now"
    }),
];

const getAllMovies = (): Movie[] => {
    return movies;
};

const getMovieById = (id: number): Movie | null => {
    const movie = movies.find((movie) => movie.getId() === id);
    return movie || null;
}

const addMovie = (moviename: String,movieduration: Date, movieplayingdates: Date[], moviegenre: String, moviesummary: String): Movie => {
    const movie = new Movie({name:moviename,duration:movieduration,playingdates:movieplayingdates, genre:moviegenre, summary:moviesummary})
    movies.push(movie);
    return movie;
}

export default {
    getAllMovies,
    getMovieById,
    addMovie
};
