import studentService from '../../service/student.service';
import studentDb from '../../domain/data-access/student.db';
import { Student } from '../../domain/model/student';

let mockStudentDbCreateStudent: jest.Mock;
let mockStudentDbGetStudentById: jest.Mock;
let mockStudentDbGetAllStudents: jest.Mock;
let mockStudentDbGetStudentByUsername: jest.Mock;

beforeEach(() => {
    mockStudentDbCreateStudent = jest.fn();
    mockStudentDbGetStudentById = jest.fn();
    mockStudentDbGetAllStudents = jest.fn();
    mockStudentDbGetStudentByUsername = jest.fn();

    studentDb.createStudent = mockStudentDbCreateStudent;
    studentDb.getStudentById = mockStudentDbGetStudentById;
    studentDb.getAllStudents = mockStudentDbGetAllStudents;
    studentDb.getStudentByUsername = mockStudentDbGetStudentByUsername;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a new student', async () => {
    // Given
    const studentInput = { username: 'student1', email: 'student1@example.com', password: 'password123', studentNumber: '123456' };
    const mockStudent = new Student({ id: 1, ...studentInput });

    mockStudentDbCreateStudent.mockResolvedValue(mockStudent);

    // When
    const student = await studentService.createStudent(studentInput);

    // Then
    expect(student).toEqual(mockStudent);
    expect(mockStudentDbCreateStudent).toHaveBeenCalledWith(studentInput);
});

test('should throw an error if required fields are missing when creating a student', async () => {
    // Given
    const invalidStudentInput = { username: '', email: 'student1@example.com', password: 'password123', studentNumber: '123456' };

    // When & Then
    await expect(studentService.createStudent(invalidStudentInput)).rejects.toThrow("Username is required.");
});

test('should return a student by ID', async () => {
    // Given
    const studentId = 1;
    const mockStudent = new Student({ id: studentId, username: 'student1', email: 'student1@example.com', password: 'password123', studentNumber: '123456' });

    mockStudentDbGetStudentById.mockResolvedValue(mockStudent);

    // When
    const student = await studentService.getStudentById(studentId);

    // Then
    expect(student).toEqual(mockStudent);
    expect(mockStudentDbGetStudentById).toHaveBeenCalledWith(studentId);
});

test('should throw an error if student ID does not exist', async () => {
    // Given
    const studentId = 999;
    mockStudentDbGetStudentById.mockResolvedValue(null);

    // When & Then
    await expect(studentService.getStudentById(studentId)).rejects.toThrow(`Student with ID ${studentId} does not exist.`);
});

test('should throw an error if student ID is invalid', async () => {
    // Given
    const invalidStudentId = -1;

    // When & Then
    await expect(studentService.getStudentById(invalidStudentId)).rejects.toThrow("Invalid Student ID");
});

test('should return all students', async () => {
    // Given
    const mockStudents: Student[] = [
        new Student({ id: 1, username: 'student1', email: 'student1@example.com', password: 'password123', studentNumber: '123456' }),
        new Student({ id: 2, username: 'student2', email: 'student2@example.com', password: 'password456', studentNumber: '654321' }),
    ];

    mockStudentDbGetAllStudents.mockResolvedValue(mockStudents);

    // When
    const students = await studentService.getAllStudents();

    // Then
    expect(students).toEqual(mockStudents);
    expect(mockStudentDbGetAllStudents).toHaveBeenCalled();
});

test('should return a student by username', async () => {
    // Given
    const username = 'student1';
    const mockStudent = new Student({ id: 1, username, email: 'student1@example.com', password: 'password123', studentNumber: '123456' });

    mockStudentDbGetStudentByUsername.mockResolvedValue(mockStudent);

    // When
    const student = await studentService.getStudentByUsername(username);

    // Then
    expect(student).toEqual(mockStudent);
    expect(mockStudentDbGetStudentByUsername).toHaveBeenCalledWith(username);
});

test('should throw an error if username is required when getting a student by username', async () => {
    // Given
    const username = '';

    // When & Then
    await expect(studentService.getStudentByUsername(username)).rejects.toThrow("Username is required.");
});

test('should throw an error if student with username does not exist', async () => {
    // Given
    const username = 'nonexistent';
    mockStudentDbGetStudentByUsername.mockResolvedValue(null); 

    // When & Then
    await expect(studentService.getStudentByUsername(username)).rejects.toThrow(`Student with username ${username} does not exist.`);
});
