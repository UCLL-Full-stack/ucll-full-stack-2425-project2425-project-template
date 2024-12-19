export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  password?: string;
  role?: string;
};

export type Exercise = {
  id: number;
  name: string;
  description: string;
  video_link: string;
  workoutExercise: WorkoutExercise;
};

export type WorkoutExercise = {
  workout_exercise_id: number;
  workout_id: number;
  exercise_id: number;
  sets: number;
  reps: number;
  rpe: string;
  restTime: string;
};

export type Workout = {
  id?: number;
  name?: string;
  description?: string;
  user?: User;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
