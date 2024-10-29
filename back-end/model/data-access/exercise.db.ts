import { Exercise } from "../exercise";
import { WorkoutExercise } from "../workoutexercise";

const defaultWorkoutExercise = new WorkoutExercise({
    workout_exercise_id: 0,
    workout_id: 0,
    exercise_id: 0,
    sets: 3,
    reps: 10,
    rpe: '8',
    rest_time: '01:00'
});

const exercises: Exercise[] = [
    new Exercise({
        id: 1,
        name: 'push-up',
        description: 'A basic upper body strength exercise.',
        video_link: 'https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X',
        workoutExercise: defaultWorkoutExercise
    }),
    new Exercise({
        id: 2,
        name: 'dips',
        description: 'An exercise for the triceps and chest muscles.',
        video_link: 'https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV',
        workoutExercise: defaultWorkoutExercise
    })
];



const getAllExercises = (): Exercise[] => {
    return exercises;
}

const getExerciseById = (id: number): Exercise | undefined => {
    return exercises.find((exercise) => exercise.id === id);
};

export default {getAllExercises, getExerciseById}