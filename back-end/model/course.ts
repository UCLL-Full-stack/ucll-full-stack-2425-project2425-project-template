export class Course{
    private id: number;
    private name: string;
    private phase: number;
    private credits: number;
    private lecturers: string[];
    private isElective: boolean;

    constructor(course: { id: number; name: string; phase: number; credits: number; lecturers: string[]; isElective: boolean }) {
        this.id = course.id;
        this.name = course.name;
        this.phase = course.phase;
        this.credits = course.credits;
        this.lecturers = course.lecturers;
        this.isElective = course.isElective;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPhase(): number {
        return this.phase;
    }

    public getCredits(): number {
        return this.credits;
    }

    public getLecturers(): string[] {
        return this.lecturers;
    }

    public getIsElective(): boolean {
        return this.isElective;
    } 
    
    public equals(other: Course): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.phase === other.getPhase() &&
            this.credits === other.getCredits() &&
            this.isElective === other.getIsElective() &&
            this.lecturers.every((lecturer, index) => lecturer === other.getLecturers()[index])
        );
    }
}