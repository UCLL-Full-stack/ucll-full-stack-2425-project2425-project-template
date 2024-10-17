import { Student } from '../model/student';

// Dummy data
const students: Student[] = [
    new Student({ id: 1, username: 'john_doe', email: 'john@example.com', password: 'securepassword', studentNumber: '123456' }),
    new Student({ id: 2, username: 'jane_smith', email: 'jane@example.com', password: 'password123', studentNumber: '654321' }),
];

// Create
export const createStudent = (student: Student): Student => {
    students.push(student);
    return student;
};

// Read
export const findAllStudents = (): Student[] => {
    return students;
};

export const findStudentById = (id: number): Student | undefined => {
    return students.find(student => student.getId() === id);
};

