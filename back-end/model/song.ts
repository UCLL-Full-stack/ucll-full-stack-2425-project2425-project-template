export class Song {
    private id?: number;
    private title: string;
    private genre: string;

    constructor(song: {
        id?: number; title: string; genre: string;
    }) {
        this.validate(song);

        this.id = song.id;
        this.title = song.title;
        this.genre = song.genre;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title
    }

    getGenre(): string {
        return this.genre
    }

    validate(song: {title: string; genre: string}) {
        if(!song.title) {
            throw new Error('Title is required')
        }
        if(!song.genre) {
            throw new Error('Genre is required')
        }
    }

    equals(song: Song): boolean {
        return (
            this.id === song.getId() &&
            this.title === song.getTitle() &&
            this.genre === song.getGenre()
        )
    }
}