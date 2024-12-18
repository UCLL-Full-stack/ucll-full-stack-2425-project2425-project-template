const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchMealDetails = async (date: string, token: string) => {
  const response = await fetch(`${apiUrl}/schedules?date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meal details");
  }

  const data = await response.json();
  return data;
};

const updateMealDate = async (
  recipeId: number,
  oldDate: string,
  newDate: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/schedules/${recipeId}?date=${oldDate}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newDate }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update meal date");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating meal date:", error);
    throw error;
  }
};

const deleteMeal = async (recipeId: number, date: string, token: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/schedules/${recipeId}?date=${date}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete meal");
    }
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw error;
  }
};

const PlannerService = { fetchMealDetails, updateMealDate, deleteMeal };

export default PlannerService;
