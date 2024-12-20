import { Movie } from "@types";

const userId = 9 ; //temp hardcoded

const addMovieToWatchlist = async (movie: Movie) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/watchlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, movieId: movie.id }), 
    });

    return response;
};

const WatchlistService = {
    addMovieToWatchlist
};

export default WatchlistService;
  