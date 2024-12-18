import database from './database';
import { Movie } from '../model/movie';

const getAllMovies = async (): Promise<Movie[]> => {
    try {
        const moviesPrisma = await database.movie.findMany();
        console.log('Movies fetched from DB:', moviesPrisma); 
        return moviesPrisma.map((moviePrisma) => Movie.from(moviePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllMovies,
};