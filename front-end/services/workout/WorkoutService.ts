import { Workout } from "@/types";

const loggedInUser = sessionStorage.getItem("loggedInUser");
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
      Authorization: `Bearer ${token}`,
    },
  });
};

const getWorkoutsByUserId = async (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `workouts/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addExerciseToWorkout = async (workoutId: string, exerciseId: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/workouts/${workoutId}/exercises/${exerciseId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const updateWorkout = async (workout: Workout) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/workouts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workout),
  });
};

const removeWorkout = async (workoutId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/workouts/${workoutId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeExerciseFromWorkout = async (
  workoutId: string,
  exerciseId: string
) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/workouts/${workoutId}/exercises/${exerciseId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  getWorkoutsByUserId,
  updateWorkout,
};
