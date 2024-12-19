const loggedInUser = localStorage.getItem("loggedInUser");
const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

const getAllExercises = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/exercises", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getExerciseById = async (exerciseId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/exercises/${exerciseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getAllExercises,
  getExerciseById,
};
