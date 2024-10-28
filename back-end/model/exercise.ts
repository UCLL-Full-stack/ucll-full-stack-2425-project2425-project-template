export class Exercise {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly video_link: string;

    constructor(exercise: { id: number; name: string; description: string; video_link: string }) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.video_link = exercise.video_link;
    }

    equals({ id, name, description, video_link }: { id: number; name: string; description: string; video_link: string }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.video_link === video_link
        );
    }
}



