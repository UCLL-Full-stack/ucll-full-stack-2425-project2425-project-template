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
      },
    });
    return studentsPrisma.map((studentPrisma) => Student.from(studentPrisma));
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

const getStudentByUsername = async (username: string): Promise<Student | null> => {
  if (!username || username.trim().length === 0) {
    throw new Error("Username is required.");
  }

  try {
    const studentPrisma = await database.student.findFirst({
      where: { username },
      include: {
        bookings: {
          include: {
            trip: true,
          },
        },
        review: true,
      },
    });

    if (!studentPrisma) {
      throw new Error(`Student with username ${username} does not exist.`);
    }

    return Student.from(studentPrisma);
  } catch (error) {
    console.error('Error fetching student by username:', error);
    throw new Error("Database error. See server log for details.");
  }
};


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
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the student already exists
    const existingStudent = await database.student.findFirst({
      where: { username },
    });
    if (existingStudent) {
      throw new Error(`Student with username ${username} already exists.`);
    }

    const studentPrisma = await database.student.create({
      data: {
        username,
        email,
        password: hashedPassword,
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
  getStudentByUsername,
  createStudent
};
