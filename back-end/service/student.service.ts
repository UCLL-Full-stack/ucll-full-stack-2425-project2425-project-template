import studentDb from "../repository/student.db";
import { Student } from "../model/student";
import { StudentInput } from "../types";
import bcrypt from 'bcrypt';

const createStudent = async (input: StudentInput): Promise<Student> => {
  
  const { username, email, password, studentNumber } = input;
  
  const existing = await studentDb.getStudentByUsername(username);

  if (existing) {
      throw new Error(`User with Username ${username} is already exists.`);
  }

//   if (!username || username.trim().length === 0) {
//       throw new Error("Username is required.");
//   }

//   if (!email || email.trim().length === 0) {
//       throw new Error("Email is required.");
//   }

//   if (!password || password.trim().length === 0) {
//       throw new Error("Password is required.");
//   }

//   if (!studentNumber || studentNumber.trim().length === 0) {
//       throw new Error("Student number is required.");
//   }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newStudent = new Student({ username, email, password: hashedPassword, studentNumber });
  newStudent.validate();

  try {
      return await studentDb.createStudent({
        username,
        email,
        password: hashedPassword,
        studentNumber,
      });
  } catch (error) {
      console.error("Error creating student:", error);
      throw new Error("Student creation failed due to a database error.");
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

export default { createStudent, getStudentById, getAllStudents, getStudentByUsername };
