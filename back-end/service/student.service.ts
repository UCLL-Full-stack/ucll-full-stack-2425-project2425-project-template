import studentDb from "../repository/student.db";
import { Student } from "../model/student";
import userService from "./user.service";

const getStudentById = async (studentId: number): Promise<Student | null> => {
  try {
    if (typeof studentId !== 'number' || studentId <= 0) {
      throw new Error("Invalid Student ID");
    }

    const student = await studentDb.getStudentById(studentId);
    if (!student) {
      throw new Error(`Student with ID ${studentId} does not exist.`);
    }
    return student;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw new Error("Database error. See server log for details.");
  }
};

const getStudentByUsername = async (username: string): Promise<Student | null> => {
  try {
    const user = await userService.getUserByUsername({ username });

    if (!user) {
      throw new Error(`User with username ${username} does not exist.`);
    }

    const userId = user.getId();
    if (userId === undefined) {
      throw new Error(`User with username ${username} has no valid ID.`); 
    }

    const student = await studentDb.getStudentById(userId);
    if (!student) {
      throw new Error(`Student with username ${username} does not exist.`);
    }

    return student;
  } catch (error) {
    console.error('Error fetching student by username:', error);
    throw error; 
  }
};

const getAllStudents = async (): Promise<Student[]> => {
  try {
    return await studentDb.getAllStudents();
  } catch (error) {
    console.error("Error fetching all students:", error);
    throw new Error("Could not retrieve students.");
  }
};

const createStudent = async ({
  studentNumber,
  userId,
}: {
  studentNumber: string;
  userId: number | undefined; 
}): Promise<Student> => {
  try {
    if (typeof userId !== 'number' || userId <= 0) {
      throw new Error("Invalid user ID");
    }

    const userExists = await userService.getUserById(userId);  
    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const student = await studentDb.createStudent({ studentNumber, userId });
    return student;
  } catch (error) {
    console.error('Error creating student:', error);
    throw new Error("Database error. See server log for details.");
  }
};


export default { createStudent, getStudentById, getAllStudents, getStudentByUsername };
