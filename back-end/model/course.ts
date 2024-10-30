import { th } from "date-fns/locale";

export class Course {
    private _id?: number;
    private _name: string;
    private _description: string;
    private _phase: number;
    private _credits: number;
    private _lecturers: string[];
    private _isElective: boolean;
    private _requiredPassedCourses: Course[];

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
        this._id = course.id;
        this._name = course.name;
        this._description = course.description;
        this._phase = course.phase;
        this._credits = course.credits;
        this._lecturers = course.lecturers;
        this._isElective = course.isElective;
        this._requiredPassedCourses = course.requiredPassedCourses;
    }

    public get id(): number|undefined {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {

        return this._name;
    }

    public set name(value: string) {
        if (!value || value.length=== 0){
            throw new Error("Name is required.")
        }
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        if (!value || value.length=== 0){
            throw new Error("Description is required.")
        }
        this._description = value;
    }

    public get phase(): number {
        return this._phase;
    }

    public set phase(value: number) {
        if (!value || value <3 || value > 0 ){
            throw new Error("Phase is required and can be 1 or 2.")
        }
        this._phase = value;
    }

    public get credits(): number {
        return this._credits;
    }

    public set credits(value: number) {
    if (!value || value <= 0) {
        throw new Error("Credits are required and cannot be negative")
    }
        this._credits = value;
    }

    public get lecturers(): string[] {
        return this._lecturers;
    }

    public set lecturers(value: string[]) {
        if (!value || value.length=== 0){
            throw new Error("Lecturer is required.")
        }
        this._lecturers = value;
    }

    public get isElective(): boolean {
        return this._isElective;
    }

    public set isElective(value: boolean) {
        if (value === null){
            throw new Error("Course has to be an elective or non elective")
        }
        this._isElective = value;
    }

    public get requiredPassedCourses(): Course[] {
        return this._requiredPassedCourses;
    }

    public set requiredPassedCourses(value: Course[]) {
        if (!value|| value.length === 0) {
            this._requiredPassedCourses = new Array;
        }
        this._requiredPassedCourses = value;
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
