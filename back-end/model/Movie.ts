

export class Movie {
    private id?: number;
    private name: string;
    private duration: Date;
    private playingdates: Date[];
    private genre: string;
    private summary: string;

    constructor(movie: {
        id?: number;
        name: string;
        duration: Date;
        playingdates: Date[];
        genre: string;
        summary: string;
    }) {
        this.id = movie.id;
        this.name = movie.name;
        this.duration = movie.duration;
        this.playingdates = movie.playingdates;
        this.genre = movie.genre;
        this.summary = movie.summary;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getDuration(): Date {
        return this.duration;
    }

    getPlayingdates(): Date[] {
        return this.playingdates;
    }

    getGenre(): string {
        return this.genre;
    }

    getSummary(): string {
        return this.summary;
    }

}
