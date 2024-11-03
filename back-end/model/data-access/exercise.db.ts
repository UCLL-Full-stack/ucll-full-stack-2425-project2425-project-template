import { Exercise } from "../exercise";
import { WorkoutExercise } from "../workoutexercise";

const defaultWorkoutExercise = new WorkoutExercise({
    workout_exercise_id: 0,
    workout_id: 0,
    exercise_id: 0,
    sets: 3,
    reps: 10,
    rpe: "8",
    rest_time: "01:00",
  });
  
const exercises: Exercise[] = [
    new Exercise({
      id: 11,
      name: "push-up",
      description: "A basic upper body strength exercise.",
      video_link: "https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X",
      workoutExercise: defaultWorkoutExercise,
    }),
    new Exercise({
      id: 12,
      name: "dips",
      description: "An exercise for the triceps and chest muscles.",
      video_link: "https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV",
      workoutExercise: defaultWorkoutExercise,
    }),
    new Exercise({
      id: 13,
      name: "squat",
      description: "A lower body exercise targeting the quads and glutes.",
      video_link: "https://youtu.be/1oed-UmAxFs",
      workoutExercise: defaultWorkoutExercise,
    }),
    new Exercise({
      id: 14,
      name: "lunges",
      description: "A leg exercise focusing on the quads, hamstrings, and glutes.",
      video_link: "https://youtu.be/QOVaHwm-Q6U",
      workoutExercise: defaultWorkoutExercise,
    }),
    new Exercise({
      id: 15,
      name: "bench press",
      description: "An upper body strength exercise for the chest and triceps.",
      video_link: "https://youtu.be/rT7DgCr-3pg",
      workoutExercise: defaultWorkoutExercise,
    }),
    new Exercise({
      id: 16,
      name: "deadlift",
      description: "A full-body exercise focusing on the lower back and legs.",
      video_link: "https://youtu.be/op9kVnSso6Q",
      workoutExercise: defaultWorkoutExercise,
    }),
    new Exercise({
      id: 17,
      name: "pull-up",
      description: "An upper body exercise for the back and biceps.",
      video_link: "https://youtu.be/eGo4IYlbE5g",
      workoutExercise: defaultWorkoutExercise,
    }),

  ];
  



const getAllExercises = (): Exercise[] => {
    return exercises;
}

const getExerciseById = (id: number): Exercise | undefined => {
    return exercises.find((exercise) => exercise.id === id);
};

export default {getAllExercises, getExerciseById, exercises, defaultWorkoutExercise};