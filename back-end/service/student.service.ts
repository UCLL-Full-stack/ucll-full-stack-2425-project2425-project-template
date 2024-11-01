<<<<<<< HEAD
import studentDb from "../domain/data-access/student.db";
import { Student } from "../domain/model/student";

const getStudentById = async (studentId: number): Promise<Student | null> => {
  if (!studentId || studentId <= 0) {
    throw new Error("Invalid student ID.");
  }

  const student = await studentDb.getStudentById(studentId);
  if (!student) {
    throw new Error(`Student with ID ${studentId} not found.`);
  }
  
  return student;
};

const getAllStudents = async (): Promise<Student[]> => {
  const students = await studentDb.getAllStudents();
  if (students.length === 0) {
    console.warn("No students found.");
  }
  
  return students;
};

const getStudentByUsername = async (username: string): Promise<Student | null> => {
  if (!username) {
    throw new Error("Username is required.");
  }

  const student = await studentDb.getStudentByUsername(username);
  if (!student) {
    throw new Error(`Student with username '${username}' not found.`);
  }
  
  return student;
};

const createStudent = async (studentData: {
  username: string;
  email: string;
}): Promise<Student> => {
  if (!studentData.username || !studentData.email) {
    throw new Error("All fields (username and email) are required.");
  }

  try {
    const student = await studentDb.createStudent(studentData);
    console.log(`Student created with ID: ${student.id}`);
    return student;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating student. See server logs for details.");
  }
};

export default {
  getStudentById,
  getAllStudents,
  getStudentByUsername,
  createStudent
};
=======
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
>>>>>>> 7b5040db1acd6364f8d87d0448785e46e76aee34
