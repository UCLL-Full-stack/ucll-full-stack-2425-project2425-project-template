import { Student } from '../../model/student';
import { Booking } from '../../model/booking';
import { Trip } from '../../model/trip';
import { User } from '../../model/user'; 
import { Role } from '../../types'; 

const trip = new Trip({
    id: 1,
    description: 'Beach Vacation',
    destination: 'Maldives',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-07-10'),
    price: 1200,
});

const booking = new Booking({
    bookingDate: new Date(),
    paymentStatus: 'Paid',
    students: [],
    trip,
});

const validUserData = {
    username: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    password: 'password123',
    role: 'student' as Role, 
};

const user = new User(validUserData);

const validStudentData = {
    user: user, 
    studentNumber: 'r01234567',
    bookings: [booking],
};

test('given: valid values for student, when: student is created, then: student is created with those values', () => {
    const student = new Student(validStudentData);

    expect(student.getUser().getUsername()).toEqual(validUserData.username);
    expect(student.getUser().getEmail()).toEqual(validUserData.email);
    expect(student.getUser().getPassword()).toEqual(validUserData.password);
    expect(student.getUser().getFirstName()).toEqual(validUserData.firstName);
    expect(student.getUser().getLastName()).toEqual(validUserData.lastName);
    expect(student.getUser().getRole()).toEqual(validUserData.role);
    expect(student.getStudentnumber()).toEqual(validStudentData.studentNumber);
    expect(student['bookings']).toContain(booking);
});

test('given: missing student number, when: student is validated, then: an error is thrown', () => {
    const student = new Student({
        ...validStudentData,
        studentNumber: '', 
    });

    expect(() => student.validate()).toThrow('Student number is required.');
});

test('given: student with bookings, when: fetching bookings, then: bookings are correct', () => {
    const student = new Student(validStudentData);

    expect(student['bookings']).toHaveLength(1);
    expect(student['bookings']).toContain(booking);
});
test('given: missing student number, when: student is validated, then: an error is thrown', () => {
    const student = new Student({
        ...validStudentData,
        studentNumber: '', 
    });

    expect(() => student.validate()).toThrow('Student number is required.');
});

test('given: valid student number, when: student is validated, then: validation passes', () => {
    const student = new Student(validStudentData);

    expect(() => student.validate()).not.toThrow();
});

test('given: student with bookings, when: fetching bookings, then: bookings are correct', () => {
    const student = new Student(validStudentData);

    expect(student['bookings']).toHaveLength(1);
    expect(student['bookings']).toContain(booking);
});