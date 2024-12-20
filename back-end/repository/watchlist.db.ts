import database from './database';


const addMovieToWatchlist = async (userId: number, movieId: number): Promise<boolean> => {
    try {
        await database.watchlist.create({
            data: {
                userId: userId, 
                movieId: movieId,
            },
        });
        return true;
    } catch (error) {
        console.error('Error inserting into watchlist:', error);
        return false;
    }
};

export default {
    addMovieToWatchlist,
};