const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getIngredientById(IngredientId : number) {
    try {
        const response = await fetch(`${apiUrl}/ingredients/${IngredientId}`);
        if (!response.ok) {
            throw new Error(`Error fetching ingredient with ID ${IngredientId}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching ingredient:", error);
        throw error;
    }
}

async function getAllIngredients() {
  try {
    const response = await fetch(`${apiUrl}/ingredients`);
    if (!response.ok) {
      throw new Error(`Error fetching ingredients: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
}

export const IngredientService = {
  getAllIngredients,
  getIngredientById,
};
