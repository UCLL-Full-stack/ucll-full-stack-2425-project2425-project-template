import { Course } from "./course";
import { Student } from "./student";

export class ISP {
    private readonly _id?: number;
    private readonly _status: string;
    private readonly _totalCredits: number;
    private readonly _year: number;
    private readonly _courses: Course[];
    private readonly _student: Student;

    constructor(isp: {
        id: number;
        status: string;
        totalCredits: number;
        year: number;
        courses: Course[];
        student: Student;
    }) {
        this.validate(isp);
        this._id = isp.id;
        this._status = isp.status;
        this._totalCredits = isp.totalCredits;
        this._year = isp.year;
        this._courses = isp.courses ||[];
        this._student = isp.student;
    }

    validate(isp: { status: string; totalCredits: number; year: number; student: Student;}) {
        if (!isp.status || isp.status.length=== 0){
            throw new Error("Description is required.")
        }
        if (!isp.totalCredits || isp.totalCredits <= 0) {
            throw new Error("Credits are required and cannot be negative")
        }
        if (!isp.year) {
            throw new Error("Start year is required.")
        }
        if(isp.year > 9999 || isp.year <1000){
            throw new Error("Start year should be 4 digit.")
        }
        if(!isp.student) {
            throw new Error("Student is required.")
        }
    }

    public get id(): number|undefined {
        return this._id;
    }

    public get status(): string {
        return this._status;
    }


    public get totalCredits(): number {
        return this._totalCredits;
    }


    public get year(): number {
        return this._year;
    }


    public get courses(): Course[] {
        return this._courses;
    }

    public get student(): Student {
        return this._student;
    }


    public equals(isp: ISP): boolean {
        return (
            this.id === isp.id &&
            this.status === isp.status &&
            this.totalCredits === isp.totalCredits &&
            this.year === isp.year &&
            this._courses.length === isp._courses.length &&
            this._courses.every((course, index) => course.equals(isp._courses[index]))
        );
    }
}
