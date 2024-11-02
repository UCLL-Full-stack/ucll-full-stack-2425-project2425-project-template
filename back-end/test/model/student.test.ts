import { Student } from '../../domain/model/student';
import { Booking } from '../../domain/model/booking';
import { Trip } from '../../domain/model/trip';

const trip = new Trip({
    id: 1,
    description: 'Beach Vacation',
    location: 'Maldives',
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

const validStudentData = {
    username: 'janedoe',
    email: 'jane.doe@example.com',
    password: 'password123',
    studentNumber: 'r01234567',
    bookings: [booking],
};

describe('Student Model', () => {
    test('given: valid values for student, when: student is created, then: student is created with those values', () => {
        const student = new Student(validStudentData);

        expect(student['username']).toEqual(validStudentData.username);
        expect(student['email']).toEqual(validStudentData.email);
        expect(student['password']).toEqual(validStudentData.password);
        expect(student['studentNumber']).toEqual(validStudentData.studentNumber);
        expect(student['bookings']).toContain(booking);
    });

    test('given: missing username, when: student is validated, then: an error is thrown', () => {
        const student = new Student({ ...validStudentData, username: '' } as any);

        expect(() => student.validate()).toThrow('Username is required.');
    });

    test('given: missing email, when: student is validated, then: an error is thrown', () => {
        const student = new Student({ ...validStudentData, email: '' } as any);

        expect(() => student.validate()).toThrow('Email is required.');
    });

    test('given: invalid email format, when: student is validated, then: an error is thrown', () => {
        const student = new Student({ ...validStudentData, email: 'invalid-email' } as any);

        expect(() => student.validate()).toThrow('Invalid email format.');
    });

    test('given: missing password, when: student is validated, then: an error is thrown', () => {
        const student = new Student({ ...validStudentData, password: '' } as any);

        expect(() => student.validate()).toThrow('Password is required.');
    });

    test('given: missing student number, when: student is validated, then: an error is thrown', () => {
        const student = new Student({ ...validStudentData, studentNumber: '' } as any);

        expect(() => student.validate()).toThrow('Student number is required.');
    });

    test('given: student with bookings, when: fetching bookings, then: bookings are correct', () => {
        const student = new Student(validStudentData);

        expect(student['bookings']).toHaveLength(1);
        expect(student['bookings']).toContain(booking);
    });
});
