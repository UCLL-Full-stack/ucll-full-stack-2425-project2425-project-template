import { Workout } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const loggedInUser = localStorage.getItem("loggedInUser");
const token = loggedInUser ? JSON.parse(loggedInUser).token : null;


const getAllWorkouts = async () => {
  return fetch(`${API_URL}/workouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


const getWorkoutById = async (workoutId: string) => {
  return fetch(`${API_URL}/workouts/${workoutId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


const getWorkoutsByUserId = async (userId: string) => {
  return fetch(`${API_URL}/workouts/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


const addExerciseToWorkout = async (workoutId: string, exerciseId: string) => {
  return fetch(`${API_URL}/workouts/${workoutId}/exercises/${exerciseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createWorkout = async (workout: Workout) => {
  return fetch(`${API_URL}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workout),
  });
};

const updateWorkout = async (workout: Workout) => {
  return fetch(`${API_URL}/workouts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workout),
  });
};

const removeWorkout = async (workoutId: string) => {
  return fetch(`${API_URL}/workouts/${workoutId}`, {
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
  return fetch(`${API_URL}/workouts/${workoutId}/exercises/${exerciseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const assignWorkoutToUser = async (workoutId: string, userId: string) => {
  return fetch(`${API_URL}/workouts/${workoutId}/assign/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByUserId,
  addExerciseToWorkout,
  createWorkout,
  updateWorkout,
  removeWorkout,
  removeExerciseFromWorkout,
  assignWorkoutToUser,
};
