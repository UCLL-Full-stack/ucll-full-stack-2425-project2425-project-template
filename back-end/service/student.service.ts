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
