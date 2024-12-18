import {Movie as MoviePrisma } from '@prisma/client';

export class Movie {
    private id?: number;
    private director: string;
    private genre: string;
    private description: string;
    private duration: number;
    private title: string;

    private ageRating: number;

    constructor(movie: {id?: number; director: string; genre: string; description: string; duration: number; title:  string; ageRating: number;}) {
        this.id = movie.id;
        this.director = movie.director;
        this.genre = movie.genre;
        this.description = movie.description;
        this.duration = movie.duration;
        this.title = movie.title;
  
        this.ageRating = movie.ageRating;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDirector(): string {
        return this.director;
    }

    getGenre(): string {
        return this.genre;
    }

    getDescription(): string {
        return this.description;
    }

    getDuration(): number {
        return this.duration;
    }

    getTitle(): string {
        return this.title;
    }

    getAgeRating(): number {
        return this.ageRating;
    }

    validate(movie: {
        director: string; 
        genre: string; 
        description: string; 
        duration: number; 
        title: string; 
        ageRating: number;
    }) {
        if (!movie.director?.trim()) {
            throw new Error('Director is required');
        }
        if (!movie.genre?.trim()) {
            throw new Error('Genre is required');
        }
        if (!movie.description?.trim()) {
            throw new Error('Description is required');
        }
        if (movie.duration == null || isNaN(movie.duration) || movie.duration <= 0) {
                throw new Error('Duration is required');
        }
        if (!movie.title?.trim()) {
            throw new Error('Title is required');
        }
        if (movie.ageRating == null || isNaN(movie.ageRating)) {
            throw new Error('Age rating is required');
    }
    }
    equals(movie: Movie): boolean {
        return (
           this.director === movie.getDirector() &&
           this.genre == movie.getGenre() &&
           this.description === movie.getDescription() &&
           this.duration === movie.getDuration() &&
           this.title === movie.getTitle() &&
           this.ageRating === movie.getAgeRating()
        );
    }

    static from({  id,
        director,
        genre,
        description,
        duration,
        title,
        ageRating, }: MoviePrisma) {
            return new Movie({
                id,
                director,
                genre,
                description,
                duration,
                title,
                ageRating,
            });
        }
}

export default {Movie};