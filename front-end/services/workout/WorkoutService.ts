import { Workout } from "@/types";

const loggedInUser = localStorage.getItem("loggedInUser");
const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

const getAllWorkouts = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/workouts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getWorkoutById = async (workoutId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/workouts/${workoutId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addExerciseToWorkout = async (workoutId: number, exerciseId: number) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/workouts/${workoutId}/exercises/${exerciseId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const createWorkout = async (workout: Workout) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workout),
  });
};

const removeWorkout = async (workoutId: number) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/workouts/${workoutId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const removeExerciseFromWorkout = async (
  workoutId: number,
  exerciseId: number
) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/workouts/${workoutId}/exercises/${exerciseId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default {
  getAllWorkouts,
  getWorkoutById,
  addExerciseToWorkout,
  createWorkout,
  removeWorkout,
  removeExerciseFromWorkout,
};
