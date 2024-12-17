import database from "../util/database";
import { Student } from "../model/student";
import { Booking } from "../model/booking";
import bcrypt from 'bcrypt';

const getStudentById = async (studentId: number): Promise<Student | null> => {
  try {
    const studentPrisma = await database.student.findUnique({
      where: { id: studentId },
      include: {
        bookings:{
          include:{
            trip: true,
          },
        },
        review: true,
        user: true,
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
        bookings: {
          include: {
            trip: true,
          },
        },
        review: true,
        user: true,
      },
    });
    return studentsPrisma.map((studentPrisma) => Student.from(studentPrisma));
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

const createStudent = async ({
  studentNumber,
  userId,
}: {
  studentNumber: string;
  userId: number;
}): Promise<Student> => {
  try {
    const studentPrisma = await database.student.create({
      data: {
        studentNumber,
        userId,
      },
      include: {
        bookings: {
          include: {
            trip: true,
          },
        },
        review: true,
        user: true,
      },
    });

    return Student.from(studentPrisma);
  } catch (error) {
    console.error('Error creating student:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Database error. See server log for details.');
  }
};


export default {
  getStudentById,
  getAllStudents,
  createStudent
};
