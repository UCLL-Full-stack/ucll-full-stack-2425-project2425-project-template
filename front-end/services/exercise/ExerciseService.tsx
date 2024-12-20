const loggedInUser = sessionStorage.getItem("loggedInUser");
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

const getExerciseById = async (id: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/exercises/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const toggleFavorite = async (id: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/exercises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getAllExercises,
  getExerciseById,
  toggleFavorite,
};
