import { Exercise } from '../../model/exercise';
import { Workout } from '../../model/workout';
import { WorkoutExercise } from '../../model/workoutexercise';

const validWorkout = {
    workout_id: 1,
    user_id: 1,
    name: 'upper-body',
    description: 'lorem ipsum',
    exercises: [
        new Exercise({
            id: 1,
            name: 'push-ups',
            description: 'lorem ipsum',
            video_link: 'https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X',
            workoutExercise: new WorkoutExercise({
                workout_exercise_id: 1,
                workout_id: 1,
                exercise_id: 1,
                sets: 3,
                reps: 12,
                rpe: '9-10',
                rest_time: '00:30',
            }),
        }),
    ],
};

test(`given: valid values for Workout properties; when: Workout is created; then: properties are set correctly`, () => {
    // given
    const workout = new Workout(validWorkout);

    // when & then
    expect(workout.workout_id).toEqual(validWorkout.workout_id);
    expect(workout.user_id).toEqual(validWorkout.user_id);
    expect(workout.name).toEqual(validWorkout.name);
    expect(workout.description).toEqual(validWorkout.description);
    expect(workout.exercises).toEqual(validWorkout.exercises);
});

test(`given: Workout equals method called with matching properties; when: all properties match; then: return true`, () => {
    // given
    const workout = new Workout(validWorkout);

    // when
    const isEqual = workout.equals({
        workout_id: 1,
        user_id: 1,
        name: 'upper-body',
        description: 'lorem ipsum',
        exercises: validWorkout.exercises,
    });

    // then
    expect(isEqual).toBe(true);
});

test(`given: Workout equals method called with non-matching properties; when: one or more properties don't match; then: return false`, () => {
    // given
    const workout = new Workout(validWorkout);

    // when
    const isEqual = workout.equals({
        workout_id: 2,
        user_id: 2,
        description: 'ipsum lorem',
        name: 'lower-body',
        exercises: [
            new Exercise({
                id: 2,
                name: 'dips',
                description: 'ipsum lorem',
                video_link: 'https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV',
                workoutExercise: new WorkoutExercise({
                    workout_exercise_id: 2,
                    workout_id: 2,
                    exercise_id: 2,
                    sets: 4,
                    reps: 15,
                    rpe: '7-8',
                    rest_time: '00:45',
                }),
            }),
        ],
    });

    // then
    expect(isEqual).toBe(false);
});

test(`given: Workout equals method called; when: only one field is different; then: return false`, () => {
    //given
    const workout = new Workout(validWorkout);

    //when & then
    expect(workout.equals({ ...validWorkout, user_id: 2 })).toBe(false);
    expect(workout.equals({ ...validWorkout, description: 'ipsum lorem' })).toBe(false);
    expect(workout.equals({ ...validWorkout, name: 'lower-body' })).toBe(false);
    expect(
        workout.equals({
            ...validWorkout,
            exercises: [
                new Exercise({
                    id: 2,
                    name: 'dips',
                    description: 'ipsum lorem',
                    video_link: 'https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV',
                    workoutExercise: new WorkoutExercise({
                        workout_exercise_id: 2,
                        workout_id: 2,
                        exercise_id: 2,
                        sets: 4,
                        reps: 15,
                        rpe: '7-8',
                        rest_time: '00:45',
                    }),
                }),
            ],
        })
    ).toBe(false);
});

test(`given: an empty name; when: Workout is created; then: an error is thrown`, () => {
    //given 
    const invalidName = { ...validWorkout, name: '' };

    //when
    const createInvalidWorkout = () => new Workout(invalidName);

    //then
    expect(createInvalidWorkout).toThrowError('Workout name is required and cannot be empty.');
});

test(`given: an existing Workout; when: removing a exercise from workout that is not added; then: an error is thrown`, () => {
    //given
    const workout = new Workout(validWorkout);

    //when
    const removeExercise = () => workout.removeExercise(2);

    //then
    expect(removeExercise).toThrow('Exercise does not exist in this workout.');
});
