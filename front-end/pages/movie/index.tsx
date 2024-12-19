
import React, { useState, useEffect } from 'react';
import { Movie } from '@types';  
import MovieService from '../../service/MovieService';
import WatchlistService from '../../service/WatchlistService';
import Head from 'next/head';
import Header from '../../components/Header';


const Moviepage: React.FC = () => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>([]);
    const [watchlist, setWatchlist] = useState<Array<Movie>>([]);

    const getMovies = async () => {
        setError('');
        try {
            const response = await MovieService.getAllMovies();

            if (!response.ok) {
                setError(response.statusText);
                return;
            }

            const movieData = await response.json();
            console.log('Fetched Movies:', movieData);
            setMovies(movieData);
            setFilteredMovies(movieData);
        } catch (err) {
            setError('Failed to load movies');
            console.error(err);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredMovies(filtered);
    };

    const handleAddToWatchlist = async (movie: Movie) => {
        if (watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)) {
            alert('Movie is already in your watchlist');
            return;
        }

        try {
            const response = await WatchlistService.addMovieToWatchlist(movie);

            if (response.ok) {
                setWatchlist([...watchlist, movie]);
                alert('Movie added to your watchlist');
            } else {
                setError('Failed to add movie to watchlist');
            }
        } catch (err) {
            setError('An error occurred while adding the movie to the watchlist');
            console.error(err);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <>
            <Head>
                <title>Spilled Popcorn</title>
                <meta name="description" content="Review app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <div className="min-h-screen max-w-screen flex flex-col-reverse md:flex-row">
                <Header />
                <main className="p-1 flex-grow flex justify-center items-center">
                    <section className="space-y-8 max-w-xs">
                        <h1 className="text-primary-one font-bold text-center text-3xl">Movie List</h1>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search for a movie"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <button
                                onClick={handleSearchClick}
                                className="px-4 py-2 bg-blue-500 text-black rounded-lg"
                            >
                                Search
                            </button>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <ul>
                            {filteredMovies.length === 0 ? (
                                <p>No movies found</p>
                            ) : (
                                filteredMovies.map(movie => (
                                    <li key={movie.id} className="border p-2 rounded-lg">
                                        <h3 className="font-bold">{movie.title}</h3>
                                        <p>{movie.description}</p>
                                        <button
                                            onClick={() => handleAddToWatchlist(movie)}
                                            className="mt-2 px-4 py-2 bg-green-500 text-black rounded-lg"
                                        >
                                            Add to Watchlist
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Moviepage;    