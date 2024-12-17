import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import MovieService from "@/services/movieService";
import MovieOverviewTable from "@/components/movies/movieOverviewTable";
import MovieForm from "@/components/movies/movieForm";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);


  const addMovie = async () => {
    const newMovie = {
      name: "New Movie",
      duration: new Date(0,0,0,3,30,0),
      playingdates: [new Date('2024-06-27'), new Date('2024-08-01')],
      genre: "action",
      summary: "A brand new movie."
    };
    const response = await MovieService.addMovie(newMovie);
    if (response.ok) {
      getMovies(); 
    } else {
      console.error("Failed to add movie");
    }
  };


  const getMovies = async () => {
    const response = await MovieService.getAllMovies();
    const json = await response.json();
    setMovies(json);
  };

  useEffect(() => {getMovies();}, []);

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Movies</h1>
        <section>
          <h2>Movies Overview</h2>
          <MovieOverviewTable movies={movies} />
        </section>
        <section>
          <h2>Add a Movie</h2>
          <MovieForm/>
        </section>
      </main>
    </>
  );
};

export default Movies;
