import studentDb from "../repository/student.db";
import { Student } from "../model/student";
import { AuthenticationResponse, StudentInput } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";
import database from "../util/database";

const createStudent = async ({
    username,
    email,
    password,
    studentNumber,
    firstName,
    lastName,
    role,
  }: {
    username: string;
    email: string;
    password: string;
    studentNumber: string;
    firstName: string;
    lastName: string;
    role: string;
  }): Promise<Student> => {
    try {
      const studentPrisma = await database.student.create({
        data: {
          username,
          email,
          password,
          studentNumber,
          firstName,
          lastName,
          role,
        },
        include: {
          bookings: {
            include: {
              trip: true,
            },
          },
          review: true,
        },
      });
      return Student.from(studentPrisma);
    } catch (error) {
      console.error(error);
      throw new Error('Database error. See server log for details.');
    }
  };
  

const getStudentById = async (studentId: number): Promise<Student | null> => {
    if (typeof studentId !== 'number' || studentId <= 0) {
        throw new Error("Invalid Student ID");
    }

    const student = await studentDb.getStudentById(studentId);
    if (!student) {
        throw new Error(`Student with ID ${studentId} does not exist.`);
    }
    return student;
};

const getAllStudents = async (): Promise<Student[]> => {
    try {
        return await studentDb.getAllStudents();
    } catch (error) {
        console.error("Error fetching all students:", error);
        throw new Error("Could not retrieve students.");
    }
};

const getStudentByUsername = async (username: string): Promise<Student | null> => {
    if (!username || username.trim().length === 0) {
        throw new Error("Username is required.");
    }

    const student = await studentDb.getStudentByUsername(username);
    if (!student) {
        throw new Error(`Student with username ${username} does not exist.`);
    }
    return student;
};

const authenticate = async ({ username, password }: StudentInput): Promise<AuthenticationResponse> => {
    const student = await getStudentByUsername(username);

    if (!student) {
        throw new Error("Student not found.");
    }

    const isValidPassword = await bcrypt.compare(password, student.getPassword());
    if (!isValidPassword) {
        throw new Error("Incorrect password.");
    }

    return {
        token: generateJwtToken({ username, role: student.getRole() }),
        username: username,
        fullname: `${student.getFirstName()} ${student.getLastName()}`,
        role: student.getRole(),
    };
}

export default { createStudent, getStudentById, getAllStudents, getStudentByUsername, authenticate };
