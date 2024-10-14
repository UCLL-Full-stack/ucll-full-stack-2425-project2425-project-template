import { Workout } from '../model/workout';

const validWorkout = {
    workout_id: 1,
    user_id: 1,
    name: 'upper-body',
    description: 'lorem ipsum',
};

test(`given: valid values for Workout properties; when: Workout is created; then: properties are set correctly`, () => {
    // given
    const workout = new Workout(validWorkout);

    // when & then
    expect(workout.workout_id).toEqual(validWorkout.workout_id);
    expect(workout.user_id).toEqual(validWorkout.user_id);
    expect(workout.name).toEqual(validWorkout.name);
    expect(workout.description).toEqual(validWorkout.description);
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
});
