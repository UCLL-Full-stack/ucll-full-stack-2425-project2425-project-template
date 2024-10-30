import { Course } from "./course";
import { User } from "./user";

export class Student extends User {
    private _nationality: string;
    private _startYear: number;
    private _passedCourses: Course[];

    constructor(student: { id: number; name: string; email: string; password: string; nationality: string; startYear: number; passedCourses: Course[] }) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });

        this._nationality = student.nationality;
        this._startYear = student.startYear;
        this._passedCourses = student.passedCourses || [];
    }

    get nationality(): string {
        return this._nationality;
    }

    set nationality(value: string) {
        if (!value || value.length=== 0){
            throw new Error("Nationality is required.")
        }
        this._nationality = value;
    }

    get startYear(): number {
        return this._startYear;
    }

    set startYear(value: number) {
        if (!value){
            throw new Error("Start year is required.")
        }
        this._startYear = value;
    }

    get passedCourses(): Course[] {
        return this._passedCourses;
    }

    set passedCourses(value: Course[]) {
        if(value.length === 0){
            this._passedCourses = new Array();
        }
        this._passedCourses = value;
    }
    equals(student: Student): boolean {
        return (
            this.id === student.id &&
            this.name === student.name &&
            this.email === student.email &&
            this.password === student.password &&
            this.nationality === student.nationality &&
            this._passedCourses.every((passedCourse,index)=> passedCourse.equals(student._passedCourses[index]))
        );
    }
}
