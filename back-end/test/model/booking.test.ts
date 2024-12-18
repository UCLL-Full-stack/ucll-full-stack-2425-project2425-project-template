import { Booking } from '../../model/booking';
import { Trip } from '../../model/trip';
import { Student } from '../../model/student';
import { PaymentStatus } from '@prisma/client';
import { User } from '../../model/user';

const bookingDate = new Date();
const trip = new Trip({
    id: 1,
    description: 'Beach Adventure',
    destination: 'Hawaii',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-10'),
    price: 1200,
});

const user = new User({
    username: 'janjanssen',
    firstName: 'Jan',
    lastName: 'Janssen',
    email: 'jan.janssen@ucll.be',
    password: 'janj123',
    role: 'student', 
});

const student = new Student({
    user: user,
    studentNumber: 'r01234567',
});

test('given: valid values for booking, when: booking is created, then: booking is created with those values', () => {
    // given
    const paymentStatus = PaymentStatus.Paid;
    const students = [student];
    const tripDetails = trip;

    // when
    const booking = new Booking({
        bookingDate,
        paymentStatus,
        students,
        trip: tripDetails,
    });

    // then
    expect(booking['bookingDate']).toEqual(bookingDate);
    expect(booking['paymentStatus']).toEqual(paymentStatus);
    expect(booking.getStudents()).toContain(student);
    expect(booking.getTrip().equals(tripDetails)).toBe(true);
});

test('given: an existing booking, when: adding a student to booking, then: student is registered for booking', () => {
    // given
    const studentUser2 = new User({
        username: 'fransfranssen',
        firstName: 'Frans',
        lastName: 'Franssen',
        email: 'frans.franssen@ucll.be',
        password: 'fransf123',
        role: 'student', // Use 'student' instead of Role.Student
    });

    const student2 = new Student({
        user: studentUser2,
        studentNumber: 'r045678910',
    });

    const booking = new Booking({
        bookingDate,
        paymentStatus: PaymentStatus.Paid,
        students: [student],
        trip,
    });

    // when
    booking.addStudentToBooking(student2);

    // then
    expect(booking.getStudents()).toContain(student);
    expect(booking.getStudents()).toContain(student2);
    expect(booking.getStudents()).toHaveLength(2);
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
    booking.addStudentToBooking(student);

    // then
    expect(booking.getStudents()).toContain(student);
    expect(booking.getStudents()).toHaveLength(1);
});

test('given: two identical bookings, when: compared with equals, then: they are considered equal', () => {
    // given
    const booking1 = new Booking({
        bookingDate,
        paymentStatus: PaymentStatus.Paid,
        students: [student],
        trip,
    });

    const booking2 = new Booking({
        bookingDate,
        paymentStatus: PaymentStatus.Paid,
        students: [student],
        trip,
    });

    // when
    const areBookingsEqual = booking1.equals(booking2);

    // then
    expect(areBookingsEqual).toBe(true);
});

test('given: two different bookings, when: compared with equals, then: they are not considered equal', () => {
    // given
    const studentUser2 = new User({
        username: 'janjanssen',
        firstName: 'Jan',
        lastName: 'Janssen',
        email: 'jan.janssen@ucll.be',
        password: 'janj123',
        role: 'student',
    });

    const student2 = new Student({
        user: studentUser2,
        studentNumber: 'r045678910',
    });

    const booking1 = new Booking({
        bookingDate,
        paymentStatus: PaymentStatus.Paid,
        students: [student],
        trip,
    });

    const booking2 = new Booking({
        bookingDate,
        paymentStatus: PaymentStatus.Paid,
        students: [student2],
        trip,
    });

    // when
    const areBookingsEqual = booking1.equals(booking2);

    // then
    expect(areBookingsEqual).toBe(false);
});
