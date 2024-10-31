const getAllExercises = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/exercises", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
