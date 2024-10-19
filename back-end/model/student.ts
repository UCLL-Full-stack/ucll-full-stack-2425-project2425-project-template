import { User } from "./user";

export class Student extends User {
    private _nationality: string;

    constructor(student: { id: number; name: string; email: string; password: string; nationality: string }) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });

        this._nationality = student.nationality;
    }

    public get nationality(): string {
        return this._nationality;
    }

    public set nationality(value: string) {
        this._nationality = value;
    }

    public equals(student: Student): boolean {
        return (
            this.id === student.id &&
            this.name === student.name &&
            this.email === student.email &&
            this.password === student.password &&
            this.nationality === student.nationality
        );
    }
}
