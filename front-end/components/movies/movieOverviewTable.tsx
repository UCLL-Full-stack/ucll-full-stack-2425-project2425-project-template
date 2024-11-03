import React from 'react';
import { Movie } from '@/types';

type Props = {
  movies: Array<Movie>;
};

const MovieOverviewTable: React.FC<Props> = ({ movies }: Props) => {
  return (
    <>
      {movies && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.name}</td>
                <td>{movie.genre}</td>
                <td>
                  {typeof movie.duration === "string"
                    ? new Date(movie.duration).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : movie.duration.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default MovieOverviewTable;
