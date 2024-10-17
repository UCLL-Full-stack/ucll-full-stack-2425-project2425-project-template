import { Student } from "../domain/model/student";

export class studenRepository {
    private students: Student[] = [];

    async getAllStudents(): Promise<Student[]> {
        return this.students;
    }

    async addStudent(student: Student): Promise<Student> {
        this.students.push(student);
        return student;
    }

    async getStudentById(id: number): Promise<Student | undefined> {
        return this.students.find(student => student.getId() === id);
    }

    async deleteStudentById(id: number): Promise<void> {
        this.students = this.students.filter(student => student.getId() !== id);
    }
}