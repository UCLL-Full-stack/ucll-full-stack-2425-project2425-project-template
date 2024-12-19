import studentDb from "../repository/student.db";
import { Student } from "../model/student";
import database from "../util/database";
import userDb from "../repository/user.db";
import userService from "./user.service";

const createStudent = async ({
    studentNumber,
    userId,
  }: {
    studentNumber: string;
    userId: number;
  }): Promise<Student> => {
    try {
      if (!studentNumber || !userId) {
        throw new Error("Student number and user ID are required.");
    }
      const studentPrisma = await database.student.create({
        data: {
          studentNumber,
          user: { connect: { id: userId } },        
        },
        include: {
          bookings: {
            include: {
              trip: true,
            },
          },
          review: true,
          user: true
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

const getStudentByUsername = async (username: string): Promise<Student | null> => {

  const user = await userService.getUserByUsername({username});

  const student = null
  if (!student) {
      throw new Error(`Student with username ${username} does not exist.`);
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

export default { createStudent, getStudentById, getAllStudents, getStudentByUsername};
