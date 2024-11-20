// import { User } from '../domain/model/user';
// import { Project } from '../domain/model/project';
// import { Role, Roles } from '../types';

// describe('User Model', () => {
//     const validUser = {
//         user_Id: 1,
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//         role: Roles.Admin,
//         projects: [] as Project[]
//     };

//     test('should create a user with valid values', () => {
//         const user = new User(validUser);
//         expect(user.getId()).toBe(validUser.user_Id);
//         expect(user.getFirstName()).toBe(validUser.firstName);
//         expect(user.getLastName()).toBe(validUser.lastName);
//         expect(user.getEmail()).toBe(validUser.email);
//         expect(user.getPassword()).toBe(validUser.password);
//         expect(user.getRole()).toBe(validUser.role);
//         expect(user.getProjects()).toEqual(validUser.projects);
//     });

//     test('should throw an error if first name is missing', () => {
//         expect(() => {
//             new User({ ...validUser, firstName: '' });
//         }).toThrow('First name is required');
//     });

//     test('should throw an error if last name is missing', () => {
//         expect(() => {
//             new User({ ...validUser, lastName: '' });
//         }).toThrow('Last name is required');
//     });

//     test('should throw an error if email is missing', () => {
//         expect(() => {
//             new User({ ...validUser, email: '' });
//         }).toThrow('Email is required');
//     });

//     test('should throw an error if password is missing', () => {
//         expect(() => {
//             new User({ ...validUser, password: '' });
//         }).toThrow('Password is required');
//     });

//     test('should correctly compare two equal users', () => {
//         const user1 = new User(validUser);
//         const user2 = new User(validUser);
//         expect(user1.equals(user2)).toBe(true);
//     });

//     test('should correctly compare two different users', () => {
//         const user1 = new User(validUser);
//         const user2 = new User({ ...validUser, user_Id: 2 });
//         expect(user1.equals(user2)).toBe(false);
//     });
// });