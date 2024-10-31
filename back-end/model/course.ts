
export class Course {
    private readonly _id?: number;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _phase: number;
    private readonly _credits: number;
    private readonly _lecturers: string[];
    private readonly _isElective: boolean;
    private readonly _requiredPassedCourses: Course[];

    constructor(course: {
        id: number;
        name: string;
        description: string;
        phase: number;
        credits: number;
        lecturers: string[];
        isElective: boolean;
        requiredPassedCourses: Course[];
    }) {
        this.validate(course);
        this._id = course.id;
        this._name = course.name;
        this._description = course.description;
        this._phase = course.phase;
        this._credits = course.credits;
        this._lecturers = course.lecturers;
        this._isElective = course.isElective;
        this._requiredPassedCourses = course.requiredPassedCourses;
    }

    validate(course: {name: string; description: string; phase: number; credits: number; lecturers: string[]; isElective: boolean; }) {
        if (!course.name || course.name.length=== 0){
            throw new Error("Name is required.")
        }
        if (!course.description || course.description.length=== 0){
            throw new Error("Description is required.")
        }
        if (!course.phase || course.phase >3 || course.phase < 0 ){
            throw new Error("Phase is required and can be 1 or 2.")
        }
        if (!course.credits || course.credits <= 0) {
            throw new Error("Credits are required and cannot be negative")
        }
        if (!course.lecturers || course.lecturers.length=== 0){
            throw new Error("Lecturer is required.")
        }
        if (course.isElective === null){
            throw new Error("Course has to be an elective or non elective")
        }
    }
    public get id(): number|undefined {
        return this._id;
    }

    public get name(): string {

        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get phase(): number {
        return this._phase;
    }

    public get credits(): number {
        return this._credits;
    }

    public get lecturers(): string[] {
        return this._lecturers;
    }


    public get isElective(): boolean {
        return this._isElective;
    }
    public get requiredPassedCourses(): Course[] {
        return this._requiredPassedCourses;
    }


    public set requiredCourse(course: Course) {
        if (this._requiredPassedCourses.includes(course))
            throw new Error("Course is already required");    
        this._requiredPassedCourses.push(course);
    }

    public equals(other: Course): boolean {
        return (
            this.id === other.id &&
            this.name === other.name &&
            this.phase === other.phase &&
            this.credits === other.credits &&
            this.isElective === other.isElective &&
            this.lecturers.every((lecturer, index) => lecturer === other.lecturers[index])
        );
    }
}
