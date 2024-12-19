import watchlistDb from '../repository/watchlist.db';

const addMovieToWatchlist = async (userId: number, movieId: number) => {

    const addResult = await watchlistDb.addMovieToWatchlist(userId, movieId);

    if (addResult) {
        return { success: true };
    } else {
        return { success: false, message: 'Failed to add movie to watchlist.' };
    }
};

export default {
    addMovieToWatchlist,
};