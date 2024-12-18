import { Review } from '../../model/review';
import { Trip } from '../../model/trip';
import { Student } from '../../model/student';
import { PaymentStatus } from '@prisma/client';
import { User } from '../../model/user';

const trip = new Trip({
    id: 1,
    description: 'Mountain Hiking',
    destination: 'Alps',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-10'),
    price: 800,
});

const user = new User({
    username: 'janedoe',
    email: 'jane.doe@ucll.be',
    password: 'janed123',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'student', 
});

const student = new Student({
    user: user,  
    studentNumber: 'r09876543',
});
test('given: valid values for review, when: review is created, then: review is created with those values', () => {
    // given
    const comment = 'Amazing trip with breathtaking views!';
    const rating = 5;

    // when
    const review = new Review({
        comment,
        rating,
        student,
        trip,
    });

    // then
    expect(review['comment']).toEqual(comment);
    expect(review['rating']).toEqual(rating);
    expect(review['student']).toEqual(student);
    expect(review['trip']).toEqual(trip);
});

test('given: missing comment, when: review is validated, then: an error is thrown', () => {
    // given
    const review = new Review({
        comment: '',
        rating: 4,
        student,
        trip,
    });

    // then
    expect(() => review.validate()).toThrow('Comment is required.');
});

test('given: invalid rating, when: review is validated, then: an error is thrown', () => {
    // given
    const invalidRating = 6;
    const review = new Review({
        comment: 'Great experience!',
        rating: invalidRating,
        student,
        trip,
    });

    // then
    expect(() => review.validate()).toThrow('Rating must be between 1 and 5.');
});

test('given: missing trip, when: review is validated, then: an error is thrown', () => {
    // given
    const review = new Review({
        comment: 'Good trip!',
        rating: 3,
        student,
    } as any);

    // then
    expect(() => review.validate()).toThrow('Trip is required.');
});

test('given: missing student, when: review is validated, then: an error is thrown', () => {
    // given
    const review = new Review({
        comment: 'Great trip!',
        rating: 4,
        trip,
    } as any);

    // then
    expect(() => review.validate()).toThrow('Student is required.');
});

test('given: an invalid rating of 0, when: review is validated, then: an error is thrown', () => {
    // given
    const review = new Review({
        comment: 'Not so great',
        rating: 0,
        student,
        trip,
    });

    // then
    expect(() => review.validate()).toThrow('Rating must be between 1 and 5.');
});