import {Movie as MoviePrisma} from "@prisma/client"; 

export class Movie {
    private id?: number;
    private name: String;
    private duration: Date;
    private playingdates: Date[];
    private genre: String;
    private summary: String;

    constructor(movie: {
        id?: number;
        name: String;
        duration: Date;
        playingdates: Date[];
        genre: String;
        summary: String;
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

    getName(): String{
        return this.name;
    }

    getDuration(): Date {
        return this.duration;
    }

    getPlayingdates(): Date[] {
        return this.playingdates;
    }

    getGenre(): String {
        return this.genre;
    }

    getSummary(): String {
        return this.summary;
    }

    static from({
        id,
        name,
        duration,
        playingdates,
        genre,
        summary,
    }: MoviePrisma) {
        return new Movie ({
            id,
            name,
            duration,
            playingdates,
            genre,
            summary,
        })
    }

}
