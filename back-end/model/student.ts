import { Course } from "./course";
import { User } from "./user";

export class Student extends User {
    private readonly _nationality: string;
    private readonly _startYear: number;
    private readonly _passedCourses: Course[];

    constructor(student: { id: number; name: string; email: string; password: string; nationality: string; startYear: number; passedCourses: Course[] }) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });
        this.validates(student);
        this._nationality = student.nationality;
        this._startYear = student.startYear;
        this._passedCourses = student.passedCourses || [];
    }

    validates(student: { nationality: string; startYear: number;}) {
        if (!student.nationality || student.nationality.length=== 0){
            throw new Error("Nationality is required.")
        }
        if (!student.startYear) {
            throw new Error("Start year is required.")
        }
        if(student.startYear > 9999 || student.startYear <1000){
            throw new Error("Start year should be 4 digit.")
        }
    }

    get nationality(): string {
        return this._nationality;
    }


    get startYear(): number {
        return this._startYear;
    }


    get passedCourses(): Course[] {
        return this._passedCourses;
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
