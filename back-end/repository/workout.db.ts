import { Exercise } from '../model/exercise';
import { Workout } from '../model/workout';
import { WorkoutExercise } from '../model/workoutexercise';
import database from '../util/database';

// const defaultWorkoutExercise = new WorkoutExercise({
//     workout_exercise_id: 0,
//     workout_id: 0,
//     exercise_id: 0,
//     sets: 3,
//     reps: 10,
//     rpe: '8',
//     rest_time: '01:00',
// });

// const exercises: Exercise[] = [
//     new Exercise({
//         id: 1,
//         name: 'Bench Press',
//         description: 'This exercise focusses on the middle chest and triceps.',
//         video_link: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 2,
//         name: 'Incline Smith Machine Press',
//         description: 'This exercise focusses on the upper chest and triceps.',
//         video_link: 'https://www.youtube.com/watch?v=8urE8Z8AMQ4',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 3,
//         name: 'Chest Fly',
//         description: 'Isolation exercise for the chest.',
//         video_link: 'https://www.youtube.com/watch?v=FDay9wFe5uE',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 4,
//         name: 'Pull up',
//         description: 'This exercise focusses on the back and biceps.',
//         video_link: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 5,
//         name: 'Chin up',
//         description: 'This exercise focusses on the back and biceps.',
//         video_link: 'https://www.youtube.com/watch?v=8mryJ3w2S78',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 6,
//         name: 'Chest supported row',
//         description: 'This exercise focusses on your back musles.',
//         video_link: 'https://www.youtube.com/watch?v=0UBRfiO4zDs',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 7,
//         name: 'Squat',
//         description: 'This exercise focusses on the legs.',
//         video_link: 'https://www.youtube.com/watch?v=m0GcZ24pK6k',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 8,
//         name: 'Leg Extension',
//         description: 'An isolation exercise for the quads.',
//         video_link: 'https://www.youtube.com/watch?v=4ZDm5EbiFI8',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 9,
//         name: 'Seated Leg Curl',
//         description: 'An isolation exercise for the hamstrings.',
//         video_link: 'https://www.youtube.com/watch?v=Orxowest56U',
//         workoutExercise: defaultWorkoutExercise,
//     }),
//     new Exercise({
//         id: 10,
//         name: 'Plank',
//         description: 'This exercise focusses on the core.',
//         video_link: 'https://www.youtube.com/watch?v=pvIjsG5Svck',
//         workoutExercise: defaultWorkoutExercise,
//     }),
// ];

// const workouts: Workout[] = [
//     new Workout({
//         workout_id: 1,
//         user_id: 1,
//         name: 'Chest Workout',
//         description: 'Workout focussing on the chest muscles.',
//         exercises: [exercises[0], exercises[1], exercises[2]],
//     }),
//     new Workout({
//         workout_id: 2,
//         user_id: 2,
//         name: 'Back Workout',
//         description: 'Workout focussing on the back muscles.',
//         exercises: [exercises[3], exercises[4], exercises[5]],
//     }),
//     new Workout({
//         workout_id: 3,
//         user_id: 3,
//         name: 'Legs + Abs Workout',
//         description: 'Workout focussing on the legs and abs.',
//         exercises: [exercises[6], exercises[7], exercises[8], exercises[9]],
//     }),
// ];

// const createWorkout = async ({ userId, name, description, workoutexercises }: { userId: number, name: string, description: string, exercises: Exercise[] }): Promise<Workout> => {
//     try {
//         const workoutPrisma = await database.workout.create({
//             data: {
//                 userId: userId,
//                 name: name,
//                 description: description,
//                 exer
//             }
//         })
//     } catch (error) {
//         throw new Error('Database error. See server log for details.');
//     }
// };

// const addExerciseToWorkout = (workoutId: number, exercise: Exercise): Workout | undefined => {
//     const workout = workouts.find((w) => w.workout_id === workoutId);

//     if (workout) {
//         workout.addExercise(exercise);
//     }

//     return workout;
// };

// const removeExerciseFromWorkout = (workoutId: number, exerciseId: number): Workout | undefined => {
//     const workout = workouts.find((w) => w.workout_id === workoutId);

//     if (workout) {
//         workout.removeExercise(exerciseId);
//     }

//     return workout;
// };

const getAllWorkouts = async (): Promise<Workout[]> => {
    try {
        const workoutPrisma = await database.workout.findMany();
        return workoutPrisma.map((workout) => Workout.from(workout));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutById = async (id: string): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.findUnique({
            where: {
                id: id,
            },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutsByUserId = async (userId: string): Promise<Workout[]> => {
    try {
        const workoutPrisma = await database.workout.findMany({
            where: {
                userId: userId,
            },
        });
        return workoutPrisma.map((workout) => Workout.from(workout));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const removeWorkout = (workoutId: number): boolean => {
//     const index = workouts.findIndex((w) => w.workout_id === workoutId);
//     if (index !== -1) {
//         workouts.splice(index, 1);
//         return true;
//     }
//     return false;
// };

export default {
    getAllWorkouts,
    getWorkoutById,
    getWorkoutsByUserId,
    // createWorkout,
    // workouts,
    // addExerciseToWorkout,
    // removeExerciseFromWorkout,
    // removeWorkout,
};
