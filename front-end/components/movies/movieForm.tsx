import { useState } from 'react';
import MovieService from '@/services/movieService';
import { Movie } from '@/types';

const MovieForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<Date>(new Date());
  const [playingdates, setPlayingdates] = useState<Date[]>([]);
  const [genre, setGenre] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddMovie = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    
    const newMovie: Movie = {
      name,
      duration,
      playingdates,
      genre,
      summary,
    };

    try {
      const response = await MovieService.addMovie(newMovie);
      if (!response.ok) {
        throw new Error('Failed to create movie');
      }
      const createdMovie = await response.json();
      console.log('Movie created:', createdMovie);
      setName('');
      setDuration(new Date());
      setPlayingdates([]);
      setGenre('');
      setSummary('');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleAddPlayingDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setPlayingdates([...playingdates, date]);
  };

  return (
    <form onSubmit={handleAddMovie}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='p-1'>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='p-1'>
        <label>
          Duration:
          <input
            type="time"
            value={duration.getTime()}
            onChange={(e) => setDuration(new Date(e.target.value))}
            required
          />
        </label>
      </div>
      <div className='p-1'>
        <label>
          Playing Dates:
          <input
            type="date"
            onChange={handleAddPlayingDate}
          />
          <ul>
            {playingdates.map((date, index) => (
              <li key={index}>{date.toISOString().substring(0, 10)}</li>
            ))}
          </ul>
        </label>
      </div >
      <div className='p-1'>
        <label>
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='p-1'>
        <label>
          Summary:
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
