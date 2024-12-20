import studentService from '../../service/student.service';
import studentDb from '../../repository/student.db';
import { Student } from '../../model/student';
import userService from '../../service/user.service';
import { User } from '../../model/user';

jest.mock('../../repository/student.db');
jest.mock('../../service/user.service');

let mockStudentDbGetStudentById: jest.Mock;
let mockUserServiceGetUserByUsername: jest.Mock;

beforeEach(() => {
  mockStudentDbGetStudentById = jest.fn();
  mockUserServiceGetUserByUsername = jest.fn();

  studentDb.getStudentById = mockStudentDbGetStudentById;
  userService.getUserByUsername = mockUserServiceGetUserByUsername;
});

afterEach(() => {
  jest.clearAllMocks();
});
const mockUser = {
    getId: jest.fn().mockReturnValue(1),
    getUsername: jest.fn().mockReturnValue('student1'),
    getFirstName: jest.fn().mockReturnValue('John'),
    getLastName: jest.fn().mockReturnValue('Doe'),
    getEmail: jest.fn().mockReturnValue('student1@example.com'),
    getPassword: jest.fn().mockReturnValue('hashedpassword'),
    getRole: jest.fn().mockReturnValue('student'),
    validate: jest.fn().mockReturnValue(true),
    equals: jest.fn().mockReturnValue(true),
  };

  const mockStudent = new Student({
    id: 1,
    user: mockUser as any, 
    studentNumber: '123456',
  });

test('should return a student by username', async () => {
    // Given: A username that corresponds to an existing student
    const username = 'student1';
  
    // When: The userService and studentDb are called to fetch the student by username
    mockUserServiceGetUserByUsername.mockResolvedValue(mockUser);
    mockStudentDbGetStudentById.mockResolvedValue(mockStudent);
  
    // Then: We expect the student to be returned with matching data
    const student = await studentService.getStudentByUsername(username);
  
    expect(student).toEqual(mockStudent);
    expect(mockUserServiceGetUserByUsername).toHaveBeenCalledWith({ username });
    expect(mockStudentDbGetStudentById).toHaveBeenCalledWith(1);
  });

  test('should throw an error if user does not exist when fetching student by username', async () => {
    // Given: A username that does not correspond to an existing user
    const username = 'nonexistentUser';
  
    // When: The userService is called and returns null for the given username
    mockUserServiceGetUserByUsername.mockResolvedValue(null);
  
    // Then: We expect an error indicating the student does not exist
    await expect(studentService.getStudentByUsername(username)).rejects.toThrow(
      `User with username ${username} does not exist.`
    );
    expect(mockUserServiceGetUserByUsername).toHaveBeenCalledWith({ username });
  });
  

  test('should throw an error if user ID is undefined when fetching student by username', async () => {
    // Given: A username and a user with no valid ID
    const username = 'studentWithNoId';
    const mockUserWithNoId = {
      getId: jest.fn().mockReturnValue(undefined),  // Simulating user with no ID
    };
  
    // When: The userService is called and returns the user with no valid ID
    mockUserServiceGetUserByUsername.mockResolvedValue(mockUserWithNoId);
  
    // Then: We expect an error indicating the user has no valid ID
    await expect(studentService.getStudentByUsername(username)).rejects.toThrow(
      `User with username ${username} has no valid ID.`
    );
  
    expect(mockUserServiceGetUserByUsername).toHaveBeenCalledWith({ username });
  });
  
  