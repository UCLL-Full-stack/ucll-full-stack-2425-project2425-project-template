import exerciseDb from '../../repository/exercise.db';
import workoutDb from '../../repository/workout.db';
import workoutService from '../../service/workout.service';
import { WorkoutInput } from '../../types';

let mockWorkoutDbGetAllWorkouts: jest.Mock;
let mockWorkoutDbGetWorkoutById: jest.Mock;
let mockExerciseDbGetExerciseById: jest.Mock;
let mockWorkoutDbGetWorkoutByUserId: jest.Mock;
let mockWorkoutDbAddExerciseToWorkout: jest.Mock;
let mockWorkoutDbRemoveExerciseFromWorkout: jest.Mock;
let mockWorkoutDbRemoveWorkout: jest.Mock;
let mockWorkoutDbCreateWorkout: jest.Mock;

const workouts: WorkoutInput[] = [
    {
        workout_id: 1,
        user_id: 1,
        name: 'Workout 1',
        description: 'Workout 1 description',
        exercises: [
            {
                id: 1,
                name: 'Exercise 1',
                description: 'Exercise 1 description',
                video_link: 'https://www.youtube.com/watch?v=123',
                workoutExercise: {
                    workout_exercise_id: 1,
                    workout_id: 1,
                    exercise_id: 1,
                    sets: 3,
                    reps: 10,
                    rpe: '8-9',
                    restTime: '00:30s',
                },
            },
        ],
    },
    {
        workout_id: 2,
        user_id: 1,
        name: 'Workout 2',
        description: 'Workout 2 description',
        exercises: [
            {
                id: 2,
                name: 'Exercise 2',
                description: 'Exercise 2 description',
                video_link: 'https://www.youtube.com/watch?v=456',
                workoutExercise: {
                    workout_exercise_id: 2,
                    workout_id: 2,
                    exercise_id: 2,
                    sets: 3,
                    reps: 10,
                    rpe: '8-9',
                    restTime: '00:30s',
                },
            },
        ],
    },
];

beforeEach(() => {
    mockWorkoutDbGetAllWorkouts = jest.fn();
    mockWorkoutDbGetWorkoutById = jest.fn();
    mockExerciseDbGetExerciseById = jest.fn();
    mockWorkoutDbGetWorkoutByUserId = jest.fn();
    mockWorkoutDbAddExerciseToWorkout = jest.fn();
    mockWorkoutDbRemoveExerciseFromWorkout = jest.fn();
    mockWorkoutDbRemoveWorkout = jest.fn();
    mockWorkoutDbCreateWorkout = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: no workouts; when: fetching all the workouts; then: an error is thrown`, () => {
    //given
    workoutDb.getAllWorkouts = mockWorkoutDbGetAllWorkouts.mockReturnValue(null);

    //when
    const getWorkouts = () => workoutService.getAllWorkouts();

    //then
    expect(getWorkouts).toThrow('No workouts found');
    expect(workoutDb.getAllWorkouts).toHaveBeenCalled();
});

test(`given: workouts; when: fetching all the workouts; then: the workouts are returned`, () => {
    //given
    workoutDb.getAllWorkouts = mockWorkoutDbGetAllWorkouts.mockReturnValue(workouts);

    //when
    const result = workoutService.getAllWorkouts();

    //then
    expect(result).toEqual(workouts);
    expect(workoutDb.getAllWorkouts).toHaveBeenCalled();
});

test(`given: invalid ID; when: fetching a workout by ID; then: an error is thrown`, () => {
    //given
    const id = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(null);

    //when
    const getWorkoutById = () => workoutService.getWorkoutById(id);

    //then
    expect(getWorkoutById).toThrow(`Workout with ID ${id} not found`);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(id);
});

test(`given: valid ID; when: fetching a workout by ID; then: the workout is returned`, () => {
    //given
    const id = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);

    //when
    const result = workoutService.getWorkoutById(id);

    //then
    expect(result).toEqual(workouts[0]);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(id);
});

test(`given: invalid user ID; when: fetching workouts by user ID; then: an error is thrown`, () => {
    //given
    const id = 1;
    workoutDb.getWorkoutsByUserId = mockWorkoutDbGetWorkoutByUserId.mockReturnValue([]);

    //when
    const getWorkoutsByUserId = () => workoutService.getWorkoutsByUserId(id);

    //then
    expect(getWorkoutsByUserId).toThrow(`No workouts found for user with ID ${id}`);
    expect(workoutDb.getWorkoutsByUserId).toHaveBeenCalledWith(id);
});

test(`given: valid user ID; when: fetching workouts by user ID; then: the workouts are returned`, () => {
    //given
    const id = 1;
    workoutDb.getWorkoutsByUserId = mockWorkoutDbGetWorkoutByUserId.mockReturnValue(workouts);

    //when
    const result = workoutService.getWorkoutsByUserId(id);

    //then
    expect(result).toEqual(workouts);
    expect(workoutDb.getWorkoutsByUserId).toHaveBeenCalledWith(id);
});

test(`given: invalid workout ID; when: adding an exercise to a workout; then: an error is thrown`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(null);

    //when
    const addExerciseToWorkout = () => workoutService.addExerciseToWorkout(workoutId, exerciseId);

    //then
    expect(addExerciseToWorkout).toThrow(`Workout with ID ${workoutId} not found`);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutId);
});

test(`given: invalid exercise ID; when: adding an exercise to a workout; then: an error is thrown`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);
    exerciseDb.getExerciseById = mockExerciseDbGetExerciseById.mockReturnValueOnce(null);

    //when
    const addExerciseToWorkout = () => workoutService.addExerciseToWorkout(workoutId, exerciseId);

    //then
    expect(addExerciseToWorkout).toThrow(`Exercise with ID ${exerciseId} not found`);
    expect(exerciseDb.getExerciseById).toHaveBeenCalledWith(exerciseId);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutId);
});

test(`given: valid workout and exercise IDs; when: adding an exercise to a workout; then: the updated workout is returned`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 2;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);
    exerciseDb.getExerciseById = mockExerciseDbGetExerciseById.mockReturnValue(
        workouts[0].exercises[0]
    );
    workoutDb.addExerciseToWorkout = mockWorkoutDbAddExerciseToWorkout.mockReturnValue(workouts[0]);

    //when
    const result = workoutService.addExerciseToWorkout(workoutId, exerciseId);

    //then
    expect(result).toEqual(workouts[0]);
    expect(workoutDb.addExerciseToWorkout).toHaveBeenCalledWith(
        workoutId,
        workouts[0].exercises[0]
    );
});

test(`given: exercise ID that already exists in the workout; when: adding an exercise to a workout; then: an error is thrown`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);
    exerciseDb.getExerciseById = mockExerciseDbGetExerciseById.mockReturnValue(
        workouts[0].exercises[0]
    );

    //when
    const addExerciseToWorkout = () => workoutService.addExerciseToWorkout(workoutId, exerciseId);

    //then
    expect(addExerciseToWorkout).toThrow(
        `Exercise with ID ${exerciseId} is already added to the workout`
    );
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutId);
    expect(exerciseDb.getExerciseById).toHaveBeenCalledWith(exerciseId);
});

test(`given: invalid workout ID; when: removing an exercise from a workout; then: an error is thrown`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(null);

    //when
    const removeExerciseFromWorkout = () =>
        workoutService.removeExerciseFromWorkout(workoutId, exerciseId);

    //then
    expect(removeExerciseFromWorkout).toThrow(`Workout with ID ${workoutId} not found`);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutId);
});

test(`given: invalid exercise ID; when: removing an exercise from a workout; then: an error is thrown`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 2;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);
    exerciseDb.getExerciseById = mockExerciseDbGetExerciseById.mockReturnValueOnce(null);

    //when
    const removeExerciseFromWorkout = () =>
        workoutService.removeExerciseFromWorkout(workoutId, exerciseId);

    //then
    expect(removeExerciseFromWorkout).toThrow(
        `Exercise with ID ${exerciseId} not found in the workout`
    );
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutId);
});

test(`given: valid workout and exercise IDs; when: removing an exercise from a workout; then: the updated workout is returned`, () => {
    //given
    const workoutId = 1;
    const exerciseId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);
    workoutDb.removeExerciseFromWorkout = mockWorkoutDbRemoveExerciseFromWorkout.mockReturnValue(
        workouts[0]
    );

    //when
    const result = workoutService.removeExerciseFromWorkout(workoutId, exerciseId);

    //then
    expect(result).toEqual(workouts[0]);
    expect(workoutDb.removeExerciseFromWorkout).toHaveBeenCalledWith(workoutId, exerciseId);
});

test(`given: invalid workout ID; when: removing a workout; then: an error is thrown`, () => {
    //given
    const workoutId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(null);

    //when
    const removeWorkout = () => workoutService.removeWorkout(workoutId);

    //then
    expect(removeWorkout).toThrow(`Workout with ID ${workoutId} not found`);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutId);
});

test(`given: valid workout ID; when: removing a workout; then: the removed workout is returned`, () => {
    //given
    const workoutId = 1;
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workouts[0]);
    workoutDb.removeWorkout = mockWorkoutDbRemoveWorkout.mockReturnValue(workouts[0]);

    //when
    const result = workoutService.removeWorkout(workoutId);

    //then
    expect(result).toEqual(workouts[0]);
    expect(workoutDb.removeWorkout).toHaveBeenCalledWith(workoutId);
});

test(`given: invalid workout input; when: creating a workout; then: an error is thrown`, () => {
    //given
    const workoutInput = workouts[0];
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(workoutInput);

    //when
    const createWorkout = () => workoutService.createWorkout(workoutInput);

    //then
    expect(createWorkout).toThrow(`Workout with ID ${workoutInput.workout_id} already exists`);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutInput.workout_id);
});

test(`given: valid workout input; when: creating a workout; then: the created workout is returned`, () => {
    //given
    const workoutInput: WorkoutInput = {
        workout_id: 3,
        user_id: 1,
        name: 'Workout 3',
        description: 'Workout 3 description',
        exercises: [],
    };
    workoutDb.getWorkoutById = mockWorkoutDbGetWorkoutById.mockReturnValue(null);
    workoutDb.createWorkout = mockWorkoutDbCreateWorkout.mockReturnValue(workoutInput);

    //when
    const result = workoutService.createWorkout(workoutInput);

    //then
    expect(result).toEqual(workoutInput);
    expect(workoutDb.createWorkout).toHaveBeenCalledWith(workoutInput);
    expect(workoutDb.getWorkoutById).toHaveBeenCalledWith(workoutInput.workout_id);
});
