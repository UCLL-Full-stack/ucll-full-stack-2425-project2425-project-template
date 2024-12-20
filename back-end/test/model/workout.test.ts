import { Exercise } from '../../model/exercise';
import { User } from '../../model/user';
import { Workout } from '../../model/workout';
import { Role } from '../../types';

const validWorkout = {
    id: '1',
    user: new User({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'user' as Role,
    }),
    name: 'upper-body',
    description: 'lorem ipsum',
    exercises: [
        new Exercise({
            id: '1',
            name: 'push-ups',
            description: 'lorem ipsum',
            videoLink: 'https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X',
            isFavorite: false,
        }),
    ],
};

test('given: valid values for Workout properties; when: Workout is created; then: properties are set correctly', () => {
    const workout = new Workout(validWorkout);

    expect(workout.id).toEqual(validWorkout.id);
    expect(workout.user.id).toEqual(validWorkout.user.id);
    expect(workout.name).toEqual(validWorkout.name);
    expect(workout.description).toEqual(validWorkout.description);
    expect(workout.exercises).toEqual(validWorkout.exercises);
});

test('given: Workout equals method called with matching properties; when: all properties match; then: return true', () => {
    const workout = new Workout(validWorkout);

    const isEqual = workout.equals({
        id: '1',
        name: 'upper-body',
        description: 'lorem ipsum',
        user: validWorkout.user,
        exercises: validWorkout.exercises,
    });

    expect(isEqual).toBe(true);
});

test("given: Workout equals method called with non-matching properties; when: one or more properties don't match; then: return false", () => {
    const workout = new Workout(validWorkout);

    const isEqual = workout.equals({
        id: '2',
        name: 'lower-body',
        description: 'ipsum lorem',
        user: new User({
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 't',
            role: 'admin' as Role,
        }),
        exercises: [],
    });

    expect(isEqual).toBe(false);
});

test('given: an empty name; when: Workout is created; then: an error is thrown', () => {
    const invalidName = { ...validWorkout, name: '' };

    const createInvalidWorkout = () => new Workout(invalidName);

    expect(createInvalidWorkout).toThrowError('Name is required and cannot be empty.');
});
