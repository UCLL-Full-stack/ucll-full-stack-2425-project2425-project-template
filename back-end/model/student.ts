import { User } from "./user";

export class Student extends User {
    private nationality: string;

    constructor(student: { id: number; name: string; email: string; password: string; nationality: string }) {

        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });

        this.nationality = student.nationality;
    }

    public getNationality(): string {
        return this.nationality;
    }

    public equals(student: Student): boolean {
        return (
            this.getId() === student.getId() &&
            this.getName() === student.getName() &&
            this.getEmail() === student.getEmail() &&
            this.getPassword() === student.getPassword() &&
            this.getNationality() === student.getNationality()
        );
    }
}
