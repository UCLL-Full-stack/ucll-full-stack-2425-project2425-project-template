export class Badge{
    private name: string;
    private location: string;
    private difficulty: number;

    constructor(badge:{
        name:string,
        location:string,
        difficulty:number
    }) {
        this.name = badge.name;
        this.location = badge.location;
        this.difficulty = badge.difficulty;
    }

    getName(): string {
        return this.name;
    }

    getLocation(): string {
        return this.location;
    }

    getDifficulty(): number {
        return this.difficulty
    }
}