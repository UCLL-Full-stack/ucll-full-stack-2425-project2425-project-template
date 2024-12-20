import { Movie } from '../model/movie';
import movieDb from '../repository/movie.db';

const getAllMovies = async (): Promise<Movie[]> => movieDb.getAllMovies();

export default { getAllMovies };
