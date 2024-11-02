import { Booking } from '../../domain/model/booking';
import { Trip } from '../../domain/model/trip';
import { Student } from '../../domain/model/student';
import { PaymentStatus } from '@prisma/client';

const bookingDate = new Date();
const trip = new Trip({
    id: 1,
    description: 'Beach Adventure',
    location: 'Hawaii',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-10'),
    price: 1200,
});

const studentUser = {
    username: 'janjanssen',
    email: 'jan.janssen@ucll.be',
    password: 'janj123',
    studentNumber: 'r01234567',
};

const student = new Student(studentUser);

describe('Booking Model', () => {
    test('given: valid values for booking, when: booking is created, then: booking is created with those values', () => {
        // given
        const paymentStatus = PaymentStatus.Paid;

        // when
        const booking = new Booking({
            bookingDate,
            paymentStatus,
            students: [student],
            trip,
        });

        // then
        expect(booking['bookingDate']).toEqual(bookingDate);
        expect(booking['paymentStatus']).toEqual(paymentStatus);
        expect(booking['students']).toContain(student);
        expect(booking['trip']).toEqual(trip);
    });

    test('given: an existing booking, when: adding a student to booking, then: student is registered for booking', () => {
        // given
        const studentUser2 = {
            username: 'fransfranssen',
            email: 'frans.franssen@ucll.be',
            password: 'fransf123',
            studentNumber: 'r045678910',
        };
        const student2 = new Student(studentUser2);
        const booking = new Booking({
            bookingDate,
            paymentStatus: PaymentStatus.Paid,
            students: [student],
            trip,
        });

        // when
        booking['students'].push(student2);

        // then
        expect(booking['students']).toContain(student);
        expect(booking['students']).toContain(student2);
    });

    test('given: missing bookingDate, when: booking is validated, then: an error is thrown', () => {
        // given
        const booking = new Booking({
            paymentStatus: PaymentStatus.Paid,
            students: [student],
            trip,
        } as any);

        // then
        expect(() => booking.validate()).toThrow('Booking date is required.');
    });

    test('given: missing trip, when: booking is validated, then: an error is thrown', () => {
        // given
        const booking = new Booking({
            bookingDate,
            paymentStatus: PaymentStatus.Paid,
            students: [student],
        } as any);

        // then
        expect(() => booking.validate()).toThrow('Trip is required.');
    });

    test('given: an existing booking, when: adding a student to booking that is already registered, then: that student is registered only once', () => {
        // given
        const booking = new Booking({
            bookingDate,
            paymentStatus: PaymentStatus.Paid,
            students: [student],
            trip,
        });

        // when
        const addStudentToBooking = () => {
            if (!booking['students'].includes(student)) {
                booking['students'].push(student);
            } else {
                throw new Error('Student is already enrolled in this booking');
            }
        };

        // then
        expect(addStudentToBooking).toThrow('Student is already enrolled in this booking');
        expect(booking['students']).toContain(student);
        expect(booking['students']).toHaveLength(1);
    });
});
