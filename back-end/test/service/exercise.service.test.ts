
import exerciseDb from '../../repository/exercise.db';
import exerciseService from '../../service/exercise.service';
import { ExerciseInput } from '../../types';

const exercises: ExerciseInput[] = [
    {
        id: 1,
        name: 'Push-up',
        description: 'Push-up description',
        video_link: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
        workoutExercise: {
            workout_exercise_id: 1,
            workout_id: 1,
            exercise_id: 1,
            sets: 3,
            reps: 10,
            rpe: '8-9',
            rest_time: '00:30s',
        },
    },
    {
        id: 2,
        name: 'Pull-up',
        description: 'Pull-up description',
        video_link: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
        workoutExercise: {
            workout_exercise_id: 2,
            workout_id: 1,
            exercise_id: 2,
            sets: 3,
            reps: 10,
            rpe: '8-9',
            rest_time: '00:30s',
        },
    },
];

let mockExerciseDbGetAllExercises: jest.Mock;
let mockExerciseDbGetExerciseById: jest.Mock;

beforeEach(() => {
    mockExerciseDbGetAllExercises = jest.fn();
    mockExerciseDbGetExerciseById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: no exercises; when: fetching all the exercises; then: an error is thrown`, () => {
    //given
    exerciseDb.getAllExercises = mockExerciseDbGetAllExercises.mockReturnValue(null);

    //when
    const getExercises = () => exerciseService.getAllExercises();

    //then
    expect(getExercises).toThrow('No exercises found');
    expect(mockExerciseDbGetAllExercises).toHaveBeenCalled();
});

test(`given: exercises; when: fetching all the exercises; then: the exercises are returned`, () => {
    //given
    exerciseDb.getAllExercises = mockExerciseDbGetAllExercises.mockReturnValue(exercises);

    //when
    const result = exerciseService.getAllExercises();

    //then
    expect(result).toEqual(exercises);
    expect(mockExerciseDbGetAllExercises).toHaveBeenCalled();
});

test(`given: invalid ID; when: fetching an exercise by ID; then: an error is thrown`, () => {
    //given
    const id = 1;
    exerciseDb.getExerciseById = mockExerciseDbGetExerciseById.mockReturnValue(null);

    //when
    const getExerciseById = () => exerciseService.getExerciseById(id);

    //then
    expect(getExerciseById).toThrow(`Exercise with ID ${id} not found`);
    expect(mockExerciseDbGetExerciseById).toHaveBeenCalledWith(id);
});

test(`given: valid ID; when: fetching an exercise by ID; then: the exercise is returned`, () => {
    //given
    const id = 1;
    exerciseDb.getExerciseById = mockExerciseDbGetExerciseById.mockReturnValue(exercises[0]);

    //when
    const result = exerciseService.getExerciseById(id);

    //then
    expect(result).toEqual(exercises[0]);
    expect(mockExerciseDbGetExerciseById).toHaveBeenCalledWith(id);
});
