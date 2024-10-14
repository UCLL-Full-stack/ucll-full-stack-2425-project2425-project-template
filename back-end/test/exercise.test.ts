import { Exercise } from '../model/exercise';

const validExercise = {
    id: 1,
    name: 'push-ups',
    description: 'lorem ipsum',
    video_link: 'https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X',
};

test(`given: valid values for Exercise properties; when: Exercise is created; then: properties are set correctly`, () => {
    // given
    const exercise = new Exercise(validExercise);

    // when & then
    expect(exercise.id).toEqual(validExercise.id);
    expect(exercise.name).toEqual(validExercise.name);
    expect(exercise.description).toEqual(validExercise.description);
    expect(exercise.video_link).toEqual(validExercise.video_link);
});

test(`given: Exercise equals method called with matching properties; when: all properties match; then: return true`, () => {
    // given
    const exercise = new Exercise(validExercise);

    // when
    const isEqual = exercise.equals({
        id: 1,
        name: 'push-ups',
        description: 'lorem ipsum',
        video_link: 'https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X',
    });

    // then
    expect(isEqual).toBe(true);
});

test(`given: Exercise equals method called with non-matching properties; when: one or more properties don't match; then: return false`, () => {
    // given
    const exercise = new Exercise(validExercise);

    // when
    const isEqual = exercise.equals({
        id: 2,
        name: 'dips',
        description: 'ipsum lorem',
        video_link: 'https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV',
    });

    // then
    expect(isEqual).toBe(false);
});

test(`given: Exercise equals method called; when: only one field is different; then: return false`, () => {
    //given
    const exercise = new Exercise(validExercise);

    //when & then
    expect(exercise.equals({ ...validExercise, name: 'dips' })).toBe(false);
    expect(exercise.equals({ ...validExercise, description: 'ipsum lorem' })).toBe(false);
    expect(exercise.equals({ ...validExercise, video_link: 'https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV' })).toBe(false);
});
