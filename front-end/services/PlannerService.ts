const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchMealDetails = async (userId: number, date: string) => {
  return fetch(`${apiUrl}/schedule/${userId}/${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateMeal = async (
  userId: number,
  mealId: number,
  date: string,
  mealData: any
) => {
  return fetch(`${apiUrl}/schedule/${userId}/${mealId}/${date}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealData),
  });
};

const deleteMeal = async (userId: number, mealId: number, date: string) => {
  return fetch(`${apiUrl}/schedule/${userId}/${mealId}/${date}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const PlannerService = { fetchMealDetails, deleteMeal, updateMeal };

export default PlannerService;
