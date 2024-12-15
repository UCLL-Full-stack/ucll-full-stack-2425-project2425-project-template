export class Film {
    private director: string;
    private genre: string;
    private description: string;
    private duration: number;
    private title: string;
    private ageRating: number;

    constructor(film: { director: string; genre: string; description: string; duration: number; title: string; ageRating: number;}) {
        this.director = film.director;
        this.genre = film.genre;
        this.description = film.description;
        this.duration = film.duration;
        this.title = film.title;
        this.ageRating = film.ageRating;
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

    validate(film: {
        director: string; 
        genre: string; 
        description: string; 
        duration: number; 
        title: string; 
        ageRating: number;
    }) {
        if (!film.director?.trim()) {
            throw new Error('Director is required');
        }
        if (!film.genre?.trim()) {
            throw new Error('Genre is required');
        }
        if (!film.description?.trim()) {
            throw new Error('Description is required');
        }
        if (film.duration == null || isNaN(film.duration) || film.duration <= 0) {
                throw new Error('Duration is required');
        }
        if (!film.title?.trim()) {
            throw new Error('Title is required');
        }
        if (film.ageRating == null || isNaN(film.ageRating)) {
            throw new Error('Age rating is required');
    }
    }
    equals(film: Film): boolean {
        return (
           this.director === film.getDirector() &&
           this.genre == film.getGenre() &&
           this.description === film.getDescription() &&
           this.duration === film.getDuration() &&
           this.title === film.getTitle() &&
           this.ageRating === film.getAgeRating()
        );
    }
}

export default {Film};