import studentDb from "../../domain/data-access/student.db";
import { Student } from "../../domain/model/student";
import studentService from "../../service/student.service";
import { StudentInput, BookingInput } from "../../types";

let mockStudentDbCreateStudent: jest.Mock;
let mockStudentDbGetStudentById: jest.Mock;
let mockStudentDbGetAllStudents: jest.Mock;
let mockStudentDbGetStudentByUsername: jest.Mock;

beforeEach(() => {
    mockStudentDbCreateStudent = jest.fn();
    mockStudentDbGetStudentById = jest.fn();
    mockStudentDbGetAllStudents = jest.fn();
    mockStudentDbGetStudentByUsername = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

// Define a mock trip object
const mockTrip = {
    id: 1,
    destination: 'Paris',
    // Include other necessary trip properties if needed
};

// Define a mock booking to align with the Booking type
const mockBooking: BookingInput = {
    id: 1,
    tripId: mockTrip.id,  // Ensure tripId is included
    studentIds: [1],
    bookingDate: new Date(),
    paymentStatus: 'Paid',
};

// Define valid student input with mock bookings
const validStudentInput: StudentInput = {
    username: 'student1',
    email: 'student1@example.com',
    password: 'securepassword',
    studentNumber: '12345',
    bookings: [mockBooking], // Use mockBooking to fulfill the Booking type requirements
};

const student = new Student(validStudentInput);

test('given a valid student input, when createStudent is called, then a student is created with those values', async () => {
    // Given
    studentDb.createStudent = mockStudentDbCreateStudent.mockReturnValue(Promise.resolve(student));

    // When
    const createdStudent = await studentService.createStudent(validStudentInput);

    // Then
    expect(mockStudentDbCreateStudent).toHaveBeenCalledWith(validStudentInput);
    expect(createdStudent).toEqual(student);
});

// The rest of your tests remain unchanged
test('given an invalid username, when createStudent is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validStudentInput, username: '' };

    // When
    const createStudent = async () => await studentService.createStudent(invalidInput);

    // Then
    await expect(createStudent()).rejects.toThrow('Username is required.');
});

test('given an invalid email, when createStudent is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validStudentInput, email: '' };

    // When
    const createStudent = async () => await studentService.createStudent(invalidInput);

    // Then
    await expect(createStudent()).rejects.toThrow('Email is required.');
});

test('given an invalid password, when createStudent is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validStudentInput, password: '' };

    // When
    const createStudent = async () => await studentService.createStudent(invalidInput);

    // Then
    await expect(createStudent()).rejects.toThrow('Password is required.');
});

test('given an invalid student number, when createStudent is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validStudentInput, studentNumber: '' };

    // When
    const createStudent = async () => await studentService.createStudent(invalidInput);

    // Then
    await expect(createStudent()).rejects.toThrow('Student number is required.');
});

test('given an error when creating a student in the database, when createStudent is called, then an error is thrown', async () => {
    // Given
    studentDb.createStudent = mockStudentDbCreateStudent.mockImplementation(() => {
        throw new Error('Database error');
    });

    // When
    const createStudent = async () => await studentService.createStudent(validStudentInput);

    // Then
    await expect(createStudent()).rejects.toThrow('Student creation failed due to a database error.');
});

test('when getStudentById is called with a valid ID, it retrieves the student', async () => {
    // Given
    const studentId = 1;
    mockStudentDbGetStudentById.mockReturnValue(Promise.resolve(student));

    // When
    const result = await studentService.getStudentById(studentId);

    // Then
    expect(mockStudentDbGetStudentById).toHaveBeenCalledWith(studentId);
    expect(result).toEqual(student);
});

test('given an invalid student ID, when getStudentById is called, then an error is thrown', async () => {
    // When
    const getStudent = async () => await studentService.getStudentById(-1);

    // Then
    await expect(getStudent()).rejects.toThrow("Invalid Student ID");
});

test('given a non-existent student ID, when getStudentById is called, then an error is thrown', async () => {
    // Given
    const studentId = 1;
    mockStudentDbGetStudentById.mockReturnValue(Promise.resolve(null));

    // When
    const getStudent = async () => await studentService.getStudentById(studentId);

    // Then
    await expect(getStudent()).rejects.toThrow(`Student with ID ${studentId} does not exist.`);
});

test('when getAllStudents is called, then it retrieves all students', async () => {
    // Given
    const students = [student];
    studentDb.getAllStudents = mockStudentDbGetAllStudents.mockReturnValue(Promise.resolve(students));

    // When
    const result = await studentService.getAllStudents();

    // Then
    expect(mockStudentDbGetAllStudents).toHaveBeenCalled();
    expect(result).toEqual(students);
});

test('when getStudentByUsername is called with a valid username, it retrieves the student', async () => {
    // Given
    const username = 'student1';
    mockStudentDbGetStudentByUsername.mockReturnValue(Promise.resolve(student));

    // When
    const result = await studentService.getStudentByUsername(username);

    // Then
    expect(mockStudentDbGetStudentByUsername).toHaveBeenCalledWith(username);
    expect(result).toEqual(student);
});

test('given an invalid username, when getStudentByUsername is called, then an error is thrown', async () => {
    // When
    const getStudent = async () => await studentService.getStudentByUsername('');

    // Then
    await expect(getStudent()).rejects.toThrow('Username is required.');
});

test('given a non-existent username, when getStudentByUsername is called, then an error is thrown', async () => {
    // Given
    const username = 'student1';
    mockStudentDbGetStudentByUsername.mockReturnValue(Promise.resolve(null));

    // When
    const getStudent = async () => await studentService.getStudentByUsername(username);

    // Then
    await expect(getStudent()).rejects.toThrow(`Student with username ${username} does not exist.`);
});
