export class Exercise {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly video_link: string;

    constructor(exercise: { id: number; name: string; description: string; video_link: string }) {
        this.validate(exercise);
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.video_link = exercise.video_link;
    }
    validate(exercise: { id: number; name: string; description: string; video_link: string; }) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/; // AI generated regex for URL validation
        if (typeof exercise.video_link !== 'string' || !urlRegex.test(exercise.video_link)) {
            throw new Error("Invalid Video Link: Must be a valid URL");
        }

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



