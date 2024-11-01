import database from "../../util/database";
import { Student } from "../model/student";
import { Booking } from "../model/booking";

const getStudentById = async (studentId: number): Promise<Student | null> => {
  try {
    const studentPrisma = await database.student.findUnique({
      where: { id: studentId },
      include: {
        bookings: true,
        review: true,
      }
    });
    return studentPrisma ? Student.from(studentPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

const getAllStudents = async (): Promise<Student[]> => {
  try {
    const studentsPrisma = await database.student.findMany({
      include: {
        bookings: true,
        review: true,
      }
    });
    return studentsPrisma.map((studentPrisma) => Student.from(studentPrisma));
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

const getStudentByUsername = async (username: string): Promise<Student | null> => {
  try {
    const studentPrisma = await database.student.findFirst({
      where: { username },
      include: {
        bookings: true,
        review: true,
      }
    });
    return studentPrisma ? Student.from(studentPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

const createStudent = async ({ username, email, password, studentNumber }: { username: string, email: string, password: string, studentNumber: string }): Promise<Student> => {
  try {
    const studentPrisma = await database.student.create({
      data: {
        username,
        email,
        password,
        studentNumber,
        bookings: { create: [] },
        review: {},
      },
      include: {
        bookings: true,
        review: true,
      }
    });
    return Student.from(studentPrisma);
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

export default {
  getStudentById,
  getAllStudents,
  getStudentByUsername,
  createStudent
};
