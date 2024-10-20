import { Course } from "./course";
import { User } from "./user";

export class Student extends User {
    private _nationality: string;
    private _passedCourses: Course[];

    constructor(student: { id: number; name: string; email: string; password: string; nationality: string ; passedCourses: Course[]}) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });

        this._nationality = student.nationality;
        this._passedCourses = student.passedCourses;
    }

    get nationality(): string {
        return this._nationality;
    }

    set nationality(value: string) {
        this._nationality = value;
    }

    public get passedCourses(): Course[] {
        return this._passedCourses;
    }

    public set passedCourses(value: Course[]) {
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
