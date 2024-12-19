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
  id: string;
  name?: string;
  description?: string;
  video_link?: string;
  isFavorite?: boolean;
  workoutExercise?: WorkoutExercise;
};

export type WorkoutExercise = {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  rpe: number;
  restTime: number;
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
