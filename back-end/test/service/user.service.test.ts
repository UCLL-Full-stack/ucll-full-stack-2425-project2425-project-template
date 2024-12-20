import userService from '../../service/user.service';
import userDB from '../../repository/user.db';
import { User } from '../../model/user';
import bcrypt from 'bcrypt';
import { Role } from '../../types';

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;
let mockUserDbCreateUser: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserByUsername = jest.fn();
    mockUserDbCreateUser = jest.fn();

    userDB.getAllUsers = mockUserDbGetAllUsers;
    userDB.getUserByUsername = mockUserDbGetUserByUsername;
    userDB.createUser = mockUserDbCreateUser;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should return all users', async () => {
    // Given
    const mockUsers: User[] = [
        new User({
            username: 'john_doe',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'student',
        }),
    ];

    mockUserDbGetAllUsers.mockResolvedValue(mockUsers);

    // When
    const users = await userService.getAllUsers();

    // Then
    expect(users).toEqual(mockUsers);
    expect(mockUserDbGetAllUsers).toHaveBeenCalled();
});

test('should return user by username', async () => {
    // Given
    const username = 'john_doe';
    const mockUser = new User({
        username: 'john_doe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'student',
    });

    mockUserDbGetUserByUsername.mockResolvedValue(mockUser);

    // When
    const user = await userService.getUserByUsername({ username });

    // Then
    expect(user).toEqual(mockUser);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username });
});

test('should throw error if user does not exist by username', async () => {
    // Given
    const username = 'non_existent_user';
    mockUserDbGetUserByUsername.mockResolvedValue(null);

    // When & Then
    await expect(userService.getUserByUsername({ username }))
        .rejects.toThrow('Failed to fetch user. See server logs for details.');
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username });
});

test('should authenticate user successfully', async () => {
    // Given
    const username = 'john_doe';
    const password = 'password123';
    
    const mockUser = new User({
        username: 'john_doe',
        password: await bcrypt.hash('password123', 12),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'student' as Role,  
    });

    mockUserDbGetUserByUsername.mockResolvedValue(mockUser);

    // When
    const authResponse = await userService.authenticate({ 
        username, 
        password, 
        firstName: 'John',      
        lastName: 'Doe',       
        email: 'john.doe@example.com', 
        role: 'student' as Role   
    });

    // Then
    expect(authResponse).toHaveProperty('token');
    expect(authResponse.username).toBe('john_doe');
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username });
});


test('should create a new user', async () => {
    // Given
    const userInput = {
        username: 'new_user',
        password: 'new_password',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        role: 'student'  as Role, 
    };

    const hashedPassword = await bcrypt.hash('new_password', 12);

    const newUser = new User({
        username: userInput.username,
        password: hashedPassword,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        role: userInput.role, 
    });

    mockUserDbGetUserByUsername.mockResolvedValue(null);
    mockUserDbCreateUser.mockResolvedValue(newUser);

    // When
    const createdUser = await userService.createUser(userInput);

    // Then
    expect(createdUser).toEqual(newUser);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith({
        username: userInput.username,
        password: expect.any(String),  
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        role: userInput.role, 
    });
});

test('should create a new user', async () => {
    // Given
    const userInput = {
        username: 'new_user',
        password: 'new_password',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        role: 'student' as Role,
    };

    const hashedPassword = await bcrypt.hash('new_password', 12); // This is dynamically created

    const newUser = new User({
        username: userInput.username,
        password: hashedPassword,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        role: userInput.role,
    });

    mockUserDbGetUserByUsername.mockResolvedValue(null); 
    mockUserDbCreateUser.mockResolvedValue(newUser);

    // When
    const createdUser = await userService.createUser(userInput);

    // Then
    expect(createdUser).toEqual(newUser);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith({
        username: userInput.username,
        password: expect.any(String),  
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        role: userInput.role,
    });
});


test('should throw error if user already exists during creation', async () => {
    // Given
    const userInput = {
        username: 'existing_user',
        password: 'existing_password',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        role: 'student' as Role,
    };

    mockUserDbGetUserByUsername.mockResolvedValue({
        username: 'existing_user',
        password: 'existing_password',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        role: 'student' as Role,
    });

    // When & Then
    await expect(userService.createUser(userInput)) 
        .rejects.toThrow('User with username "existing_user" is already registered.'); 

    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: userInput.username });
});
